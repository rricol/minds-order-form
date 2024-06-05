import { getCookie, removeAllResourcesFromCookie, removeResourceFromCookie } from './cookieManager';
import { getPricing, getResourceCount, getResourcePricing } from './getFunctions';
import { addResourceToSelectedList } from './productManager';
import { checkQuantities } from './stepsManager';
import type { Product } from './type';
import { updateCart, updateData, updateResourceQuantityInCookie } from './updateFunctions';

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
    updateData();
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
    updateData(); // Update pricing after changing quantity
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
    updateData(); // Update pricing after changing quantity
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
  }
  updateData();
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
  updateData();
}

export function handleClearAll(): void {
  document.querySelectorAll('.selected-product').forEach((productElement) => {
    productElement.remove();
  });
  removeAllResourcesFromCookie();
  updateData();
}

function createResourceRow(product: Product): string {
  const { type, title, quantity, quantityA3, quantityA2 } = product;
  return `
      <div class="order-summary_cell main">${title}</div>
      <div class="order-summary_cell">${type}</div>
      <div class="order-summary_cell">${type === 'Infographie' ? `A3: ${quantityA3} <br> A2: ${quantityA2}` : `${quantity}`}</div>
      <div class="order-summary_cell price">${getResourcePricing(product)}.-</div>
  `;
}

function getEmailContent(products: Product[]): string {
  let emailContent = `
    <table style="border-collapse: collapse; color: black;">
      <tr>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantité</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
      </tr>
  `;

  products.map((product: Product) => {
    const { type, title, quantity, quantityA3, quantityA2 } = product;
    emailContent += `
      <tr>
        <td style="padding: 8px; border: 1px solid black;">${type}</td>
        <td style="padding: 8px; border: 1px solid black;">${title}</td>
        <td style="padding: 8px; border: 1px solid black;">${type === 'Infographie' ? `A3: ${quantityA3} <br> A2: ${quantityA2}` : `${quantity}`}</td>
        <td style="padding: 8px; border: 1px solid black;">${getResourcePricing(product)}.-</td>
      </tr>
    `;
  });
  emailContent += `
    <tr>
      <td style="padding: 8px; border: 1px solid black; text-align: right; font-weight: bold;">${parseInt(getPricing()) + 9} (frais de port inclus)</td>
    </tr>`;

  emailContent += `</table>`;

  return emailContent;
}

export function handleNextStep(): void {
  const step1Div = document.querySelector('[data-nmra-element="step1"]') as HTMLElement;
  const step2Div = document.querySelector('[data-nmra-element="step2"]') as HTMLElement;
  const textarea = document.querySelector('[data-nmra-element="text-area"]') as HTMLTextAreaElement;
  const totalPricing = document.querySelector('[data-nmra-element="total-price"]') as HTMLElement;
  const summaryContent = document.querySelector(
    '[data-nmra-element="summary-content"]'
  ) as HTMLElement;

  if (getResourceCount() > 0 && checkQuantities()) {
    if (totalPricing) {
      totalPricing.textContent = `${parseInt(getPricing()) + 9}.- CHF`;
    }

    if (step1Div && step2Div) {
      step1Div.style.display = 'none';
      step2Div.style.display = 'block';

      const products = getCookie('selectedProducts') || [];

      products.map((product: Product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('order-summary_row');
        productElement.innerHTML = createResourceRow(product);
        summaryContent.appendChild(productElement);
      });

      if (textarea) {
        textarea.value = getEmailContent(products);
        textarea.disabled = true;
      }
    }
  }
}

export function handlePreviousStep(): void {
  const step1Div = document.querySelector('[data-nmra-element="step1"]') as HTMLElement;
  const step2Div = document.querySelector('[data-nmra-element="step2"]') as HTMLElement;

  if (step1Div && step2Div) {
    step1Div.style.display = 'block';
    step2Div.style.display = 'none';
  }
}

function createToast(message: string): void {
  const toast = document.createElement('div');
  toast.classList.add('toast-success');
  toast.textContent = message;
  const button = document.createElement('button');
  button.classList.add('button', 'is-secondary', 'is-small', 'is-alternate');
  button.textContent = 'Aller au panier';
  button.addEventListener('click', () => {
    window.location.href = '/commander-wip';
  });
  toast.appendChild(button);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);

  toast.addEventListener('click', () => {
    toast.remove();
  });
}

export function handleAddRessourceToCart(): void {
  const titleElement = document.querySelector('[data-nmra-element="title"]') as HTMLElement;
  const resourceTitle = titleElement?.innerText as string;
  const resourceType = titleElement.getAttribute('data-nmra-type') as string;
  if (!resourceAlreadySelected(resourceType, resourceTitle)) {
    const product: Product = {
      type: resourceType,
      title: resourceTitle,
      quantity: resourceType === 'Infographie' ? 1 : 0,
      quantityA2: 0,
      quantityA3: 0,
    };
    updateCart(product);
    createToast('Ressource ajoutée au panier');
  } else {
    createToast('La ressource est déjà dans le panier');
  }
}
