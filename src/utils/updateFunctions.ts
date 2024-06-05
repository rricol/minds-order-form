import { getCookie, setCookie } from './cookieManager';
import { getResourceCount } from './getFunctions';
import { checkQuantities } from './stepsManager';
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
  const selectedProductCount = document.querySelector('[data-nmra-element="count"]') as HTMLElement;
  const cartCount = document.querySelector('[data-nmra-element="cart-count"]') as HTMLElement;

  const productCount = getResourceCount();

  selectedProductCount.innerHTML =
    productCount === 0
      ? '<span>Aucune ressource sélectionnée</span>'
      : `<span class="product-count">${productCount}</span> ressource${productCount > 1 ? 's' : ''} sélectionnée${productCount > 1 ? 's' : ''}`;
  cartCount.textContent = productCount.toString();
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

export function updateNextStepButtons(): void {
  const nextStepButtons = document.querySelectorAll(
    '[data-nmra-action="next-step"]'
  ) as NodeListOf<HTMLButtonElement>;
  const disabled = getResourceCount() === 0 || !checkQuantities();

  nextStepButtons?.forEach((element) => {
    if (disabled) {
      element.classList.add('is-disabled');
      element.setAttribute('disabled', disabled.toString());
    } else {
      element.classList.remove('is-disabled');
      element.removeAttribute('disabled');
    }
  });
}

export function updateData(): void {
  updatePricing();
  updateResourceCount();
  updateNextStepButtons();
}

export function updateCart(Product: Product): void {
  const products: Product[] = getCookie('selectedProducts') || [];
  products.push(Product);
  setCookie('selectedProducts', products, 7);
}
