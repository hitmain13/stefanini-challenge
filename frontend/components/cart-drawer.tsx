"use client"

import { X, Trash2, ShoppingCart, Plus, Minus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export function CartDrawer() {
  const { cart, removeFromCart, updateCartItem, clearCart, isLoading, closeCartSidebar } = useCart()
  const { toast } = useToast()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId)
      toast({
        title: "Item removido",
        description: "O produto foi removido do seu carrinho.",
      })
    } catch (error) {
      console.error('Erro ao remover item:', error)
      toast({
        title: "Erro",
        description: "Não foi possível remover o item do carrinho.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    try {
      await updateCartItem(itemId, newQuantity)
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a quantidade.",
        variant: "destructive",
      })
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
      toast({
        title: "Carrinho limpo",
        description: "Todos os itens foram removidos do carrinho.",
      })
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error)
      toast({
        title: "Erro",
        description: "Não foi possível limpar o carrinho.",
        variant: "destructive",
      })
    }
  }

  return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Carrinho de Compras</h2>
          <div className="flex items-center gap-2">
            {cart?.items && cart.items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                disabled={isLoading}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                Limpar
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={closeCartSidebar}
              className="cursor-pointer"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!cart?.items || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">Seu carrinho está vazio</h3>
              <p className="text-muted-foreground text-sm">Adicione produtos para começar suas compras</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart?.items?.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-card rounded-lg border border-border">
                  <div className="relative w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{item.name}</h4>
                    <p className="text-primary font-semibold text-sm">{formatPrice(item.price)}</p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading || item.quantity <= 1}
                          className="h-6 w-6 p-0 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Badge variant="outline" className="text-xs min-w-[2rem] text-center">
                          {item.quantity}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="h-6 w-6 p-0 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="mt-1">
                      <p className="text-xs text-muted-foreground">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart?.items && cart.items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Itens ({cart.itemCount}):</span>
                <span>{formatPrice(cart.total)}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Frete:</span>
                <span className="text-green-600">{cart.total >= 199 ? "Grátis" : formatPrice(15.99)}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-primary">
                    {formatPrice(cart.total + (cart.total >= 199 ? 0 : 15.99))}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full cursor-pointer" size="lg" disabled={isLoading}>
                Finalizar Compra
              </Button>
              <Button 
                variant="outline" 
                className="w-full bg-transparent cursor-pointer" 
                onClick={closeCartSidebar}
              >
                Continuar Comprando
              </Button>
            </div>

            <div className="text-xs text-muted-foreground text-center">
              <p>{cart.total < 199 && <>Frete grátis para compras acima de {formatPrice(199)}</>}</p>
            </div>
          </div>
        )}
      </div>
  )
}