// src/models/sub-category.model.ts

import mongoose, { Schema, Model } from "mongoose";

// Sub-category interface
export interface ISubCategory {
  _id: string;
  name: string;           // e.g., "Astera Tubes"
  category: "lighting" | "sound" | "effects"; // must match AVHireCategory
  slug: string;           // SEO-friendly
  shortDescription: string; // for landing page cards
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Sub-category schema
const SubCategorySchema: Schema<ISubCategory> = new Schema<ISubCategory>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, enum: ["lighting", "sound", "effects"], required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
},
  { timestamps: true }
);

// Sub-category model
export const SubCategoryModel: Model<ISubCategory> =
  mongoose.models.SubCategory || mongoose.model<ISubCategory>("sub_categories", SubCategorySchema);