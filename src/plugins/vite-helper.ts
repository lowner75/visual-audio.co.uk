// src/plugins/vite-helper.ts

import fp from "fastify-plugin";
import fs from "fs";
import path from "path";

interface ViteManifest {
  [key: string]: {
    file: string;
    css?: string[];
  };
}

export default fp(async (fastify) => {
  const isProd = process.env.NODE_ENV === "production";
  let manifest: ViteManifest = {};

  if (isProd) {
    const manifestPath = path.join(
      process.cwd(),
      "public/build/.vite/manifest.json"
    );

    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  }

  fastify.decorateReply(
    "viteScript",
    function (entry: string = "main") {
      if (isProd) {
        const manifestEntry = manifest[entry];
        if (!manifestEntry) {
          throw new Error(`Vite entry "${entry}" not found in manifest`);
        }

        return `<script type="module" src="/build/${manifestEntry.file}"></script>`;
      }

      // dev fallback
      switch (entry) {
        case "legacy":
          return `<script type="module" src="/js/main-legacy.js"></script>`;
        case "vadb":
          return `<script type="module" src="/js/vadb.js"></script>`;
        default:
          return `<script type="module" src="/js/main.js"></script>`;
      }
    }
  );

  fastify.addHook("onRequest", (req, reply, done) => {
    reply.locals.viteScript = reply.viteScript.bind(reply);
    done();
  });
});
