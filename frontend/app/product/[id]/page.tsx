import { Header } from '@/components/header'
import { ProductPage } from '@/components/product-page'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPageRoute({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProductPage productId={params.id} />
    </div>
  )
}
