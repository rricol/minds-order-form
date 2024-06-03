import {
  handleAddResource,
  handleClearAll,
  handleNextStep,
  handlePreviousStep,
} from './handlersFunctions';

export function attachAddButtonEvents(): void {
  document.querySelectorAll('[data-nmra-action="add"]').forEach((button) => {
    button.addEventListener('click', handleAddResource);
  });
}

export function attachClearButtonEvents(): void {
  document.querySelectorAll('[data-action="clear"]').forEach((button) => {
    button.addEventListener('click', handleClearAll);
  });
}

export function attachStepsButtonEvents(): void {
  document.querySelectorAll('[data-nmra-action="next-step"]').forEach((button) => {
    button.addEventListener('click', handleNextStep);
  });

  document.querySelectorAll('[data-nmra-action="previous-step"]').forEach((button) => {
    button.addEventListener('click', handlePreviousStep);
  });
}
// export function attachRemoveButtonEvents(): void {
//   document.querySelectorAll('.remove-product').forEach((button) => {
//     button.addEventListener('click', (event) => {
//       const productElement = (event.target as HTMLElement).closest(
//         '.selected-product'
//       ) as HTMLElement;
//       const productType = productElement.querySelector('.text-size-small')?.textContent as string;
//       const productTitle = productElement.querySelector('.text-weight-semibold')
//         ?.textContent as string;

//       if (productType && productTitle) {
//         productElement.remove();
//         removeResourceFromCookie(productType, productTitle);
//         updateResourceCount();
//       }
//     });
//   });
// }

// export function attachQuantityChangeEvents(): void {
//   document.querySelectorAll('.quantity-change').forEach((button) => {
//     button.addEventListener('click', (event) => {
//       const input = (event.target as HTMLElement)
//         .closest('span')
//         ?.querySelector('input') as HTMLInputElement;
//       const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);

//       if ((event.target as HTMLElement).getAttribute('data-action') === 'increase') {
//         input.value = (currentQuantity + 1).toString();
//       } else if (
//         (event.target as HTMLElement).getAttribute('data-action') === 'decrease' &&
//         currentQuantity > 0
//       ) {
//         input.value = (currentQuantity - 1).toString();
//       }

//       const format = (event.target as HTMLElement).getAttribute('data-format-name');
//       const productType = input.closest('.selected-product-item')?.querySelector('.text-size-small')
//         ?.textContent as string;
//       const productTitle = input
//         .closest('.selected-product-item')
//         ?.querySelector('.text-weight-semibold')?.textContent as string;

//       if (productType && productTitle) {
//         updateResourceQuantityInCookie(
//           productType,
//           productTitle,
//           format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
//         );
//       }

//       if (!quantitiesAreSet()) {
//         (event.target as HTMLElement).setAttribute('disabled', 'true');
//       } else {
//         (event.target as HTMLElement).removeAttribute('disabled');
//         document.querySelector('.alert-message')?.remove();
//       }
//     });
//   });

//   document.querySelectorAll('.quantity-input').forEach((input) => {
//     input.addEventListener('change', (event) => {
//       const newQuantity = isNaN(parseInt((event.target as HTMLInputElement).value))
//         ? 0
//         : parseInt((event.target as HTMLInputElement).value);
//       const format = (event.target as HTMLInputElement).getAttribute('data-format') as string;
//       const productType = input.closest('.selected-product-item')?.querySelector('.text-size-small')
//         ?.textContent as string;
//       const productTitle = input
//         .closest('.selected-product-item')
//         ?.querySelector('.text-weight-semibold')?.textContent as string;

//       if (productType && productTitle) {
//         if (newQuantity >= 0) {
//           updateResourceQuantityInCookie(
//             productType,
//             productTitle,
//             format ? { [format]: newQuantity } : { quantity: newQuantity }
//           );
//         } else {
//           (event.target as HTMLInputElement).value = '0';
//         }
//       }
//     });
//   });
// }
