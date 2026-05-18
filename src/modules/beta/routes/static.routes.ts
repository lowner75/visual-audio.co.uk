// src/modules/beta/routes/static.routes.ts

import { FastifyInstance } from "fastify";
import { staticController } from "../controllers/static.controller";

export async function staticRoutes(fastify: FastifyInstance) {

  // Static Pages
  fastify.get("/beta", staticController.renderLandingPage);
  fastify.get("/beta/work", staticController.renderWorkPage);
  fastify.get("/beta/contact", staticController.renderContactPage);

}