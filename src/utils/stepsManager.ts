import { getCookie } from './cookieManager';
import { handleNextStep, handlePreviousStep } from './handlersFunctions';
import type { Product } from './type';

export function checkQuantities(): boolean {
  const products: Product[] = getCookie('selectedProducts') || [];
  if (products.length === 0) {
    return false;
  }
  return products.every(
    (product) =>
      product.quantity > 0 || (product.quantityA3 ?? 0) > 0 || (product.quantityA2 ?? 0) > 0
  );
}

export function initSteps(): void {
  const step2Div = document.querySelector('[data-nmra-element="step2"]') as HTMLElement;
  const nextStepButtons = document.querySelectorAll(
    '[data-nmra-action="next-step"]'
  ) as NodeListOf<HTMLButtonElement>;
  const previousStepButton = document.querySelectorAll(
    '[data-nmra-action="previous-step"]'
  ) as NodeListOf<HTMLButtonElement>;

  step2Div.style.display = 'none';
  if (nextStepButtons) {
    nextStepButtons.forEach((button) => {
      button.addEventListener('click', handleNextStep);
    });
  }

  if (previousStepButton) {
    previousStepButton.forEach((button) => {
      button.addEventListener('click', handlePreviousStep);
    });
  }
}
