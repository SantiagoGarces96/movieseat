import { verifyToken } from "@/utils/checkAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function checkAdminAuthorization(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      authorized: false,
      response: NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    };
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload || payload.role !== "admin") {
    return {
      authorized: false,
      response: NextResponse.json(
        { message: "Access denied. Admins only." },
        { status: 403 },
      ),
    };
  }

  return { authorized: true };
}
