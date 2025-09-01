import { Request, Response } from "express";
import { ProductService } from "../services/product-service";

export const createProductController = (service: ProductService) => {
  return {
    async getProduct(req: Request, res: Response) {
      const id = req.params.id;
      try {
        const product = await service.getProduct(id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        return res.json(product);
      } catch (err) {
        return res.status(500).json({ message: "Internal error" });
      }
    },

    async getAllProducts(req: Request, res: Response) {
      try {
        const products = await service.getAllProducts();
        return res.json(products);
      } catch (err) {
        return res.status(500).json({ message: "Internal error" });
      }
    },

    async createProduct(req: Request, res: Response) {
      try {
        const { name, description, price, priceSale, imageUrl } = req.body;
        
        if (!name || !description || !price) {
          return res.status(400).json({ 
            message: "Name, description and price are required" 
          });
        }

        const product = await service.createProduct({
          name,
          description,
          price: parseFloat(price),
          priceSale: priceSale ? parseFloat(priceSale) : null,
          imageUrl: imageUrl || `https://picsum.photos/400/300?random=${Date.now()}`
        });

        return res.status(201).json(product);
      } catch (err) {
        return res.status(500).json({ message: "Internal error" });
      }
    }
  };
};