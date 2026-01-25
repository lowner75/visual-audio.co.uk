// src/modules/beta/index.ts

import { FastifyPluginAsync } from "fastify";
import { betaAuthHook } from "./hooks/betaAuthHook";
import { authRoutes } from "./routes/auth.routes";
import { landingRoutes } from "./routes/landing.routes";

export const betaModule: FastifyPluginAsync = async (fastify) => {

  await fastify.register(async (f) => {
    f.addHook("preHandler", betaAuthHook);
    await f.register(landingRoutes);
  });

  fastify.register(authRoutes);

};