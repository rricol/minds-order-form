"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

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

  // src/utils/getFunctions.ts
  function getResourceCount() {
    const products = getCookie("selectedProducts") || [];
    return products.length;
  }

  // src/utils/updateFunctions.ts
  function updateCart(Product) {
    const products = getCookie("selectedProducts") || [];
    products.push(Product);
    setCookie("selectedProducts", products, 7);
  }
  function updateCartMenu() {
    const carts = document.querySelectorAll('[data-nmra-element="cart"]');
    carts.forEach((element) => {
      const count = element.querySelector('[data-nmra-element="cart-count"]');
      if (count)
        count.textContent = getResourceCount().toString();
    });
  }

  // src/utils/handlersFunctions.ts
  function resourceAlreadySelected(productType, productTitle) {
    const products = getCookie("selectedProducts") || [];
    return products.some(
      (product) => product.type === productType && product.title === productTitle
    );
  }
  function createToast(message, addButton) {
    const toast = document.createElement("div");
    toast.classList.add("toast-success");
    toast.textContent = message;
    if (addButton) {
      const button = document.createElement("button");
      button.classList.add("button", "is-secondary", "is-small", "is-alternate");
      button.textContent = "Aller au panier";
      button.addEventListener("click", () => {
        window.location.href = "/commander-wip";
      });
      toast.appendChild(button);
    }
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3e3);
    toast.addEventListener("click", () => {
      toast.remove();
    });
  }
  function handleAddRessourceToCart() {
    const titleElement = document.querySelector('[data-nmra-element="title"]');
    const resourceTitle = titleElement?.innerText;
    const resourceType = titleElement.getAttribute("data-nmra-type");
    if (!resourceAlreadySelected(resourceType, resourceTitle)) {
      const product = {
        type: resourceType,
        title: resourceTitle,
        quantity: resourceType === "Infographie" ? 1 : 0,
        quantityA2: 0,
        quantityA3: 0
      };
      updateCart(product);
      createToast("Ressource ajout\xE9e au panier", true);
    } else {
      createToast("La ressource est d\xE9j\xE0 dans le panier", true);
    }
  }

  // src/cart.ts
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('[data-nmra-action="add-to-cart"]').forEach((element) => {
      element.addEventListener("click", handleAddRessourceToCart);
    });
    updateCartMenu();
  });
})();
//# sourceMappingURL=cart.js.map
