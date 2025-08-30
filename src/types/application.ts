// src/types/application.ts
export enum ApplicationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  InReview = "InReview",
}

export enum BiometricsStatus {
  Completed = "Completed",
  NotCompleted = "NotCompleted",
  Expired = "Expired",
}
