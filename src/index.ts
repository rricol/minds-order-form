import { loadResourcesFromCookie } from './utils/cookieManager';
import { attachAddButtonEvents, attachClearButtonEvents } from './utils/eventHandlers';
import { initSteps } from './utils/stepsManager';

document.addEventListener('DOMContentLoaded', () => {
  loadResourcesFromCookie();
  attachAddButtonEvents();
  attachClearButtonEvents();
  initSteps();
});
