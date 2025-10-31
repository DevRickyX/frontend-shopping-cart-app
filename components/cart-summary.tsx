'use client';

import { Cart } from '@/lib/api';
import { formatCurrency } from '@/lib/formatters';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

interface CartSummaryProps {
  cart: Cart | null;
  onClearCart?: () => Promise<any>;
  disabled?: boolean;
}

export function CartSummary({ cart, onClearCart, disabled }: CartSummaryProps) {
  if (!cart || cart.items.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
            <p className="text-neutral-500">Your cart is empty</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cart Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Total Items:</span>
            <span className="font-medium">{cart.totalQuantity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Subtotal:</span>
            <span className="font-medium">{formatCurrency(cart.totalPrice)}</span>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg">{formatCurrency(cart.totalPrice)}</span>
          </div>

          <Button className="w-full" size="lg" disabled={disabled}>
            Proceed to Checkout
          </Button>

          {onClearCart && (
            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={onClearCart}
              disabled={disabled}
            >
              Clear Cart
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
