import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { comparePassword } from "@/utils/bcrypt";
import { generateToken } from "@/utils/checkAdmin";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email y contraseña son obligatorios." },
        { status: 400 },
      );
    }

    // TODO remember create all information in english.
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Credenciales inválidas." },
        { status: 401 },
      );
    }

    // Comparar contraseña
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Credenciales inválidas." },
        { status: 401 },
      );
    }

    // Generar token JWT
    const token = generateToken({ userId: user._id, role: user.role });

    return NextResponse.json(
      { message: "Inicio de sesión exitoso.", token },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al iniciar sesión." },
      { status: 500 },
    );
  }
}
