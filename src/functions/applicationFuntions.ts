import { Application, ApplicationStatus, BiometricsStatus } from "@/models/Application";

/**
 * ================= SANITIZER =================
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

  // ✅ New fields
  reviewOfEligibility?: string;
  medical?: string;
  documents?: string;
  interview?: string;
  biometricsStatusText?: string;
  backgroundCheck?: string;
  finalDecision?: string;
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

  // ✅ New fields
  reviewOfEligibility: data.reviewOfEligibility?.trim() || "",
  medical: data.medical?.trim() || "",
  documents: data.documents?.trim() || "",
  interview: data.interview?.trim() || "",
  biometricsStatusText: data.biometricsStatusText?.trim() || "",
  backgroundCheck: data.backgroundCheck?.trim() || "",
  finalDecision: data.finalDecision?.trim() || "",
});

/**
 * ================= SERIALIZER =================
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

  // ✅ New fields
  reviewOfEligibility: application.reviewOfEligibility,
  medical: application.medical,
  documents: application.documents,
  interview: application.interview,
  biometricsStatusText: application.biometricsStatusText,
  backgroundCheck: application.backgroundCheck,
  finalDecision: application.finalDecision,

  // ✅ Updated messages
  messages: application.messages?.map((msg: any) => ({
    _id: msg._id?.toString(),
    content: msg.content,
    sentAt: msg.sentAt?.toISOString?.(),
    readAt: msg.readAt ? msg.readAt.toISOString() : null,
  })),

  // ✅ Security questions (answers hidden)
  securityQuestions: application.securityQuestions?.map((q: any) => ({
    _id: q._id?.toString(),
    question: q.question,
  })),

  createdAt: application.createdAt?.toISOString?.(),
  updatedAt: application.updatedAt?.toISOString?.(),
});

/**
 * ================= APPLICATION CRUD =================
 */
export const createApplication = async (data: any) => {
  const appData = sanitizeApplicationData(data);
  const application = await new Application(appData).save();
  return serializeApplication(application);
};

export const getAllApplications = async () => {
  const applications = await Application.find().sort({ createdAt: -1 }).lean();
  return applications.map(serializeApplication);
};

export const getApplicationById = async (id: string) => {
  const application = await Application.findById(id).lean();
  return application ? serializeApplication(application) : null;
};

export const updateApplication = async (id: string, data: any) => {
  const updatedData = sanitizeApplicationData(data);
  const application = await Application.findByIdAndUpdate(
    id,
    { $set: updatedData },
    { new: true, runValidators: true }
  ).lean();
  return application ? serializeApplication(application) : null;
};

export const deleteApplication = async (id: string) => {
  const application = await Application.findByIdAndDelete(id).lean();
  return application ? serializeApplication(application) : null;
};

/**
 * ================= MESSAGES =================
 */

/**
 * Add a new message
 */
export const addMessageToApplication = async (
  id: string,
  message: { content: string; sentAt?: Date; readAt?: Date | null }
) => {
  const application = await Application.findByIdAndUpdate(
    id,
    {
      $push: {
        messages: {
          content: message.content,
          sentAt: message.sentAt ?? new Date(),
          readAt: message.readAt ?? null,
        },
      },
    },
    { new: true, runValidators: true }
  ).lean();

  return application ? serializeApplication(application) : null;
};

/**
 * Get all messages for an application
 */
export const getMessages = async (id: string) => {
  const application = await Application.findById(id)
    .select("messages")
    .lean();

  return application
    ? application.messages?.map((msg: any) => ({
        _id: msg._id?.toString(),
        content: msg.content,
        sentAt: msg.sentAt?.toISOString?.(),
        readAt: msg.readAt ? msg.readAt.toISOString?.() : null,
      }))
    : [];
};

/**
 * Update a message (content, sentAt, readAt)
 */
export const updateMessage = async (
  id: string,
  messageId: string,
  updateData: { content?: string; sentAt?: Date; readAt?: Date | null }
) => {
  const updateFields: any = {};

  if (updateData.content !== undefined) updateFields["messages.$.content"] = updateData.content;
  if (updateData.sentAt !== undefined) updateFields["messages.$.sentAt"] = updateData.sentAt;
  if (updateData.readAt !== undefined) updateFields["messages.$.readAt"] = updateData.readAt;

  const application = await Application.findOneAndUpdate(
    { _id: id, "messages._id": messageId },
    { $set: updateFields },
    { new: true, runValidators: true }
  ).lean();

  return application ? serializeApplication(application) : null;
};

/**
 * Mark all messages as read (force set readAt = now)
 */
export const markMessagesRead = async (id: string) => {
  const application = await Application.findByIdAndUpdate(
    id,
    {
      $set: {
        "messages.$[].readAt": new Date(),
      },
    },
    { new: true }
  ).lean();

  return application ? serializeApplication(application) : null;
};

/**
 * Mark a single message as read (force set readAt = now)
 */
export const markMessageRead = async (id: string, messageId: string) => {
  const application = await Application.findOneAndUpdate(
    { _id: id, "messages._id": messageId },
    {
      $set: {
        "messages.$.readAt": new Date(),
      },
    },
    { new: true }
  ).lean();

  return application ? serializeApplication(application) : null;
};

/**
 * Delete a message
 */
export const deleteMessage = async (id: string, messageId: string) => {
  const application = await Application.findByIdAndUpdate(
    id,
    { $pull: { messages: { _id: messageId } } },
    { new: true }
  ).lean();

  return application ? serializeApplication(application) : null;
};


/**
 * ================= SECURITY QUESTIONS CRUD =================
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

export const getSecurityQuestions = async (id: string) => {
  const application = await Application.findById(id)
    .select("securityQuestions.question securityQuestions._id")
    .lean();
  return application ? application.securityQuestions : [];
};

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
