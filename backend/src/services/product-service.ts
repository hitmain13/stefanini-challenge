import { IProductRepository } from "../repositories/product-repository";
import { Product } from "../models/types";

export class ProductService {
  constructor(private productRepo: IProductRepository) {}

  async getProduct(id: string): Promise<Product | null> {
    return this.productRepo.findById(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.findAll();
  }

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    return this.productRepo.create(productData);
  }
}