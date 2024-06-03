"use strict";(()=>{function f(){let r=i("selectedProducts")||[],t=0;return r.forEach(e=>{let{type:n,quantity:o,quantityA3:a=0,quantityA2:s=0}=e;n==="Infographie"?t+=s*6+a*(a<10?4:3):n==="Brochure"?t+=o*(o<10?9:o<30?8:7):n==="Publication"&&(t+=o*(o<5?16:o<10?14:13))}),t.toString()}function v(r){let{type:t,quantity:e,quantityA3:n=0,quantityA2:o=0}=r;return t==="Infographie"?o*6+n*(n<10?4:3):t==="Brochure"?e*(e<10?9:e<30?8:7):t==="Publication"?e*(e<5?16:e<10?14:13):0}function d(){return(i("selectedProducts")||[]).length}function m(){let r=i("selectedProducts")||[];return r.length===0?!1:r.every(t=>t.quantity>0||(t.quantityA3??0)>0||(t.quantityA2??0)>0)}function x(){let r=document.querySelector('[data-nmra-element="step2"]'),t=document.querySelectorAll('[data-nmra-action="next-step"]'),e=document.querySelectorAll('[data-nmra-action="previous-step"]');r.style.display="none",t&&t.forEach(n=>{n.addEventListener("click",g)}),e&&e.forEach(n=>{n.addEventListener("click",q)})}function $(r,t){return(i("selectedProducts")||[]).some(n=>n.type===r&&n.title===t)}function h(r){let t=r.target.closest(".selected-product"),e=t.querySelector(".nmra-resource_type")?.textContent,n=t.querySelector(".nmra-resource_name")?.textContent;e&&n&&(t.remove(),P(e,n),u())}function b(r){let t=r.target.closest(".nmra-resource_quantity-group")?.querySelector("input"),e=t.getAttribute("data-nmra-format"),n=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,o=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name"),a=isNaN(parseInt(t.value))?0:parseInt(t.value);t.value=(a+1).toString(),n&&o&&(y(n,o.textContent,e?{[e]:parseInt(t.value)}:{quantity:parseInt(t.value)}),u())}function E(r){let t=r.target.closest(".nmra-resource_quantity-group")?.querySelector("input"),e=t.getAttribute("data-nmra-format"),n=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,o=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name"),a=isNaN(parseInt(t.value))?0:parseInt(t.value);a>0&&(t.value=(a-1).toString()),n&&o&&(y(n,o.textContent,e?{[e]:parseInt(t.value)}:{quantity:parseInt(t.value)}),u())}function S(r){let t=r.target,e=isNaN(parseInt(t.value))?0:parseInt(t.value),n=t.getAttribute("data-nmra-format"),o=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,a=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name");o&&a&&(e>=0?y(o,a.textContent,n?{[n]:e}:{quantity:e}):t.value="0"),u()}function A(r){let e=r.target.closest('[data-nmra-element="resource"]').querySelector('[data-nmra-element="title"]'),n=e?.innerText,o=e.getAttribute("data-nmra-type");$(o,n)||p(o,n),u()}function L(){document.querySelectorAll(".selected-product").forEach(r=>{r.remove()}),C(),u()}function R(r){let{type:t,title:e,quantity:n,quantityA3:o,quantityA2:a}=r;return`
      <div class="order-summary_cell main">${e}</div>
      <div class="order-summary_cell">${t}</div>
      <div class="order-summary_cell">${t==="Infographie"?`A3: ${o} <br> A2: ${a}`:`${n}`}</div>
      <div class="order-summary_cell price">${v(r)}.-</div>
  `}function N(r){let t=`
    <table style="border-collapse: collapse; color: black;">
      <tr>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantit\xE9</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
      </tr>
  `;return r.map(e=>{let{type:n,title:o,quantity:a,quantityA3:s,quantityA2:c}=e;t+=`
      <tr>
        <td style="padding: 8px; border: 1px solid black;">${n}</td>
        <td style="padding: 8px; border: 1px solid black;">${o}</td>
        <td style="padding: 8px; border: 1px solid black;">${n==="Infographie"?`A3: ${s} <br> A2: ${c}`:`${a}`}</td>
        <td style="padding: 8px; border: 1px solid black;">${v(e)}.-</td>
      </tr>
    `}),t+=`
    <tr>
      <td style="padding: 8px; border: 1px solid black; text-align: right; font-weight: bold;">${parseInt(f())+9} (frais de port inclus)</td>
    </tr>`,t+="</table>",t}function g(){let r=document.querySelector('[data-nmra-element="step1"]'),t=document.querySelector('[data-nmra-element="step2"]'),e=document.querySelector('[data-nmra-element="text-area"]'),n=document.querySelector('[data-nmra-element="total-price"]'),o=document.querySelector('[data-nmra-element="summary-content"]');if(d()>0&&m()&&(n&&(n.textContent=`${parseInt(f())+9}.- CHF`),r&&t)){r.style.display="none",t.style.display="block";let a=i("selectedProducts")||[];a.map(s=>{let c=document.createElement("div");c.classList.add("order-summary_row"),c.innerHTML=R(s),o.appendChild(c)}),e&&(e.value=N(a),e.disabled=!0)}}function q(){let r=document.querySelector('[data-nmra-element="step1"]'),t=document.querySelector('[data-nmra-element="step2"]');r&&t&&(r.style.display="block",t.style.display="none")}function p(r,t,e=1,n=0,o=0){let a=document.querySelector('[data-nmra-element="list"]'),s=document.createElement("div");s.classList.add("selected-product"),r==="Infographie"?s.innerHTML=`
      <div class="selected-product-item" data-nmra-element="card">
        <span class="nmra-resource_type" >${r}</span>
        <span class="nmra-resource_name">${t}</span>
        <span class="nmra-resource_quantity-title">Quantit\xE9s:</span>
        <div class="nmra-resource_quantity-wrapper">
          <div class="nmra-resource_quantity-group">
            <label class="nmra-resource-format">A3:</label>
            <input class="quantity-input" type="number" data-nmra-format="A3" value="${n}" min="0">
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
        <span class="nmra-resource_name">${t}</span>
        <span class="nmra-resource_quantity-title">Quantit\xE9s :</span>
        <div class="nmra-resource_quantity-wrapper">
          <div class="nmra-resource_quantity-group">
            <input class="quantity-input" type="number" value="${e}" min="1">
            <div class="quantity-button_wrapper">
              <button class="quantity-change" data-nmra-action="decrease">-</button>
              <button class="quantity-change" data-nmra-action="increase">+</button>
            </div>
          </div>
          <button class="remove-product" data-nmra-action="remove">Supprimer</button>
        </div>
      </div>
    `,a.appendChild(s),s.querySelector('[data-nmra-action="remove"]')?.addEventListener("click",h),s.querySelectorAll('[data-nmra-action="increase"]').forEach(c=>{c.addEventListener("click",b)}),s.querySelectorAll('[data-nmra-action="decrease"]').forEach(c=>{c.addEventListener("click",E)}),s.querySelectorAll(".quantity-input").forEach(c=>{c.addEventListener("change",S)}),T()}function l(r,t,e){let n=new Date;n.setTime(n.getTime()+e*24*60*60*1e3),document.cookie=`${r}=${JSON.stringify(t)};expires=${n.toUTCString()};path=/`}function i(r){let t=`${r}=`,e=document.cookie.split(";");for(let n=0;n<e.length;n++){let o=e[n].trim();if(o.indexOf(t)===0)return JSON.parse(o.substring(t.length))}return null}function P(r,t){let e=i("selectedProducts")||[];e=e.filter(n=>!(n.type===r&&n.title===t)),l("selectedProducts",e,7)}function C(){l("selectedProducts",[],7)}function k(){(i("selectedProducts")||[]).forEach(t=>p(t.type,t.title,t.quantity,t.quantityA3,t.quantityA2))}function T(){let t=document.querySelector('[data-nmra-element="list"]').querySelectorAll(".selected-product"),e=Array.from(t).map(n=>{let o=n.querySelector(".nmra-resource_type")?.textContent,a=n.querySelector(".nmra-resource_name")?.textContent,s=o==="Infographie"?0:parseInt(n.querySelector(".quantity-input").value),c=o==="Infographie"?parseInt(n.querySelector('[data-nmra-format="A3"]').value):0,_=o==="Infographie"?parseInt(n.querySelector('[data-nmra-format="A2"]').value):0;return{type:o,title:a,quantity:s,quantityA3:c,quantityA2:_}});l("selectedProducts",e,7)}function I(){let r=i("selectedProducts")||[],t=0;r.forEach(n=>{let{type:o,quantity:a,quantityA3:s=0,quantityA2:c=0}=n;o==="Infographie"?t+=c*6+s*(s<10?4:3):o==="Brochure"?t+=a*(a<10?9:a<30?8:7):o==="Publication"&&(t+=a*(a<5?16:a<10?14:13))});let e=document.querySelector('[data-nmra-element="total"]');e.textContent=t.toString()}function B(){let t=document.querySelector('[data-nmra-element="list"]').querySelectorAll(".selected-product"),e=document.querySelector('[data-nmra-element="count"]'),n=document.querySelector('[data-nmra-element="cart-count"]'),o=t.length;e.innerHTML=o===0?"<span>Aucune ressource s\xE9lectionn\xE9e</span>":`<span class="product-count">${o}</span> ressource${o>1?"s":""} s\xE9lectionn\xE9e${o>1?"s":""}`,n.textContent=o.toString()}function y(r,t,e){let n=i("selectedProducts")||[],o=n.findIndex(a=>a.type===r&&a.title===t);o!==-1&&(e.quantity!==void 0&&(n[o].quantity=e.quantity),e.A3!==void 0&&(n[o].quantityA3=e.A3),e.A2!==void 0&&(n[o].quantityA2=e.A2),l("selectedProducts",n,7)),I()}function D(){let r=document.querySelectorAll('[data-nmra-action="next-step"]'),t=d()===0||!m();r?.forEach(e=>{t?(e.classList.add("is-disabled"),e.setAttribute("disabled",t.toString())):(e.classList.remove("is-disabled"),e.removeAttribute("disabled"))})}function u(){I(),B(),D()}function H(){document.querySelectorAll('[data-nmra-action="add"]').forEach(r=>{r.addEventListener("click",A)})}function M(){document.querySelectorAll('[data-action="clear"]').forEach(r=>{r.addEventListener("click",L)})}document.addEventListener("DOMContentLoaded",()=>{k(),H(),M(),u(),x()});})();
