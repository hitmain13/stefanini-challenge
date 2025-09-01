'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { AddProductDialog } from './add-product-dialog'

export function AddProductButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="fixed bottom-12 left-12 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50 cursor-pointer"
        size="lg"
      >
        <Plus className="w-6 h-6" />
      </Button>

      <AddProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  )
}
