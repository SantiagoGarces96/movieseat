import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/session";
import User from "@/models/User";
import { LoginSchema } from "@/schema/auth";
import { comparePassword } from "@/utils/bcrypt";

const invalidCredentials = () =>
  NextResponse.json({ message: "Credenciales inválidas." }, { status: 401 });

export async function POST(request: Request) {
  try {
    const credentials = LoginSchema.safeParse(
      await request.json().catch(() => null),
    );
    if (!credentials.success) {
      return invalidCredentials();
    }

    await dbConnect();
    const { email, password } = credentials.data;
    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      return invalidCredentials();
    }

    const token = await createSessionToken({
      userId: user._id.toString(),
      role: user.role,
      name: `${user.name} ${user.lastName}`,
      email: user.email,
    });

    const response = NextResponse.json({
      message: "Inicio de sesión exitoso.",
      role: user.role,
    });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });
    return response;
  } catch (error: any) {
    console.error(`Error in login route: ${error.message}`);
    return NextResponse.json(
      { message: "Error al iniciar sesión." },
      { status: 500 },
    );
  }
}
