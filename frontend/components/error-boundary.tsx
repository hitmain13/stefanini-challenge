"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary"

interface Props {
  children: ReactNode
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error
  resetErrorBoundary: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Algo deu errado</h2>
        <p className="text-muted-foreground">
          Ocorreu um erro inesperado. Por favor, recarregue a página ou tente novamente.
        </p>
        <div className="space-y-2">
          <Button onClick={() => window.location.reload()} className="w-full">
            Recarregar Página
          </Button>
          <Button
            variant="outline"
            onClick={resetErrorBoundary}
            className="w-full bg-transparent"
          >
            Tentar Novamente
          </Button>
        </div>
        {process.env.NODE_ENV === "development" && (
          <details className="text-left text-xs text-muted-foreground bg-muted p-2 rounded">
            <summary className="cursor-pointer">Detalhes do erro (dev)</summary>
            <pre className="mt-2 whitespace-pre-wrap">{error?.stack}</pre>
          </details>
        )}
      </div>
    </div>
  )
}

export function ErrorBoundary({ children }: Props) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.error("Uncaught error:", error, info)
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}