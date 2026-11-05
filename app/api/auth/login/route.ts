import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import {
  addAttempt,
  clearAttempts,
  getAttempts,
  getClientIp,
} from "@/lib/rateLimit";
import { setSessionCookie } from "@/lib/session";
import User from "@/models/User";
import { LoginSchema } from "@/schema/auth";
import { comparePassword } from "@/utils/bcrypt";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS_PER_ACCOUNT = 5;
const MAX_ATTEMPTS_PER_IP = 30;

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
    const ip = getClientIp(request);
    const accountKey = `login:${email}:${ip}`;
    const ipKey = `login-ip:${ip}`;

    const [accountAttempts, ipAttempts] = await Promise.all([
      getAttempts(accountKey),
      getAttempts(ipKey),
    ]);
    if (
      accountAttempts >= MAX_ATTEMPTS_PER_ACCOUNT ||
      ipAttempts >= MAX_ATTEMPTS_PER_IP
    ) {
      return NextResponse.json(
        {
          message:
            "Demasiados intentos. Espera 15 minutos e inténtalo de nuevo.",
        },
        { status: 429 },
      );
    }

    const user = await User.findOne({ email });
    if (!user || !(await comparePassword(password, user.password))) {
      await Promise.all([
        addAttempt(accountKey, WINDOW_MS),
        addAttempt(ipKey, WINDOW_MS),
      ]);
      return invalidCredentials();
    }

    await clearAttempts(accountKey);

    const response = NextResponse.json({
      message: "Inicio de sesión exitoso.",
      role: user.role,
    });
    await setSessionCookie(response, {
      userId: user._id.toString(),
      role: user.role,
      name: `${user.name} ${user.lastName}`,
      email: user.email,
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
