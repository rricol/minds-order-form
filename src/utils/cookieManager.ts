/* eslint-disable @typescript-eslint/no-explicit-any */
import { addResourceToSelectedList } from './productManager';
import type { Product } from './type';

export function setCookie(name: string, value: any, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/;SameSite=Lax;Secure`;
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

export function removeResourceFromCookie(productType: string, productTitle: string): void {
  let products: Product[] = getCookie('selectedProducts') || [];
  products = products.filter(
    (product) => !(product.type === productType && product.title === productTitle)
  );
  setCookie('selectedProducts', products, 7);
}

export function removeAllResourcesFromCookie(): void {
  setCookie('selectedProducts', [], 7);
}

export function loadResourcesFromCookie(): void {
  const products: Product[] = getCookie('selectedProducts') || [];
  products.forEach((product) =>
    addResourceToSelectedList(
      product.type,
      product.title,
      product.quantity,
      product.quantityA3,
      product.quantityA2
    )
  );
}

export function updateCookie(): void {
  const selectedProductsWrapper = document.querySelector(
    '[data-nmra-element="list"]'
  ) as HTMLElement;
  const selectedProductElements = selectedProductsWrapper.querySelectorAll('.selected-product');
  const products: Product[] = Array.from(selectedProductElements).map((productElement) => {
    const productType = productElement.querySelector('.nmra-resource_type')?.textContent as string;
    const productTitle = productElement.querySelector('.nmra-resource_name')?.textContent as string;
    const quantity =
      productType === 'Infographie'
        ? 0
        : parseInt((productElement.querySelector('.quantity-input') as HTMLInputElement).value);
    const quantityA3 =
      productType === 'Infographie'
        ? parseInt(
            (productElement.querySelector('[data-nmra-format="A3"]') as HTMLInputElement).value
          )
        : 0;
    const quantityA2 =
      productType === 'Infographie'
        ? parseInt(
            (productElement.querySelector('[data-nmra-format="A2"]') as HTMLInputElement).value
          )
        : 0;
    return { type: productType, title: productTitle, quantity, quantityA3, quantityA2 };
  });
  setCookie('selectedProducts', products, 7);
}
