// src/app.ts

import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyFormbody from "@fastify/formbody";
import corsPlugin from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import dotenv from "dotenv";
import path from "path";

// Plugins ...
import jwtPlugin from "./plugins/jwt";
import mongoosePlugin from "./plugins/mongoose";
import mailerPlugin from "./plugins/mailer";
import { viewPlugin } from "./plugins/view";
import vitePlugin from "./plugins/vite-helper";

// Middleware ...
import { helmetMiddleware } from "./middleware/helmet";

// Routes ...
import { landingRoutes } from "./modules/landing/landing.routes";
import { messageRoutes } from "./modules/messages/message.routes";

const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env"; // dev uses plain .env

dotenv.config({ path: envFile });

export async function buildApp() {
  
  const app = Fastify({ logger: true });
  
  // Serve static files from public ...
  app.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
    prefix: "/",
  });

  // View engine ...
  await app.register(viewPlugin);

  // Needed for urlencoded forms ...
  app.register(fastifyFormbody);
  
  // Basic security ...
  await app.register(helmetMiddleware);

  // CORS - allow credentials (cookies) ...
  await app.register(corsPlugin, {
    origin: true,
    credentials: true
  });

  // Cookies and session ...
  await app.register(fastifyCookie, {secret: process.env.JWT_SECRET });

  // Plugins ...
  await app.register(vitePlugin);
  await app.register(jwtPlugin);
  await app.register(mongoosePlugin);
  await app.register(mailerPlugin);

  // Routes ...
  await app.register(landingRoutes);
  await app.register(messageRoutes);
 
  return app;

}