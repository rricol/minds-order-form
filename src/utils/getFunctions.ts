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
  if (type === 'Jeux') {
    return quantity * 26;
  }
  return 0;
}

export function getResourceCount(): number {
  const products: Product[] = getCookie('selectedProducts') || [];
  return products.length;
}

export function getShipping(): number {
  const products: Product[] = getCookie('selectedProducts') || [];
  let shipping = 0;
  const totalBrochures = products.reduce((acc, product) => {
    return product.type === 'Brochure' ? acc + product.quantity : acc;
  }, 0);
  const totalInfographies = products.reduce((acc, product) => {
    return product.type === 'Infographie'
      ? acc + (product.quantityA2 ?? 0) + (product.quantityA3 ?? 0)
      : acc;
  }, 0);
  const totalPublications = products.reduce((acc, product) => {
    return product.type === 'Publication' ? acc + product.quantity : acc;
  }, 0);
  const totalJeux = products.reduce((acc, product) => {
    return product.type === 'Jeux' ? acc + product.quantity : acc;
  }, 0);
  if (totalJeux <= 3 && totalBrochures <= 3 && totalInfographies === 0 && totalPublications === 0) {
    shipping = 0;
  } else {
    shipping = 9;
  }
  return shipping;
}
