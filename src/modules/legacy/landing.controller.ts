// src/modules/landing/landing.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";

export async function landingController(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user;

  return reply.view("legacy/legacy-index.pug", {
    pageTitle: "Visual Audio",
  });

};

export async function termsAndConditionsController(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user;

  return reply.view("legacy/legacy-terms.pug", {
    pageTitle: "Visual Audio",
  });

};