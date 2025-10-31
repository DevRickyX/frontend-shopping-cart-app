'use client';

import { useState, useEffect, useCallback } from 'react';
import { api, Cart } from '@/lib/api';
import { toast } from 'sonner';

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCart();
      setCart(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch cart';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (itemId: string, quantity: number = 1) => {
    try {
      const updatedCart = await api.addToCart(itemId, quantity);
      setCart(updatedCart);
      toast.success('Item added to cart');
      return updatedCart;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add item';
      toast.error(message);
      throw err;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        return removeFromCart(itemId);
      }
      const updatedCart = await api.updateCartItem(itemId, quantity);
      setCart(updatedCart);
      toast.success('Quantity updated');
      return updatedCart;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update quantity';
      toast.error(message);
      throw err;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const updatedCart = await api.removeFromCart(itemId);
      setCart(updatedCart);
      toast.success('Item removed from cart');
      return updatedCart;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove item';
      toast.error(message);
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setCart(null);
      toast.success('Cart cleared');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to clear cart';
      toast.error(message);
      throw err;
    }
  };

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refetch: fetchCart,
  };
}
