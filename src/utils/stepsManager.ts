import { getCookie } from './cookieManager';
import { handleNextStep, handlePreviousStep } from './handlersFunctions';

interface Product {
  type: string;
  title: string;
  quantity: number;
  quantityA3?: number;
  quantityA2?: number;
}

export function quantitiesAreSet(): boolean {
  const products: Product[] = getCookie('selectedProducts') || [];
  if (
    products.every(
      (product) => product.quantity !== 0 && product.quantityA3 !== 0 && product.quantityA2 !== 0
    )
  ) {
    // Check if any selectedProducts has all three possible quantity to 0
    const orderProductSelectedWrapper = document.querySelector(
      '.order_product-selected-wrapper'
    ) as HTMLElement;
    const alertDiv = document.createElement('div');
    alertDiv.classList.add('alert-message');
    alertDiv.textContent = "Certain produits n'ont pas de quantité sélectionnée.";
    orderProductSelectedWrapper.insertBefore(alertDiv, orderProductSelectedWrapper.firstChild);

    return false;
  }

  return true;
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
