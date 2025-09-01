import { PrismaClient } from "@prisma/client";
import { Product } from "../models/types";

export interface IProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  create(product: Omit<Product, 'id'>): Promise<Product>;
}

export class PrismaProductRepository implements IProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return this.prisma.product.create({
      data: product
    });
  }
}
