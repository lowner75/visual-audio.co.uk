// src/middleware/adminAuth.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { getSession } from "../utils/session-store";
import { User } from "../modules/users/user.model";

export async function adminAuth(request: FastifyRequest, reply: FastifyReply) {

  // Check for session cookie
  const sessionId = request.cookies["admin_session"];
  if (!sessionId) return reply.redirect("/login");

  // Fetch session from Mongo
  const session = await getSession(sessionId);
  if (!session || session.role !== "admin") return reply.redirect("/login");

  // Fetch full user data using _id from session
  const user = await User.findById(session.uid).lean();
  if (!user) return reply.redirect("/login");

  // Attach enriched user info to request
  request.user = {
    ...session,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  } as typeof session & { firstName: string; lastName: string; email: string };

}