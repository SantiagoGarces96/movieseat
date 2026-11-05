import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { addAttempt, getAttempts, getClientIp } from "@/lib/rateLimit";
import { setSessionCookie } from "@/lib/session";
import User from "@/models/User";
import { RegisterSchema } from "@/schema/auth";
import { userRole } from "@/types/user";
import { hashPassword } from "@/utils/bcrypt";

const WINDOW_MS = 60 * 60 * 1000;
const MAX_REGISTRATIONS_PER_IP = 10;

const userExists = () =>
  NextResponse.json(
    { message: "Ya existe una cuenta con este correo." },
    { status: 400 },
  );

export async function POST(request: Request) {
  try {
    const fields = RegisterSchema.safeParse(
      await request.json().catch(() => null),
    );
    if (!fields.success) {
      return NextResponse.json(
        {
          message:
            "Revisa los campos: el correo debe ser válido y la contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 },
      );
    }

    await dbConnect();
    const ipKey = `register-ip:${getClientIp(request)}`;
    if ((await getAttempts(ipKey)) >= MAX_REGISTRATIONS_PER_IP) {
      return NextResponse.json(
        { message: "Demasiados intentos. Inténtalo de nuevo más tarde." },
        { status: 429 },
      );
    }
    await addAttempt(ipKey, WINDOW_MS);

    const { email, password, name, lastName } = fields.data;
    if (await User.findOne({ email })) {
      return userExists();
    }

    const user = await User.create({
      email,
      password: await hashPassword(password),
      name,
      lastName,
      role: userRole.CLIENT,
    });

    const response = NextResponse.json(
      { message: "Usuario registrado exitosamente." },
      { status: 201 },
    );
    await setSessionCookie(response, {
      userId: user._id.toString(),
      role: userRole.CLIENT,
      name: `${name} ${lastName}`,
      email,
    });
    return response;
  } catch (error: any) {
    if (error.code === 11000) {
      return userExists();
    }
    console.error(`Error in register route: ${error.message}`);
    return NextResponse.json(
      { message: "Error al registrar el usuario." },
      { status: 500 },
    );
  }
}
