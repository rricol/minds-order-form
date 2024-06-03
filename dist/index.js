"use strict";(()=>{function f(){let r=u("selectedProducts")||[],e=0;return r.forEach(n=>{let{type:t,quantity:o,quantityA3:a=0,quantityA2:s=0}=n;t==="Infographie"?e+=s*6+a*(a<10?4:3):t==="Brochure"?e+=o*(o<10?9:o<30?8:7):t==="Publication"&&(e+=o*(o<5?16:o<10?14:13))}),e.toString()}function v(r){let{type:e,quantity:n,quantityA3:t=0,quantityA2:o=0}=r;return e==="Infographie"?o*6+t*(t<10?4:3):e==="Brochure"?n*(n<10?9:n<30?8:7):e==="Publication"?n*(n<5?16:n<10?14:13):0}function c(){let r=u("selectedProducts")||[],e=0;r.forEach(t=>{let{type:o,quantity:a,quantityA3:s=0,quantityA2:i=0}=t;o==="Infographie"?e+=i*6+s*(s<10?4:3):o==="Brochure"?e+=a*(a<10?9:a<30?8:7):o==="Publication"&&(e+=a*(a<5?16:a<10?14:13))});let n=document.querySelector('[data-nmra-element="total"]');n.textContent=e.toString()}function l(){let e=document.querySelector('[data-nmra-element="list"]').querySelectorAll(".selected-product"),n=document.querySelector('[data-nmra-element="count"]'),t=document.querySelectorAll('[data-nmra-action="next-step"]'),o=e.length,a=o===0;t?.forEach(s=>{a?(s.classList.add("is-disabled"),s.setAttribute("disabled",a.toString())):(s.classList.remove("is-disabled"),s.removeAttribute("disabled"))}),n.innerHTML=o===0?"<span>Aucune ressource s\xE9lectionn\xE9e</span>":`<span class="product-count">${o}</span> ressource${o>1?"s":""} s\xE9lectionn\xE9e${o>1?"s":""}`}function p(r,e,n){let t=u("selectedProducts")||[],o=t.findIndex(a=>a.type===r&&a.title===e);o!==-1&&(n.quantity!==void 0&&(t[o].quantity=n.quantity),n.A3!==void 0&&(t[o].quantityA3=n.A3),n.A2!==void 0&&(t[o].quantityA2=n.A2),m("selectedProducts",t,7)),c()}function _(r,e){return(u("selectedProducts")||[]).some(t=>t.type===r&&t.title===e)}function q(r){let e=r.target.closest(".selected-product"),n=e.querySelector(".nmra-resource_type")?.textContent,t=e.querySelector(".nmra-resource_name")?.textContent;n&&t&&(e.remove(),x(n,t),l(),c())}function g(r){let e=r.target.closest(".nmra-resource_quantity-group")?.querySelector("input"),n=e.getAttribute("data-nmra-format"),t=e.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,o=e.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name"),a=isNaN(parseInt(e.value))?0:parseInt(e.value);e.value=(a+1).toString(),t&&o&&(p(t,o.textContent,n?{[n]:parseInt(e.value)}:{quantity:parseInt(e.value)}),c())}function E(r){let e=r.target.closest(".nmra-resource_quantity-group")?.querySelector("input"),n=e.getAttribute("data-nmra-format"),t=e.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,o=e.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name"),a=isNaN(parseInt(e.value))?0:parseInt(e.value);a>0&&(e.value=(a-1).toString()),t&&o&&(p(t,o.textContent,n?{[n]:parseInt(e.value)}:{quantity:parseInt(e.value)}),c())}function S(r){let e=r.target,n=isNaN(parseInt(e.value))?0:parseInt(e.value),t=e.getAttribute("data-nmra-format"),o=e.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,a=e.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name");o&&a&&(n>=0?p(o,a.textContent,t?{[t]:n}:{quantity:n}):e.value="0",c())}function h(r){let n=r.target.closest('[data-nmra-element="resource"]').querySelector('[data-nmra-element="title"]'),t=n?.innerText,o=n.getAttribute("data-nmra-type");_(o,t)||y(o,t)}function A(){document.querySelectorAll(".selected-product").forEach(r=>{r.remove()}),P(),l(),c()}function k(r){let{type:e,title:n,quantity:t,quantityA3:o,quantityA2:a}=r;return`
    <div class="order-summary_row" >
      <div class="order-summary_cell main">${n}</div>
      <div class="order-summary_cell">${e}</div>
      <div class="order-summary_cell">${e==="Infographie"?`A3: ${o} <br> A2: ${a}`:`${t}`}</div>
      <div class="order-summary_cell price">${v(r)}.-</div>
    </div>
  `}function L(){let r=document.querySelector('[data-nmra-element="step1"]'),e=document.querySelector('[data-nmra-element="step2"]'),n=document.querySelector('[data-nmra-element="text-area"]'),t=document.querySelector('[data-nmra-element="total-price"]'),o=document.querySelector('[data-nmra-element="summary-content"]'),a=document.querySelector('[data-nmra-element="summary-wrapper"]');t&&(t.textContent=`${parseInt(f())+9}.- CHF`),r&&e&&(r.style.display="none",e.style.display="block",(u("selectedProducts")||[]).map(i=>{let d=document.createElement("div");d.classList.add("order-summary_row"),d.innerHTML=k(i),o.appendChild(d)}),n&&(n.value=`<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@numeraswiss/minds-order-form@latest/dist/emailstyle.css">
${a.innerHTML}`,n.disabled=!0))}function b(){let r=document.querySelector('[data-nmra-action="step1"]'),e=document.querySelector('[data-nmra-action="step2"]');r&&e&&(r.style.display="block",e.style.display="none")}function y(r,e,n=1,t=0,o=0){let a=document.querySelector('[data-nmra-element="list"]'),s=document.createElement("div");s.classList.add("selected-product"),r==="Infographie"?s.innerHTML=`
      <div class="selected-product-item" data-nmra-element="card">
        <span class="nmra-resource_type" >${r}</span>
        <span class="nmra-resource_name">${e}</span>
        <span class="nmra-resource_quantity-title">Quantit\xE9s:</span>
        <div class="nmra-resource_quantity-wrapper">
          <div class="nmra-resource_quantity-group">
            <label class="nmra-resource-format">A3:</label>
            <input class="quantity-input" type="number" data-nmra-format="A3" value="${t}" min="0">
            <div class="quantity-button_wrapper">
              <button class="quantity-change" data-nmra-action="decrease">-</button>
              <button class="quantity-change" data-nmra-action="increase">+</button>
            </div>
          </div>
          <div class="nmra-resource_quantity-group">
            <label class="nmra-resource-format">A2:</label>
            <input class="quantity-input" type="number" data-nmra-format="A2" value="${o}" min="0">
            <div class="quantity-button_wrapper">
              <button class="quantity-change" data-nmra-action="decrease">-</button>
              <button class="quantity-change" data-nmra-action="increase">+</button>
            </div>
          </div>
          <button class="remove-product" data-nmra-action="remove">Supprimer</button>
        </div>
      </div>
    `:s.innerHTML=`
    <div class="selected-product-item" data-nmra-element="card">
        <span class="nmra-resource_type">${r}</span>
        <span class="nmra-resource_name">${e}</span>
        <span class="nmra-resource_quantity-title">Quantit\xE9s :</span>
        <div class="nmra-resource_quantity-wrapper">
          <div class="nmra-resource_quantity-group">
            <input class="quantity-input" type="number" value="${n}" min="1">
            <div class="quantity-button_wrapper">
              <button class="quantity-change" data-nmra-action="decrease">-</button>
              <button class="quantity-change" data-nmra-action="increase">+</button>
            </div>
          </div>
          <button class="remove-product" data-nmra-action="remove">Supprimer</button>
        </div>
      </div>
    `,a.appendChild(s),s.querySelector('[data-nmra-action="remove"]')?.addEventListener("click",q),s.querySelectorAll('[data-nmra-action="increase"]').forEach(i=>{i.addEventListener("click",g)}),s.querySelectorAll('[data-nmra-action="decrease"]').forEach(i=>{i.addEventListener("click",E)}),s.querySelectorAll(".quantity-input").forEach(i=>{i.addEventListener("change",S)}),l(),T(),c()}function m(r,e,n){let t=new Date;t.setTime(t.getTime()+n*24*60*60*1e3),document.cookie=`${r}=${JSON.stringify(e)};expires=${t.toUTCString()};path=/`}function u(r){let e=`${r}=`,n=document.cookie.split(";");for(let t=0;t<n.length;t++){let o=n[t].trim();if(o.indexOf(e)===0)return JSON.parse(o.substring(e.length))}return null}function x(r,e){let n=u("selectedProducts")||[];n=n.filter(t=>!(t.type===r&&t.title===e)),m("selectedProducts",n,7),c()}function P(){m("selectedProducts",[],7),c()}function C(){(u("selectedProducts")||[]).forEach(e=>y(e.type,e.title,e.quantity,e.quantityA3,e.quantityA2)),c(),l()}function T(){let e=document.querySelector('[data-nmra-element="list"]').querySelectorAll(".selected-product"),n=Array.from(e).map(t=>{let o=t.querySelector(".nmra-resource_type")?.textContent,a=t.querySelector(".nmra-resource_name")?.textContent,s=o==="Infographie"?0:parseInt(t.querySelector(".quantity-input").value),i=o==="Infographie"?parseInt(t.querySelector('[data-nmra-format="A3"]').value):0,d=o==="Infographie"?parseInt(t.querySelector('[data-nmra-format="A2"]').value):0;return{type:o,title:a,quantity:s,quantityA3:i,quantityA2:d}});m("selectedProducts",n,7)}function H(){document.querySelectorAll('[data-nmra-action="add"]').forEach(r=>{r.addEventListener("click",h)})}function M(){document.querySelectorAll('[data-action="clear"]').forEach(r=>{r.addEventListener("click",A)})}function I(){let r=document.querySelector('[data-nmra-element="step2"]'),e=document.querySelectorAll('[data-nmra-action="next-step"]'),n=document.querySelectorAll('[data-nmra-action="previous-step"]');r.style.display="none",e&&e.forEach(t=>{t.addEventListener("click",L)}),n&&n.forEach(t=>{t.addEventListener("click",b)})}document.addEventListener("DOMContentLoaded",()=>{C(),H(),M(),I()});})();
