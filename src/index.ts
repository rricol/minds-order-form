import { toast } from './utils/errorhandler';
import { initCart, initOrderPage } from './utils/initFunctions';
import { initiateLocalStorage } from './utils/localStorage';

// Note: Entry point for the application
document.addEventListener('DOMContentLoaded', () => {
  // check if LocalStorage is available
  if (typeof Storage === 'undefined') {
    toast('LocalStorage is not available');
    return;
  }
  initiateLocalStorage();

  const currentLocation = window.location;
  const pageUrl = currentLocation.pathname.split('/')[1];

  // check if it matches "/commander"
  if (pageUrl === 'commander') {
    initOrderPage();
  }
  initCart();
});
