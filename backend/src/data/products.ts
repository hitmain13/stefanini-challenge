import { Product } from "../models/types";

export const productsSeed: Product[] = [
  {
    id: "1",
    name: "Tênis Esportivo XYZ",
    description: "Tênis confortável para corrida e passeio.",
    price: 299.9,
    priceSale: 249.9,
    imageUrl: "https://picsum.photos/seed/1/600/400"
  },
  {
    id: "2",
    name: "Camiseta Casual ABC",
    description: "Camiseta 100% algodão, várias cores.",
    price: 79.9,
    imageUrl: "https://picsum.photos/seed/2/600/400"
  }
];