import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyToken } from "@/utils/checkAdmin";
import { hashPassword } from "@/utils/bcrypt";

async function checkAdminAuthorization(request: NextRequest) {
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const authCheck = await checkAdminAuthorization(request);
  if (!authCheck.authorized) return authCheck.response;

  const { id } = params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to retrieve user." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const authCheck = await checkAdminAuthorization(request);
  if (!authCheck.authorized) return authCheck.response;

  const { id } = params;

  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  await dbConnect();

  const authCheck = await checkAdminAuthorization(request);
  if (!authCheck.authorized) return authCheck.response;

  const { id } = params;
  const updates = await request.json();

  try {
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user." },
      { status: 500 },
    );
  }
}
