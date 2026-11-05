import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import { cancelReservation } from "@/lib/reservations";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json(
      { message: "Inicia sesión para continuar." },
      { status: 401 },
    );
  }

  const { id } = await params;
  if (!/^[a-f0-9]{24}$/.test(id)) {
    return NextResponse.json(
      { message: "Reserva no encontrada." },
      { status: 404 },
    );
  }

  try {
    await dbConnect();
    const cancelled = await cancelReservation(id, user.userId);
    return NextResponse.json({ cancelled }, { status: cancelled ? 200 : 404 });
  } catch (error: any) {
    console.error(`Error in cancel reservation route: ${error.message}`);
    return NextResponse.json(
      { message: "No pudimos cancelar la reserva." },
      { status: 500 },
    );
  }
}
