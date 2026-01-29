// src/modules/beta/landing.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";

export const landingController = {

  renderLandingPage: async (request: FastifyRequest, reply: FastifyReply) => {
    
    return reply.view("/index.pug", {
        pageTitle: "Visual Audio - Lighting, Sound, and AV Hire",
        user: request.user || null,
      }
    );

  },  

};