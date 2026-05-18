// src/modules/vadb/auth/auth.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../../users/auth/auth.service";

export const authController = {

  // Render login page
  renderLoginPage: async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.view("auth/login.pug", {
      title: "Login | Visual Audio",
      postURL: "/vadb/auth/login",
    });
  },

  // Handle login form submission
  handleLogin: async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as { email: string; password: string };

    const ip = request.headers["x-real-ip"] as string | undefined;
    const userAgent = request.headers["user-agent"] as string | undefined;

    const result = await AuthService.login({ email, password, ip, userAgent });

    if (!result.success) {
      return reply.code(401).send({
        success: false,
        message: result.message || "Login failed.",
      });
    }

    const cookieName = result.isAdmin ? "admin_session" : "user_session";

    reply.setCookie(cookieName, result.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(result.sessionTTL / 1000),
    });

    return reply.code(200).send({
      success: true,
      isAdmin: result.isAdmin,
      redirectTo: "/vadb",
    });

  },

};