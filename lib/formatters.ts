export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

export function formatItemType(type: 'product' | 'event'): string {
  return type === 'product' ? 'Product' : 'Event';
}
