import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/utils/bcrypt";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, password, name, lastName } = await request.json();

    if (!email || !password || !name || !lastName) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios." },
        { status: 400 },
      );
    }
    // TODO remember create all information in english.
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "El usuario ya existe." },
        { status: 400 },
      );
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password);

    // Crear nuevo usuario
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      lastName,
      role: "client",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "Usuario registrado exitosamente." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al registrar el usuario." },
      { status: 500 },
    );
  }
}
