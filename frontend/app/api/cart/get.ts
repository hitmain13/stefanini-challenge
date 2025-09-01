import { NextResponse } from "next/server";
import { fetchCart } from "@/lib/api";

export async function getCart() {
  try {
    const cart = await fetchCart();
    return NextResponse.json(cart);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
