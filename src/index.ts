import { loadProductsFromCookie } from './utils/cookieManager';
import {
  attachAddButtonEvents,
  attachQuantityChangeEvents,
  attachRemoveButtonEvents,
} from './utils/eventHandlers';
import { calculatePricing, updateSelectedProductsMessage } from './utils/pricing';
import { initSteps } from './utils/stepsManager';

document.addEventListener('DOMContentLoaded', () => {
  loadProductsFromCookie();
  updateSelectedProductsMessage();
  calculatePricing();
  attachAddButtonEvents();
  attachRemoveButtonEvents();
  attachQuantityChangeEvents();
  initSteps();
});
