// src/modules/sessions/sessions.service.ts

import { SessionModel } from "../../models/session.model";
let uuidv4: () => string;

async function getUuid() {
  if (!uuidv4) {
    const { v4 } = await import("uuid");
    uuidv4 = v4;
  }
  return uuidv4;
}

// TTLs ...
const USER_TTL = 60 * 60 * 1000;      // 60 min (ms) ...
const ADMIN_TTL = 2 * 60 * 60 * 1000; // 2 hours (ms) ...

// -----------------------------
// Type for session payload
// -----------------------------

export interface SessionPayload {
  uid: string;             // User ID ...
  role: "admin" | "user";  // Role ...
  email: string;
  firstName: string;
  lastName: string;
}

// -----------------------------
// Create session
// -----------------------------

export async function createSession(payload: SessionPayload, isAdmin = false) {
  const id = (await getUuid())();
  const ttl = isAdmin ? ADMIN_TTL : USER_TTL;
  const expiresAt = new Date(Date.now() + ttl);

  await SessionModel.create({
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
  return SessionModel.findById(sessionId).lean();
}

// -----------------------------
// Destroy session
// -----------------------------

export async function destroySession(sessionId: string) {
  return SessionModel.deleteOne({ _id: sessionId });
}

// -----------------------------
// Destroy sessions for user
// -----------------------------

export async function destroySessionsForUser(uid: string) {
  return SessionModel.deleteMany({ uid });
}

// -----------------------------
// Refresh session
// -----------------------------

export async function refreshSession(sessionId: string, isAdmin = false) {
  const session = await SessionModel.findById(sessionId);
  if (!session) return null;

  const ttl = isAdmin ? ADMIN_TTL : USER_TTL;
  const now = new Date();

  if (session.expiresAt < now) {
    await SessionModel.deleteOne({ _id: sessionId });
    return null;
  }

  session.expiresAt = new Date(Date.now() + ttl);
  await session.save();

  return session;
}