export interface Product {
  id: string
  name: string
  description: string
  price: number
  priceSale?: number
  imageUrl?: string
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  imageUrl?: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
}
