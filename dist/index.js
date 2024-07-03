"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/getFunctions.ts
  function getPricing() {
    const products = getCookie("selectedProducts") || [];
    let total = 0;
    products.forEach((product) => {
      const { type, quantity, quantityA3 = 0, quantityA2 = 0 } = product;
      if (type === "Infographie") {
        total += quantityA2 * 6 + quantityA3 * (quantityA3 < 10 ? 4 : 3);
      } else if (type === "Brochure") {
        total += quantity * (quantity < 10 ? 9 : quantity < 30 ? 8 : 7);
      } else if (type === "Publication") {
        total += quantity * (quantity < 5 ? 16 : quantity < 10 ? 14 : 13);
      }
    });
    return total.toString();
  }
  function getResourcePricing(product) {
    const { type, quantity, quantityA3 = 0, quantityA2 = 0 } = product;
    if (type === "Infographie") {
      return quantityA2 * 6 + quantityA3 * (quantityA3 < 10 ? 4 : 3);
    }
    if (type === "Brochure") {
      return quantity * (quantity < 10 ? 9 : quantity < 30 ? 8 : 7);
    }
    if (type === "Publication") {
      return quantity * (quantity < 5 ? 16 : quantity < 10 ? 14 : 13);
    }
    return 0;
  }
  function getResourceCount() {
    const products = getCookie("selectedProducts") || [];
    return products.length;
  }

  // src/utils/stepsManager.ts
  function checkQuantities() {
    const products = getCookie("selectedProducts") || [];
    if (products.length === 0) {
      return false;
    }
    return products.every(
      (product) => product.quantity > 0 || (product.quantityA3 ?? 0) > 0 || (product.quantityA2 ?? 0) > 0
    );
  }
  function initSteps() {
    const step2Div = document.querySelector('[data-nmra-element="step2"]');
    const nextStepButtons = document.querySelectorAll(
      '[data-nmra-action="next-step"]'
    );
    const previousStepButton = document.querySelectorAll(
      '[data-nmra-action="previous-step"]'
    );
    step2Div.style.display = "none";
    if (nextStepButtons) {
      nextStepButtons.forEach((button) => {
        button.addEventListener("click", handleNextStep);
      });
    }
    if (previousStepButton) {
      previousStepButton.forEach((button) => {
        button.addEventListener("click", handlePreviousStep);
      });
    }
  }

  // src/utils/handlersFunctions.ts
  function resourceAlreadySelected(productType, productTitle) {
    const products = getCookie("selectedProducts") || [];
    return products.some(
      (product) => product.type === productType && product.title === productTitle
    );
  }
  function handleRemove(event) {
    const productElement = event.target.closest(".selected-product");
    const productType = productElement.querySelector(".nmra-resource_type")?.textContent;
    const productTitle = productElement.querySelector(".nmra-resource_name")?.textContent;
    if (productType && productTitle) {
      productElement.remove();
      removeResourceFromCookie(productType, productTitle);
      updateData();
    }
  }
  function handleInscrease(event) {
    const input = event.target.closest(".nmra-resource_quantity-group")?.querySelector("input");
    const format = input.getAttribute("data-nmra-format");
    const resourceType = input.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent;
    const resourceName = input.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name");
    const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
    input.value = (currentQuantity + 1).toString();
    if (resourceType && resourceName) {
      updateResourceQuantityInCookie(
        resourceType,
        resourceName.textContent,
        format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
      );
      updateData();
    }
  }
  function handleDecrease(event) {
    const input = event.target.closest(".nmra-resource_quantity-group")?.querySelector("input");
    const format = input.getAttribute("data-nmra-format");
    const resourceType = input.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent;
    const resourceName = input.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name");
    const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
    if (currentQuantity > 0) {
      input.value = (currentQuantity - 1).toString();
    }
    if (resourceType && resourceName) {
      updateResourceQuantityInCookie(
        resourceType,
        resourceName.textContent,
        format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
      );
      updateData();
    }
  }
  function handleInputChange(event) {
    const input = event.target;
    const newQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
    const format = input.getAttribute("data-nmra-format");
    const resourceType = input.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent;
    const resourceName = input.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name");
    if (resourceType && resourceName) {
      if (newQuantity >= 0) {
        updateResourceQuantityInCookie(
          resourceType,
          resourceName.textContent,
          format ? { [format]: newQuantity } : { quantity: newQuantity }
        );
      } else {
        input.value = "0";
      }
    }
    updateData();
  }
  function handleAddResource(event) {
    const productElement = event.target.closest(
      '[data-nmra-element="resource"]'
    );
    const titleElement = productElement.querySelector('[data-nmra-element="title"]');
    const resourceTitle = titleElement?.innerText;
    const resourceType = titleElement.getAttribute("data-nmra-type");
    if (!resourceAlreadySelected(resourceType, resourceTitle)) {
      addResourceToSelectedList(resourceType, resourceTitle);
    }
    updateData();
  }
  function handleClearAll() {
    document.querySelectorAll(".selected-product").forEach((productElement) => {
      productElement.remove();
    });
    removeAllResourcesFromCookie();
    updateData();
  }
  function createResourceRow(product) {
    const { type, title, quantity, quantityA3, quantityA2 } = product;
    return `
      <div class="order-summary_cell main">${title}</div>
      <div class="order-summary_cell">${type}</div>
      <div class="order-summary_cell">${type === "Infographie" ? `A3: ${quantityA3} <br> A2: ${quantityA2}` : `${quantity}`}</div>
      <div class="order-summary_cell price">${getResourcePricing(product)}.-</div>
  `;
  }
  function getEmailContent(products) {
    let emailContent = `
    <table style="border-collapse: collapse; color: black;">
      <tr>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantit\xE9</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
      </tr>
  `;
    products.map((product) => {
      const { type, title, quantity, quantityA3, quantityA2 } = product;
      emailContent += `
      <tr>
        <td style="padding: 8px; border: 1px solid black;">${type}</td>
        <td style="padding: 8px; border: 1px solid black;">${title}</td>
        <td style="padding: 8px; border: 1px solid black;">${type === "Infographie" ? `A3: ${quantityA3} <br> A2: ${quantityA2}` : `${quantity}`}</td>
        <td style="padding: 8px; border: 1px solid black;">${getResourcePricing(product)}.-</td>
      </tr>
    `;
    });
    emailContent += `
    <tr>
      <td style="padding: 8px; border: 1px solid black; text-align: right; font-weight: bold;">${parseInt(getPricing()) + 9} (frais de port inclus)</td>
    </tr>`;
    emailContent += `</table>`;
    return emailContent;
  }
  function handleNextStep() {
    const step1Div = document.querySelector('[data-nmra-element="step1"]');
    const step2Div = document.querySelector('[data-nmra-element="step2"]');
    const textarea = document.querySelector('[data-nmra-element="text-area"]');
    const totalPricing = document.querySelector('[data-nmra-element="total-price"]');
    const summaryContent = document.querySelector(
      '[data-nmra-element="summary-content"]'
    );
    if (getResourceCount() > 0 && checkQuantities()) {
      if (totalPricing) {
        totalPricing.textContent = `${parseInt(getPricing()) + 9}.- CHF`;
      }
      if (step1Div && step2Div) {
        step1Div.style.display = "none";
        step2Div.style.display = "block";
        const products = getCookie("selectedProducts") || [];
        products.map((product) => {
          const productElement = document.createElement("div");
          productElement.classList.add("order-summary_row");
          productElement.innerHTML = createResourceRow(product);
          summaryContent.appendChild(productElement);
        });
        if (textarea) {
          textarea.value = getEmailContent(products);
          textarea.disabled = true;
        }
      }
    }
  }
  function handlePreviousStep() {
    const step1Div = document.querySelector('[data-nmra-element="step1"]');
    const step2Div = document.querySelector('[data-nmra-element="step2"]');
    if (step1Div && step2Div) {
      step1Div.style.display = "block";
      step2Div.style.display = "none";
    }
  }

  // src/utils/productManager.ts
  function addResourceToSelectedList(productType, productTitle, quantity = 1, quantityA3 = 0, quantityA2 = 0) {
    const selectedProductsWrapper = document.querySelector(
      '[data-nmra-element="list"]'
    );
    const selectedProductElement = document.createElement("div");
    selectedProductElement.classList.add("selected-product");
    if (productType === "Infographie") {
      selectedProductElement.innerHTML = `
      <div class="selected-product-item" data-nmra-element="card">
        <span class="nmra-resource_type" >${productType}</span>
        <span class="nmra-resource_name">${productTitle}</span>
        <span class="nmra-resource_quantity-title">Quantit\xE9s:</span>
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
        <span class="nmra-resource_quantity-title">Quantit\xE9s :</span>
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
    selectedProductElement.querySelector('[data-nmra-action="remove"]')?.addEventListener("click", handleRemove);
    selectedProductElement.querySelectorAll('[data-nmra-action="increase"]').forEach((button) => {
      button.addEventListener("click", handleInscrease);
    });
    selectedProductElement.querySelectorAll('[data-nmra-action="decrease"]').forEach((button) => {
      button.addEventListener("click", handleDecrease);
    });
    selectedProductElement.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", handleInputChange);
    });
    updateCookie();
  }

  // src/utils/cookieManager.ts
  function setCookie(name, value, days) {
    const date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    document.cookie = `${name}=${JSON.stringify(value)};expires=${date.toUTCString()};path=/`;
  }
  function getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0)
        return JSON.parse(c.substring(nameEQ.length));
    }
    return null;
  }
  function removeResourceFromCookie(productType, productTitle) {
    let products = getCookie("selectedProducts") || [];
    products = products.filter(
      (product) => !(product.type === productType && product.title === productTitle)
    );
    setCookie("selectedProducts", products, 7);
  }
  function removeAllResourcesFromCookie() {
    setCookie("selectedProducts", [], 7);
  }
  function loadResourcesFromCookie() {
    const products = getCookie("selectedProducts") || [];
    products.forEach(
      (product) => addResourceToSelectedList(
        product.type,
        product.title,
        product.quantity,
        product.quantityA3,
        product.quantityA2
      )
    );
  }
  function updateCookie() {
    const selectedProductsWrapper = document.querySelector(
      '[data-nmra-element="list"]'
    );
    const selectedProductElements = selectedProductsWrapper.querySelectorAll(".selected-product");
    const products = Array.from(selectedProductElements).map((productElement) => {
      const productType = productElement.querySelector(".nmra-resource_type")?.textContent;
      const productTitle = productElement.querySelector(".nmra-resource_name")?.textContent;
      const quantity = productType === "Infographie" ? 0 : parseInt(productElement.querySelector(".quantity-input").value);
      const quantityA3 = productType === "Infographie" ? parseInt(
        productElement.querySelector('[data-nmra-format="A3"]').value
      ) : 0;
      const quantityA2 = productType === "Infographie" ? parseInt(
        productElement.querySelector('[data-nmra-format="A2"]').value
      ) : 0;
      return { type: productType, title: productTitle, quantity, quantityA3, quantityA2 };
    });
    setCookie("selectedProducts", products, 7);
  }

  // src/utils/updateFunctions.ts
  function updatePricing() {
    const products = getCookie("selectedProducts") || [];
    let total = 0;
    products.forEach((product) => {
      const { type, quantity, quantityA3 = 0, quantityA2 = 0 } = product;
      if (type === "Infographie") {
        total += quantityA2 * 6 + quantityA3 * (quantityA3 < 10 ? 4 : 3);
      } else if (type === "Brochure") {
        total += quantity * (quantity < 10 ? 9 : quantity < 30 ? 8 : 7);
      } else if (type === "Publication") {
        total += quantity * (quantity < 5 ? 16 : quantity < 10 ? 14 : 13);
      }
    });
    const countTotalElement = document.querySelector('[data-nmra-element="total"]');
    countTotalElement.textContent = total.toString();
  }
  function updateResourceCount() {
    const selectedProductCount = document.querySelector('[data-nmra-element="count"]');
    const cartCount = document.querySelector('[data-nmra-element="cart-count"]');
    const productCount = getResourceCount();
    selectedProductCount.innerHTML = productCount === 0 ? "<span>Aucune ressource s\xE9lectionn\xE9e</span>" : `<span class="product-count">${productCount}</span> ressource${productCount > 1 ? "s" : ""} s\xE9lectionn\xE9e${productCount > 1 ? "s" : ""}`;
    cartCount.textContent = productCount.toString();
  }
  function updateResourceQuantityInCookie(productType, productTitle, quantities) {
    const products = getCookie("selectedProducts") || [];
    const productIndex = products.findIndex(
      (product) => product.type === productType && product.title === productTitle
    );
    if (productIndex !== -1) {
      if (quantities.quantity !== void 0) {
        products[productIndex].quantity = quantities.quantity;
      }
      if (quantities.A3 !== void 0) {
        products[productIndex].quantityA3 = quantities.A3;
      }
      if (quantities.A2 !== void 0) {
        products[productIndex].quantityA2 = quantities.A2;
      }
      setCookie("selectedProducts", products, 7);
    }
    updatePricing();
  }
  function updateNextStepButtons() {
    const nextStepButtons = document.querySelectorAll(
      '[data-nmra-action="next-step"]'
    );
    const disabled = getResourceCount() === 0 || !checkQuantities();
    nextStepButtons?.forEach((element) => {
      if (disabled) {
        element.classList.add("is-disabled");
        element.setAttribute("disabled", disabled.toString());
      } else {
        element.classList.remove("is-disabled");
        element.removeAttribute("disabled");
      }
    });
  }
  function updateData() {
    updatePricing();
    updateResourceCount();
    updateNextStepButtons();
  }

  // src/utils/eventHandlers.ts
  function attachAddButtonEvents() {
    document.querySelectorAll('[data-nmra-action="add"]').forEach((button) => {
      button.addEventListener("click", handleAddResource);
    });
  }
  function attachClearButtonEvents() {
    document.querySelectorAll('[data-nmra-action="clear"]').forEach((button) => {
      button.addEventListener("click", handleClearAll);
    });
  }

  // src/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    loadResourcesFromCookie();
    attachAddButtonEvents();
    attachClearButtonEvents();
    updateData();
    initSteps();
  });
})();
//# sourceMappingURL=index.js.map
