"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export function CartButton() {
  const { cart, openCartSidebar } = useCart()

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={openCartSidebar} 
      className="relative bg-transparent cursor-pointer"
    >
      <ShoppingCart className="w-5 h-5" />
      {cart?.itemCount && cart.itemCount > 0 ? (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {cart.itemCount}
        </Badge>
      ) : null}
    </Button>
  )
}
