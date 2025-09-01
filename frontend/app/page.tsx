import { Header } from "@/components/header"
import { ProductList } from "@/components/product-list"
import { CartSummary } from "@/components/cart-summary"
import { AddProductButton } from "@/components/add-product-button"
import { AddProductHomeButton } from "@/components/add-product-home-button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nossos Produtos</h1>
          <p className="text-gray-600 mb-6">Descubra nossa seleção de produtos incríveis</p>
          <AddProductHomeButton />
        </div>
        <ProductList />
      </main>
      <CartSummary />
      <AddProductButton />
    </div>
  )
}
