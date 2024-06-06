import { handleAddRessourceToCart } from '$utils/handlersFunctions';
import { updateCartMenu } from '$utils/updateFunctions';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-nmra-action="add-to-cart"]').forEach((element) => {
    element.addEventListener('click', handleAddRessourceToCart);
  });

  updateCartMenu();
});
