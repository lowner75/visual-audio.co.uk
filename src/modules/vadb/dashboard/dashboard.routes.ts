// src/modules/vadb/dashboard/dashboard.routes.ts

import { FastifyInstance } from "fastify";
import { dashboardController } from "./dashboard.controller";

export async function dashboardRoutes(fastify: FastifyInstance) {

  // VADB Dashboard
  fastify.get("/vadb", dashboardController.renderDashboard);

}