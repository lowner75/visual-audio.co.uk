// src/modules/av-hire/av-hire.service.ts

import { CategoryModel } from "../../models/category.model";
import { SubCategoryModel } from "../../models/sub-category.model";
import { BrandModel } from "../../models/brand.model";
import { ProductModel } from "../../models/product.model";

// Landing page data
export async function getAvHireLandingPageData() {
  const [ categories, subCategories, brands, products ] = await Promise.all([
    CategoryModel.find({ isActive: true }).lean(),
    SubCategoryModel.find({ isActive: true }).lean(),
    BrandModel.find({ isActive: true }).lean(),
    ProductModel.find({ isActive: true }).limit(12).lean(),
  ]);

  return {
    categories,
    subCategories,
    brands,
    products,
  };
}

// Category page data
export async function getCategoryPageData(category: string) {
  return {
    products: await ProductModel.find({ category, isActive: true }).lean(),
  };
}

// Sub-category page data
export async function getSubCategoryPageData(
  category: string,
  subCategory: string
) {
  return {
    products: await ProductModel.find({
      category,
      subCategory,
      isActive: true,
    }).lean(),
  };
}

// Brand page data
export async function getBrandPageData(brandSlug: string) {
  const brand = await BrandModel.findOne({
    slug: brandSlug,
    isActive: true
  }).lean();

  if (!brand) {
    return {
      brand: null,
      products: []
    };
  }

  const products = await ProductModel.find({
      supplier: brand.name,
      isActive: true,
    }).lean();

  return {
    brand,
    products,
  };
}

// Product page data
export async function getProductPageData(slug: string) {
  return {
    product: await ProductModel.findOne({ slug, isActive: true }).lean(),
  };
}
