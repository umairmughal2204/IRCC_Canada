import { Application, ApplicationStatus, BiometricsStatus } from "@/models/Application";

/**
 * Sanitize and format incoming application data.
 */
const sanitizeApplicationData = (data: {
  userName: string;
  password: string;
  email: string;
  applicationType: string;
  applicationNumber: string;
  applicantName: string;
  dateOfSubmission: Date;
  status?: ApplicationStatus;
  uniqueClientIdentifier: string;
  biometrics: {
    number: string;
    enrolmentDate: Date;
    expiryDate: Date;
    status?: BiometricsStatus;
  };
}) => ({
  userName: data.userName.trim(),
  password: data.password, // ⚠️ should be hashed before save
  email: data.email.toLowerCase().trim(),
  applicationType: data.applicationType.trim(),
  applicationNumber: data.applicationNumber.trim(),
  applicantName: data.applicantName.trim(),
  dateOfSubmission: data.dateOfSubmission,
  status: data.status || ApplicationStatus.Pending,
  uniqueClientIdentifier: data.uniqueClientIdentifier.trim(),
  biometrics: {
    number: data.biometrics.number.trim(),
    enrolmentDate: data.biometrics.enrolmentDate,
    expiryDate: data.biometrics.expiryDate,
    status: data.biometrics.status || BiometricsStatus.NotCompleted,
  },
});

/**
 * Convert Application document to plain object.
 */
const serializeApplication = (application: any) => ({
  _id: application._id.toString(),
  userName: application.userName,
  email: application.email,
  applicationType: application.applicationType,
  applicationNumber: application.applicationNumber,
  applicantName: application.applicantName,
  dateOfSubmission: application.dateOfSubmission?.toISOString?.(),
  status: application.status,
  uniqueClientIdentifier: application.uniqueClientIdentifier,
  biometrics: {
    ...application.biometrics,
    enrolmentDate: application.biometrics?.enrolmentDate?.toISOString?.(),
    expiryDate: application.biometrics?.expiryDate?.toISOString?.(),
  },
  messages: application.messages?.map((msg: any) => ({
    content: msg.content,
    sentAt: msg.sentAt?.toISOString?.(),
    isRead: msg.isRead,
  })),
  securityQuestions: application.securityQuestions?.map((q: any) => ({
    _id: q._id?.toString(),
    question: q.question,
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
  email: string;
  applicationType: string;
  applicationNumber: string;
  applicantName: string;
  dateOfSubmission: Date;
  status?: ApplicationStatus;
  uniqueClientIdentifier: string;
  biometrics: {
    number: string;
    enrolmentDate: Date;
    expiryDate: Date;
    status?: BiometricsStatus;
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
    email: string;
    applicationType: string;
    applicationNumber: string;
    applicantName: string;
    dateOfSubmission: Date;
    status?: ApplicationStatus;
    uniqueClientIdentifier: string;
    biometrics: {
      number: string;
      enrolmentDate: Date;
      expiryDate: Date;
      status?: BiometricsStatus;
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

/**
 * ================= SECURITY QUESTIONS =================
 */

/**
 * Add a new security question
 */
export const addSecurityQuestion = async (
  id: string,
  question: string,
  answer: string
) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { $push: { securityQuestions: { question, answer } } },
    { new: true, runValidators: true }
  ).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * Update a security question's answer
 */
export const updateSecurityQuestion = async (
  id: string,
  questionId: string,
  newAnswer: string
) => {
  const application = await Application.findOneAndUpdate(
    { _id: id, "securityQuestions._id": questionId },
    { $set: { "securityQuestions.$.answer": newAnswer } },
    { new: true }
  ).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * Delete a security question
 */
export const deleteSecurityQuestion = async (
  id: string,
  questionId: string
) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { $pull: { securityQuestions: { _id: questionId } } },
    { new: true }
  ).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * Get security questions (without answers)
 */
export const getSecurityQuestions = async (id: string) => {
  const application = await Application.findById(id)
    .select("securityQuestions.question securityQuestions._id")
    .lean();
  return application ? application.securityQuestions : [];
};

/**
 * Verify a security question answer
 */
export const verifySecurityAnswer = async (
  id: string,
  questionId: string,
  answer: string
) => {
  const application = await Application.findOne({
    _id: id,
    "securityQuestions._id": questionId,
  })
    .select("securityQuestions.$")
    .lean();

  if (!application || !application.securityQuestions?.length) return false;
  return application.securityQuestions[0].answer === answer;
};
