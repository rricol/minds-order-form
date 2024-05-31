document.addEventListener('DOMContentLoaded', () => {
  const selectedProductsWrapper = document.querySelector('[data-selected-products]');
  const selectedProductCount = document.querySelector('[data-selected-product-count]');

  // Fonction pour ajouter un produit à la liste sélectionnée
  function addProductToSelectedList(
    productType: string,
    productTitle: string,
    quantity = 1,
    quantityA3 = 0,
    quantityA2 = 0
  ) {
    // Créer l'élément du produit sélectionné
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

    // Ajouter l'élément au wrapper des produits sélectionnés
    selectedProductsWrapper?.appendChild(selectedProductElement);
    updateSelectedProductsMessage();

    selectedProductElement.querySelector('.remove-product').addEventListener('click', (event) => {
      const productElement = event.target.closest('.selected-product');
      const productType = productElement.querySelector('.text-size-small').innerText;
      const productTitle = productElement.querySelector('.text-weight-semibold').innerText;

      // Supprimer l'élément du DOM
      productElement.remove();

      // Mettre à jour les cookies
      removeProductFromCookie(productType, productTitle);
      updateSelectedProductsMessage();
    });

    // Ajouter des écouteurs d'événements pour les boutons de changement de quantité
    selectedProductElement.querySelectorAll('.quantity-change').forEach((button) => {
      button.addEventListener('click', (event) => {
        const input = event.target.closest('span').querySelector('input');
        const currentQuantity = isNaN(input.value) ? 0 : parseInt(input.value);

        if (event.target.getAttribute('data-action') === 'increase') {
          input.value = currentQuantity + 1;
        } else if (event.target.getAttribute('data-action') === 'decrease' && currentQuantity > 0) {
          input.value = currentQuantity - 1;
        }

        // Mise à jour de la quantité dans les cookies
        const productType = selectedProductElement.querySelector('.text-size-small').innerText;
        const productTitle =
          selectedProductElement.querySelector('.text-weight-semibold').innerText;
        const format = event.target.getAttribute('data-format-name');
        updateProductQuantityInCookie(
          productType,
          productTitle,
          format ? { [format]: input.value } : { quantity: input.value }
        );
      });
    });

    // Ajouter un écouteur d'événements pour la modification manuelle du champ de saisie
    selectedProductElement.querySelectorAll('.quantity-input').forEach((input) => {
      input.addEventListener('change', (event) => {
        const newQuantity = isNaN(event.target.value) ? 0 : parseInt(event.target.value);

        if (newQuantity >= 0) {
          // Mise à jour de la quantité dans les cookies
          const productType = selectedProductElement.querySelector('.text-size-small').innerText;
          const productTitle =
            selectedProductElement.querySelector('.text-weight-semibold').innerText;
          const format = event.target
            .closest('span')
            .querySelector('input')
            .getAttribute('data-format');
          updateProductQuantityInCookie(
            productType,
            productTitle,
            format ? { [format]: newQuantity } : { quantity: newQuantity }
          );
        } else {
          event.target.value = 0;
        }
      });
    });

    updateCookie();
  }

  function removeProductFromCookie(productType, productTitle) {
    let products = getCookie('selectedProducts') || [];
    products = products.filter(
      (product) => !(product.type === productType && product.title === productTitle)
    );
    setCookie('selectedProducts', products, 7);
    calculatePricing();
  }

  // Fonction pour mettre à jour le message des produits sélectionnés
  function updateSelectedProductsMessage() {
    const nextStepButton = document.querySelector('#next-to-step-2');
    const selectedProductElements = selectedProductsWrapper.querySelectorAll('.selected-product');
    if (selectedProductElements.length === 1) {
      nextStepButton?.setAttribute('disabled', 'false');
      nextStepButton?.classList.remove('is-disabled');
      selectedProductCount.innerHTML = `<span class="product-count">${selectedProductElements.length}</span> ressource sélectionné(s)`;
    } else if (selectedProductElements.length === 0) {
      nextStepButton?.setAttribute('disabled', 'true');
      nextStepButton?.classList.add('is-disabled');
      selectedProductCount.innerHTML = '<span>Aucune ressource sélectionnée</span>';
    } else {
      nextStepButton?.setAttribute('disabled', 'false');
      nextStepButton?.classList.remove('is-disabled');
      selectedProductCount.innerHTML = `<span class="product-count">${selectedProductElements.length}</span> ressources sélectionnées`;
    }
  }

  function calculatePricing() {
    const products = getCookie('selectedProducts') || [];
    let total = 0;

    products.forEach((product) => {
      if (product.type === 'Infographie') {
        if (product.quantityA3 < 10) {
          total += product.quantityA2 * 6;
          total += product.quantityA3 * 4;
        } else {
          total += product.quantityA2 * 6;
          total += product.quantityA3 * 3;
        }
        total += product.quantityA3 * 6;
      } else if (product.type === 'Brochure') {
        if (product.quantity < 10) {
          total += product.quantity * 9;
        } else if (product.quantity < 30) {
          total += product.quantity * 8;
        } else {
          total += product.quantity * 7;
        }
      } else if (product.type === 'Publication') {
        if (product.quantity < 5) {
          total += product.quantity * 16;
        } else if (product.quantity < 10) {
          total += product.quantity * 14;
        } else {
          total += product.quantity * 13;
        }
      }
    });
    const countTotalElement = document.querySelector('[data-count-total]');
    countTotalElement.innerHTML = total.toString();
  }

  function updateProductQuantityInCookie(productType, productTitle, quantities) {
    const products = getCookie('selectedProducts') || [];
    const productIndex = products.findIndex(
      (product) => product.type === productType && product.title === productTitle
    );

    if (productIndex !== -1) {
      if (quantities.quantity !== undefined) {
        products[productIndex].quantity = quantities.quantity;
      }
      if (quantities.A3 !== undefined) {
        products[productIndex].quantityA3 = quantities.A3;
      }
      if (quantities.A2 !== undefined) {
        products[productIndex].quantityA2 = quantities.A2;
      }
      setCookie('selectedProducts', products, 7);
    }
    calculatePricing();
  }

  // Fonctions pour gérer les cookies
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + JSON.stringify(value) + ';' + expires + ';path=/';
  }

  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; ca.length > i; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (0 == c.indexOf(nameEQ)) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  function updateCookie() {
    const selectedProductElements = selectedProductsWrapper.querySelectorAll('.selected-product');
    const products = [];
    selectedProductElements.forEach((product) => {
      const productType = product.querySelector('.text-size-small').innerText;
      const productTitle = product.querySelector('.text-weight-semibold').innerText;
      const quantity =
        productType === 'Infographie' ? 0 : product.querySelector('.quantity-input').value;
      const quantityA3 =
        productType === 'Infographie' ? product.querySelector('[data-format="A3"]').value : 0;
      const quantityA2 =
        productType === 'Infographie' ? product.querySelector('[data-format="A2"]').value : 0;
      products.push({ type: productType, title: productTitle, quantity, quantityA3, quantityA2 });
    });
    setCookie('selectedProducts', products, 7);
    calculatePricing();
  }

  // Charger les produits sélectionnés à partir du cookie
  function loadProductsFromCookie() {
    const products = getCookie('selectedProducts');
    if (products) {
      products.forEach((product) => {
        addProductToSelectedList(
          product.type,
          product.title,
          product.quantity,
          product.quantityA3,
          product.quantityA2
        );
      });
    }
  }

  // Fonction pour nettoyer le cookie et la liste des produits sélectionnés
  function cleanCookie() {
    setCookie('selectedProducts', [], -1); // Définir le cookie à une date expirée pour le supprimer
    selectedProductCount.innerHTML = 0;
    selectedProductsWrapper.innerHTML = '';
    updateSelectedProductsMessage();
    calculatePricing();
  }

  // Attacher l’événement de nettoyage au bouton
  const cleanButton = document.querySelector('[data-clean-cookie]');
  if (cleanButton) {
    cleanButton.addEventListener('click', cleanCookie);
  }

  // Initial call to load products from cookie if exists
  loadProductsFromCookie();

  function attachAddButtonEvents() {
    const addButtonElements = document.querySelectorAll('[data-action="add"]');
    addButtonElements.forEach((button) => {
      button.addEventListener('click', (event) => {
        const productElement = event.target.closest('[data-product-type]');
        const productType = productElement.getAttribute('data-product-type');
        const productTitle = productElement.querySelector('h3').innerText;

        function isProductSelected(productType: string, productTitle: string): boolean {
          const products = getCookie('selectedProducts');
          if (products) {
            return products.some(
              (product) => product.type === productType && product.title === productTitle
            );
          }
          return false;
        }
        if (!isProductSelected(productType, productTitle)) {
          addProductToSelectedList(productType, productTitle);
        }
      });
    });
  }
  // Attacher les événements de clic initialement
  updateSelectedProductsMessage();
  calculatePricing();
  attachAddButtonEvents();
  const nextStepButton = document.querySelector('#next-to-step-2');
  nextStepButton?.addEventListener('click', () => {
    const step1Div = document.querySelector('[data-step="1"]');
    const step2Div = document.querySelector('[data-step="2"]');
    if (step1Div && step2Div && nextStepButton?.getAttribute('disabled') !== 'true') {
      step1Div.style.display = 'none';
      step2Div.style.display = 'block';
      const products = getCookie('selectedProducts') || [];
      console.log(products);
      let emailContent = '';
      products.forEach((product) => {
        const productType = product.type;
        const productTitle = product.title;
        const { quantity } = product;
        const { quantityA3 } = product;
        const { quantityA2 } = product;
        if (productType === 'Infographie') {
          emailContent += `${productType}: ${productTitle} - A3: ${quantityA3} - A2: ${quantityA2}\n`;
        } else {
          emailContent += `${productType}: ${productTitle} - Quantité: ${quantity}\n`;
        }
      });
      const textarea = document.querySelector('[data-text-area]');
      if (textarea) {
        textarea.value = emailContent;
      }
    }
  });

  const step2Div = document.querySelector('[data-step="2"]');
  step2Div.style.display = 'none';

  const previousStepButton = document.querySelector('#previous-to-step-1');
  previousStepButton?.addEventListener('click', () => {
    const step1Div = document.querySelector('[data-step="1"]');
    const step2Div = document.querySelector('[data-step="2"]');
    step2Div.style.display = 'none';
    step1Div.style.display = 'block';
  });
});
