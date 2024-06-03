import {
  removeProductFromCookie,
  updateCookie,
  updateProductQuantityInCookie,
} from './cookieManager';
import { calculatePricing, updateSelectedProductsMessage } from './pricing';

export function addProductToSelectedList(
  productType: string,
  productTitle: string,
  quantity: number = 1,
  quantityA3: number = 0,
  quantityA2: number = 0
): void {
  const selectedProductsWrapper = document.querySelector('[data-selected-products]') as HTMLElement;
  const selectedProductElement = document.createElement('div');
  selectedProductElement.classList.add('selected-product');

  if (productType === 'Infographie') {
    selectedProductElement.innerHTML = `
      <div class="selected-product-item">
        <span class="text-size-small margin-bottom margin-tiny text-color-secondary">${productType}</span>
        <span class="text-weight-semibold margin-bottom margin-xxsmall">${productTitle}</span>
        <span class="text-size-tiny margin-bottom margin-tiny">Quantités:</span>
        <div class="selected-product_actions-wrapper">
          <span class="selected-product_field-group">
            <label>A3:</label>
            <span>
              <button class="quantity-change" data-action="decrease" data-format-name="A3">-</button>
              <input class="quantity-input" type="number" data-format="A3" value="${quantityA3}" min="0">
              <button class="quantity-change" data-action="increase" data-format-name="A3">+</button>
            </span>
          </span>
          <span class="selected-product_field-group">
            <label>A2:</label>
            <span>
              <button class="quantity-change" data-action="decrease" data-format-name="A2">-</button>
              <input class="quantity-input" type="number" data-format="A2" value="${quantityA2}" min="0">
              <button class="quantity-change" data-action="increase" data-format-name="A2">+</button>
            </span>
          </span>
          <button class="remove-product text-size-small button is-link" data-action="remove">Supprimer</button>
        </div>
      </div>
    `;
  } else {
    selectedProductElement.innerHTML = `
      <div class="selected-product-item">
        <span class="text-size-small margin-bottom margin-tiny text-color-secondary">${productType}</span>
        <span class="text-weight-semibold margin-bottom margin-xxsmall">${productTitle}</span>
        <span class="text-size-tiny margin-bottom margin-tiny">Quantités:</span>
        <div class="selected-product_actions-wrapper">
          <span>
            <button class="quantity-change" data-action="decrease">-</button>
            <input class="quantity-input" type="number" value="${quantity}" min="1">
            <button class="quantity-change" data-action="increase">+</button>
          </span>
          <button class="remove-product text-size-small button is-link" data-action="remove">Supprimer</button>
        </div>
      </div>
    `;
  }

  selectedProductsWrapper.appendChild(selectedProductElement);
  updateSelectedProductsMessage();
  updateCookie();

  selectedProductElement.querySelector('.remove-product')?.addEventListener('click', (event) => {
    const productElement = (event.target as HTMLElement).closest(
      '.selected-product'
    ) as HTMLElement;
    const productType = productElement.querySelector('.text-size-small')?.textContent;
    const productTitle = productElement.querySelector('.text-weight-semibold')?.textContent;

    if (productType && productTitle) {
      productElement.remove();
      removeProductFromCookie(productType, productTitle);
      updateSelectedProductsMessage();
      calculatePricing(); // Update pricing after removing a product
    }
  });

  selectedProductElement.querySelectorAll('.quantity-change').forEach((button) => {
    button.addEventListener('click', (event) => {
      const input = (event.target as HTMLElement)
        .closest('span')
        ?.querySelector('input') as HTMLInputElement;
      const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);

      if ((event.target as HTMLElement).getAttribute('data-action') === 'increase') {
        input.value = (currentQuantity + 1).toString();
      } else if (
        (event.target as HTMLElement).getAttribute('data-action') === 'decrease' &&
        currentQuantity > 0
      ) {
        input.value = (currentQuantity - 1).toString();
      }

      const format = (event.target as HTMLElement).getAttribute('data-format-name');
      const productType = selectedProductElement.querySelector('.text-size-small')?.textContent;
      const productTitle =
        selectedProductElement.querySelector('.text-weight-semibold')?.textContent;

      if (productType && productTitle) {
        updateProductQuantityInCookie(
          productType,
          productTitle,
          format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
        );
        calculatePricing(); // Update pricing after changing quantity
      }
    });
  });

  selectedProductElement.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('change', (event) => {
      const newQuantity = isNaN(parseInt((event.target as HTMLInputElement).value))
        ? 0
        : parseInt((event.target as HTMLInputElement).value);
      const format = (event.target as HTMLInputElement).getAttribute('data-format');
      const productType = input
        .closest('.selected-product-item')
        ?.querySelector('.text-size-small')?.textContent;
      const productTitle = input
        .closest('.selected-product-item')
        ?.querySelector('.text-weight-semibold')?.textContent;

      if (productType && productTitle) {
        if (newQuantity >= 0) {
          updateProductQuantityInCookie(
            productType,
            productTitle,
            format ? { [format]: newQuantity } : { quantity: newQuantity }
          );
          calculatePricing(); // Update pricing after changing quantity
        } else {
          (event.target as HTMLInputElement).value = '0';
        }
      }
    });
  });

  updateSelectedProductsMessage();
  calculatePricing();
}
