// src/models/category.model.ts

import mongoose, { Schema, Model } from "mongoose";

export interface ICategory {
  _id: string;
  name: string;               // "Lighting"
  slug: string;               // "lighting"
  shortDescription: string; // for landing page cards
  description: string;       // short intro
  seoTitle?: string;
  seoDescription?: string;
  isActive: boolean;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  seoTitle: { type: String },
  seoDescription: { type: String },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export const CategoryModel: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("categories", CategorySchema);