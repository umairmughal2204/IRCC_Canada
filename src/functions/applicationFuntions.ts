import { Application } from "@/model/Application";

/**
 * Sanitize and format incoming application data.
 */
const sanitizeApplicationData = (data: {
  userName: string;
  password: string;
  applicationType: string;
  applicationNumber: string;
  applicantName: string;
  dateOfSubmission: Date;
  status?: string;
  uniqueClientIdentifier: string;
  biometrics: {
    number: string;
    enrolmentDate: Date;
    expiryDate: Date;
    status?: string;
  };
}) => ({
  userName: data.userName.trim(),
  password: data.password, // ⚠️ should be hashed before save (if used in production)
  applicationType: data.applicationType.trim(),
  applicationNumber: data.applicationNumber.trim(),
  applicantName: data.applicantName.trim(),
  dateOfSubmission: data.dateOfSubmission,
  status: data.status || "Pending",
  uniqueClientIdentifier: data.uniqueClientIdentifier.trim(),
  biometrics: {
    number: data.biometrics.number.trim(),
    enrolmentDate: data.biometrics.enrolmentDate,
    expiryDate: data.biometrics.expiryDate,
    status: data.biometrics.status || "Valid",
  },
});

/**
 * Convert Application document to plain object.
 */
const serializeApplication = (application: any) => ({
  _id: application._id.toString(),
  userName: application.userName,
  applicationType: application.applicationType,
  applicationNumber: application.applicationNumber,
  applicantName: application.applicantName,
  dateOfSubmission: application.dateOfSubmission?.toISOString?.(),
  status: application.status,
  uniqueClientIdentifier: application.uniqueClientIdentifier,
  biometrics: application.biometrics,
  messages: application.messages?.map((msg: any) => ({
    content: msg.content,
    sentAt: msg.sentAt?.toISOString?.(),
    isRead: msg.isRead,
  })),
  createdAt: application.createdAt?.toISOString?.(),
  updatedAt: application.updatedAt?.toISOString?.(),
});

/**
 * Create a new application
 */
export const createApplication = async (data: {
  userName: string;
  password: string;
  applicationType: string;
  applicationNumber: string;
  applicantName: string;
  dateOfSubmission: Date;
  status?: string;
  uniqueClientIdentifier: string;
  biometrics: {
    number: string;
    enrolmentDate: Date;
    expiryDate: Date;
    status?: string;
  };
}) => {
  const appData = sanitizeApplicationData(data);
  const application = await new Application(appData).save();
  return serializeApplication(application);
};

/**
 * Get all applications
 */
export const getAllApplications = async () => {
  const applications = await Application.find().sort({ createdAt: -1 }).lean();
  return applications.map(serializeApplication);
};

/**
 * Get application by ID
 */
export const getApplicationById = async (id: string) => {
  const application = await Application.findById(id).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * Update application by ID
 */
export const updateApplication = async (
  id: string,
  data: {
    userName: string;
    password: string;
    applicationType: string;
    applicationNumber: string;
    applicantName: string;
    dateOfSubmission: Date;
    status?: string;
    uniqueClientIdentifier: string;
    biometrics: {
      number: string;
      enrolmentDate: Date;
      expiryDate: Date;
      status?: string;
    };
  }
) => {
  const updatedData = sanitizeApplicationData(data);
  const application = await Application.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true, runValidators: true }
  ).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * Delete application by ID
 */
export const deleteApplication = async (id: string) => {
  const application = await Application.findByIdAndDelete(id).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * Add a message to an application
 */
export const addMessageToApplication = async (
  id: string,
  message: { content: string }
) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { $push: { messages: { content: message.content, sentAt: new Date() } } },
    { new: true }
  ).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * Mark all messages as read
 */
export const markMessagesRead = async (id: string) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { $set: { "messages.$[].isRead": true } },
    { new: true }
  ).lean();
  return application ? serializeApplication(application) : null;
};
