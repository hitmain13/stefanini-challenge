# E-commerce TechStore

Um projeto completo de e-commerce desenvolvido com Next.js (frontend) e Node.js + TypeScript + PostgreSQL com Prisma (backend).

## 📋 Funcionalidades

### Frontend (Next.js)
- ✅ Página inicial com listagem de produtos
- ✅ Página individual de produto
- ✅ Carrinho de compras funcional
- ✅ Botão flutuante para adicionar novos produtos
- ✅ Modal para criação de produtos
- ✅ Design responsivo e moderno
- ✅ Sistema de notificações (toast)
- ✅ Imagens dinâmicas com Picsum

### Backend (Node.js + TypeScript)
- ✅ API REST completa
- ✅ CRUD de produtos
- ✅ Sistema de carrinho
- ✅ Banco de dados PostgreSQL com Prisma
- ✅ Arquitetura limpa (Clean Architecture)
- ✅ Princípios SOLID aplicados
- ✅ Tratamento de erros
- ✅ CORS configurado

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **CORS** - Middleware para permitir requisições cross-origin
- **Zod** - Validação de schemas

### Frontend
- **Next.js 15** - Framework React
- **React 19** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones
- **Sonner** - Sistema de notificações

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- pnpm instalado globalmente

### 1. Configuração do Banco de Dados
```bash
# Crie um banco de dados PostgreSQL
createdb techstore

# Configure a variável de ambiente no backend
cd backend
echo "DATABASE_URL=postgresql://usuario:senha@localhost:5432/techstore" > .env
```

### 2. Backend
```bash
# Entre na pasta do backend
cd backend

# Instale as dependências
pnpm install

# Execute as migrações do Prisma
pnpm migrate:dev

# Gere o cliente Prisma
pnpm generate

# Inicie o servidor de desenvolvimento
pnpm dev
```

O backend estará rodando em `http://localhost:3000`

### 3. Frontend
```bash
# Em um novo terminal, entre na pasta do frontend
cd frontend

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O frontend estará rodando em `http://localhost:3001`

## 📡 API Endpoints

### Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Busca produto por ID
- `POST /api/products` - Cria novo produto

### Carrinho
- `GET /api/cart` - Busca carrinho atual
- `POST /api/cart/add` - Adiciona produto ao carrinho
- `DELETE /api/cart/:productId` - Remove produto do carrinho

### Health Check
- `GET /health-check` - Verifica se a API está funcionando

## 🧪 Testando a API

### Usar o script PowerShell (Windows)
```powershell
# Execute o script de testes
powershell -ExecutionPolicy Bypass -File ./test-api.ps1
```

### Testes manuais com curl
```bash
# Health check
curl http://localhost:3000/health-check

# Listar produtos
curl http://localhost:3000/api/products

# Criar produto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"iPhone 15","description":"Smartphone Apple","price":4999.99,"priceSale":4499.99}'

# Buscar produto específico
curl http://localhost:3000/api/products/{ID_DO_PRODUTO}

# Ver carrinho
curl http://localhost:3000/api/cart

# Adicionar ao carrinho
curl -X POST http://localhost:3000/api/cart/add \
  -H "Content-Type: application/json" \
  -d '{"productId":"{ID_DO_PRODUTO}","quantity":2}'
```

## 🏗️ Estrutura do Projeto

```
stefanini/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Controllers da API
│   │   ├── services/         # Lógica de negócio
│   │   ├── repositories/     # Acesso a dados
│   │   ├── models/           # Tipos e interfaces
│   │   ├── routes.ts         # Definição das rotas
│   │   ├── app.ts           # Configuração do Express
│   │   └── index.ts         # Ponto de entrada
│   ├── prisma/
│   │   ├── schema.prisma    # Schema do banco
│   │   └── migrations/      # Migrações
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Página inicial
│   │   ├── layout.tsx       # Layout principal
│   │   └── product/[id]/    # Página de produto
│   ├── components/
│   │   ├── ui/              # Componentes base
│   │   ├── product-list.tsx # Lista de produtos
│   │   ├── product-page.tsx # Página de produto
│   │   ├── cart-*.tsx       # Componentes do carrinho
│   │   └── add-product-*.tsx # Criação de produtos
│   ├── contexts/
│   │   └── cart-context.tsx # Contexto do carrinho
│   ├── lib/
│   │   └── api.ts           # Cliente da API
│   └── types/
│       └── product.ts       # Tipos TypeScript
│
├── test-api.ps1             # Script de testes
└── README.md
```

## 🔧 Comandos Úteis

### Backend
```bash
# Executar testes
pnpm test

# Build para produção
pnpm build

# Iniciar em produção
pnpm start

# Reset do banco de dados
pnpm prisma db push --force-reset
```

### Frontend
```bash
# Executar testes
pnpm test

# Build para produção
pnpm build

# Iniciar em produção
pnpm start

# Analisar bundle
pnpm build --analyze
```