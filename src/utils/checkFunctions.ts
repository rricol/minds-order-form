import { toast } from './errorhandler';
import { getLocalStorage } from './localStorage';

export function checkValidCart() {
  const productList = getLocalStorage('orderList');
  const nextButtons = document.querySelectorAll('[ns-mindsorder-btn="next"]');
  if (productList.length === 0) {
    toast('Votre panier est vide');
    nextButtons.forEach((button) => {
      button.setAttribute('disabled', 'true');
      button.classList.add('is-disabled');
    });
    return true;
  }
  nextButtons.forEach((button) => {
    button.removeAttribute('disabled');
    button.classList.remove('is-disabled');
  });
  return false;
}
