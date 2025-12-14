// src/modules/landing/landing.routes.ts

import { FastifyInstance } from "fastify";
import { landingController } from "./landing.controller";

export async function landingRoutes(fastify: FastifyInstance) {

  // landing page route ...
  fastify.get("/", async (request, reply) => {
    return landingController(request, reply);
  });

}