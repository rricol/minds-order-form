import { getCookie } from './cookieManager';
import type { Product } from './type';

export function getPricing(): string {
  const products: Product[] = getCookie('selectedProducts') || [];
  let total = 0;

  products.forEach((product) => {
    const { type, quantity, quantityA3 = 0, quantityA2 = 0 } = product;
    if (type === 'Infographie') {
      total += quantityA2 * 6 + quantityA3 * (quantityA3 < 10 ? 4 : 3);
    } else if (type === 'Brochure') {
      total += quantity * (quantity < 10 ? 9 : quantity < 30 ? 8 : 7);
    } else if (type === 'Publication') {
      total += quantity * (quantity < 5 ? 16 : quantity < 10 ? 14 : 13);
    }
  });

  return total.toString();
}

export function getResourcePricing(product: Product): number {
  const { type, quantity, quantityA3 = 0, quantityA2 = 0 } = product;
  if (type === 'Infographie') {
    return quantityA2 * 6 + quantityA3 * (quantityA3 < 10 ? 4 : 3);
  }
  if (type === 'Brochure') {
    return quantity * (quantity < 10 ? 9 : quantity < 30 ? 8 : 7);
  }
  if (type === 'Publication') {
    return quantity * (quantity < 5 ? 16 : quantity < 10 ? 14 : 13);
  }

  return 0;
}

export function getResourceCount(): number {
  const products: Product[] = getCookie('selectedProducts') || [];
  return products.length;
}
