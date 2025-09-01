"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/types/product"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductInfo } from "@/components/product-info"
import { LoadingSpinner } from "@/components/loading-spinner"

interface ProductPageProps {
  productId: string
}

export function ProductPage({ productId }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`http://localhost:3000/api/products/${productId}`)

        if (!response.ok) {
          throw new Error("Produto não encontrado")
        }

        const productData = await response.json()
        setProduct(productData)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao carregar produto")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-live="polite">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Produto não encontrado</h2>
          <p className="text-muted-foreground">{error || "O produto que você está procurando não existe."}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductImageGallery product={product} />
        <ProductInfo product={product} />
      </div>
    </div>
  )
}
