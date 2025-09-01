'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import { LoadingSpinner } from './loading-spinner'

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.string().min(1, 'Preço é obrigatório').refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    'Preço deve ser um número maior que zero'
  ),
  priceSale: z.string().optional().refine(
    (val) => !val || (!isNaN(parseFloat(val)) && parseFloat(val) > 0),
    'Preço de venda deve ser um número maior que zero'
  ),
  imageUrl: z.string().url('URL da imagem deve ser válida').optional().or(z.literal(''))
})

type ProductFormData = z.infer<typeof productSchema>

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  })

  const onSubmit = async (data: ProductFormData) => {
    try {
      setLoading(true)
      
      const productData = {
        ...data,
        price: parseFloat(data.price),
        priceSale: data.priceSale ? parseFloat(data.priceSale) : undefined,
        imageUrl: data.imageUrl || undefined
      }

      await api.createProduct(productData)
      
      toast({
        title: 'Produto criado!',
        description: 'O produto foi adicionado com sucesso.',
      })

      reset()
      onOpenChange(false)
      
      // Recarregar a página para mostrar o novo produto
      window.location.reload()
    } catch (error) {
      console.error('Erro ao criar produto:', error)
      toast({
        title: 'Erro!',
        description: 'Não foi possível criar o produto.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Digite o nome do produto"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Digite a descrição do produto"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register('price')}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceSale">Preço de Venda</Label>
              <Input
                id="priceSale"
                type="number"
                step="0.01"
                min="0"
                {...register('priceSale')}
                placeholder="0.00"
              />
              {errors.priceSale && (
                <p className="text-sm text-red-600">{errors.priceSale.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              type="url"
              {...register('imageUrl')}
              placeholder="https://exemplo.com/imagem.jpg"
            />
            {errors.imageUrl && (
              <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
            )}
            <p className="text-xs text-gray-500">
              Deixe em branco para usar uma imagem aleatória do Picsum
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="cursor-pointer"
            >
              {loading ? (
                <>
                  <LoadingSpinner className="w-4 h-4 mr-2" />
                  Criando...
                </>
              ) : (
                'Criar Produto'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
