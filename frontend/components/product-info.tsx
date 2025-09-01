"use client"

import { useState } from "react"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/contexts/cart-context"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isLoading } = useCart()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity)

      toast({
        title: "Produto adicionado!",
        description: `${product.name} foi adicionado ao seu carrinho.`,
      })
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto ao carrinho.",
        variant: "destructive",
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <div className="space-y-6">
      {/* Product Title */}
      <div>
        <h1 className="text-3xl font-bold text-foreground text-balance">{product.name}</h1>
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          {product.priceSale ? (
            <>
              <span className="text-3xl font-bold text-primary">{formatPrice(product.priceSale)}</span>
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
          )}
        </div>
        {product.priceSale && (
          <p className="text-sm text-secondary">Economize {formatPrice(product.price - product.priceSale)}</p>
        )}
      </div>

      {/* Stock Status */}
      <div>
        <Badge variant="outline" className="text-green-600 border-green-600">
          Em estoque
        </Badge>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Descrição</h3>
        <p className="text-muted-foreground leading-relaxed text-pretty">{product.description}</p>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantidade
        </label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="cursor-pointer"
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setQuantity(quantity + 1)}
            className="cursor-pointer"
          >
            +
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full h-12 text-base font-semibold cursor-pointer"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent cursor-pointer">
            <Heart className="w-4 h-4 mr-2" />
            Favoritar
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent cursor-pointer">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="border-t border-border pt-6 space-y-2 text-sm text-muted-foreground">
        <p>✓ Frete grátis para compras acima de R$ 199</p>
        <p>✓ Garantia de 12 meses</p>
        <p>✓ Troca grátis em até 30 dias</p>
      </div>
    </div>
  )
}
