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

## 🏗️ Estrutura do Projeto

\`\`\`
├── app/
│   ├── api/
│   │   ├── cart/
│   │   │   ├── add/route.ts      # Adicionar item ao carrinho
│   │   │   ├── clear/route.ts    # Limpar carrinho
│   │   │   ├── remove/route.ts   # Remover item
│   │   │   ├── update/route.ts   # Atualizar quantidade
│   │   │   └── route.ts          # Buscar carrinho
│   │   └── products/
│   │       └── [id]/route.ts     # Buscar produto por ID
│   ├── globals.css               # Estilos globais e tokens de design
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página inicial
├── components/
│   ├── ui/                      # Componentes base (shadcn/ui)
│   ├── cart-button.tsx          # Botão do carrinho com contador
│   ├── cart-drawer.tsx          # Drawer lateral do carrinho
│   ├── cart-summary.tsx         # Resumo flutuante do carrinho
│   ├── header.tsx               # Cabeçalho da aplicação
│   ├── loading-spinner.tsx      # Componente de loading
│   ├── product-image-gallery.tsx # Galeria de imagens do produto
│   ├── product-info.tsx         # Informações do produto
│   └── product-page.tsx         # Página principal do produto
├── contexts/
│   └── cart-context.tsx         # Context do carrinho
├── lib/
│   ├── mock-data.ts            # Dados simulados dos produtos
│   └── utils.ts                # Utilitários
└── types/
    └── product.ts              # Tipos TypeScript
\`\`\`

## 🎨 Design System

### Paleta de Cores
- **Primary**: #0891b2 (Cyan-600) - Botões principais e preços
- **Secondary**: #6366f1 (Indigo) - Elementos secundários e acentos
- **Neutrals**: Branco, cinzas e preto para textos e backgrounds
- **Destructive**: #be123c - Elementos de erro e remoção

### Tipografia
- **Font Family**: Geist Sans (padrão) e Geist Mono
- **Hierarchy**: Títulos em bold, corpo em regular
- **Line Height**: 1.4-1.6 para melhor legibilidade

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- Context API para estado global do carrinho
- Estados locais para UI (loading, modals, etc.)
- Sincronização automática com API

### Responsividade
- Design mobile-first
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Componentes adaptáveis para diferentes telas

### Acessibilidade
- Semantic HTML
- ARIA labels e roles
- Contraste adequado (WCAG AA)
- Navegação por teclado

### Performance
- Next.js App Router para otimização automática
- Lazy loading de imagens
- Componentes otimizados

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente (se necessário)
3. Deploy automático a cada push

### Outras Plataformas
- Netlify
- Railway
- Render
- Qualquer plataforma que suporte Next.js

## 🔮 Próximos Passos

Para uma versão de produção, considere implementar:

- [ ] Banco de dados real (PostgreSQL, MongoDB)
- [ ] Autenticação de usuários
- [ ] Sistema de pagamento (Stripe, PayPal)
- [ ] Catálogo completo de produtos
- [ ] Sistema de busca e filtros
- [ ] Avaliações e comentários
- [ ] Wishlist/Favoritos
- [ ] Histórico de pedidos
- [ ] Painel administrativo
- [ ] Testes automatizados

## 📝 Licença

Este projeto foi desenvolvido como desafio técnico e está disponível sob a licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir melhorias
- Enviar pull requests

---

Desenvolvido com ❤️ usando Next.js e TypeScript
