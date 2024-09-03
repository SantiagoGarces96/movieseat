import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid movie ID format" },
      { status: 400 },
    );
  }

  try {
    const transaction = await Transaction.findById(id)
      .populate("userId")
      .populate("ticketId")
      .populate("foodItems");
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    console.error("Error retrieving transaction:", error);
    return NextResponse.json(
      { message: "Failed to retrieve transaction." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;

  try {
    const result = await Transaction.findByIdAndDelete(id);
    if (!result) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete transaction." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  await dbConnect();
  const { id } = params;
  const updates = await request.json();

  try {
    const transaction = await Transaction.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!transaction) {
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(transaction, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update transaction." },
      { status: 500 },
    );
  }
}
