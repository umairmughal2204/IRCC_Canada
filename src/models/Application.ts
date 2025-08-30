"use server";
import mongoose, { Schema, Document, Model, Types } from "mongoose";

// Application Status Enum
export enum ApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  InReview = "InReview",
}

// Biometrics Status Enum
export enum BiometricsStatus {
  Completed = "Completed",
  NotCompleted = "NotCompleted",
  Expired = "Expired",
}

// Interface for Application document
export interface IApplication extends Document {
  _id: Types.ObjectId;
  userName: string;
  password: string;
  email: string;
  applicationType: string;
  applicationNumber: string;
  applicantName: string;
  dateOfSubmission: Date;
  status: ApplicationStatus;

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
    status: BiometricsStatus;
  };

  // 🔑 OTP-related fields
  otpCode?: string;
  otpExpires?: Date;

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
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
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
      enum: Object.values(ApplicationStatus),
      default: ApplicationStatus.Pending,
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
      status: {
        type: String,
        enum: Object.values(BiometricsStatus),
        default: BiometricsStatus.NotCompleted,
      },
    },

    // 🔑 OTP fields
    otpCode: {
      type: String,
      select: false, // hidden unless explicitly requested
    },
    otpExpires: {
      type: Date,
      select: false,
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
