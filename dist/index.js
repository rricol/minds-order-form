"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/pricing.ts
  function calculatePricing() {
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
    const countTotalElement = document.querySelector("[data-count-total]");
    countTotalElement.innerHTML = total.toString();
  }
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
  function updateSelectedProductsMessage() {
    const selectedProductsWrapper = document.querySelector("[data-selected-products]");
    const selectedProductElements = selectedProductsWrapper.querySelectorAll(".selected-product");
    const selectedProductCount = document.querySelector(
      "[data-selected-product-count]"
    );
    const nextStepButtons = document.querySelectorAll(
      '[data-action="next-step"]'
    );
    const productCount = selectedProductElements.length;
    const disabled = productCount === 0;
    nextStepButtons?.forEach((element) => {
      element.classList.toggle("is-disabled", disabled);
      element.toggleAttribute("disabled", disabled);
    });
    selectedProductCount.innerHTML = productCount === 0 ? "<span>Aucune ressource s\xE9lectionn\xE9e</span>" : `<span class="product-count">${productCount}</span> ressource${productCount > 1 ? "s" : ""} s\xE9lectionn\xE9e${productCount > 1 ? "s" : ""}`;
  }

  // src/utils/productManager.ts
  function addProductToSelectedList(productType, productTitle, quantity = 1, quantityA3 = 0, quantityA2 = 0) {
    const selectedProductsWrapper = document.querySelector("[data-selected-products]");
    const selectedProductElement = document.createElement("div");
    selectedProductElement.classList.add("selected-product");
    if (productType === "Infographie") {
      selectedProductElement.innerHTML = `
      <div class="selected-product-item">
        <span class="text-size-small margin-bottom margin-tiny text-color-secondary">${productType}</span>
        <span class="text-weight-semibold margin-bottom margin-xxsmall">${productTitle}</span>
        <span class="text-size-tiny margin-bottom margin-tiny">Quantit\xE9s:</span>
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
        <span class="text-size-tiny margin-bottom margin-tiny">Quantit\xE9s:</span>
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
    selectedProductElement.querySelector(".remove-product")?.addEventListener("click", (event) => {
      const productElement = event.target.closest(
        ".selected-product"
      );
      const productType2 = productElement.querySelector(".text-size-small")?.textContent;
      const productTitle2 = productElement.querySelector(".text-weight-semibold")?.textContent;
      if (productType2 && productTitle2) {
        productElement.remove();
        removeProductFromCookie(productType2, productTitle2);
        updateSelectedProductsMessage();
        calculatePricing();
      }
    });
    selectedProductElement.querySelectorAll(".quantity-change").forEach((button) => {
      button.addEventListener("click", (event) => {
        const input = event.target.closest("span")?.querySelector("input");
        const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
        if (event.target.getAttribute("data-action") === "increase") {
          input.value = (currentQuantity + 1).toString();
        } else if (event.target.getAttribute("data-action") === "decrease" && currentQuantity > 0) {
          input.value = (currentQuantity - 1).toString();
        }
        const format = event.target.getAttribute("data-format-name");
        const productType2 = selectedProductElement.querySelector(".text-size-small")?.textContent;
        const productTitle2 = selectedProductElement.querySelector(".text-weight-semibold")?.textContent;
        if (productType2 && productTitle2) {
          updateProductQuantityInCookie(
            productType2,
            productTitle2,
            format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
          );
          calculatePricing();
        }
      });
    });
    selectedProductElement.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (event) => {
        const newQuantity = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
        const format = event.target.getAttribute("data-format");
        const productType2 = input.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent;
        const productTitle2 = input.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;
        if (productType2 && productTitle2) {
          if (newQuantity >= 0) {
            updateProductQuantityInCookie(
              productType2,
              productTitle2,
              format ? { [format]: newQuantity } : { quantity: newQuantity }
            );
            calculatePricing();
          } else {
            event.target.value = "0";
          }
        }
      });
    });
    updateSelectedProductsMessage();
    calculatePricing();
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
  function updateProductQuantityInCookie(productType, productTitle, quantities) {
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
    calculatePricing();
  }
  function removeProductFromCookie(productType, productTitle) {
    let products = getCookie("selectedProducts") || [];
    products = products.filter(
      (product) => !(product.type === productType && product.title === productTitle)
    );
    setCookie("selectedProducts", products, 7);
    calculatePricing();
  }
  function removeAllProductsFromCookie() {
    setCookie("selectedProducts", [], 7);
    calculatePricing();
  }
  function loadProductsFromCookie() {
    const products = getCookie("selectedProducts") || [];
    products.forEach(
      (product) => addProductToSelectedList(
        product.type,
        product.title,
        product.quantity,
        product.quantityA3,
        product.quantityA2
      )
    );
  }
  function updateCookie() {
    const selectedProductsWrapper = document.querySelector("[data-selected-products]");
    const selectedProductElements = selectedProductsWrapper.querySelectorAll(".selected-product");
    const products = Array.from(selectedProductElements).map((productElement) => {
      const productType = productElement.querySelector(".text-size-small")?.textContent;
      const productTitle = productElement.querySelector(".text-weight-semibold")?.textContent;
      const quantity = productType === "Infographie" ? 0 : parseInt(productElement.querySelector(".quantity-input").value);
      const quantityA3 = productType === "Infographie" ? parseInt(productElement.querySelector('[data-format="A3"]').value) : 0;
      const quantityA2 = productType === "Infographie" ? parseInt(productElement.querySelector('[data-format="A2"]').value) : 0;
      return { type: productType, title: productTitle, quantity, quantityA3, quantityA2 };
    });
    setCookie("selectedProducts", products, 7);
  }

  // src/utils/eventHandlers.ts
  function attachAddButtonEvents() {
    document.querySelectorAll('[data-action="add"]').forEach((button) => {
      button.addEventListener("click", (event) => {
        const productElement = event.target.closest(
          "[data-product-type]"
        );
        const productType = productElement.getAttribute("data-product-type");
        const productTitle = productElement.querySelector("h3")?.innerText;
        if (!isProductSelected(productType, productTitle)) {
          addProductToSelectedList(productType, productTitle);
        }
      });
    });
  }
  function isProductSelected(productType, productTitle) {
    const products = getCookie("selectedProducts") || [];
    return products.some(
      (product) => product.type === productType && product.title === productTitle
    );
  }
  function attachClearButtonEvents() {
    document.querySelectorAll('[data-action="clear"]').forEach((button) => {
      button.addEventListener("click", () => {
        document.querySelectorAll(".selected-product").forEach((productElement) => {
          productElement.remove();
        });
        removeAllProductsFromCookie();
        updateSelectedProductsMessage();
      });
    });
  }
  function attachRemoveButtonEvents() {
    document.querySelectorAll(".remove-product").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productElement = event.target.closest(
          ".selected-product"
        );
        const productType = productElement.querySelector(".text-size-small")?.textContent;
        const productTitle = productElement.querySelector(".text-weight-semibold")?.textContent;
        if (productType && productTitle) {
          productElement.remove();
          removeProductFromCookie(productType, productTitle);
          updateSelectedProductsMessage();
        }
      });
    });
  }
  function attachQuantityChangeEvents() {
    document.querySelectorAll(".quantity-change").forEach((button) => {
      button.addEventListener("click", (event) => {
        const input = event.target.closest("span")?.querySelector("input");
        const currentQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
        if (event.target.getAttribute("data-action") === "increase") {
          input.value = (currentQuantity + 1).toString();
        } else if (event.target.getAttribute("data-action") === "decrease" && currentQuantity > 0) {
          input.value = (currentQuantity - 1).toString();
        }
        const format = event.target.getAttribute("data-format-name");
        const productType = input.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent;
        const productTitle = input.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;
        if (productType && productTitle) {
          updateProductQuantityInCookie(
            productType,
            productTitle,
            format ? { [format]: parseInt(input.value) } : { quantity: parseInt(input.value) }
          );
        }
      });
    });
    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", (event) => {
        const newQuantity = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
        const format = event.target.getAttribute("data-format");
        const productType = input.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent;
        const productTitle = input.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;
        if (productType && productTitle) {
          if (newQuantity >= 0) {
            updateProductQuantityInCookie(
              productType,
              productTitle,
              format ? { [format]: newQuantity } : { quantity: newQuantity }
            );
          } else {
            event.target.value = "0";
          }
        }
      });
    });
  }

  // src/utils/stepsManager.ts
  function initSteps() {
    const step1Div = document.querySelector('[data-step="1"]');
    const step2Div = document.querySelector('[data-step="2"]');
    const nextStepButtons = document.querySelectorAll(
      '[data-action="next-step"]'
    );
    const previousStepButton = document.querySelector("#previous-to-step-1");
    const textarea = document.querySelector("[data-text-area]");
    step2Div.style.display = "none";
    if (nextStepButtons) {
      nextStepButtons.forEach((button) => {
        button.addEventListener("click", () => {
          if (step1Div && step2Div && !button.hasAttribute("disabled")) {
            step1Div.style.display = "none";
            step2Div.style.display = "block";
            const products = getCookie("selectedProducts") || [];
            let emailContent = `Prix : ${getPricing()} CHF
+9 CHF de frais de port

Produits s\xE9lectionn\xE9s:
`;
            emailContent += products.map((product) => {
              const { type, title, quantity, quantityA3, quantityA2 } = product;
              if (type === "Infographie") {
                return `${type}: ${title} - A3: ${quantityA3} - A2: ${quantityA2}`;
              }
              return `${type}: ${title} - Quantit\xE9: ${quantity}`;
            }).join("\n");
            if (textarea) {
              textarea.value = emailContent;
              textarea.disabled = true;
            }
          }
        });
      });
    }
    if (previousStepButton) {
      previousStepButton.addEventListener("click", () => {
        if (step1Div && step2Div) {
          step2Div.style.display = "none";
          step1Div.style.display = "block";
        }
      });
    }
  }

  // src/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    loadProductsFromCookie();
    updateSelectedProductsMessage();
    calculatePricing();
    attachAddButtonEvents();
    attachRemoveButtonEvents();
    attachQuantityChangeEvents();
    attachClearButtonEvents();
    initSteps();
  });
})();
//# sourceMappingURL=index.js.map
