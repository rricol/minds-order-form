import { updateCookie } from './cookieManager';
import {
  handleDecrease,
  handleInputChange,
  handleInscrease,
  handleRemove,
} from './handlersFunctions';
import { updatePricing, updateResourceCount } from './updateFunctions';

export function addResourceToSelectedList(
  productType: string,
  productTitle: string,
  quantity: number = 1,
  quantityA3: number = 0,
  quantityA2: number = 0
): void {
  const selectedProductsWrapper = document.querySelector(
    '[data-nmra-element="list"]'
  ) as HTMLElement;
  const selectedProductElement = document.createElement('div');
  selectedProductElement.classList.add('selected-product');

  if (productType === 'Infographie') {
    selectedProductElement.innerHTML = `
      <div class="selected-product-item" data-nmra-element="card">
        <span class="nmra-resource_type" >${productType}</span>
        <span class="nmra-resource_name">${productTitle}</span>
        <span class="nmra-resource_quantity-title">Quantités:</span>
        <div class="nmra-resource_quantity-wrapper">
          <div class="nmra-resource_quantity-group">
            <label class="nmra-resource-format">A3:</label>
            <input class="quantity-input" type="number" data-nmra-format="A3" value="${quantityA3}" min="0">
            <div class="quantity-button_wrapper">
              <button class="quantity-change" data-nmra-action="decrease">-</button>
              <button class="quantity-change" data-nmra-action="increase">+</button>
            </div>
          </div>
          <div class="nmra-resource_quantity-group">
            <label class="nmra-resource-format">A2:</label>
            <input class="quantity-input" type="number" data-nmra-format="A2" value="${quantityA2}" min="0">
            <div class="quantity-button_wrapper">
              <button class="quantity-change" data-nmra-action="decrease">-</button>
              <button class="quantity-change" data-nmra-action="increase">+</button>
            </div>
          </div>
          <button class="remove-product" data-nmra-action="remove">Supprimer</button>
        </div>
      </div>
    `;
  } else {
    selectedProductElement.innerHTML = `
    <div class="selected-product-item" data-nmra-element="card">
        <span class="nmra-resource_type">${productType}</span>
        <span class="nmra-resource_name">${productTitle}</span>
        <span class="nmra-resource_quantity-title">Quantités :</span>
        <div class="nmra-resource_quantity-wrapper">
          <div class="nmra-resource_quantity-group">
            <input class="quantity-input" type="number" value="${quantity}" min="1">
            <div class="quantity-button_wrapper">
              <button class="quantity-change" data-nmra-action="decrease">-</button>
              <button class="quantity-change" data-nmra-action="increase">+</button>
            </div>
          </div>
          <button class="remove-product" data-nmra-action="remove">Supprimer</button>
        </div>
      </div>
    `;
  }

  selectedProductsWrapper.appendChild(selectedProductElement);

  selectedProductElement
    .querySelector('[data-nmra-action="remove"]')
    ?.addEventListener('click', handleRemove);

  selectedProductElement.querySelectorAll('[data-nmra-action="increase"]').forEach((button) => {
    button.addEventListener('click', handleInscrease);
  });

  selectedProductElement.querySelectorAll('[data-nmra-action="decrease"]').forEach((button) => {
    button.addEventListener('click', handleDecrease);
  });

  selectedProductElement.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('change', handleInputChange);
  });

  updateResourceCount();
  updateCookie();
  updatePricing();
}
