// src/modules/av-hire/av-hire.routes.ts

import { FastifyInstance } from "fastify";
import * as schemas from './av-hire.schemas';
import * as avHireController from './av-hire.controller';

export async function avHireRoutes(fastify: FastifyInstance) {

  fastify.get('/beta/av-hire', avHireController.getAvHireLandingPage);

  // Products (canonical product page)
  fastify.get('/beta/av-hire/products/:slug', {
    schema: {
      params: schemas.productParams,
    },
    handler: avHireController.getProductPage,
  });

  // Brands
  fastify.get('/beta/av-hire/brands/:brand', {
    schema: {
      params: schemas.brandParams,
    },
    handler: avHireController.getBrandPage,
  });

  // Sub-categories
  fastify.get('/beta/av-hire/:category/:subCategory', {
    schema: {
      params: schemas.subCategoryParams,
    },  
    handler: avHireController.getSubCategoryPage,
  });  
  
  // Categories
  fastify.get('/beta/av-hire/:category', {
    schema: {
      params: schemas.categoryParams,
    },  
    handler: avHireController.getCategoryPage,
  });  

}