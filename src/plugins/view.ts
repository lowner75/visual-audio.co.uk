// src/plugins/view.ts

import fp from "fastify-plugin";
import fastifyView from "@fastify/view";
import path from "path";
import Pug from "pug";

// This plugin adds reply.view() ...
export const viewPlugin = fp(async (fastify: any) => {
  await fastify.register(fastifyView, {
    engine: {
      pug: Pug
    },
    root: path.join(__dirname, "../views"),
    viewExt: "pug",
  });
});