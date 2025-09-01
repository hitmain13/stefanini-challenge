
import { Router } from "express";
import { ProductService } from "./services/product-service";
import { CartService } from "./services/cart-service";
import { PrismaClient } from "@prisma/client";
import { PrismaProductRepository } from "./repositories/product-repository";
import { PrismaCartRepository } from "./repositories/cart-repository";
import { createProductController } from "./controllers/product-controller";
import { createCartController } from "./controllers/cart-controller";

export function createRoutes() {
  const router = Router();
  const prisma = new PrismaClient();

  const productRepo = new PrismaProductRepository(prisma);
  const cartRepo = new PrismaCartRepository(prisma);

  const productService = new ProductService(productRepo);
  const cartService = new CartService(cartRepo, productRepo, prisma);

  const productController = createProductController(productService);
  const cartController = createCartController(cartService);

  router.get("/api/products", productController.getAllProducts);
  router.get("/api/products/:id", productController.getProduct);
  router.post("/api/products", productController.createProduct);
  router.post("/api/cart/add", cartController.addToCart);
  router.get("/api/cart", cartController.getCart);
  router.delete("/api/cart/item/:itemId", cartController.removeFromCart);
  router.delete("/api/cart/clear", cartController.clearCart);

  return router;
}