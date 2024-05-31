import { getCookie } from './cookieManager';

interface Product {
  type: string;
  title: string;
  quantity: number;
  quantityA3?: number;
  quantityA2?: number;
}

export function calculatePricing(): void {
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

  const countTotalElement = document.querySelector('[data-count-total]') as HTMLElement;
  countTotalElement.innerHTML = total.toString();
}

export function updateSelectedProductsMessage(): void {
  const selectedProductsWrapper = document.querySelector('[data-selected-products]') as HTMLElement;
  const selectedProductElements = selectedProductsWrapper.querySelectorAll('.selected-product');
  const selectedProductCount = document.querySelector(
    '[data-selected-product-count]'
  ) as HTMLElement;
  const nextStepButton = document.querySelector('#next-to-step-2') as HTMLButtonElement;

  const productCount = selectedProductElements.length;
  const disabled = productCount === 0;

  nextStepButton?.toggleAttribute('disabled', disabled);
  nextStepButton?.classList.toggle('is-disabled', disabled);
  selectedProductCount.innerHTML =
    productCount === 0
      ? '<span>Aucune ressource sélectionnée</span>'
      : `<span class="product-count">${productCount}</span> ressource${productCount > 1 ? 's' : ''} sélectionnée${productCount > 1 ? 's' : ''}`;
}
