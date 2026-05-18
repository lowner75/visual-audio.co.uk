// src/modules/vadb/vadb.routes.ts

import { FastifyPluginAsync } from "fastify";
import { vadbAuthHook } from "./hooks/vadbAuthHook";
import { authRoutes } from "./auth/auth.routes";
import { dashboardRoutes } from "./dashboard/dashboard.routes";

export const vadbModule: FastifyPluginAsync = async (fastify) => {

  await fastify.register(async (f) => {
    f.addHook("preHandler", vadbAuthHook);
    await f.register(dashboardRoutes);
  });

  fastify.register(authRoutes);

};