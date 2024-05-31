/* eslint-disable @typescript-eslint/no-explicit-any */
import { calculatePricing } from './pricing';
import { addProductToSelectedList } from './productManager';

interface Product {
  type: string;
  title: string;
  quantity: number;
  quantityA3?: number;
  quantityA2?: number;
}

export function setCookie(name: string, value: any, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`;
}

export function getCookie(name: string): any {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return JSON.parse(c.substring(nameEQ.length));
  }
  return null;
}

export function updateProductQuantityInCookie(
  productType: string,
  productTitle: string,
  quantities: { [key: string]: number }
): void {
  const products: Product[] = getCookie('selectedProducts') || [];
  const productIndex = products.findIndex(
    (product) => product.type === productType && product.title === productTitle
  );

  if (productIndex !== -1) {
    if (quantities.quantity !== undefined) {
      products[productIndex].quantity = quantities.quantity;
    }
    if (quantities.A3 !== undefined) {
      products[productIndex].quantityA3 = quantities.A3;
    }
    if (quantities.A2 !== undefined) {
      products[productIndex].quantityA2 = quantities.A2;
    }
    setCookie('selectedProducts', products, 7);
  }
  calculatePricing();
}

export function removeProductFromCookie(productType: string, productTitle: string): void {
  let products: Product[] = getCookie('selectedProducts') || [];
  products = products.filter(
    (product) => !(product.type === productType && product.title === productTitle)
  );
  setCookie('selectedProducts', products, 7);
  calculatePricing();
}

export function loadProductsFromCookie(): void {
  const products: Product[] = getCookie('selectedProducts') || [];
  products.forEach((product) =>
    addProductToSelectedList(
      product.type,
      product.title,
      product.quantity,
      product.quantityA3,
      product.quantityA2
    )
  );
}

export function updateCookie(): void {
  const selectedProductsWrapper = document.querySelector('[data-selected-products]') as HTMLElement;
  const selectedProductElements = selectedProductsWrapper.querySelectorAll('.selected-product');
  const products: Product[] = Array.from(selectedProductElements).map((productElement) => {
    const productType = productElement.querySelector('.text-size-small')?.textContent as string;
    const productTitle = productElement.querySelector('.text-weight-semibold')
      ?.textContent as string;
    const quantity =
      productType === 'Infographie'
        ? 0
        : parseInt((productElement.querySelector('.quantity-input') as HTMLInputElement).value);
    const quantityA3 =
      productType === 'Infographie'
        ? parseInt((productElement.querySelector('[data-format="A3"]') as HTMLInputElement).value)
        : 0;
    const quantityA2 =
      productType === 'Infographie'
        ? parseInt((productElement.querySelector('[data-format="A2"]') as HTMLInputElement).value)
        : 0;
    return { type: productType, title: productTitle, quantity, quantityA3, quantityA2 };
  });
  setCookie('selectedProducts', products, 7);
}
