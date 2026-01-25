// src/modules/beta/hooks/betaAuthHook.ts

import { FastifyReply, FastifyRequest } from "fastify";
import { adminAuth } from "../../../middleware/adminAuth";

export async function betaAuthHook(request: FastifyRequest, reply: FastifyReply) {

  reply.locals = reply.locals || {};
  reply.locals.cookies = request.cookies;
  reply.locals.module = "beta";

  // Call after setting module context
  await adminAuth(request, reply);

}