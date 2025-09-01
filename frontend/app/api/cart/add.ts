import { type NextRequest, NextResponse } from "next/server";
import { addToCart as addToCartApi } from "@/lib/api";

export async function addToCart(request: NextRequest) {
  try {
    const { productId, quantity } = await request.json();
    const result = await addToCartApi(productId, quantity);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
