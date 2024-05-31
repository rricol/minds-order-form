import { getCookie } from './cookieManager';
import { getPricing } from './pricing';

interface Product {
  type: string;
  title: string;
  quantity: number;
  quantityA3?: number;
  quantityA2?: number;
}

export function initSteps(): void {
  const step1Div = document.querySelector('[data-step="1"]') as HTMLElement;
  const step2Div = document.querySelector('[data-step="2"]') as HTMLElement;
  const nextStepButtons = document.querySelectorAll(
    '[data-action="next-step"]'
  ) as NodeListOf<HTMLButtonElement>;
  const previousStepButton = document.querySelector('#previous-to-step-1') as HTMLButtonElement;
  const textarea = document.querySelector('[data-text-area]') as HTMLTextAreaElement;

  step2Div.style.display = 'none';
  if (nextStepButtons) {
    nextStepButtons.forEach((button) => {
      button.addEventListener('click', () => {
        if (step1Div && step2Div && !button.hasAttribute('disabled')) {
          step1Div.style.display = 'none';
          step2Div.style.display = 'block';

          const products: Product[] = getCookie('selectedProducts') || [];

          // Check if any selectedProducts has all three possible quantity to 0
          if (
            products.every(
              (product) =>
                product.quantity === 0 && product.quantityA3 === 0 && product.quantityA2 === 0
            )
          ) {
            const orderProductSelectedWrapper = document.querySelector(
              '.order_product-selected-wrapper'
            ) as HTMLElement;
            const alertDiv = document.createElement('div');
            alertDiv.classList.add('alert-message');
            alertDiv.textContent = "Certain produits n'ont pas de quantité sélectionnée.";
            orderProductSelectedWrapper.insertBefore(
              alertDiv,
              orderProductSelectedWrapper.firstChild
            );

            return;
          }

          let emailContent = `Prix : ${getPricing()} CHF\n+9 CHF de frais de port\n\nProduits sélectionnés:\n`;
          emailContent += products
            .map((product) => {
              const { type, title, quantity, quantityA3, quantityA2 } = product;
              if (type === 'Infographie') {
                return `${type}: ${title} - A3: ${quantityA3} - A2: ${quantityA2}`;
              }
              return `${type}: ${title} - Quantité: ${quantity}`;
            })
            .join('\n');

          if (textarea) {
            textarea.value = emailContent;
            textarea.disabled = true;
          }
        }
      });
    });
  }

  if (previousStepButton) {
    previousStepButton.addEventListener('click', () => {
      if (step1Div && step2Div) {
        step2Div.style.display = 'none';
        step1Div.style.display = 'block';
      }
    });
  }
}
