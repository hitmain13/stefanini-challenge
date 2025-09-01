import type { Product } from "@/types/product"

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone Premium XZ",
    description:
      "Smartphone de última geração com câmera de 108MP, processador octa-core e bateria de longa duração. Ideal para quem busca performance e qualidade em um só dispositivo.",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "/modern-smartphone-with-sleek-design.png",
    category: "Eletrônicos",
    inStock: true,
  },
  {
    id: "2",
    name: "Notebook Gamer Pro",
    description:
      "Notebook gamer com placa de vídeo dedicada, 16GB RAM e SSD de 512GB. Perfeito para jogos e trabalho profissional.",
    price: 2499.99,
    image: "/gaming-laptop-with-rgb-lighting.png",
    category: "Computadores",
    inStock: true,
  },
]

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id)
}
