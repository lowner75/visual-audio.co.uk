// src/modules/users/user.model.ts

import mongoose, { Schema, Model } from "mongoose";
import argon2 from "argon2";

// -----------------------------
// TypeScript interface
// -----------------------------

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;

  passwordHash: string;

  telephone?: string;
  company?: string;

  address1?: string;
  address2?: string;
  address3?: string;
  town?: string;
  postcode?: string;

  isActive: boolean;
  isAdmin: boolean;

  lastVisited?: Date;
  failedLoginAttempts?: number;

  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  createdAt?: Date;
  updatedAt?: Date;

  // Methods ...
  setPassword(password: string): Promise<void>;
  verifyPassword(password: string): Promise<boolean>;
}

// -----------------------------
// Mongoose schema
// -----------------------------

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    passwordHash: { type: String, required: true },

    telephone: String,
    company: String,

    address1: String,
    address2: String,
    address3: String,
    town: String,
    postcode: String,

    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },

    lastVisited: Date,
    failedLoginAttempts: { type: Number, default: 0 },

    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true
  }
);

// -----------------------------
// Schema password methods
// -----------------------------

UserSchema.methods.setPassword = async function (password: string) {
  this.passwordHash = await argon2.hash(password);
};

UserSchema.methods.verifyPassword = async function (password: string) {
  return argon2.verify(this.passwordHash, password);
};

// -----------------------------
// Export Mongoose model
// -----------------------------

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);