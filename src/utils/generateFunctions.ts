import { getRawPrice, getResourcePricing, getShipping } from './getFunctions';
import { getLocalStorage } from './localStorage';
import type { Resource } from './types';

function generateSummaryRow(resource: Resource): HTMLElement {
  const { type, title, quantity } = resource;
  const row = document.createElement('tr');
  row.classList.add('table_row');
  row.innerHTML = `
    <td class="table_cell first">${title}</td>
    <td class="table_cell">${type}</td>
    <td class="table_cell">${quantity}</td>
    <td class="table_cell">${getResourcePricing(resource)}.-</td>
    `;
  return row;
}

export function generateSummary() {
  const orderList = getLocalStorage('orderList');

  orderList.map((resource: Resource) => {
    const productElement = document.querySelector('[ns-mindsorder-summary]');
    const body = productElement?.querySelector('tbody');
    body?.appendChild(generateSummaryRow(resource));
  });
}

export function generateEmailContent() {
  const textarea = document.querySelector('[data-nmra-element="text-area"]') as HTMLTextAreaElement;
  const resources = getLocalStorage('orderList');
  let emailContent = `
      <table style="border-collapse: collapse; color: black;">
        <tr>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantité</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
        </tr>
    `;

  resources.map((product: Resource) => {
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

export function generateResourceItem(resource: Resource): HTMLElement {
  const productElement = document.createElement('div');
  productElement.innerHTML = `
      <div class="ns_resource-item" ns-mindsorder-resource ns-mindsorder-resourceTitle="${resource.title}" ns-mindsorder-resourceType="${resource.type}">
        <div class="ns_resource-header">  
          <span class="ns_resource-type">${resource.type}</span>
          <button class="ns_btn-remove" ns-mindsorder-btn="remove">Supprimer</button>
        </div>
        <h3 class="ns_resource-title">${resource.title}</h3>
        <div class="ns_resource-footer">
        <span>Quantité:</span>
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
