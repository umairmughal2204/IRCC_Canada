"use server";

import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  addMessageToApplication,
  getMessages,
  updateMessage,
  deleteMessage,
  markMessagesRead,
  markMessageRead,
  addSecurityQuestion,
  updateSecurityQuestion,
  deleteSecurityQuestion,
  getSecurityQuestions,
  verifySecurityAnswer,
} from "@/functions/applicationFuntions";
import { ApplicationStatus, BiometricsStatus } from "@/models/Application";

// ================= SCHEMAS =================

const biometricsSchema = z.object({
  number: z.string().trim().min(1, "Biometrics number is required"),
  enrolmentDate: z.coerce.date(),
  expiryDate: z.coerce.date(),
  status: z.nativeEnum(BiometricsStatus).optional(),
});

const applicationSchema = z.object({
  userName: z.string().trim().min(2, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  email: z.string().trim().email("Valid email is required"),
  applicationType: z.string().trim().min(2, "Application type is required"),
  applicationNumber: z.string().trim().min(2, "Application number is required"),
  applicantName: z.string().trim().min(2, "Applicant name is required"),
  dateOfSubmission: z.coerce.date(),
  status: z.nativeEnum(ApplicationStatus).optional(),
  uniqueClientIdentifier: z.string().trim().min(2, "UCI is required"),

  biometrics: biometricsSchema,

  // ✅ New fields
  reviewOfEligibility: z.string().trim().optional(),
  medical: z.string().trim().optional(),
  documents: z.string().trim().optional(),
  interview: z.string().trim().optional(),
  biometricsStatusText: z.string().trim().optional(),
  backgroundCheck: z.string().trim().optional(),
  finalDecision: z.string().trim().optional(),
});

const messageSchema = z.object({
  subject: z.string().trim().min(1, "Subject cannot be empty"),
  sentAt: z.coerce.date().optional(),
  readAt: z.coerce.date().optional().nullable(),
});

const updateMessageSchema = z.object({
  messageId: z.string().trim().min(1, "Message ID is required"),
  subject: z.string().trim().min(1).optional(),
  sentAt: z.coerce.date().optional(),
  readAt: z.coerce.date().optional().nullable(),
});

const securityQuestionSchema = z.object({
  question: z.string().trim().min(5, "Question must be at least 5 characters"),
  answer: z.string().trim().min(2, "Answer is required"),
});

export type ApplicationFormState = {
  error?: Record<string, string[]> | { message?: string[] };
  data?: any;
};

// ================= UTILITY =================

function serializeMongoDoc(doc: any): any {
  if (!doc) return doc;
  if (Array.isArray(doc)) return doc.map(serializeMongoDoc);

  if (typeof doc === "object") {
    const result: any = {};
    for (const key in doc) {
      if (!Object.hasOwn(doc, key)) continue;
      const value = doc[key];

      if (value?._bsontype === "ObjectID") {
        result[key] = value.toString();
      } else if (value instanceof Date) {
        result[key] = value.toISOString();
      } else if (typeof value === "object") {
        result[key] = serializeMongoDoc(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  return doc;
}

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return (v == null ? "" : String(v)).trim();
}

function emptyToUndefined<T extends string>(v: string): T | undefined {
  return v === "" ? undefined : (v as T);
}

function parseApplicationFormData(formData: FormData): Record<string, any> {
  const uci = str(formData, "uniqueClientIdentifier") || str(formData, "uci");
  const biomStatusRaw = str(formData, "biometricsStatus") || str(formData, "biometricStatus");
  const appStatusRaw = str(formData, "status");

  return {
    userName: str(formData, "userName"),
    password: str(formData, "password"),
    email: str(formData, "email"),
    applicationType: str(formData, "applicationType"),
    applicationNumber: str(formData, "applicationNumber"),
    applicantName: str(formData, "applicantName"),
    dateOfSubmission: str(formData, "dateOfSubmission"),
    status: emptyToUndefined<ApplicationStatus>(appStatusRaw),
    uniqueClientIdentifier: uci,

    biometrics: {
      number: str(formData, "biometricsNumber"),
      enrolmentDate: str(formData, "dateOfBiometrics"),
      expiryDate: str(formData, "expiryDate"),
      status: emptyToUndefined<BiometricsStatus>(biomStatusRaw),
    },

    reviewOfEligibility: str(formData, "reviewOfEligibility"),
    medical: str(formData, "medical"),
    documents: str(formData, "documents"),
    interview: str(formData, "interview"),
    biometricsStatusText: str(formData, "biometricsStatusText"),
    backgroundCheck: str(formData, "backgroundCheck"),
    finalDecision: str(formData, "finalDecision"),
  };
}

// ================= APPLICATION CRUD =================

export async function createApplicationAction(
  prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = parseApplicationFormData(formData);
  const result = applicationSchema.safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const application = await createApplication(result.data);
    return { data: application };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to create application"] } };
  }
}

export async function updateApplicationAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = parseApplicationFormData(formData);
  const result = applicationSchema.safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await updateApplication(id, result.data);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to update application"] } };
  }
}

export async function deleteApplicationAction(id: string) {
  await connectToDatabase();
  try {
    const deleted = await deleteApplication(id);
    return { data: deleted };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to delete application"] } };
  }
}

export async function fetchAllApplicationsAction() {
  await connectToDatabase();
  try {
    const applications = await getAllApplications();
    return { data: applications };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to fetch applications"] } };
  }
}

export async function fetchApplicationByIdAction(id: string) {
  await connectToDatabase();
  try {
    const application = await getApplicationById(id);
    if (!application) return { error: { message: ["Application not found"] } };
    return { data: application };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to fetch application"] } };
  }
}

// ================= MESSAGES =================

export async function addMessageAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = {
    subject: str(formData, "subject"),
    sentAt: formData.get("sentAt") || undefined,
    readAt: formData.get("readAt") || undefined,
  };

  const result = messageSchema.safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await addMessageToApplication(id, result.data);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to add message"] } };
  }
}

