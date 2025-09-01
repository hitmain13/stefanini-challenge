import { type NextRequest, NextResponse } from "next/server"
import { fetchProductById } from "@/lib/api";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = await fetchProductById(params.id);
    return NextResponse.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
