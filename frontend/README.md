# E-commerce Product Page

Uma aplicação full-stack de página de produto de e-commerce desenvolvida com Next.js, TypeScript e API simulada. O projeto simula uma loja online brasileira com funcionalidades completas de carrinho de compras.

## 🚀 Funcionalidades

### Página de Produto
- ✅ Exibição de foto, nome, preço e descrição do produto
- ✅ Botão "Adicionar ao carrinho" funcional
- ✅ Preço promocional com distinção visual (preço original riscado)
- ✅ Galeria de imagens com thumbnails
- ✅ Seletor de quantidade
- ✅ Status de estoque
- ✅ Informações adicionais (frete, garantia, troca)

### Carrinho de Compras
- ✅ Exibição em drawer lateral deslizante
- ✅ Lista de produtos adicionados com quantidades
- ✅ Cálculo automático de subtotal e total
- ✅ Remoção individual de itens
- ✅ Ajuste de quantidade (+/- buttons)
- ✅ Função "Limpar carrinho"
- ✅ Cálculo de frete (grátis acima de R$ 199)
- ✅ Resumo flutuante do carrinho

### Backend (API Simulada)
- ✅ `GET /api/products/:id` - Retorna dados de um produto
- ✅ `POST /api/cart/add` - Adiciona item ao carrinho
- ✅ `GET /api/cart` - Retorna itens atuais no carrinho
- ✅ `DELETE /api/cart/remove` - Remove item do carrinho
- ✅ `PUT /api/cart/update` - Atualiza quantidade de item
- ✅ `DELETE /api/cart/clear` - Limpa todo o carrinho

## 🛠️ Tecnologias Utilizadas

- **Frontend**: Next.js 15 (App Router)
- **Backend**: Node.js com API Routes do Next.js
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **Ícones**: Lucide React
- **Gerenciamento de Estado**: React Context API
- **Notificações**: Toast notifications

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 18+ 
- npm, yarn ou pnpm

### Passos para rodar localmente

1. **Clone o repositório**
\`\`\`bash
git clone <url-do-repositorio>
cd ecommerce-product-page
\`\`\`

2. **Instale as dependências**
\`\`\`bash
npm install
# ou
yarn install
# ou
pnpm install
\`\`\`

3. **Execute o servidor de desenvolvimento**
\`\`\`bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
\`\`\`

4. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- Context API para estado global do carrinho
- Estados locais para UI (loading, modals, etc.)
- Sincronização automática com API

### Responsividade
- Design mobile-first
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Componentes adaptáveis para diferentes telas
