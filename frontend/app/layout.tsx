import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { CartSidebar } from "@/components/cart-sidebar"
import "./globals.css"

export const metadata: Metadata = {
  title: "TechStore - Sua Loja de Tecnologia",
  description:
    "Encontre os melhores produtos de tecnologia com preços incríveis. Smartphones, notebooks, acessórios e muito mais.",
  keywords: ["tecnologia", "eletrônicos", "smartphones", "notebooks", "e-commerce", "loja online"],
  authors: [{ name: "TechStore" }],
  creator: "TechStore",
  publisher: "TechStore",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://techstore.com",
    title: "TechStore - Sua Loja de Tecnologia",
    description: "Encontre os melhores produtos de tecnologia com preços incríveis.",
    siteName: "TechStore",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechStore - Sua Loja de Tecnologia",
    description: "Encontre os melhores produtos de tecnologia com preços incríveis.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ErrorBoundary>
          <Suspense fallback={null}>
            <CartProvider>
              {children}
              <CartSidebar />
              <Toaster />
            </CartProvider>
          </Suspense>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
