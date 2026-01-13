// src/modules/vadb/auth/auth.routse.ts

import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { authController } from "./auth.controller";

export async function authRoutes(fastify: FastifyInstance) {

  fastify.get("/auth/login", async (request: FastifyRequest, reply: FastifyReply) => {
    return authController.showVADBLoginPage(request, reply);
  });

  fastify.post("/auth/login", async (request: FastifyRequest, reply: FastifyReply) => {
    return authController.handleVADBLogin(request, reply);
  });

}