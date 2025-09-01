import { render, screen, waitFor } from '@testing-library/react'
import { ProductList } from '@/components/product-list'
import { api } from '@/lib/api'
import { CartProvider } from '@/contexts/cart-context'
import { Toaster } from '@/components/ui/toaster'

// Mock da API
jest.mock('@/lib/api', () => ({
  api: {
    getProducts: jest.fn(),
  },
}))

// Mock do contexto do carrinho
jest.mock('@/contexts/cart-context', () => ({
  useCart: () => ({
    addToCart: jest.fn(),
  }),
  CartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))

// Mock do hook de toast
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}))

const mockProducts = [
  {
    id: '1',
    name: 'Produto Teste 1',
    description: 'Descrição do produto 1',
    price: 100,
    priceSale: null,
    imageUrl: 'https://picsum.photos/400/400?random=1',
  },
  {
    id: '2',
    name: 'Produto Teste 2',
    description: 'Descrição do produto 2',
    price: 200,
    priceSale: 150,
    imageUrl: 'https://picsum.photos/400/400?random=2',
  },
]

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <CartProvider>
      {component}
      <Toaster />
    </CartProvider>
  )
}

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render loading state initially', () => {
    ;(api.getProducts as jest.Mock).mockImplementation(() => new Promise(() => {}))
    
    renderWithProviders(<ProductList />)
    
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('should render products when API call succeeds', async () => {
    ;(api.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    
    renderWithProviders(<ProductList />)
    
    await waitFor(() => {
      expect(screen.getByText('Produto Teste 1')).toBeInTheDocument()
      expect(screen.getByText('Produto Teste 2')).toBeInTheDocument()
    })
  })

  it('should render error state when API call fails', async () => {
    ;(api.getProducts as jest.Mock).mockRejectedValue(new Error('API Error'))
    
    renderWithProviders(<ProductList />)
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar produtos')).toBeInTheDocument()
      expect(screen.getByText('Tentar novamente')).toBeInTheDocument()
    })
  })

  it('should render empty state when no products', async () => {
    ;(api.getProducts as jest.Mock).mockResolvedValue([])
    
    renderWithProviders(<ProductList />)
    
    await waitFor(() => {
      expect(screen.getByText('Nenhum produto encontrado.')).toBeInTheDocument()
    })
  })

  it('should display product prices correctly', async () => {
    ;(api.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    
    renderWithProviders(<ProductList />)
    
    await waitFor(() => {
      expect(screen.getByText('R$ 100.00')).toBeInTheDocument()
      expect(screen.getByText('R$ 150.00')).toBeInTheDocument()
      expect(screen.getByText('R$ 200.00')).toBeInTheDocument()
    })
  })

  it('should display discount badge for products with sale price', async () => {
    ;(api.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    
    renderWithProviders(<ProductList />)
    
    await waitFor(() => {
      expect(screen.getByText('25% OFF')).toBeInTheDocument()
    })
  })

  it('should render product images', async () => {
    ;(api.getProducts as jest.Mock).mockResolvedValue(mockProducts)
    
    renderWithProviders(<ProductList />)
    
    await waitFor(() => {
      const images = screen.getAllByAltText(/Produto Teste/)
      expect(images).toHaveLength(2)
      expect(images[0]).toHaveAttribute('src', 'https://picsum.photos/400/400?random=1')
      expect(images[1]).toHaveAttribute('src', 'https://picsum.photos/400/400?random=2')
    })
  })
})
