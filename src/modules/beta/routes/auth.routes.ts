// src/modules/beta/routes/auth.routes.ts

import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controller";

export async function authRoutes(fastify: FastifyInstance) {

  // Login page
  fastify.get("/beta/auth/login", authController.renderLoginPage);
  fastify.post("/beta/auth/login", authController.handleLogin);

}