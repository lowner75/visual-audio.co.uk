// src/types/fastify.d.ts

import "fastify";
import { FastifyJWT } from "@fastify/jwt";
import { UserPayload } from "./user";
import { UserDocument } from "../modules/users/user.model";

declare module "fastify" {

  interface FastifyRequest {

    session?: {
      _id: string;
      uid: string;
      role: "user" | "admin";
      createdAt: Date;
      expiresAt: Date;

    };

    user?: {
      _id: string;
      role: "user" | "admin";
      expiresAt: Date;
      firstName: string;
      lastName: string;
      email: string;
    };

    cookies: Record<string, string | undefined>;
  }
  
  interface FastifyReply {
    viteScript(entry?: string): string;
    locals: Record<string, any>;
    view: (template: string, data?: Record<string, unknown>) => Promise<void>;
    setCookie(name: string, value: string, options?: Record<string, any>): void;
    jwtSign: FastifyJWT["sign"];
    sendEmail(options: any): Promise<any>;
  }

  interface FastifyInstance {
    jwt: FastifyJWT;
  }

}