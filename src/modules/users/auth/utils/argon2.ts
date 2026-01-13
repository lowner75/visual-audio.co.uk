// src/modules/users/auth/utils/argon2.ts

import argon2, { Options } from "argon2";

export const defaultOptions: Options = {
  type: argon2.argon2id,
  memoryCost: Number(process.env.ARGON2_MEMORY_COST) || 2 ** 16,
  timeCost: Number(process.env.ARGON2_TIME_COST) || 3,
  parallelism: Number(process.env.ARGON2_PARALLELISM) || 1,
  hashLength: Number(process.env.ARGON2_HASH_LENGTH) || 32,
};

export async function hashPassword(password: string, options: Options = defaultOptions): Promise<string> {
  return argon2.hash(password, options);
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  return argon2.verify(hash, password);
}