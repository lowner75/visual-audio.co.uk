// src/modules/landing/landing.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";

export async function landingController(request: FastifyRequest, reply: FastifyReply) {
  const user = request.user;

  return reply.view("index-legacy.pug", {
    pageTitle: "Visual Audio",
  });

};