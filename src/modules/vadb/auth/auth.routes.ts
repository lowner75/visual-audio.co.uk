// src/modules/vadb/auth/auth.routes.ts

import { FastifyInstance } from "fastify";
import { authController } from "./auth.controller";

export async function authRoutes(fastify: FastifyInstance) {

  // Login page
  fastify.get("/vadb/auth/login", authController.renderLoginPage);
  fastify.post("/vadb/auth/login", authController.handleLogin);

}