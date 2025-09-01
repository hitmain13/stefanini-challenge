const getBackendApiUrl = (path: string) => {
  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000';
  return `${backendApiUrl}${path}`;
};

export const fetchProductById = async (id: string) => {
  const url = getBackendApiUrl(`/api/products/${id}`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

export const fetchProducts = async () => {
  const url = getBackendApiUrl(`/api/products`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const createProduct = async (productData: {
  name: string;
  description: string;
  price: number;
  priceSale?: number;
  imageUrl?: string;
}) => {
  const url = getBackendApiUrl(`/api/products`);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("Failed to create product");
  }
  return response.json();
};

export const fetchCart = async () => {
  const url = getBackendApiUrl(`/api/cart`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }
  return response.json();
};

export const addToCart = async (productId: string, quantity: number) => {
  const url = getBackendApiUrl(`/api/cart/add`);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to cart");
  }
  return response.json();
};

export const api = {
  getProduct: fetchProductById,
  getProducts: fetchProducts,
  createProduct,
  getCart: fetchCart,
  addToCart,
};
