// src/modules/vadb/vadb.routes.ts

import { FastifyInstance } from "fastify";
import { authRoutes } from "./auth/auth.routes";
//import { verifyVadbAuth } from "../../middleware/verifyVadbAuth";

export async function vadbRoutes(fastify: FastifyInstance) {

  // Auth guard for ALL /vadb routes
  fastify.addHook("onRequest", async (request, reply) => {

    const openRoutes = [
      "/vadb/auth/login",
      "/vadb/auth/logout",
    ];

    if (openRoutes.includes(request.url)) {
      return;
    }

    //await verifyVadbAuth(request, reply);
  });

  // Routes
  fastify.register(authRoutes, { prefix: "/vadb" });
  // later:
  // fastify.register(userRoutes, { prefix: "/vadb" });

}