"use client"

import { useCart } from "@/contexts/cart-context"

export function CartSummary() {
  const { cart } = useCart()

  if (!cart?.items || cart.items.length === 0) return null

  const itemCount = cart.itemCount || 0
  const total = cart.total || 0

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card border border-border rounded-lg p-4 shadow-lg z-40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "itens"} no carrinho
          </p>
          <p className="font-semibold text-primary">{formatPrice(total)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">
            {total >= 199 ? "Frete grátis!" : `+${formatPrice(15.99)} frete`}
          </p>
        </div>
      </div>
    </div>
  )
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price)
}
