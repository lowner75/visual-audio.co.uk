// src/modules/beta/landing.routes.ts

import { FastifyInstance } from "fastify";
import { adminAuth } from "../../../middleware/adminAuth";
import { landingController } from "../controllers/landing.controller";

export async function betaRoutes(fastify: FastifyInstance) {

  // Authentication hooks
  fastify.addHook("preHandler", async (request, reply) => {
    reply.locals = reply.locals || {};
    reply.locals.cookies = request.cookies;
    reply.locals.module = "beta";
    await adminAuth(request, reply);
  });

  // Landing page
  fastify.get("/", landingController.getLandingPage);

}