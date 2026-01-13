// src/modules/vadb/auth/auth.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { createSession } from "../../../utils/session-store";
import { UserModel } from "../../../models/user.model";

// Combined reply type with required plugin methods
type MyReply = FastifyReply & {
  view: (template: string, data?: Record<string, any>) => Promise<void>;
  setCookie: (name: string, value: string, options?: Record<string, any>) => void;
};

// Define SessionPayload type
type SessionPayload = {
  uid: string;
  role: "user" | "admin";
};

export const authController = {

  showVADBLoginPage: async (request: FastifyRequest, reply: MyReply) => {
    // Session added by middleware, or undefined
    const user = request.session?.uid;

    const returnTo = (request.query as any).returnTo || "/";
    return reply.view("/auth/login.pug", { pageTitle: "Login", returnTo, user });
  },  

  handleVADBLogin: async (request: FastifyRequest, reply: MyReply) => {
    const { email, password, returnTo } = request.body as { email: string; password: string, returnTo?: string };

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) return reply.status(401).send({ success: false, message: "Invalid credentials" });
    if (!user.isActive) return reply.status(403).send({ error: "Account is inactive." });

    // Verify password
    const valid = await user.verifyPassword(password);
    if (!valid) return reply.status(401).send({ success: false, message: "Invalid credentials" });

    // Determine if admin
    const isAdmin = user.isAdmin === true;

    // Kill any old sessions for user
    const { Session } = require("../../sessions/session.model");
    await Session.deleteMany({ uid: user._id.toString() });
  
    // Create Mongo session
    const payload: SessionPayload = {
      uid: user._id.toString(),
      role: isAdmin ? "admin" : "user"
    };
    const { id, ttl } = await createSession(payload, isAdmin);

    // Name the cookie based on role
    const cookieName = isAdmin ? "admin_session" : "user_session";

    reply.setCookie(cookieName, id, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: ttl / 1000 // Seconds
    });

    // return reply.redirect(returnTo || (isAdmin ? "/" : "/")); // Redirect after login
    return reply.send({
      success: true,
      redirect: returnTo || (isAdmin ? "/BDOMS/orders" : "/")
    });

  }
  
};