import { checkValidCart } from './checkFunctions';
import {
  attachQuantityActionsEvents,
  attachQuantityChangeEvents,
  attachRemoveButtonEvents,
} from './eventHandlers';
import { generateResourceItem } from './generateFunctions';
import { getRawPrice, getShipping } from './getFunctions';
import { getLocalStorage } from './localStorage';

export function updateCartChip() {
  const orderList = getLocalStorage('orderList');
  const cartChips = document.querySelectorAll('[ns-mindsorder-cartChip]');

  cartChips.forEach((chip) => {
    chip.textContent = orderList.length.toString();
  });
}

export function updateCartList() {
  const orderList = getLocalStorage('orderList');
  const cartList = document.querySelector('[ns-mindsorder-resourceList]') as HTMLElement;

  cartList.innerHTML = '';

  if (orderList.length === 0) {
    cartList.innerHTML = '<p>Sélectionnez une ressource pour la voir apparaître ici</p>';
    return;
  }

  orderList.forEach((resource) => {
    const productElement = generateResourceItem(resource);
    cartList.appendChild(productElement);
  });

  attachRemoveButtonEvents();
  attachQuantityActionsEvents();
  attachQuantityChangeEvents();
}

export function updatePricing() {
  const totalElement = document.querySelectorAll(
    '[ns-mindsorder-price]'
  ) as NodeListOf<HTMLElement>;
  const shippingElement = document.querySelectorAll(
    '[ns-mindsorder-shipping]'
  ) as NodeListOf<HTMLElement>;

  const total = getRawPrice();
  const shipping = getShipping();

  totalElement.forEach((element) => {
    element.textContent = total.toString();
  });
  shippingElement.forEach((element) => {
    element.textContent = shipping.toString();
  });
}

export function updateEverything() {
  updateCartChip();
  updateCartList();
  updatePricing();
  checkValidCart();
}
