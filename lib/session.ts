import { jwtVerify, SignJWT } from "jose";
import type { NextResponse } from "next/server";
import { userRole } from "@/types/user";

// Este archivo también lo usa el middleware, así que no debe importar
// dependencias que solo funcionen en Node.
export const SESSION_COOKIE = "movieseat_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

export interface SessionUser {
  userId: string;
  role: userRole;
  name: string;
  email: string;
}

const getSecret = (): Uint8Array | null => {
  const secret = process.env.JWT_SECRET;
  return secret ? new TextEncoder().encode(secret) : null;
};

export const createSessionToken = async ({
  userId,
  ...claims
}: SessionUser): Promise<string> => {
  const secret = getSecret();
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(secret);
};

export const setSessionCookie = async (
  response: NextResponse,
  user: SessionUser,
): Promise<void> => {
  response.cookies.set(SESSION_COOKIE, await createSessionToken(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
};

export const verifySessionToken = async (
  token?: string,
): Promise<SessionUser | null> => {
  const secret = getSecret();
  if (!token || !secret) return null;
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return {
      userId: payload.sub as string,
      role: payload.role as userRole,
      name: payload.name as string,
      email: payload.email as string,
    };
  } catch {
    return null;
  }
};
