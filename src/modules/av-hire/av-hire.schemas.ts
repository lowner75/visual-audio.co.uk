// src/modules/av-hire/av-hire.schemas.ts

export const productParams = {
  type: 'object',
  properties: {
    slug: { type: 'string' },
  },
  required: ['slug'],
};

export const categoryParams = {
  type: 'object',
  properties: {
    category: { type: 'string' },
  },
  required: ['category'],
};

export const subCategoryParams = {
  type: 'object',
  properties: {
    category: { type: 'string' },
    subCategory: { type: 'string' },
  },
  required: ['category', 'subCategory'],
};

export const brandParams = {
  type: 'object',
  properties: {
    brand: { type: 'string' },
  },
  required: ['brand'],
};