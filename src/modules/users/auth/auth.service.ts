// src/modules/users/auth/auth.service.ts

import { UserModel } from "../../../models/user.model";
import { UserLogModel, UserLogInternal, UserLogExternal } from "../../../models/user-log.model";
import { verifyPassword } from "./utils/argon2";
import { createSession, destroySessionsForUser, SessionPayload } from "../../sessions/sessions.service";

type AuthResult =
  | { success: true; userId: string; isAdmin: boolean; sessionId: string; sessionTTL: number }
  | { success: false; message: UserLogExternal };

export class AuthService {
  static async login({
    email,
    password,
    ip,
    userAgent,
  }: {
    email: string;
    password: string;
    ip?: string;
    userAgent?: string;
  }): Promise<AuthResult> {
    const timeStamp = new Date();

    const normalizedEmail = email.trim().toLowerCase();
    const user = await UserModel.findOne({ email: normalizedEmail });

    //console.log("AuthService.login: user lookup", { normalizedEmail, userFound: !!user });

    if (!user) {
      await UserLogModel.create({
        userID: 0,
        emailAddress: email,
        timeStamp,
        result: UserLogInternal.ERROR_USER_NOT_FOUND,
        ip,
        userAgent,
      });

      return { success: false, message: UserLogExternal.ERROR_GENERIC };
    }

    if (!user.isActive) {
      await UserLogModel.create({
        userID: user.id,
        emailAddress: email,
        timeStamp,
        result: UserLogInternal.ERROR_INACTIVE_ACCOUNT,
        ip,
        userAgent,
      });

      return { success: false, message: UserLogExternal.ERROR_GENERIC };
    }

    const valid = await verifyPassword(user.passwordHash, password);

    if (!valid) {
      await UserLogModel.create({
        userID: user.id,
        emailAddress: email,
        timeStamp,
        result: UserLogInternal.ERROR_INCORRECT_PASSWORD,
        ip,
        userAgent,
      });

      return { success: false, message: UserLogExternal.ERROR_GENERIC };
    }

    await UserLogModel.create({
      userID: user.id,
      emailAddress: email,
      timeStamp,
      result: UserLogInternal.SUCCESS,
      ip,
      userAgent,
    });

    const isAdmin = user.isAdmin === true;

    // kill old sessions
    await destroySessionsForUser(user._id.toString());

    const payload: SessionPayload = {
      uid: user._id.toString(),
      role: isAdmin ? "admin" : "user",
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const { id, ttl } = await createSession(payload, isAdmin);

    // Return session info to controller to set cookie
    return {
      success: true,
      userId: user._id.toString(),
      isAdmin,
      sessionId: id,
      sessionTTL: ttl,
    };
  }
}