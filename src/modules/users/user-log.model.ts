// src/modules/users/user-log.model.ts

import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for a user log
export interface IUserLog extends Document {
  userId?: number;
  email: string;
  timeStamp: Date;
  result: string;
  ip?: string;
  userAgent?: string;
}

// UserLog schema
const UserLogSchema: Schema<IUserLog> = new Schema({
  userId: { type: Number },
  email: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  result: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
});

// Model
const UserLogModel: Model<IUserLog> = mongoose.model<IUserLog>("UserLog", UserLogSchema);

export default UserLogModel;