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
  markMessagesRead,
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
});

const messageSchema = z.object({
  content: z.string().trim().min(1, "Message cannot be empty"),
});

const securityQuestionSchema = z.object({
  question: z.string().trim().min(5, "Question must be at least 5 characters"),
  answer: z.string().trim().min(2, "Answer is required"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;
type MessageData = z.infer<typeof messageSchema>;
type SecurityQuestionData = z.infer<typeof securityQuestionSchema>;

export type ApplicationFormState = {
  error?: Record<string, string[]> | { message?: string[] };
  data?: any;
};

// ================= UTILITY: Serialize MongoDB Objects =================

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

// ================= HELPER: Parse FormData =================

function parseApplicationFormData(formData: FormData): Record<string, any> {
  return {
    userName: formData.get("userName") || "",
    password: formData.get("password") || "",
    email: formData.get("email") || "",
    applicationType: formData.get("applicationType") || "",
    applicationNumber: formData.get("applicationNumber") || "",
    applicantName: formData.get("applicantName") || "",
    dateOfSubmission: formData.get("dateOfSubmission") || "",
    status: formData.get("status") || "",
    uniqueClientIdentifier: formData.get("uci") || "",
    biometrics: {
      number: formData.get("biometricsNumber") || "",
      enrolmentDate: formData.get("dateOfBiometrics") || "",
      expiryDate: formData.get("expiryDate") || "",
      status: formData.get("biometricStatus") || "",
    },
  };
}

// ================= APPLICATION CRUD ACTIONS =================

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
    return { data: serializeMongoDoc(application) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to create application"] } };
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
    return { data: serializeMongoDoc(updated) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to update application"] } };
  }
}

export async function deleteApplicationAction(id: string) {
  await connectToDatabase();
  try {
    const deleted = await deleteApplication(id);
    return { data: serializeMongoDoc(deleted) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to delete application"] } };
  }
}

export async function fetchAllApplicationsAction() {
  await connectToDatabase();
  try {
    const applications = await getAllApplications();
    return { data: serializeMongoDoc(applications) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to fetch applications"] } };
  }
}

export async function fetchApplicationByIdAction(id: string) {
  await connectToDatabase();
  try {
    const application = await getApplicationById(id);
    if (!application) return { error: { message: ["Application not found"] } };
    return { data: serializeMongoDoc(application) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to fetch application"] } };
  }
}

// ================= MESSAGES ACTIONS =================

export async function addMessageAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = { content: formData.get("content") || "" };
  const result = messageSchema.safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await addMessageToApplication(id, result.data);
    return { data: serializeMongoDoc(updated) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to add message"] } };
  }
}

export async function markMessagesReadAction(id: string) {
  await connectToDatabase();
  try {
    const updated = await markMessagesRead(id);
    return { data: serializeMongoDoc(updated) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to mark messages read"] } };
  }
}

// ================= SECURITY QUESTIONS ACTIONS =================

export async function addSecurityQuestionAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = { question: formData.get("question") || "", answer: formData.get("answer") || "" };
  const result = securityQuestionSchema.safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await addSecurityQuestion(id, result.data.question, result.data.answer);
    return { data: serializeMongoDoc(updated) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to add security question"] } };
  }
}

export async function updateSecurityQuestionAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = {
    questionId: formData.get("questionId") || "",
    newAnswer: formData.get("newAnswer") || "",
  };

  const result = z
    .object({
      questionId: z.string().trim().min(1, "Question ID is required"),
      newAnswer: z.string().trim().min(2, "Answer is required"),
    })
    .safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const updated = await updateSecurityQuestion(id, result.data.questionId, result.data.newAnswer);
    return { data: serializeMongoDoc(updated) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to update security question"] } };
  }
}

export async function deleteSecurityQuestionAction(id: string, questionId: string) {
  await connectToDatabase();
  try {
    const updated = await deleteSecurityQuestion(id, questionId);
    return { data: serializeMongoDoc(updated) };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to delete security question"] } };
  }
}

export async function fetchSecurityQuestionsAction(id: string) {
  await connectToDatabase();
  try {
    const questions = await getSecurityQuestions(id);

    // convert _id to string explicitly
    const serializedQuestions = questions.map((q: any) => ({
      _id: q._id.toString(),
      question: q.question,
    }));

    return { data: serializedQuestions };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to fetch security questions"] } };
  }
}

export async function verifySecurityAnswerAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();
  const parsed = { questionId: formData.get("questionId") || "", answer: formData.get("answer") || "" };
  const result = z
    .object({
      questionId: z.string().trim().min(1, "Question ID is required"),
      answer: z.string().trim().min(2, "Answer is required"),
    })
    .safeParse(parsed);
  if (!result.success) return { error: result.error.flatten().fieldErrors };

  try {
    const isValid = await verifySecurityAnswer(id, result.data.questionId, result.data.answer);
    return { data: isValid };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to verify security answer"] } };
  }
}
