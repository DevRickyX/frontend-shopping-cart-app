const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Item {
  id: string;
  name: string;
  type: 'product' | 'event';
  price: number;
  thumbnail: string;
  description: string;
  stock: number;
}

export interface CartItem {
  id: string;
  itemId: string;
  item: Item;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new ApiError(response.status, error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

export const api = {
  async getItems(): Promise<Item[]> {
    const response = await fetch(`${API_URL}/items`);
    return handleResponse<Item[]>(response);
  },

  async getItem(id: string): Promise<Item> {
    const response = await fetch(`${API_URL}/items/${id}`);
    return handleResponse<Item>(response);
  },

  async getCart(): Promise<Cart> {
    const response = await fetch(`${API_URL}/cart`);
    return handleResponse<Cart>(response);
  },

  async addToCart(itemId: string, quantity: number = 1): Promise<Cart> {
    const response = await fetch(`${API_URL}/cart/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, quantity }),
    });
    return handleResponse<Cart>(response);
  },

  async updateCartItem(itemId: string, quantity: number): Promise<Cart> {
    const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    return handleResponse<Cart>(response);
  },

  async removeFromCart(itemId: string): Promise<Cart> {
    const response = await fetch(`${API_URL}/cart/items/${itemId}`, {
      method: 'DELETE',
    });
    return handleResponse<Cart>(response);
  },

  async clearCart(): Promise<void> {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },
};
