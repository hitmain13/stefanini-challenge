"use client"

import { CartButton } from "@/components/cart-button"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="md:hidden cursor-pointer">
            <Menu className="w-5 h-5" />
            <span className="sr-only">Menu</span>
          </Button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-bold text-primary">TechStore</h1>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="text-foreground hover:text-primary transition-colors cursor-pointer">
            Produtos
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors cursor-pointer">
            Ofertas
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors cursor-pointer">
            Contato
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:flex cursor-pointer">
            <Search className="w-5 h-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <CartButton />
        </div>
      </div>
    </header>
  )
}
