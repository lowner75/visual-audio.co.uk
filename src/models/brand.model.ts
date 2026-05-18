// src/modules/av-hire/brand.model.ts

import mongoose, { Schema, Model } from "mongoose";

// Brand interface
export interface IBrand {
  _id: string;
  name: string;        // e.g., "LG"
  slug: string;        // SEO-friendly
  logoUrl?: string;    // optional
  shortDescription: string; // for landing page cards
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Brand schema
const BrandSchema: Schema<IBrand> = new Schema<IBrand>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true }
},
  { timestamps: true }
);

// Brand model
export const BrandModel: Model<IBrand> =
  mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema);