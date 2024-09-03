import type { Resource } from './types';
import { updateEverything } from './updateFunctions';

// Note: This file is used to manipulate the localStorage

export function initiateLocalStorage(): void {
  if (!localStorage.getItem('orderList')) {
    const initialOrderList: Resource[] = [];
    localStorage.setItem('orderList', JSON.stringify(initialOrderList));
  }
}

export function getLocalStorage(key: string): Resource[] {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

export function updateLocalStorage(product: Resource): void {
  initiateLocalStorage();
  const orderList = getLocalStorage('orderList');
  if (orderList.some((p) => p.title === product.title)) {
    return;
  }
  orderList.push(product);
  localStorage.setItem('orderList', JSON.stringify(orderList));
}

export function updateResourceQuantity(product: Resource): void {
  const orderList = getLocalStorage('orderList');
  orderList.map((p) => {
    if (p.title === product.title) {
      p.quantity = product.quantity;
    }
  });
  localStorage.setItem('orderList', JSON.stringify(orderList));
  updateEverything();
}

export function removeLocalStorage(product: Resource): void {
  const orderList = getLocalStorage('orderList');
  const updatedOrderList = orderList.filter((p) => p.title !== product.title);
  localStorage.setItem('orderList', JSON.stringify(updatedOrderList));
}

export function clearLocalStorage(): void {
  localStorage.removeItem('orderList');
}
