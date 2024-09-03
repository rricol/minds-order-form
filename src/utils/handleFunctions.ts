import { checkValidCart } from './checkFunctions';
import { generateEmailContent, generateSummary } from './generateFunctions';
import {
  clearLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  updateLocalStorage,
  updateResourceQuantity,
} from './localStorage';
import type { Resource } from './types';
import { updateEverything } from './updateFunctions';

export function handeAddToCart(event: Event) {
  event.preventDefault();
  const resourceElement = (event.target as HTMLElement).closest(
    '[ns-mindsorder-resource]'
  ) as HTMLElement;
  const resourceTitle = resourceElement.getAttribute('ns-mindsorder-resourceTitle');
  const resourceType = resourceElement.getAttribute('ns-mindsorder-resourceType');

  let resource: Resource | null = null;

  if (resourceTitle && resourceType) {
    resource = {
      title: resourceTitle,
      type: resourceType,
      quantity: 1,
    };
  }

  if (resource) {
    updateLocalStorage(resource);
  }
  updateEverything();
}

export function handleRemoveFromCart(event: Event) {
  event.preventDefault();
  const resourceElement = (event.target as HTMLElement).closest(
    '[ns-mindsorder-resource]'
  ) as HTMLElement;
  const resourceTitle = resourceElement.getAttribute('ns-mindsorder-resourceTitle');
  const resourceType = resourceElement.getAttribute('ns-mindsorder-resourceType');
  const resourceList = getLocalStorage('orderList');

  const resource = resourceList.find((p) => p.title === resourceTitle && p.type === resourceType);
  if (resource) {
    removeLocalStorage(resource);
  }
  updateEverything();
}

export function handleClearCart() {
  clearLocalStorage();
  updateEverything();
}

export function handleQuantityChange(event: Event) {
  const resourceElement = (event.target as HTMLElement).closest(
    '[ns-mindsorder-resource]'
  ) as HTMLElement;
  const input = resourceElement.querySelector('[ns-mindsorder-input]') as HTMLInputElement;
  const resourceTitle = resourceElement.getAttribute('ns-mindsorder-resourceTitle');
  const resourceType = resourceElement.getAttribute('ns-mindsorder-resourceType');
  const resourceList = getLocalStorage('orderList');

  const resource = resourceList.find((p) => p.title === resourceTitle && p.type === resourceType);
  if (!resource) {
    return;
  }

  const action = (event.target as HTMLElement).getAttribute('ns-mindsorder-btn');
  if (action === 'increase') {
    if (resource.quantity !== undefined) {
      resource.quantity += 1;
      input.value = resource.quantity.toString();
    }
  } else if (action === 'decrease') {
    if (!(resource.quantity === 1) && resource.quantity !== undefined) {
      resource.quantity -= 1;
      input.value = resource.quantity.toString();
    }
  }

  updateResourceQuantity(resource);
}

export function handleInputChange(event: Event) {
  const resourceElement = (event.target as HTMLElement).closest(
    '[ns-mindsorder-resource]'
  ) as HTMLElement;
  const input = resourceElement.querySelector('[ns-mindsorder-input]') as HTMLInputElement;
  const newQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
  const resourceTitle = resourceElement.getAttribute('ns-mindsorder-resourceTitle');
  const resourceType = resourceElement.getAttribute('ns-mindsorder-resourceType');
  const resourceList = getLocalStorage('orderList');

  const resource = resourceList.find((p) => p.title === resourceTitle && p.type === resourceType);
  if (!resource) {
    return;
  }
  resource.quantity = newQuantity;
  updateResourceQuantity(resource);
}

export function handleNextStep() {
  const step1Div = document.querySelector('[ns-mindsorder-step="1"]') as HTMLElement;
  const step2Div = document.querySelector('[ns-mindsorder-step="2"]') as HTMLElement;

  if (checkValidCart()) {
    return;
  }

  if (step1Div && step2Div) {
    step1Div.style.display = 'none';
    step2Div.style.display = 'block';

    window.scrollTo(0, 0);
  }

  generateSummary();
  generateEmailContent();
}

export function handlePreviousStep() {
  const step1Div = document.querySelector('[ns-mindsorder-step="1"]') as HTMLElement;
  const step2Div = document.querySelector('[ns-mindsorder-step="2"]') as HTMLElement;

  if (step1Div && step2Div) {
    step1Div.style.display = 'block';
    step2Div.style.display = 'none';

    window.scrollTo(0, 0);
  }
}
