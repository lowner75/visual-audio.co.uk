// src/modules/products/product.model.ts

import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for a product specification
export interface ISpecification {
  name: string;
  value: string;
  category?: string;
}

// Interface for a product document
export interface IProduct extends Document {
  id: string;
  name: string;
  description: string;
  price?: number[];
  specifications: ISpecification[];
  category: string;
  subCategory?: string;
  supplier: string;
}

// Specification sub-schema
const SpecificationSchema: Schema<ISpecification> = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
    category: { type: String }
  },
  { _id: false } // Optional: prevents auto-generating _id for subdocs
);

// Product schema
const ProductSchema: Schema<IProduct> = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: [{ type: Number }],
  specifications: [SpecificationSchema],
  category: { type: String, required: true },
  subCategory: { type: String },
  supplier: { type: String, required: true }
});

// Model
const ProductModel: Model<IProduct> = mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;