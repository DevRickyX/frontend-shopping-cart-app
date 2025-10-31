'use client';

import { Item } from '@/lib/api';
import { formatCurrency, formatItemType } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface ItemCardProps {
  item: Item;
  onAddToCart: (itemId: string, quantity?: number) => Promise<any>;
  disabled?: boolean;
}

export function ItemCard({ item, onAddToCart, disabled }: ItemCardProps) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await onAddToCart(item.id, 1);
    } finally {
      setAdding(false);
    }
  };

  const isOutOfStock = item.stock <= 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-neutral-100 overflow-hidden">
        <img
          src={item.thumbnail || '/placeholder.png'}
          alt={item.name}
          className="h-full w-full object-cover"
        />
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive">Out of Stock</Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
          <Badge variant="secondary" className="shrink-0">
            {formatItemType(item.type)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-sm text-neutral-600 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold">{formatCurrency(item.price)}</span>
          <span className="text-sm text-neutral-500">{item.stock} in stock</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={disabled || adding || isOutOfStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
