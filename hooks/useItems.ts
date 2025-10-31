'use client';

import { useState, useEffect } from 'react';
import { api, Item } from '@/lib/api';
import { toast } from 'sonner';

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getItems();
        setItems(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch items';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
}
