export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceSale?: number | null;
  imageUrl?: string | null;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
};