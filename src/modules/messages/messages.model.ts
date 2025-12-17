// src/modules/messages/messages.model.ts

import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  message: string;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    telephone: { type: String, required: true }, // supports +44, etc.
    message: { type: String, required: true },
    source: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export const MessageModel = model<IMessage>('Message', MessageSchema);