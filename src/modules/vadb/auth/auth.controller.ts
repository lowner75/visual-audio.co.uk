// src/modules/vadb/auth/auth.controller.ts

import { FastifyRequest, FastifyReply } from "fastify";

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

  }
  
};