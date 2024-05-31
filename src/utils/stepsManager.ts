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
  const nextStepButton = document.querySelector('#next-to-step-2') as HTMLButtonElement;
  const previousStepButton = document.querySelector('#previous-to-step-1') as HTMLButtonElement;
  const textarea = document.querySelector('[data-text-area]') as HTMLTextAreaElement;

  step2Div.style.display = 'none';
  if (nextStepButton) {
    nextStepButton.addEventListener('click', () => {
      if (step1Div && step2Div && !nextStepButton.hasAttribute('disabled')) {
        step1Div.style.display = 'none';
        step2Div.style.display = 'block';

        const products: Product[] = getCookie('selectedProducts') || [];
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
