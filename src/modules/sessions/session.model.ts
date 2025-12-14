// src/modules/sessions/session.model.ts

import mongoose, { Schema, Model } from "mongoose";

// Session interface
export interface ISession {
  _id: string;
  uid: string;
  role: "user" | "admin";
  createdAt: Date;
  expiresAt: Date;
  user?: {
    name?: string;
    email?: string;
    isAdmin?: number;
  };
}

// Session schema
const SessionSchema: Schema<ISession> = new Schema<ISession>({
  _id: { type: String, required: true }, // UUID sessionId
  uid: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true }
});

// TTL index: Mongo deletes expired docs automatically
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Session model
export const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);