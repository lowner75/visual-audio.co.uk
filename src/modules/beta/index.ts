// src/modules/beta/index.ts

import { FastifyPluginAsync } from "fastify";
import { betaRoutes } from "./routes/landing.routes";

export const betaModule: FastifyPluginAsync = async (fastify) => {
  fastify.register(betaRoutes, { prefix: "/beta" });
};