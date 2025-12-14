// src/plugins/mongoose.ts

import fp from "fastify-plugin";
import mongoose from "mongoose";

export default fp(async (app) => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    app.log.error("Missing MONGO_URI");
    throw new Error("Missing MONGO_URI");
  }

  try {
    await mongoose.connect(uri);
    app.log.info("MongoDB connected ...");
  } catch (err) {
    app.log.error("MongoDB connection error:");
    app.log.error(err);
    throw err; // IMPORTANT: fail plugin instead of hanging ...
  }
  
});