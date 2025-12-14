// src/utils/session-store.ts

import { Session } from "../modules/sessions/session.model";
import { v4 as uuidv4 } from "uuid";

// TTLs ...
const USER_TTL = 60 * 60 * 1000;      // 60 min (ms) ...
const ADMIN_TTL = 2 * 60 * 60 * 1000; // 2 hours (ms) ...

// -----------------------------
// Type for session payload
// -----------------------------

interface SessionPayload {
  uid: string;             // User ID ...
  role: "admin" | "user";  // Role ...
  [key: string]: any;      // Optional properties ...
}

// -----------------------------
// Create session
// -----------------------------

export async function createSession(payload: SessionPayload, isAdmin = false) {
  const id = uuidv4();
  const ttl = isAdmin ? ADMIN_TTL : USER_TTL;
  const expiresAt = new Date(Date.now() + ttl);

  await Session.create({
    _id: id,
    ...payload,
    expiresAt
  });

  return { id, ttl };
}

// -----------------------------
// Get session
// -----------------------------

export async function getSession(sessionId: string) {
  return Session.findById(sessionId).lean();
}

// -----------------------------
// Destroy session
// -----------------------------

export async function destroySession(sessionId: string) {
  return Session.deleteOne({ _id: sessionId });
}

// -----------------------------
// Refresh session
// -----------------------------

export async function refreshSession(sessionId: string, isAdmin = false) {
  const session = await Session.findById(sessionId);
  if (!session) return null;

  const ttl = isAdmin ? ADMIN_TTL : USER_TTL;
  const now = new Date();

  if (session.expiresAt < now) {
    await Session.deleteOne({ _id: sessionId });
    return null;
  }

  session.expiresAt = new Date(Date.now() + ttl);
  await session.save();

  return session;
}