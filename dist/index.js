"use strict";(()=>{function v(){let r=u("selectedProducts")||[],t=0;return r.forEach(e=>{let{type:n,quantity:o,quantityA3:s=0,quantityA2:c=0}=e;n==="Infographie"?t+=c*6+s*(s<10?4:3):n==="Brochure"?t+=o*(o<10?9:o<30?8:7):n==="Publication"&&(t+=o*(o<5?16:o<10?14:13))}),t.toString()}function g(r){let{type:t,quantity:e,quantityA3:n=0,quantityA2:o=0}=r;return t==="Infographie"?o*6+n*(n<10?4:3):t==="Brochure"?e*(e<10?9:e<30?8:7):t==="Publication"?e*(e<5?16:e<10?14:13):0}function d(){return(u("selectedProducts")||[]).length}function p(){let r=u("selectedProducts")||[];return r.length===0?!1:r.every(t=>t.quantity>0||(t.quantityA3??0)>0||(t.quantityA2??0)>0)}function h(){let r=document.querySelector('[data-nmra-element="step2"]'),t=document.querySelectorAll('[data-nmra-action="next-step"]'),e=document.querySelectorAll('[data-nmra-action="previous-step"]');r.style.display="none",t&&t.forEach(n=>{n.addEventListener("click",q)}),e&&e.forEach(n=>{n.addEventListener("click",x)})}function R(r,t){return(u("selectedProducts")||[]).some(n=>n.type===r&&n.title===t)}function b(r){let t=r.target.closest(".selected-product"),e=t.querySelector(".nmra-resource_type")?.textContent,n=t.querySelector(".nmra-resource_name")?.textContent;e&&n&&(t.remove(),P(e,n),l())}function E(r){let t=r.target.closest(".nmra-resource_quantity-group")?.querySelector("input"),e=t.getAttribute("data-nmra-format"),n=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,o=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name"),s=isNaN(parseInt(t.value))?0:parseInt(t.value);t.value=(s+1).toString(),n&&o&&(f(n,o.textContent,e?{[e]:parseInt(t.value)}:{quantity:parseInt(t.value)}),l())}function S(r){let t=r.target.closest(".nmra-resource_quantity-group")?.querySelector("input"),e=t.getAttribute("data-nmra-format"),n=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,o=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name"),s=isNaN(parseInt(t.value))?0:parseInt(t.value);s>0&&(t.value=(s-1).toString()),n&&o&&(f(n,o.textContent,e?{[e]:parseInt(t.value)}:{quantity:parseInt(t.value)}),l())}function A(r){let t=r.target,e=isNaN(parseInt(t.value))?0:parseInt(t.value),n=t.getAttribute("data-nmra-format"),o=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_type")?.textContent,s=t.closest('[data-nmra-element="card"]')?.querySelector(".nmra-resource_name");o&&s&&(e>=0?f(o,s.textContent,n?{[n]:e}:{quantity:e}):t.value="0"),l()}function L(r){let e=r.target.closest('[data-nmra-element="resource"]').querySelector('[data-nmra-element="title"]'),n=e?.innerText,o=e.getAttribute("data-nmra-type");R(o,n)||y(o,n),l()}function C(){document.querySelectorAll(".selected-product").forEach(r=>{r.remove()}),T(),l()}function N(r){let{type:t,title:e,quantity:n,quantityA3:o,quantityA2:s}=r;return`
      <div class="order-summary_cell main">${e}</div>
      <div class="order-summary_cell">${t}</div>
      <div class="order-summary_cell">${t==="Infographie"?`A3: ${o} <br> A2: ${s}`:`${n}`}</div>
      <div class="order-summary_cell price">${g(r)}.-</div>
  `}function B(r){let t=`
    <table style="border-collapse: collapse; color: black;">
      <tr>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantit\xE9</th>
        <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
      </tr>
  `;return r.map(e=>{let{type:n,title:o,quantity:s,quantityA3:c,quantityA2:a}=e;t+=`
      <tr>
        <td style="padding: 8px; border: 1px solid black;">${n}</td>
        <td style="padding: 8px; border: 1px solid black;">${o}</td>
        <td style="padding: 8px; border: 1px solid black;">${n==="Infographie"?`A3: ${c} <br> A2: ${a}`:`${s}`}</td>
        <td style="padding: 8px; border: 1px solid black;">${g(e)}.-</td>
      </tr>
    `}),t+=`
    <tr>
      <td style="padding: 8px; border: 1px solid black; text-align: right; font-weight: bold;">${parseInt(v())+9} (frais de port inclus)</td>
    </tr>`,t+="</table>",t}function q(){let r=document.querySelector('[data-nmra-element="step1"]'),t=document.querySelector('[data-nmra-element="step2"]'),e=document.querySelector('[data-nmra-element="text-area"]'),n=document.querySelector('[data-nmra-element="total-price"]'),o=document.querySelector('[data-nmra-element="summary-content"]');if(d()>0&&p()&&(n&&(n.textContent=`${parseInt(v())+9}.- CHF`),r&&t)){r.style.display="none",t.style.display="block";let s=u("selectedProducts")||[];s.map(c=>{let a=document.createElement("div");a.classList.add("order-summary_row"),a.innerHTML=N(c),o.appendChild(a)}),e&&(e.value=B(s),e.disabled=!0)}}function x(){let r=document.querySelector('[data-nmra-element="step1"]'),t=document.querySelector('[data-nmra-element="step2"]');r&&t&&(r.style.display="block",t.style.display="none")}function y(r,t,e=1,n=0,o=0){let s=document.querySelector('[data-nmra-element="list"]'),c=document.createElement("div");c.classList.add("selected-product"),r==="Infographie"?c.innerHTML=`
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
    `:c.innerHTML=`
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
    `,s.appendChild(c),c.querySelector('[data-nmra-action="remove"]')?.addEventListener("click",b),c.querySelectorAll('[data-nmra-action="increase"]').forEach(a=>{a.addEventListener("click",E)}),c.querySelectorAll('[data-nmra-action="decrease"]').forEach(a=>{a.addEventListener("click",S)}),c.querySelectorAll(".quantity-input").forEach(a=>{a.addEventListener("change",A)}),k()}function m(r,t,e){let n=new Date;n.setTime(n.getTime()+e*24*60*60*1e3),document.cookie=`${r}=${JSON.stringify(t)};expires=${n.toUTCString()};path=/`}function u(r){let t=`${r}=`,e=document.cookie.split(";");for(let n=0;n<e.length;n++){let o=e[n].trim();if(o.indexOf(t)===0)return JSON.parse(o.substring(t.length))}return null}function P(r,t){let e=u("selectedProducts")||[];e=e.filter(n=>!(n.type===r&&n.title===t)),m("selectedProducts",e,7)}function T(){m("selectedProducts",[],7)}function I(){(u("selectedProducts")||[]).forEach(t=>y(t.type,t.title,t.quantity,t.quantityA3,t.quantityA2))}function k(){let t=document.querySelector('[data-nmra-element="list"]').querySelectorAll(".selected-product"),e=Array.from(t).map(n=>{let o=n.querySelector(".nmra-resource_type")?.textContent,s=n.querySelector(".nmra-resource_name")?.textContent,c=o==="Infographie"?0:parseInt(n.querySelector(".quantity-input").value),a=o==="Infographie"?parseInt(n.querySelector('[data-nmra-format="A3"]').value):0,i=o==="Infographie"?parseInt(n.querySelector('[data-nmra-format="A2"]').value):0;return{type:o,title:s,quantity:c,quantityA3:a,quantityA2:i}});m("selectedProducts",e,7)}function M(){let r=u("selectedProducts")||[],t=0,e=r.reduce((a,i)=>i.type==="Brochure"?a+i.quantity:a,0),n=r.reduce((a,i)=>i.type==="Infographie"?a+(i.quantityA2??0)+(i.quantityA3??0):a,0),o=r.reduce((a,i)=>i.type==="Publication"?a+i.quantity:a,0);r.reduce((a,i)=>i.type==="Jeux"?a+i.quantity:a,0)<=3&&e<=3&&n===0&&o===0?t=0:t=9;let c=document.querySelector('[data-nmra-element="shipping"]');c.textContent=t.toString()}function H(){let r=u("selectedProducts")||[],t=0;r.forEach(n=>{let{type:o,title:s,quantity:c,quantityA3:a=0,quantityA2:i=0}=n;o==="Infographie"?t+=i*6+a*(a<10?4:3):o==="Brochure"?s==="Qui est minds ?"?t+=c*0:t+=c*(c<10?9:c<30?8:7):o==="Publication"?t+=c*(c<5?16:c<10?14:13):o==="Jeux"&&(t+=c*26)});let e=document.querySelector('[data-nmra-element="total"]');e.textContent=t.toString()}function w(){let r=document.querySelector('[data-nmra-element="count"]'),t=document.querySelector('[data-nmra-element="cart-count"]'),e=d();r.innerHTML=e===0?"<span>Aucune ressource s\xE9lectionn\xE9e</span>":`<span class="product-count">${e}</span> ressource${e>1?"s":""} s\xE9lectionn\xE9e${e>1?"s":""}`,t.textContent=e.toString()}function f(r,t,e){let n=u("selectedProducts")||[],o=n.findIndex(s=>s.type===r&&s.title===t);o!==-1&&(e.quantity!==void 0&&(n[o].quantity=e.quantity),e.A3!==void 0&&(n[o].quantityA3=e.A3),e.A2!==void 0&&(n[o].quantityA2=e.A2),m("selectedProducts",n,7)),H(),M()}function Q(){let r=document.querySelectorAll('[data-nmra-action="next-step"]'),t=d()===0||!p();r?.forEach(e=>{t?(e.classList.add("is-disabled"),e.setAttribute("disabled",t.toString())):(e.classList.remove("is-disabled"),e.removeAttribute("disabled"))})}function l(){H(),M(),w(),Q()}function _(){document.querySelectorAll('[data-nmra-action="add"]').forEach(r=>{r.addEventListener("click",L)})}function $(){document.querySelectorAll('[data-nmra-action="clear"]').forEach(r=>{r.addEventListener("click",C)})}document.addEventListener("DOMContentLoaded",()=>{I(),_(),$(),l(),h()});})();
