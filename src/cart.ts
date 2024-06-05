import { handleAddRessourceToCart } from '$utils/handlersFunctions';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-nmra-action="add-to-cart"]').forEach((element) => {
    element.addEventListener('click', handleAddRessourceToCart);
  });
});
