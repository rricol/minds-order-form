import { getCookie, removeProductFromCookie, updateProductQuantityInCookie } from './cookieManager';
import { updateSelectedProductsMessage } from './pricing';
import { addProductToSelectedList } from './productManager';

export function attachAddButtonEvents(): void {
  document.querySelectorAll('[data-action="add"]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productElement = (event.target as HTMLElement).closest(
        '[data-product-type]'
      ) as HTMLElement;
      const productType = productElement.getAttribute('data-product-type') as string;
      const productTitle = productElement.querySelector('h3')?.innerText as string;

      if (!isProductSelected(productType, productTitle)) {
        addProductToSelectedList(productType, productTitle);
      }
    });
  });
}

function isProductSelected(productType: string, productTitle: string): boolean {
  const products = getCookie('selectedProducts') || [];
  return products.some(
    (product: { type: string; title: string }) =>
      product.type === productType && product.title === productTitle
  );
}

export function attachRemoveButtonEvents(): void {
  document.querySelectorAll('.remove-product').forEach((button) => {
    button.addEventListener('click', (event) => {
      const productElement = (event.target as HTMLElement).closest(
        '.selected-product'
      ) as HTMLElement;
      const productType = productElement.querySelector('.text-size-small')?.textContent as string;
      const productTitle = productElement.querySelector('.text-weight-semibold')
        ?.textContent as string;

      if (productType && productTitle) {
        productElement.remove();
        removeProductFromCookie(productType, productTitle);
        updateSelectedProductsMessage();
      }
    });
  });
}

export function attachQuantityChangeEvents(): void {
  document.querySelectorAll('.quantity-change').forEach((button) => {
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
      const productType = input.closest('.selected-product-item')?.querySelector('.text-size-small')
        ?.textContent as string;
      const productTitle = input
        .closest('.selected-product-item')
        ?.querySelector('.text-weight-semibold')?.textContent as string;

      if (productType && productTitle) {
        updateProductQuantityInCookie(
          productType,
          productTitle,
          format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
        );
      }
    });
  });

  document.querySelectorAll('.quantity-input').forEach((input) => {
    input.addEventListener('change', (event) => {
      const newQuantity = isNaN(parseInt((event.target as HTMLInputElement).value))
        ? 0
        : parseInt((event.target as HTMLInputElement).value);
      const format = (event.target as HTMLInputElement).getAttribute('data-format') as string;
      const productType = input.closest('.selected-product-item')?.querySelector('.text-size-small')
        ?.textContent as string;
      const productTitle = input
        .closest('.selected-product-item')
        ?.querySelector('.text-weight-semibold')?.textContent as string;

      if (productType && productTitle) {
        if (newQuantity >= 0) {
          updateProductQuantityInCookie(
            productType,
            productTitle,
            format ? { [format]: newQuantity } : { quantity: newQuantity }
          );
        } else {
          (event.target as HTMLInputElement).value = '0';
        }
      }
    });
  });
}
