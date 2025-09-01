import { PrismaClient } from "@prisma/client";
import { Cart } from "../models/types";

export interface ICartRepository {
  getCart(userId: string): Promise<Cart>;
  saveCart(cart: Cart): Promise<void>;
  clearCart(cartId: string): Promise<void>;
}

export class PrismaCartRepository implements ICartRepository {
  constructor(private prisma: PrismaClient) {}

  async getCart(userId: string): Promise<Cart> {
    let cart = await this.prisma.cart.findFirst({
      where: { userId },
      include: { items: true }
    });
    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: true }
      });
    }
    return cart;
  }

  async saveCart(cart: Cart): Promise<void> {
    // To-do
  }

  async clearCart(cartId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({ where: { cartId } });
  }
}
