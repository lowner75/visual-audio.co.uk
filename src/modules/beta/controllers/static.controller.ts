// src/modules/beta/static.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";

export const staticController = {

  renderLandingPage: async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.view("/index.pug", {
        pageTitle: "Visual Audio | Lighting, Sound, and AV Hire",
        user: request.user || null,
      }
    );
  },  

  renderWorkPage: async (request: FastifyRequest, reply: FastifyReply) => {    
    return reply.view("/work.pug", {
        pageTitle: "Work | Visual Audio",
        user: request.user || null,
      }
    );
  },  

  renderContactPage: async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.view("/contact.pug", {
        pageTitle: "Contact | Visual Audio",
        user: request.user || null,
      }
    );
  },  

};