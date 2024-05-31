"use strict";(()=>{function d(){let a=p("selectedProducts")||[],t=0;a.forEach(e=>{let{type:o,quantity:r,quantityA3:s=0,quantityA2:u=0}=e;o==="Infographie"?t+=u*6+s*(s<10?4:3):o==="Brochure"?t+=r*(r<10?9:r<30?8:7):o==="Publication"&&(t+=r*(r<5?16:r<10?14:13))});let n=document.querySelector("[data-count-total]");n.innerHTML=t.toString()}function x(){let a=p("selectedProducts")||[],t=0;return a.forEach(n=>{let{type:e,quantity:o,quantityA3:r=0,quantityA2:s=0}=n;e==="Infographie"?t+=s*6+r*(r<10?4:3):e==="Brochure"?t+=o*(o<10?9:o<30?8:7):e==="Publication"&&(t+=o*(o<5?16:o<10?14:13))}),t.toString()}function m(){let t=document.querySelector("[data-selected-products]").querySelectorAll(".selected-product"),n=document.querySelector("[data-selected-product-count]"),e=document.querySelectorAll('[data-action="next-step"]'),o=t.length,r=o===0;e?.forEach(s=>{s.toggleAttribute("disabled",r)}),n.innerHTML=o===0?"<span>Aucune ressource s\xE9lectionn\xE9e</span>":`<span class="product-count">${o}</span> ressource${o>1?"s":""} s\xE9lectionn\xE9e${o>1?"s":""}`}function v(a,t,n=1,e=0,o=0){let r=document.querySelector("[data-selected-products]"),s=document.createElement("div");s.classList.add("selected-product"),a==="Infographie"?s.innerHTML=`
      <div class="selected-product-item">
        <span class="text-size-small margin-bottom margin-tiny text-color-secondary">${a}</span>
        <span class="text-weight-semibold margin-bottom margin-xxsmall">${t}</span>
        <span class="text-size-tiny margin-bottom margin-tiny">Quantit\xE9s:</span>
        <div class="selected-product_actions-wrapper">
          <span class="selected-product_field-group">
            <label>A3:</label>
            <span>
              <button class="quantity-change" data-action="decrease" data-format-name="A3">-</button>
              <input class="quantity-input" type="number" data-format="A3" value="${e}" min="0">
              <button class="quantity-change" data-action="increase" data-format-name="A3">+</button>
            </span>
          </span>
          <span class="selected-product_field-group">
            <label>A2:</label>
            <span>
              <button class="quantity-change" data-action="decrease" data-format-name="A2">-</button>
              <input class="quantity-input" type="number" data-format="A2" value="${o}" min="0">
              <button class="quantity-change" data-action="increase" data-format-name="A2">+</button>
            </span>
          </span>
          <button class="remove-product text-size-small button is-link" data-action="remove">Supprimer</button>
        </div>
      </div>
    `:s.innerHTML=`
      <div class="selected-product-item">
        <span class="text-size-small margin-bottom margin-tiny text-color-secondary">${a}</span>
        <span class="text-weight-semibold margin-bottom margin-xxsmall">${t}</span>
        <span class="text-size-tiny margin-bottom margin-tiny">Quantit\xE9s:</span>
        <div class="selected-product_actions-wrapper">
          <span>
            <button class="quantity-change" data-action="decrease">-</button>
            <input class="quantity-input" type="number" value="${n}" min="1">
            <button class="quantity-change" data-action="increase">+</button>
          </span>
          <button class="remove-product text-size-small button is-link" data-action="remove">Supprimer</button>
        </div>
      </div>
    `,r.appendChild(s),m(),S(),s.querySelector(".remove-product")?.addEventListener("click",u=>{let c=u.target.closest(".selected-product"),i=c.querySelector(".text-size-small")?.textContent,l=c.querySelector(".text-weight-semibold")?.textContent;i&&l&&(c.remove(),E(i,l),m(),d())}),s.querySelectorAll(".quantity-change").forEach(u=>{u.addEventListener("click",c=>{let i=c.target.closest("span")?.querySelector("input"),l=isNaN(parseInt(i.value))?0:parseInt(i.value);c.target.getAttribute("data-action")==="increase"?i.value=(l+1).toString():c.target.getAttribute("data-action")==="decrease"&&l>0&&(i.value=(l-1).toString());let y=c.target.getAttribute("data-format-name"),g=s.querySelector(".text-size-small")?.textContent,q=s.querySelector(".text-weight-semibold")?.textContent;g&&q&&(f(g,q,y?{[y]:parseInt(i.value)}:{quantity:parseInt(i.value)}),d())})}),s.querySelectorAll(".quantity-input").forEach(u=>{u.addEventListener("change",c=>{let i=isNaN(parseInt(c.target.value))?0:parseInt(c.target.value),l=c.target.getAttribute("data-format"),y=u.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent,g=u.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;y&&g&&(i>=0?(f(y,g,l?{[l]:i}:{quantity:i}),d()):c.target.value="0")})}),m(),d()}function b(a,t,n){let e=new Date;e.setTime(e.getTime()+n*24*60*60*1e3),document.cookie=`${a}=${JSON.stringify(t)};expires=${e.toUTCString()};path=/`}function p(a){let t=`${a}=`,n=document.cookie.split(";");for(let e=0;e<n.length;e++){let o=n[e].trim();if(o.indexOf(t)===0)return JSON.parse(o.substring(t.length))}return null}function f(a,t,n){let e=p("selectedProducts")||[],o=e.findIndex(r=>r.type===a&&r.title===t);o!==-1&&(n.quantity!==void 0&&(e[o].quantity=n.quantity),n.A3!==void 0&&(e[o].quantityA3=n.A3),n.A2!==void 0&&(e[o].quantityA2=n.A2),b("selectedProducts",e,7)),d()}function E(a,t){let n=p("selectedProducts")||[];n=n.filter(e=>!(e.type===a&&e.title===t)),b("selectedProducts",n,7),d()}function A(){b("selectedProducts",[],7),d()}function T(){(p("selectedProducts")||[]).forEach(t=>v(t.type,t.title,t.quantity,t.quantityA3,t.quantityA2))}function S(){let t=document.querySelector("[data-selected-products]").querySelectorAll(".selected-product"),n=Array.from(t).map(e=>{let o=e.querySelector(".text-size-small")?.textContent,r=e.querySelector(".text-weight-semibold")?.textContent,s=o==="Infographie"?0:parseInt(e.querySelector(".quantity-input").value),u=o==="Infographie"?parseInt(e.querySelector('[data-format="A3"]').value):0,c=o==="Infographie"?parseInt(e.querySelector('[data-format="A2"]').value):0;return{type:o,title:r,quantity:s,quantityA3:u,quantityA2:c}});b("selectedProducts",n,7)}function L(){document.querySelectorAll('[data-action="add"]').forEach(a=>{a.addEventListener("click",t=>{let n=t.target.closest("[data-product-type]"),e=n.getAttribute("data-product-type"),o=n.querySelector("h3")?.innerText;C(e,o)||v(e,o)})})}function C(a,t){return(p("selectedProducts")||[]).some(e=>e.type===a&&e.title===t)}function h(){document.querySelectorAll('[data-action="clear"]').forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".selected-product").forEach(t=>{t.remove()}),A(),m()})})}function P(){document.querySelectorAll(".remove-product").forEach(a=>{a.addEventListener("click",t=>{let n=t.target.closest(".selected-product"),e=n.querySelector(".text-size-small")?.textContent,o=n.querySelector(".text-weight-semibold")?.textContent;e&&o&&(n.remove(),E(e,o),m())})})}function M(){document.querySelectorAll(".quantity-change").forEach(a=>{a.addEventListener("click",t=>{let n=t.target.closest("span")?.querySelector("input"),e=isNaN(parseInt(n.value))?0:parseInt(n.value);t.target.getAttribute("data-action")==="increase"?n.value=(e+1).toString():t.target.getAttribute("data-action")==="decrease"&&e>0&&(n.value=(e-1).toString());let o=t.target.getAttribute("data-format-name"),r=n.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent,s=n.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;r&&s&&f(r,s,o?{[o]:parseInt(n.value)}:{quantity:parseInt(n.value)})})}),document.querySelectorAll(".quantity-input").forEach(a=>{a.addEventListener("change",t=>{let n=isNaN(parseInt(t.target.value))?0:parseInt(t.target.value),e=t.target.getAttribute("data-format"),o=a.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent,r=a.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;o&&r&&(n>=0?f(o,r,e?{[e]:n}:{quantity:n}):t.target.value="0")})})}function H(){let a=document.querySelector('[data-step="1"]'),t=document.querySelector('[data-step="2"]'),n=document.querySelectorAll('[data-action="next-step"]'),e=document.querySelector("#previous-to-step-1"),o=document.querySelector("[data-text-area]");t.style.display="none",n&&n.forEach(r=>{r.addEventListener("click",()=>{if(a&&t&&!r.hasAttribute("disabled")){a.style.display="none",t.style.display="block";let s=p("selectedProducts")||[],u=`Prix : ${x()} CHF
+9 CHF de frais de port

Produits s\xE9lectionn\xE9s:
`;u+=s.map(c=>{let{type:i,title:l,quantity:y,quantityA3:g,quantityA2:q}=c;return i==="Infographie"?`${i}: ${l} - A3: ${g} - A2: ${q}`:`${i}: ${l} - Quantit\xE9: ${y}`}).join(`
`),o&&(o.value=u,o.disabled=!0)}})}),e&&e.addEventListener("click",()=>{a&&t&&(t.style.display="none",a.style.display="block")})}document.addEventListener("DOMContentLoaded",()=>{T(),m(),d(),L(),P(),M(),h(),H()});})();
