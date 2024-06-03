import { getCookie, removeAllResourcesFromCookie, removeResourceFromCookie } from './cookieManager';
import { getPricing, getResourcePricing } from './getFunctions';
import { addResourceToSelectedList } from './productManager';
import type { Product } from './type';
import {
  updatePricing,
  updateResourceCount,
  updateResourceQuantityInCookie,
} from './updateFunctions';

function resourceAlreadySelected(productType: string, productTitle: string): boolean {
  const products = getCookie('selectedProducts') || [];
  return products.some(
    (product: { type: string; title: string }) =>
      product.type === productType && product.title === productTitle
  );
}

export function handleRemove(event: Event): void {
  const productElement = (event.target as HTMLElement).closest('.selected-product') as HTMLElement;
  const productType = productElement.querySelector('.nmra-resource_type')?.textContent;
  const productTitle = productElement.querySelector('.nmra-resource_name')?.textContent;

  if (productType && productTitle) {
    productElement.remove();
    removeResourceFromCookie(productType, productTitle);
    updateResourceCount();
    updatePricing(); // Update pricing after removing a product
  }
}

export function handleInscrease(event: Event): void {
  const input = (event.target as HTMLElement)
    .closest('.nmra-resource_quantity-group')
    ?.querySelector('input') as HTMLInputElement;
  const format = input.getAttribute('data-nmra-format');
  const resourceType = input
    .closest('[data-nmra-element="card"]')
    ?.querySelector('.nmra-resource_type')?.textContent;
  const resourceName = input
    .closest('[data-nmra-element="card"]')
    ?.querySelector('.nmra-resource_name');

  const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
  input.value = (currentQuantity + 1).toString();

  if (resourceType && resourceName) {
    updateResourceQuantityInCookie(
      resourceType,
      resourceName.textContent as string,
      format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
    );
    updatePricing(); // Update pricing after changing quantity
  }
}

export function handleDecrease(event: Event): void {
  const input = (event.target as HTMLElement)
    .closest('.nmra-resource_quantity-group')
    ?.querySelector('input') as HTMLInputElement;
  const format = input.getAttribute('data-nmra-format');
  const resourceType = input
    .closest('[data-nmra-element="card"]')
    ?.querySelector('.nmra-resource_type')?.textContent;
  const resourceName = input
    .closest('[data-nmra-element="card"]')
    ?.querySelector('.nmra-resource_name');

  const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
  if (currentQuantity > 0) {
    input.value = (currentQuantity - 1).toString();
  }

  if (resourceType && resourceName) {
    updateResourceQuantityInCookie(
      resourceType,
      resourceName.textContent as string,
      format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
    );
    updatePricing(); // Update pricing after changing quantity
  }
}

export function handleInputChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  const newQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
  const format = input.getAttribute('data-nmra-format');
  const resourceType = input
    .closest('[data-nmra-element="card"]')
    ?.querySelector('.nmra-resource_type')?.textContent;
  const resourceName = input
    .closest('[data-nmra-element="card"]')
    ?.querySelector('.nmra-resource_name');

  if (resourceType && resourceName) {
    if (newQuantity >= 0) {
      updateResourceQuantityInCookie(
        resourceType,
        resourceName.textContent as string,
        format ? { [format]: newQuantity } : { quantity: newQuantity }
      ); // Update pricing after changing quantity
    } else {
      input.value = '0';
    }
    updatePricing();
  }
}

export function handleAddResource(event: Event): void {
  const productElement = (event.target as HTMLElement).closest(
    '[data-nmra-element="resource"]'
  ) as HTMLElement;
  const titleElement = productElement.querySelector('[data-nmra-element="title"]') as HTMLElement;
  const resourceTitle = titleElement?.innerText as string;
  const resourceType = titleElement.getAttribute('data-nmra-type') as string;
  if (!resourceAlreadySelected(resourceType, resourceTitle)) {
    addResourceToSelectedList(resourceType, resourceTitle);
  }
}

export function handleClearAll(): void {
  document.querySelectorAll('.selected-product').forEach((productElement) => {
    productElement.remove();
  });
  removeAllResourcesFromCookie();
  updateResourceCount();
  updatePricing();
}

function createResourceRow(product: Product): string {
  const { type, title, quantity, quantityA3, quantityA2 } = product;
  return `
    <div class="order-summary_row" >
      <div class="order-summary_cell main">${title}</div>
      <div class="order-summary_cell">${type}</div>
      <div class="order-summary_cell">${type === 'Infographie' ? `A3: ${quantityA3} <br> A2: ${quantityA2}` : `${quantity}`}</div>
      <div class="order-summary_cell price">${getResourcePricing(product)}.-</div>
    </div>
  `;
}

export function handleNextStep(): void {
  const step1Div = document.querySelector('[data-nmra-element="step1"]') as HTMLElement;
  const step2Div = document.querySelector('[data-nmra-element="step2"]') as HTMLElement;
  const textarea = document.querySelector('[data-nmra-element="text-area"]') as HTMLTextAreaElement;
  const totalPricing = document.querySelector('[data-nmra-element="total-price"]') as HTMLElement;
  const summaryContent = document.querySelector(
    '[data-nmra-element="summary-content"]'
  ) as HTMLElement;
  const summaryWrapper = document.querySelector(
    '[data-nmra-element="summary-wrapper"]'
  ) as HTMLElement;

  if (totalPricing) {
    totalPricing.textContent = `${parseInt(getPricing()) + 9}.- CHF`;
  }

  if (step1Div && step2Div) {
    step1Div.style.display = 'none';
    step2Div.style.display = 'block';

    const products = getCookie('selectedProducts') || [];
    // let emailContent = `Prix : ${getPricing()} CHF\n+9 CHF de frais de port\n\nProduits sélectionnés:\n`;

    products.map((product: Product) => {
      // const { type, title, quantity, quantityA3, quantityA2 } = product;
      const productElement = document.createElement('div');
      productElement.classList.add('order-summary_row');
      productElement.innerHTML = createResourceRow(product);
      summaryContent.appendChild(productElement);

      // if (type === 'Infographie') {
      //   emailContent += `${type}: ${title} - A3: ${quantityA3} - A2: ${quantityA2}\n`;
      // } else {
      //   emailContent += `${type}: ${title} - Quantité: ${quantity}\n`;
      // }
    });

    if (textarea) {
      textarea.value = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@numeraswiss/minds-order-form@latest/dist/emailstyle.css">\n${summaryWrapper.innerHTML}`;
      textarea.disabled = true;
    }
  }
}

export function handlePreviousStep(): void {
  const step1Div = document.querySelector('[data-nmra-action="step1"]') as HTMLElement;
  const step2Div = document.querySelector('[data-nmra-action="step2"]') as HTMLElement;
  if (step1Div && step2Div) {
    step1Div.style.display = 'block';
    step2Div.style.display = 'none';
  }
}
