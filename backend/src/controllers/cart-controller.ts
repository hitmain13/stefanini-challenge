
import { Request, Response } from "express";
import { CartService } from "../services/cart-service";
import { z } from "zod";

const addSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1)
});

export const createCartController = (service: CartService) => {
  return {
    async getCart(req: Request, res: Response) {
      console.log("getCart")
      const userId = (req.headers["x-user-id"] as string) || "guest";
      try {
        const cart = await service.getCart(userId);
        return res.json(cart);
      } catch (err) {
        return res.status(500).json({ message: "Internal error" });
      }
    },

    async addToCart(req: Request, res: Response) {
      console.log("addToCart")
      const userId = (req.headers["x-user-id"] as string) || "guest";
      try {
        const parsed = addSchema.parse(req.body);
        const cart = await service.addToCart(userId, parsed.productId, parsed.quantity);
        return res.status(201).json(cart);
      } catch (err: any) {
        if (err?.issues) return res.status(400).json({ message: "Validation error", issues: err.issues });
        if (err.message === "Product not found") return res.status(404).json({ message: err.message });
        return res.status(500).json({ message: "Internal error" });
      }
    },

    async removeFromCart(req: Request, res: Response) {
      console.log("removeFromCart")
      const userId = (req.headers["x-user-id"] as string) || "guest";
      const itemId = req.params.itemId;
      try {
        const cart = await service.removeFromCart(userId, itemId);
        return res.json(cart);
      } catch (err) {
        return res.status(500).json({ message: "Internal error" });
      }
    },

    async clearCart(req: Request, res: Response) {
      console.log("clearCart")
      const userId = (req.headers["x-user-id"] as string) || "guest";
      try {
        const cart = await service.clearCart(userId);
        return res.json(cart);
      } catch (err) {
        return res.status(500).json({ message: "Internal error" });
      }
    }
  };
};