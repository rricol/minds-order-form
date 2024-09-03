import { checkValidCart } from './checkFunctions';
import {
  attachAddButtonEvents,
  attachClearButtonEvents,
  attachStepsButtonEvents,
} from './eventHandlers';
import { updateCartChip, updateCartList, updatePricing } from './updateFunctions';

function initStepPage() {
  const step2Div = document.querySelector('[ns-mindsorder-step="2"]') as HTMLElement;

  step2Div.style.display = 'none';
}

export function initOrderPage() {
  initStepPage();
  updateCartList();
  updatePricing();
  attachClearButtonEvents();
  attachStepsButtonEvents();
  checkValidCart();
}

export function initCart() {
  updateCartChip();
  attachAddButtonEvents();
}
