import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST() {
  const response = NextResponse.json({ message: "Sesión cerrada." });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
