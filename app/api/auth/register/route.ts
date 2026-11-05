import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { RegisterSchema } from "@/schema/auth";
import { userRole } from "@/types/user";
import { hashPassword } from "@/utils/bcrypt";

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
    const { email, password, name, lastName } = fields.data;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe." },
        { status: 400 },
      );
    }

    await User.create({
      email,
      password: await hashPassword(password),
      name,
      lastName,
      role: userRole.CLIENT,
    });

    return NextResponse.json(
      { message: "Usuario registrado exitosamente." },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(`Error in register route: ${error.message}`);
    return NextResponse.json(
      { message: "Error al registrar el usuario." },
      { status: 500 },
    );
  }
}
