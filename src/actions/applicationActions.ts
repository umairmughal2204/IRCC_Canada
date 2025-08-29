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
} from "@/functions/applicationFuntions";

// ✅ Zod Validation Schema
const biometricsSchema = z.object({
  number: z.string().trim().min(1, "Biometrics number is required"),
  enrolmentDate: z.coerce.date(),
  expiryDate: z.coerce.date(),
  status: z.string().optional(),
});

const applicationSchema = z.object({
  userName: z.string().trim().min(2, "Username is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  applicationType: z.string().trim().min(2, "Application type is required"),
  applicationNumber: z.string().trim().min(2, "Application number is required"),
  applicantName: z.string().trim().min(2, "Applicant name is required"),
  dateOfSubmission: z.coerce.date(),
  status: z.string().optional(),
  uniqueClientIdentifier: z.string().trim().min(2, "UCI is required"),
  biometrics: biometricsSchema,
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

export type ApplicationFormState = {
  error?: Record<string, string[]> | { message?: string[] };
  data?: any;
};

// ✅ Helper: Parse FormData (aligned with your form field names)
function parseApplicationFormData(formData: FormData): Record<string, any> {
  return {
    userName: formData.get("userName") || "",
    password: formData.get("password") || "",
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

// ✅ CREATE APPLICATION
export async function createApplicationAction(
  prevState: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();

  const parsed = parseApplicationFormData(formData);
  const result = applicationSchema.safeParse(parsed);

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  try {
    const application = await createApplication(result.data);
    return { data: application };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to create application"] } };
  }
}

// ✅ UPDATE APPLICATION
export async function updateApplicationAction(
  prevState: ApplicationFormState,
  id: string,
  formData: FormData
): Promise<ApplicationFormState> {
  await connectToDatabase();

  const parsed = parseApplicationFormData(formData);
  const result = applicationSchema.safeParse(parsed);

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  try {
    const updated = await updateApplication(id, result.data);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to update application"] } };
  }
}

// ✅ DELETE APPLICATION
export async function deleteApplicationAction(id: string) {
  await connectToDatabase();

  try {
    const deleted = await deleteApplication(id);
    return { data: deleted };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to delete application"] } };
  }
}

// ✅ FETCH ALL APPLICATIONS
export async function fetchAllApplicationsAction() {
  await connectToDatabase();

  try {
    const applications = await getAllApplications();
    return { data: applications };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to fetch applications"] } };
  }
}

// ✅ FETCH SINGLE APPLICATION
export async function fetchApplicationByIdAction(id: string) {
  await connectToDatabase();

  try {
    const application = await getApplicationById(id);
    if (!application) {
      return { error: { message: ["Application not found"] } };
    }
    return { data: application };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to fetch application"] } };
  }
}

// ✅ ADD MESSAGE TO APPLICATION
export async function addMessageAction(
  id: string,
  message: { content: string }
) {
  await connectToDatabase();

  try {
    const updated = await addMessageToApplication(id, message);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to add message"] } };
  }
}

// ✅ MARK ALL MESSAGES READ
export async function markMessagesReadAction(id: string) {
  await connectToDatabase();

  try {
    const updated = await markMessagesRead(id);
    return { data: updated };
  } catch (error: any) {
    return { error: { message: [error.message || "Failed to mark messages read"] } };
  }
}
