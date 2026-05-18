// src/modules/vadb/hooks/vadbAuthHook.ts

import { FastifyReply, FastifyRequest } from "fastify";
import { adminAuth } from "../../../middleware/adminAuth";

export async function vadbAuthHook(request: FastifyRequest, reply: FastifyReply) {

  reply.locals = reply.locals || {};
  reply.locals.cookies = request.cookies;
  //reply.locals.module = "vadb";

  // Call after setting module context
  await adminAuth(request, reply);

}