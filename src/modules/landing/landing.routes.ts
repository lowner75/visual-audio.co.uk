// src/modules/landing/landing.routes.ts

import { FastifyInstance } from "fastify";
import { landingController, termsAndConditionsController } from "./landing.controller";

export async function landingRoutes(fastify: FastifyInstance) {

  // landing page route ...
  fastify.get("/", async (request, reply) => {
    return landingController(request, reply);
  });

  // landing page terms route ...
  fastify.get("/terms-and-conditions", async (request, reply) => {
    return termsAndConditionsController(request, reply);
  });

}