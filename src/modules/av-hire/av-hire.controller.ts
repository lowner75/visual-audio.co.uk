// src/modules/av-hire/av-hire.controller.ts

import { FastifyRequest, FastifyReply } from 'fastify';
import * as avHireService from './av-hire.service';

// Landing page
export async function getAvHireLandingPage(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const {
    categories,
    subCategories,
    brands,
    products,
  } = await avHireService.getAvHireLandingPageData();

  return reply.view("av-hire/index", {
    categories,
    subCategories,
    brands,
    products,
  });
}

// Category page
export async function getCategoryPage(
  request: FastifyRequest<{ Params: { category: string } }>,
  reply: FastifyReply
) {
  const { category } = request.params;
  const products = await avHireService.getCategoryPageData(category);

  return reply.view('av-hire/category', {
    category,
    products,
  });
}

// Sub-category page
export async function getSubCategoryPage(
  request: FastifyRequest<{ Params: { category: string; subCategory: string } }>,
  reply: FastifyReply
) {
  const {
    category,
    subCategory
  } = request.params;


  const products = await avHireService.getSubCategoryPageData(category, subCategory);
  return reply.view('av-hire/sub-category', {
    category,
    subCategory,
    products
  });
}

// Brand page
export async function getBrandPage(
  request: FastifyRequest<{ Params: { brand: string } }>,
  reply: FastifyReply
) {
  const { brand: brandSlug } = request.params;
  const { brand: brandData, products } = await avHireService.getBrandPageData(brandSlug);

  return reply.view('av-hire/brand', {
    brand: brandData,
    products
  });
}

// Product page
export async function getProductPage(
  request: FastifyRequest<{ Params: { slug: string } }>,
  reply: FastifyReply
) {
  const { slug } = request.params;
  const product = await avHireService.getProductPageData(slug);
  return reply.view('av-hire/product', {
    product
  });
}