export async function fetchMessagesAction(id: string) {
  await connectToDatabase();
  try {
    const messages = await getMessages(id);
    return { data: messages };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to fetch messages"] } };
  }
}

export async function updateMessageAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = {
    messageId: str(formData, "messageId"),
    subject: str(formData, "subject"),
    sentAt: formData.get("sentAt") || undefined,
    readAt: formData.get("readAt") || undefined,
  };

  const result = updateMessageSchema.safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await updateMessage(id, result.data.messageId, result.data);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to update message"] } };
  }
}

export async function deleteMessageAction(id: string, messageId: string) {
  await connectToDatabase();
  try {
    const updated = await deleteMessage(id, messageId);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to delete message"] } };
  }
}

export async function markMessagesReadAction(id: string) {
  await connectToDatabase();
  try {
    const updated = await markMessagesRead(id);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to mark messages read"] } };
  }
}

export async function markMessageReadAction(id: string, messageId: string) {
  await connectToDatabase();
  try {
    const updated = await markMessageRead(id, messageId);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to mark message read"] } };
  }
}

// ================= SECURITY QUESTIONS =================

export async function addSecurityQuestionAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = {
    question: str(formData, "question"),
    answer: str(formData, "answer"),
  };

  const result = securityQuestionSchema.safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await addSecurityQuestion(id, result.data.question, result.data.answer);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to add security question"] } };
  }
}

export async function updateSecurityQuestionAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = {
    questionId: str(formData, "questionId"),
    newAnswer: str(formData, "newAnswer"),
  };

  const result = z.object({
    questionId: z.string().trim().min(1, "Question ID is required"),
    newAnswer: z.string().trim().min(2, "Answer is required"),
  }).safeParse(parsed);

  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await updateSecurityQuestion(id, result.data.questionId, result.data.newAnswer);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to update security question"] } };
  }
}

export async function deleteSecurityQuestionAction(id: string, questionId: string) {
  await connectToDatabase();
  try {
    const updated = await deleteSecurityQuestion(id, questionId);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to delete security question"] } };
  }
}

export async function fetchSecurityQuestionsAction(id: string) {
  await connectToDatabase();
  try {
    const questions = await getSecurityQuestions(id);
    return { data: questions.map((q: any) => ({ _id: q._id.toString(), question: q.question })) };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to fetch security questions"] } };
  }
}

export async function verifySecurityAnswerAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = {
    questionId: str(formData, "questionId"),
    answer: str(formData, "answer"),
  };

  const result = z.object({
    questionId: z.string().trim().min(1, "Question ID is required"),
    answer: z.string().trim().min(2, "Answer is required"),
  }).safeParse(parsed);

  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const isValid = await verifySecurityAnswer(id, result.data.questionId, result.data.answer);
    return { data: isValid };
  } catch (error: any) {
    return { error: { message: [error?.message || "Failed to verify security answer"] } };
  }
}
