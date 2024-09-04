"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/errorhandler.ts
  function toast(message) {
    const toast2 = document.createElement("div");
    toast2.classList.add("ns_toast");
    toast2.textContent = message;
    document.body.appendChild(toast2);
    setTimeout(() => {
      toast2.remove();
    }, 3e3);
  }

  // src/utils/getFunctions.ts
  function getResourcePricing(resource) {
    const { type, title, quantity = 0 } = resource;
    if (type === "Infographie") {
      return quantity * 3;
    }
    if (type === "Brochure") {
      if (title === "Qui est minds ?")
        return quantity * 0;
      return quantity * 8;
    }
    if (type === "Publication") {
      return quantity * 22;
    }
    if (type === "Jeux") {
      return quantity * 20;
    }
    return 0;
  }
  function getRawPrice() {
    const resources = JSON.parse(localStorage.getItem("orderList") || "[]");
    let total = 0;
    resources.forEach((resource) => {
      total += getResourcePricing(resource);
    });
    return total;
  }
  function getShipping() {
    const resources = JSON.parse(localStorage.getItem("orderList") || "[]");
    let shipping = 0;
    let totalQuantity = 0;
    const totalBrochure = resources.reduce((acc, resource) => {
      return resource.type === "Brochure" ? acc + (resource.quantity ?? 0) : acc;
    }, 0);
    const totalInfographie = resources.reduce((acc, resource) => {
      return resource.type === "Infographie" ? acc + (resource.quantity ?? 0) : acc;
    }, 0);
    const totalPublication = resources.reduce((acc, resource) => {
      return resource.type === "Publication" ? acc + (resource.quantity ?? 0) : acc;
    }, 0);
    const totalJeux = resources.reduce((acc, resource) => {
      return resource.type === "Jeux" ? acc + (resource.quantity ?? 0) : acc;
    }, 0);
    totalQuantity = totalBrochure + totalInfographie + totalPublication + totalJeux;
    if (totalBrochure < 4 && totalBrochure === totalQuantity) {
      shipping = 0;
    } else if (totalJeux < 4 && totalJeux === totalQuantity) {
      shipping = 0;
    } else if (totalBrochure < 4 && totalJeux < 4 && totalQuantity === totalBrochure + totalJeux) {
      shipping = 0;
    } else if (totalQuantity > 1 && totalQuantity < 10) {
      shipping = 9;
    } else if (totalQuantity === 1) {
      shipping = 0;
    } else {
      shipping = 9;
    }
    return shipping;
  }

  // src/utils/generateFunctions.ts
  function generateSummaryRow(resource) {
    const { type, title, quantity } = resource;
    const row = document.createElement("tr");
    row.classList.add("table_row");
    row.innerHTML = `
    <td class="table_cell first">${title}</td>
    <td class="table_cell">${type}</td>
    <td class="table_cell">${quantity}</td>
    <td class="table_cell">${getResourcePricing(resource)}.-</td>
    `;
    return row;
  }
  function generateSummary() {
    const orderList = getLocalStorage("orderList");
    const totalPrice = getRawPrice() + getShipping();
    const totalElement = document.querySelector("[ns-mindsorder-priceTotal]");
    console.log("total Price", totalPrice);
    if (totalElement) {
      totalElement.textContent = totalPrice.toString();
    }
    orderList.map((resource) => {
      const productElement = document.querySelector("[ns-mindsorder-summary]");
      const body = productElement?.querySelector("tbody");
      body?.appendChild(generateSummaryRow(resource));
    });
  }
  function generateEmailContent() {
    const textarea = document.querySelector("[ns-mindsorder-textArea]");
    const resources = getLocalStorage("orderList");
    let emailContent = `
      <table style="border-collapse: collapse; color: black;">
        <tr>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantit\xE9</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
        </tr>
    `;
    resources.map((product) => {
      const { type, title, quantity } = product;
      emailContent += `
        <tr>
          <td style="padding: 8px; border: 1px solid black;">${type}</td>
          <td style="padding: 8px; border: 1px solid black;">${title}</td>
          <td style="padding: 8px; border: 1px solid black;">${quantity}}</td>
          <td style="padding: 8px; border: 1px solid black;">${getResourcePricing(product)}.-</td>
        </tr>
      `;
    });
    emailContent += `
      <tr>
        <td style="padding: 8px; border: 1px solid black; text-align: right; font-weight: bold;">${getRawPrice() + getShipping()} (frais de port inclus)</td>
      </tr>`;
    emailContent += `</table>`;
    if (textarea) {
      textarea.value = emailContent;
      textarea.disabled = true;
    }
  }
  function generateResourceItem(resource) {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
      <div class="ns_resource-item" ns-mindsorder-resource ns-mindsorder-resourceTitle="${resource.title}" ns-mindsorder-resourceType="${resource.type}">
        <div class="ns_resource-header">  
          <span class="ns_resource-type">${resource.type}</span>
          <button class="ns_btn-remove" ns-mindsorder-btn="remove">Supprimer</button>
        </div>
        <h3 class="ns_resource-title">${resource.title}</h3>
        <div class="ns_resource-footer">
        <span>Quantit\xE9:</span>
            <div class="ns_input-group">
              <input class="ns_input" ns-mindsorder-input type="number" value="${resource.quantity}" min="1" />
              <button class="ns_input-button" ns-mindsorder-btn="decrease">-</button>
              <button class="ns_input-button" ns-mindsorder-btn="increase">+</button>
            </div>
        </div>
      </div>
    `;
    return productElement;
  }

  // src/utils/handleFunctions.ts
  function handeAddToCart(event) {
    event.preventDefault();
    const resourceElement = event.target.closest(
      "[ns-mindsorder-resource]"
    );
    const resourceTitle = resourceElement.getAttribute("ns-mindsorder-resourceTitle");
    const resourceType = resourceElement.getAttribute("ns-mindsorder-resourceType");
    let resource = null;
    if (resourceTitle && resourceType) {
      resource = {
        title: resourceTitle,
        type: resourceType,
        quantity: 1
      };
    }
    if (resource) {
      updateLocalStorage(resource);
    }
    updateEverything();
  }
  function handleRemoveFromCart(event) {
    event.preventDefault();
    const resourceElement = event.target.closest(
      "[ns-mindsorder-resource]"
    );
    const resourceTitle = resourceElement.getAttribute("ns-mindsorder-resourceTitle");
    const resourceType = resourceElement.getAttribute("ns-mindsorder-resourceType");
    const resourceList = getLocalStorage("orderList");
    const resource = resourceList.find((p) => p.title === resourceTitle && p.type === resourceType);
    if (resource) {
      removeLocalStorage(resource);
    }
    updateEverything();
  }
  function handleClearCart() {
    clearLocalStorage();
    updateEverything();
  }
  function handleQuantityChange(event) {
    const resourceElement = event.target.closest(
      "[ns-mindsorder-resource]"
    );
    const input = resourceElement.querySelector("[ns-mindsorder-input]");
    const resourceTitle = resourceElement.getAttribute("ns-mindsorder-resourceTitle");
    const resourceType = resourceElement.getAttribute("ns-mindsorder-resourceType");
    const resourceList = getLocalStorage("orderList");
    const resource = resourceList.find((p) => p.title === resourceTitle && p.type === resourceType);
    if (!resource) {
      return;
    }
    const action = event.target.getAttribute("ns-mindsorder-btn");
    if (action === "increase") {
      if (resource.quantity !== void 0) {
        resource.quantity += 1;
        input.value = resource.quantity.toString();
      }
    } else if (action === "decrease") {
      if (!(resource.quantity === 1) && resource.quantity !== void 0) {
        resource.quantity -= 1;
        input.value = resource.quantity.toString();
      }
    }
    updateResourceQuantity(resource);
  }
  function handleInputChange(event) {
    const resourceElement = event.target.closest(
      "[ns-mindsorder-resource]"
    );
    const input = resourceElement.querySelector("[ns-mindsorder-input]");
    const newQuantity = isNaN(parseInt(input.value)) ? 0 : parseInt(input.value);
    const resourceTitle = resourceElement.getAttribute("ns-mindsorder-resourceTitle");
    const resourceType = resourceElement.getAttribute("ns-mindsorder-resourceType");
    const resourceList = getLocalStorage("orderList");
    const resource = resourceList.find((p) => p.title === resourceTitle && p.type === resourceType);
    if (!resource) {
      return;
    }
    resource.quantity = newQuantity;
    updateResourceQuantity(resource);
  }
  function handleNextStep() {
    const step1Div = document.querySelector('[ns-mindsorder-step="1"]');
    const step2Div = document.querySelector('[ns-mindsorder-step="2"]');
    if (checkValidCart()) {
      return;
    }
    if (step1Div && step2Div) {
      step1Div.style.display = "none";
      step2Div.style.display = "block";
      window.scrollTo(0, 0);
    }
    generateSummary();
    generateEmailContent();
  }
  function handlePreviousStep() {
    const step1Div = document.querySelector('[ns-mindsorder-step="1"]');
    const step2Div = document.querySelector('[ns-mindsorder-step="2"]');
    if (step1Div && step2Div) {
      step1Div.style.display = "block";
      step2Div.style.display = "none";
      window.scrollTo(0, 0);
    }
  }

  // src/utils/eventHandlers.ts
  function attachAddButtonEvents() {
    document.querySelectorAll('[ns-mindsorder-btn="add"]').forEach((button) => {
      button.addEventListener("click", handeAddToCart);
    });
  }
  function attachRemoveButtonEvents() {
    document.querySelectorAll('[ns-mindsorder-btn="remove"]').forEach((button) => {
      button.addEventListener("click", handleRemoveFromCart);
    });
  }
  function attachClearButtonEvents() {
    document.querySelectorAll('[ns-mindsorder-btn="clear"]').forEach((button) => {
      button.addEventListener("click", handleClearCart);
    });
  }
  function attachStepsButtonEvents() {
    document.querySelectorAll('[ns-mindsorder-btn="next"]').forEach((button) => {
      button.addEventListener("click", handleNextStep);
    });
    document.querySelectorAll('[ns-mindsorder-btn="prev"]').forEach((button) => {
      button.addEventListener("click", handlePreviousStep);
    });
  }
  function attachQuantityChangeEvents() {
    document.querySelectorAll("[ns-mindsorder-input]").forEach((input) => {
      input.addEventListener("change", handleInputChange);
    });
  }
  function attachQuantityActionsEvents() {
    document.querySelectorAll('[ns-mindsorder-btn="increase"]').forEach((button) => {
      button.addEventListener("click", handleQuantityChange);
    });
    document.querySelectorAll('[ns-mindsorder-btn="decrease"]').forEach((button) => {
      button.addEventListener("click", handleQuantityChange);
    });
  }

  // src/utils/updateFunctions.ts
  function updateCartChip() {
    const orderList = getLocalStorage("orderList");
    const cartChips = document.querySelectorAll("[ns-mindsorder-cartChip]");
    cartChips.forEach((chip) => {
      chip.textContent = orderList.length.toString();
    });
  }
  function updateCartList() {
    const orderList = getLocalStorage("orderList");
    const cartList = document.querySelector("[ns-mindsorder-resourceList]");
    cartList.innerHTML = "";
    if (orderList.length === 0) {
      cartList.innerHTML = "<p>S\xE9lectionnez une ressource pour la voir appara\xEEtre ici</p>";
      return;
    }
    orderList.forEach((resource) => {
      const productElement = generateResourceItem(resource);
      cartList.appendChild(productElement);
    });
    attachRemoveButtonEvents();
    attachQuantityActionsEvents();
    attachQuantityChangeEvents();
  }
  function updatePricing() {
    const totalElement = document.querySelectorAll(
      "[ns-mindsorder-price]"
    );
    const shippingElement = document.querySelectorAll(
      "[ns-mindsorder-shipping]"
    );
    const total = getRawPrice();
    const shipping = getShipping();
    totalElement.forEach((element) => {
      element.textContent = total.toString();
    });
    shippingElement.forEach((element) => {
      element.textContent = shipping.toString();
    });
  }
  function updateEverything() {
    updateCartChip();
    updateCartList();
    updatePricing();
    checkValidCart();
  }

  // src/utils/localStorage.ts
  function initiateLocalStorage() {
    if (!localStorage.getItem("orderList")) {
      const initialOrderList = [];
      localStorage.setItem("orderList", JSON.stringify(initialOrderList));
    }
  }
  function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  }
  function updateLocalStorage(product) {
    initiateLocalStorage();
    const orderList = getLocalStorage("orderList");
    if (orderList.some((p) => p.title === product.title)) {
      return;
    }
    orderList.push(product);
    localStorage.setItem("orderList", JSON.stringify(orderList));
  }
  function updateResourceQuantity(product) {
    const orderList = getLocalStorage("orderList");
    orderList.map((p) => {
      if (p.title === product.title) {
        p.quantity = product.quantity;
      }
    });
    localStorage.setItem("orderList", JSON.stringify(orderList));
    updateEverything();
  }
  function removeLocalStorage(product) {
    const orderList = getLocalStorage("orderList");
    const updatedOrderList = orderList.filter((p) => p.title !== product.title);
    localStorage.setItem("orderList", JSON.stringify(updatedOrderList));
  }
  function clearLocalStorage() {
    localStorage.removeItem("orderList");
  }

  // src/utils/checkFunctions.ts
  function checkValidCart() {
    const productList = getLocalStorage("orderList");
    const nextButtons = document.querySelectorAll('[ns-mindsorder-btn="next"]');
    if (productList.length === 0) {
      toast("Votre panier est vide");
      nextButtons.forEach((button) => {
        button.setAttribute("disabled", "true");
        button.classList.add("is-disabled");
      });
      return true;
    }
    nextButtons.forEach((button) => {
      button.removeAttribute("disabled");
      button.classList.remove("is-disabled");
    });
    return false;
  }

  // src/utils/initFunctions.ts
  function initStepPage() {
    const step2Div = document.querySelector('[ns-mindsorder-step="2"]');
    step2Div.style.display = "none";
  }
  function initOrderPage() {
    initStepPage();
    updateCartList();
    updatePricing();
    attachClearButtonEvents();
    attachStepsButtonEvents();
    checkValidCart();
  }
  function initCart() {
    updateCartChip();
    attachAddButtonEvents();
  }

  // src/index.ts
  document.addEventListener("DOMContentLoaded", () => {
    if (typeof Storage === "undefined") {
      toast("LocalStorage is not available");
      return;
    }
    initiateLocalStorage();
    const currentLocation = window.location;
    const pageUrl = currentLocation.pathname.split("/")[1];
    if (pageUrl === "commander") {
      initOrderPage();
    }
    initCart();
  });
})();
//# sourceMappingURL=index.js.map
