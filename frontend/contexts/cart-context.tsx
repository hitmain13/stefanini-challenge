"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import type { Cart } from "@/types/product"

interface CartContextType {
  cart: Cart
  addToCart: (productId: string, quantity?: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateCartItem: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  isLoading: boolean
  refreshCart: () => Promise<void>
  isCartSidebarOpen: boolean
  openCartSidebar: () => void
  closeCartSidebar: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const defaultCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(defaultCart)
  const [isLoading, setIsLoading] = useState(false)
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false)

  const openCartSidebar = () => setIsCartSidebarOpen(true)
  const closeCartSidebar = () => setIsCartSidebarOpen(false)

  const refreshCart = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cart")
      if (response.ok) {
        const cartData = await response.json()
        // Validar e normalizar os dados do carrinho
        const normalizedCart: Cart = {
          items: Array.isArray(cartData.items) ? cartData.items : [],
          total: typeof cartData.total === 'number' ? cartData.total : 0,
          itemCount: typeof cartData.itemCount === 'number' ? cartData.itemCount : 0,
        }
        setCart(normalizedCart)
      } else {
        setCart(defaultCart)
      }
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error)
      setCart(defaultCart)
    }
  }

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:3000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      })

      if (response.ok) {
        const result = await response.json()
        // Validar e normalizar os dados do carrinho retornado
        const normalizedCart: Cart = {
          items: Array.isArray(result.items) ? result.items : [],
          total: typeof result.total === 'number' ? result.total : 0,
          itemCount: typeof result.itemCount === 'number' ? result.itemCount : 0,
        }
        setCart(normalizedCart)
        openCartSidebar()
      } else {
        throw new Error("Erro ao adicionar produto ao carrinho")
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const removeFromCart = async (itemId: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`http://localhost:3000/api/cart/item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const result = await response.json()
        // Validar e normalizar os dados do carrinho retornado
        const normalizedCart: Cart = {
          items: Array.isArray(result.items) ? result.items : [],
          total: typeof result.total === 'number' ? result.total : 0,
          itemCount: typeof result.itemCount === 'number' ? result.itemCount : 0,
        }
        setCart(normalizedCart)
      } else {
        throw new Error("Erro ao remover produto do carrinho")
      }
    } catch (error) {
      console.error("Erro ao remover do carrinho:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:3000/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity }),
      })

      if (response.ok) {
        const result = await response.json()
        // Validar e normalizar os dados do carrinho retornado
        const normalizedCart: Cart = {
          items: Array.isArray(result.items) ? result.items : [],
          total: typeof result.total === 'number' ? result.total : 0,
          itemCount: typeof result.itemCount === 'number' ? result.itemCount : 0,
        }
        setCart(normalizedCart)
      } else {
        throw new Error("Erro ao atualizar produto do carrinho")
      }
    } catch (error) {
      console.error("Erro ao atualizar carrinho:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("http://localhost:3000/api/cart/clear", {
        method: "DELETE",
      })

      if (response.ok) {
        const result = await response.json()
        // Validar e normalizar os dados do carrinho retornado
        const normalizedCart: Cart = {
          items: Array.isArray(result.items) ? result.items : [],
          total: typeof result.total === 'number' ? result.total : 0,
          itemCount: typeof result.itemCount === 'number' ? result.itemCount : 0,
        }
        setCart(normalizedCart)
      } else {
        throw new Error("Erro ao limpar carrinho")
      }
    } catch (error) {
      console.error("Erro ao limpar carrinho:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshCart()
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        isLoading,
        refreshCart,
        isCartSidebarOpen,
        openCartSidebar,
        closeCartSidebar,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider")
  }
  return context
}
