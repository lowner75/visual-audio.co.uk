// src/plugins/vite-helper.ts

import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'path';

interface ViteManifest {
  [key: string]: {
    file: string;
    css?: string[];
    [key: string]: any;
  };
}

export default fp(async (fastify) => {
  const isProd = process.env.NODE_ENV === 'production';
  let manifest: ViteManifest = {};

  if (isProd) {
    const manifestPath = path.join(__dirname, '../../public/build/.vite/manifest.json');
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  }

  fastify.decorateReply('viteScript', function(entry = 'src/main.js') {
    if (isProd) {
      if (!manifest[entry]) throw new Error(`Vite entry ${entry} not found`);
      return `<script type="module" src="/build/${manifest[entry].file}"></script>`;
    } else {
      return `<script type="module" src="/js/main.js"></script>`;
    }
  });

  // Make viteScript available in Pug templates
  fastify.addHook('onRequest', (req, reply, done) => {
    reply.locals.viteScript = reply.viteScript.bind(reply);
    done();
  });
});