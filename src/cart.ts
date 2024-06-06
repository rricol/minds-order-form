import { getResourceCount } from '$utils/getFunctions';
import { handleAddRessourceToCart } from '$utils/handlersFunctions';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-nmra-action="add-to-cart"]').forEach((element) => {
    element.addEventListener('click', handleAddRessourceToCart);
  });
  document.querySelectorAll('[data-nmra-element="cart"]').forEach((element) => {
    const count = element.querySelector('[data-nmra-element="cart-count"]');
    if (count) count.textContent = getResourceCount().toString();
  });
});
