// src/modules/beta/landing.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";

export const landingController = {

  getLandingPage: async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.session?.uid;

    const returnTo = (request.query as any).returnTo || "/";
    return reply.view("/auth/login.pug", {
        pageTitle: "Login",
        returnTo, user
      }
    );
  },  

};