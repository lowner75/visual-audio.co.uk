// src/plugins/static.ts

import fastifyStatic from "@fastify/static";
import { FastifyInstance } from "fastify";
import path from "path";

export async function staticPlugin(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../../public"),
    prefix: "/public/",
  });
}