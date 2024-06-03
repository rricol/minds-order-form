import { getCookie, setCookie } from './cookieManager';
import type { Product } from './type';

export function updatePricing(): void {
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

  const countTotalElement = document.querySelector('[data-nmra-element="total"]') as HTMLElement;
  countTotalElement.textContent = total.toString();
}

export function updateResourceCount(): void {
  const selectedProductsWrapper = document.querySelector(
    '[data-nmra-element="list"]'
  ) as HTMLElement;
  const selectedProductElements = selectedProductsWrapper.querySelectorAll('.selected-product');
  const selectedProductCount = document.querySelector('[data-nmra-element="count"]') as HTMLElement;
  const nextStepButtons = document.querySelectorAll(
    '[data-nmra-action="next-step"]'
  ) as NodeListOf<HTMLButtonElement>;

  const productCount = selectedProductElements.length;
  const disabled = productCount === 0;

  nextStepButtons?.forEach((element) => {
    if (disabled) {
      element.classList.add('is-disabled');
      element.setAttribute('disabled', disabled.toString());
    } else {
      element.classList.remove('is-disabled');
      element.removeAttribute('disabled');
    }
  });
  selectedProductCount.innerHTML =
    productCount === 0
      ? '<span>Aucune ressource sélectionnée</span>'
      : `<span class="product-count">${productCount}</span> ressource${productCount > 1 ? 's' : ''} sélectionnée${productCount > 1 ? 's' : ''}`;
}

export function updateResourceQuantityInCookie(
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
  updatePricing();
}
