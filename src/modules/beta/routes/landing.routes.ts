// src/modules/beta/routes/landing.routes.ts

import { FastifyInstance } from "fastify";
import { landingController } from "../controllers/landing.controller";

export async function landingRoutes(fastify: FastifyInstance) {

  // Landing Page
  fastify.get("/beta", landingController.renderLandingPage);

}