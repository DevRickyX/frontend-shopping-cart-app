'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/lib/api';
import { formatCurrency, formatItemType } from '@/lib/formatters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (itemId: string, quantity: number) => Promise<any>;
  onRemove: (itemId: string) => Promise<any>;
  disabled?: boolean;
}

export function CartItem({ item, onUpdateQuantity, onRemove, disabled }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [updating, setUpdating] = useState(false);

  const subtotal = item.item.price * item.quantity;

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 0 || newQuantity > item.item.stock) return;

    setQuantity(newQuantity);
    setUpdating(true);
    try {
      await onUpdateQuantity(item.itemId, newQuantity);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    setUpdating(true);
    try {
      await onRemove(item.itemId);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <div className="h-20 w-20 rounded-md overflow-hidden bg-neutral-100 flex-shrink-0">
        <img
          src={item.item.thumbnail || '/placeholder.png'}
          alt={item.item.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{item.item.name}</h3>
        <p className="text-xs text-neutral-500 mt-1">{formatItemType(item.item.type)}</p>
        <p className="text-sm font-medium mt-1">{formatCurrency(item.item.price)}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={disabled || updating || quantity <= 0}
        >
          <Minus className="h-3 w-3" />
        </Button>

        <Input
          type="number"
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
          className="w-16 h-8 text-center"
          min="0"
          max={item.item.stock}
          disabled={disabled || updating}
        />

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={disabled || updating || quantity >= item.item.stock}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      <div className="text-right w-24">
        <p className="font-semibold text-sm">{formatCurrency(subtotal)}</p>
        <p className="text-xs text-neutral-500">{item.quantity} units</p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={handleRemove}
        disabled={disabled || updating}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
