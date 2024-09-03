import { toast } from './errorhandler';
import { generateResourceItem } from './generateFunctions';
import { getLocalStorage, initiateLocalStorage } from './localStorage';

document.addEventListener('DOMContentLoaded', () => {
  // Check if LocalStorage is available
  if (typeof Storage === 'undefined') {
    toast('LocalStorage is not available');
    return;
  }

  initiateLocalStorage();
  const cart = getLocalStorage('orderList');
  const cartList = document.querySelector('[ns-mindsorder-element="list"]') as HTMLElement;

  // set cart chips
  const cartChips = document.querySelectorAll('[ns-mindsorder-element="cart-chip"]');
  cartChips.forEach((chip) => {
    chip.textContent = cart.length.toString();
  });

  if (cart.length === 0) {
    cartList.innerHTML = '<p>Sélectionnez des resources pour les voir apparaitre ici</p>';
    return;
  }

  // set cart list
  cart.forEach((resource) => {
    const productElement = generateResourceItem(resource);
    cartList.appendChild(productElement);
  });
});
