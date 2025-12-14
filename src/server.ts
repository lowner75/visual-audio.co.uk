// src/server.ts

import { buildApp } from "./app";

async function start() {
  const app = await buildApp();
  const port = Number(process.env.PORT) || 3000;
  await app.listen({ port, host: '0.0.0.0' });
  console.log(`Server listening on port ${port} ...`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});