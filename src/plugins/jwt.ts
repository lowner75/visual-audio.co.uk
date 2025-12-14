// src/plugins/jwt.ts

import fp from "fastify-plugin";

export default fp(async (app) => {
  await app.register(import("@fastify/jwt"), {
    secret: process.env.JWT_SECRET || "53cr3t",
    cookie: {
      cookieName: "access_token",
      signed: false
    }
  });

  // Decorator to verify token from cookie ...
  app.decorate("authenticate", async (request: any, reply: any) => {
    try {
      // req.jwtVerify picks token from cookie (fastify-jwt does this if cookieName configured)
      await request.jwtVerify();
    } catch (err) {
      reply.clearCookie("access_token");
      return reply.code(401).send({ error: "Unauthorized" });
    }
  });
});