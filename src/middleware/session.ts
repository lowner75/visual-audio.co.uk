// src/middleware/session.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { Session } from "../modules/sessions/session.model";

export async function attachSession(request: FastifyRequest, reply: FastifyReply) {
  // Pick up session from either user or admin cookie ...
  const sessionId = request.cookies["user_session"] || request.cookies["admin_session"];
  if (!sessionId) return;

  // Fetch session from MongoDB ...
  const session = await Session.findById(sessionId).lean();
  if (!session) return;

  // Attach session to request ...
  request.session = session;
  
}