import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Application document
export interface IApplication extends Document {
  userName: string;
  password: string;
  applicationType: string;
  applicationNumber: string;
  applicantName: string; // or Principal Applicant
  dateOfSubmission: Date;
  status: string;

  messages: {
    content: string;
    sentAt: Date;
    isRead: boolean;
  }[];

  uniqueClientIdentifier: string;

  biometrics: {
    number: string;
    enrolmentDate: Date;
    expiryDate: Date;
    status: string;
  };

  createdAt: Date;
  updatedAt: Date;
}

// Define the Application schema
const applicationSchema = new Schema<IApplication>(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    applicationType: {
      type: String,
      required: [true, "Application type is required"],
      trim: true,
    },
    applicationNumber: {
      type: String,
      required: [true, "Application number is required"],
      unique: true,
    },
    applicantName: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true,
    },
    dateOfSubmission: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    messages: [
      {
        content: { type: String, required: true },
        sentAt: { type: Date, default: Date.now },
        isRead: { type: Boolean, default: false },
      },
    ],
    uniqueClientIdentifier: {
      type: String,
      required: true,
      trim: true,
    },
    biometrics: {
      number: { type: String, required: true },
      enrolmentDate: { type: Date, required: true },
      expiryDate: { type: Date, required: true },
      status: { type: String, default: "Valid" },
    },
  },
  {
    timestamps: true,
  }
);

// Export model
export const Application: Model<IApplication> =
  mongoose.models.Application ||
  mongoose.model<IApplication>("Application", applicationSchema);
