// src/middleware/adminAuth.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { getSession } from "../utils/session-store";
import { UserModel } from "../models/user.model";

export async function adminAuth(request: FastifyRequest, reply: FastifyReply) {

  // Determine login path based on module context
  const loginPath = reply.locals?.module === "beta" ? "/beta/auth/login" : "/vadb/auth/login";

  // Check for session cookie
  const sessionId = request.cookies["admin_session"];
  if (!sessionId) return reply.redirect(loginPath);

  // Fetch session from Mongo
  const session = await getSession(sessionId);
  if (!session || session.role !== "admin") return reply.redirect(loginPath);

  // Fetch full user data using _id from session
  const user = await UserModel.findById(session.uid).lean();
  if (!user) return reply.redirect(loginPath);

  // Attach enriched user info to request
  request.user = {
    ...session,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  } as typeof session & {
    firstName: string;
    lastName: string;
    email: string
  };

}