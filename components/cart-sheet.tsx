'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Cart } from '@/lib/api';
import { CartItem } from './cart-item';
import { CartSummary } from './cart-summary';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cart: Cart | null;
  onUpdateQuantity: (itemId: string, quantity: number) => Promise<any>;
  onRemove: (itemId: string) => Promise<any>;
  onClearCart: () => Promise<any>;
  disabled?: boolean;
}

export function CartSheet({
  open,
  onOpenChange,
  cart,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  disabled,
}: CartSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="pr-4">
              {cart?.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                  disabled={disabled}
                />
              ))}
            </div>
          </ScrollArea>

          <div className="border-t pt-4">
            <CartSummary
              cart={cart}
              onClearCart={onClearCart}
              disabled={disabled}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
