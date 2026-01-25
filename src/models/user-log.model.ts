// src/models/user-log.model.ts

import mongoose, { Document, Schema, Model } from "mongoose";

// Internal enum for logging
export enum UserLogInternal {
  SUCCESS = "Success: Email address and password match.",
  ERROR_USER_NOT_FOUND = "Error: User not found.",
  ERROR_INACTIVE_ACCOUNT = "Error: Account is inactive.",
  ERROR_INCORRECT_PASSWORD = "Error: Incorrect password.",
  ERROR_GENERIC = "Error: Incorrect username or password."
}

// Exposed enum for external use
export enum UserLogExternal {
  SUCCESS = "Success: Email address and password match.",
  ERROR_GENERIC = "Error: Incorrect username or password."
}

// Interface for UserLog document
export interface IUserLog extends Document {
  userID?: string;
  emailAddress: string;
  timeStamp: Date;
  result: UserLogInternal; // store detailed internal enum
  ip?: string;
  userAgent?: string;
}

// Schema definition
const UserLogSchema: Schema<IUserLog> = new Schema(
  {
    userID: { type: String },
    emailAddress: { type: String, required: true },
    timeStamp: { type: Date, required: true },
    result: { 
      type: String, 
      required: true, 
      enum: Object.values(UserLogInternal) // only allow internal enum values
    },
    ip: { type: String },
    userAgent: { type: String },
  }
);

// Export model
export const UserLogModel: Model<IUserLog> = mongoose.model<IUserLog>("user_logs", UserLogSchema);