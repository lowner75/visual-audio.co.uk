// src/middleware/adminAuth.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { getSession } from "../modules/sessions/sessions.service";

export async function adminAuth(request: FastifyRequest, reply: FastifyReply) {

  // Determine login path based on module context
  const loginPath = reply.locals?.module === "beta"
    ? "/beta/auth/login"
    : "/vadb/auth/login";

  // Check for session cookie
  const sessionId = request.cookies["admin_session"];
  if (!sessionId) return reply.redirect(loginPath);

  // Fetch session from Mongo
  const session = await getSession(sessionId);
  if (!session || session.role !== "admin") return reply.redirect(loginPath);

  // Check if session is expired
  if (session.expiresAt < new Date()) return reply.redirect(loginPath);

  // Attach session user info to request
  request.user = {
    ...session,
  } as typeof session;

}