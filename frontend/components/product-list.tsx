'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { api } from '@/lib/api'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Eye } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'
import Image from 'next/image'
import { LoadingSpinner } from './loading-spinner'

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await api.getProducts()
      setProducts(data)
    } catch (error) {
      setError('Erro ao carregar produtos')
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, 1)
      toast({
        title: 'Produto adicionado!',
        description: `${product.name} foi adicionado ao carrinho.`,
      })
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error)
      toast({
        title: 'Erro!',
        description: 'Não foi possível adicionar o produto ao carrinho.',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={loadProducts} variant="outline" className="cursor-pointer">
          Tentar novamente
        </Button>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Nenhum produto encontrado.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square overflow-hidden">
            <Image
              src={product.imageUrl || `https://picsum.photos/400/400?random=${product.id}`}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {product.name}
            </CardTitle>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </CardHeader>

          <CardContent className="pb-2">
            <div className="flex items-center gap-2 mb-3">
              {product.priceSale ? (
                <>
                  <span className="text-lg font-bold text-green-600">
                    R$ {product.priceSale.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    R$ {product.price.toFixed(2)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(((product.price - product.priceSale) / product.price) * 100)}% OFF
                  </Badge>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex gap-2 pt-0">
            <Button
              onClick={() => handleAddToCart(product)}
              className="flex-1 cursor-pointer"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="sm"
              className="cursor-pointer"
            >
              <Link href={`/product/${product.id}`}>
                <Eye className="w-4 h-4 mr-2" />
                Ver
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
