"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/types/product"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  product: Product
}

export function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  // For demo purposes, we'll create multiple views of the same image
  const images = [
    product.imageUrl || `https://picsum.photos/600/600?random=${product.id}`,
    product.imageUrl || `https://picsum.photos/600/600?random=${product.id}`,
    product.imageUrl || `https://picsum.photos/600/600?random=${product.id}`,
  ]

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-card rounded-lg overflow-hidden border border-border">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
        {product.priceSale && (
          <div className="absolute top-4 left-4">
            <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
              {Math.round(((product.price - product.priceSale) / product.price) * 100)}% OFF
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "aspect-square w-20 relative bg-card rounded-lg overflow-hidden border-2 transition-colors",
              selectedImage === index ? "border-primary" : "border-border hover:border-muted-foreground",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${product.name} - Vista ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
