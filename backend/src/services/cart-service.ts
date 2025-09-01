import { ICartRepository } from "../repositories/cart-repository";
import { IProductRepository } from "../repositories/product-repository";
import { Cart } from "../models/types";
import { PrismaClient } from "@prisma/client";

export class CartService {
  constructor(
    private cartRepo: ICartRepository,
    private productRepo: IProductRepository,
    private prisma: PrismaClient
  ) {}

  private async calculateCartTotals(cart: Cart): Promise<Cart> {
    const itemsWithProducts = await this.prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { product: true },
    });

    const total = itemsWithProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const itemCount = itemsWithProducts.reduce((acc, item) => acc + item.quantity, 0);

    const items = itemsWithProducts.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
      quantity: item.quantity,
    }));

    return { ...cart, items, total, itemCount };
  }

  async getCart(userId: string): Promise<Cart> {
    const cart = await this.cartRepo.getCart(userId);
    return this.calculateCartTotals(cart);
  }

  async addToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error("Product not found");

    const cart = await this.cartRepo.getCart(userId);

    const existingItem = await this.prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId }
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      await this.prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity }
      });
    }

    const updated = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true }
    });
    return this.calculateCartTotals(updated!);
  }

  async removeFromCart(userId: string, itemId: string): Promise<Cart> {
    const cart = await this.cartRepo.getCart(userId);
    await this.prisma.cartItem.delete({
      where: { id: itemId, cartId: cart.id }
    });
    const updated = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true }
    });
    return this.calculateCartTotals(updated!);
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartRepo.getCart(userId);
    await this.cartRepo.clearCart(cart.id);
    const updated = await this.prisma.cart.findUnique({
      where: { id: cart.id },
      include: { items: true }
    });
    return this.calculateCartTotals(updated!);
  }
}
