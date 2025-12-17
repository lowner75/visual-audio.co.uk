// src/modules/messages/messages.model.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  firstName: string;
  lastName: string;
  telephone: number;
  email: string;
  message: string;
  source?: string;
  ip_address?: string;
  user_agent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const MessageSchema: Schema = new Schema<IMessage>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    telephone: { type: Number, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    source: { type: String },
    ip_address: { type: String },
    user_agent: { type: String },
  },
  { timestamps: true } // this adds createdAt and updatedAt automatically
);

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);