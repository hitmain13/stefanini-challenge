"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddProductDialog } from "@/components/add-product-dialog"

export function AddProductHomeButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="w-full h-16 text-lg font-semibold cursor-pointer"
        size="lg"
      >
        <Plus className="w-6 h-6 mr-2" />
        Adicionar Novo Produto
      </Button>

      <AddProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  )
}
