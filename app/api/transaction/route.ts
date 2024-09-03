import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/Transaction";
import { ITransaction } from "@/interfaces/transaction";

export async function GET() {
  await dbConnect();
  try {
    const transactions: ITransaction[] = await Transaction.find({});
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch transactions." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const transactionData = await request.json();
    const newTransaction: ITransaction =
      await Transaction.create(transactionData);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create transaction." },
      { status: 500 },
    );
  }
}
