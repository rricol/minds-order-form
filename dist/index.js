"use strict";(()=>{function d(){let a=m("selectedProducts")||[],t=0;a.forEach(n=>{let{type:o,quantity:r,quantityA3:s=0,quantityA2:u=0}=n;o==="Infographie"?t+=u*6+s*(s<10?4:3):o==="Brochure"?t+=r*(r<10?9:r<30?8:7):o==="Publication"&&(t+=r*(r<5?16:r<10?14:13))});let e=document.querySelector("[data-count-total]");e.innerHTML=t.toString()}function p(){let t=document.querySelector("[data-selected-products]").querySelectorAll(".selected-product"),e=document.querySelector("[data-selected-product-count]"),n=document.querySelector("#next-to-step-2"),o=t.length,r=o===0;n?.toggleAttribute("disabled",r),n?.classList.toggle("is-disabled",r),e.innerHTML=o===0?"<span>Aucune ressource s\xE9lectionn\xE9e</span>":`<span class="product-count">${o}</span> ressource${o>1?"s":""} s\xE9lectionn\xE9e${o>1?"s":""}`}function q(a,t,e=1,n=0,o=0){let r=document.querySelector("[data-selected-products]"),s=document.createElement("div");s.classList.add("selected-product"),a==="Infographie"?s.innerHTML=`
      <div class="selected-product-item">
        <span class="text-size-small margin-bottom margin-tiny text-color-secondary">${a}</span>
        <span class="text-weight-semibold margin-bottom margin-xxsmall">${t}</span>
        <span class="text-size-tiny margin-bottom margin-tiny">Quantit\xE9s:</span>
        <div class="selected-product_actions-wrapper">
          <span class="selected-product_field-group">
            <label>A3:</label>
            <span>
              <button class="quantity-change" data-action="decrease" data-format-name="A3">-</button>
              <input class="quantity-input" type="number" data-format="A3" value="${n}" min="0">
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
            <input class="quantity-input" type="number" value="${e}" min="1">
            <button class="quantity-change" data-action="increase">+</button>
          </span>
          <button class="remove-product text-size-small button is-link" data-action="remove">Supprimer</button>
        </div>
      </div>
    `,r.appendChild(s),p(),x(),s.querySelector(".remove-product")?.addEventListener("click",u=>{let c=u.target.closest(".selected-product"),i=c.querySelector(".text-size-small")?.textContent,l=c.querySelector(".text-weight-semibold")?.textContent;i&&l&&(c.remove(),v(i,l),p(),d())}),s.querySelectorAll(".quantity-change").forEach(u=>{u.addEventListener("click",c=>{let i=c.target.closest("span")?.querySelector("input"),l=isNaN(parseInt(i.value))?0:parseInt(i.value);c.target.getAttribute("data-action")==="increase"?i.value=(l+1).toString():c.target.getAttribute("data-action")==="decrease"&&l>0&&(i.value=(l-1).toString());let y=c.target.getAttribute("data-format-name"),g=s.querySelector(".text-size-small")?.textContent,E=s.querySelector(".text-weight-semibold")?.textContent;g&&E&&(f(g,E,y?{[y]:parseInt(i.value)}:{quantity:parseInt(i.value)}),d())})}),s.querySelectorAll(".quantity-input").forEach(u=>{u.addEventListener("change",c=>{let i=isNaN(parseInt(c.target.value))?0:parseInt(c.target.value),l=c.target.getAttribute("data-format"),y=u.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent,g=u.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;y&&g&&(i>=0?(f(y,g,l?{[l]:i}:{quantity:i}),d()):c.target.value="0")})}),p(),d()}function b(a,t,e){let n=new Date;n.setTime(n.getTime()+e*24*60*60*1e3),document.cookie=`${a}=${JSON.stringify(t)};expires=${n.toUTCString()};path=/`}function m(a){let t=`${a}=`,e=document.cookie.split(";");for(let n=0;n<e.length;n++){let o=e[n].trim();if(o.indexOf(t)===0)return JSON.parse(o.substring(t.length))}return null}function f(a,t,e){let n=m("selectedProducts")||[],o=n.findIndex(r=>r.type===a&&r.title===t);o!==-1&&(e.quantity!==void 0&&(n[o].quantity=e.quantity),e.A3!==void 0&&(n[o].quantityA3=e.A3),e.A2!==void 0&&(n[o].quantityA2=e.A2),b("selectedProducts",n,7)),d()}function v(a,t){let e=m("selectedProducts")||[];e=e.filter(n=>!(n.type===a&&n.title===t)),b("selectedProducts",e,7),d()}function S(){b("selectedProducts",[],7),d()}function T(){(m("selectedProducts")||[]).forEach(t=>q(t.type,t.title,t.quantity,t.quantityA3,t.quantityA2))}function x(){let t=document.querySelector("[data-selected-products]").querySelectorAll(".selected-product"),e=Array.from(t).map(n=>{let o=n.querySelector(".text-size-small")?.textContent,r=n.querySelector(".text-weight-semibold")?.textContent,s=o==="Infographie"?0:parseInt(n.querySelector(".quantity-input").value),u=o==="Infographie"?parseInt(n.querySelector('[data-format="A3"]').value):0,c=o==="Infographie"?parseInt(n.querySelector('[data-format="A2"]').value):0;return{type:o,title:r,quantity:s,quantityA3:u,quantityA2:c}});b("selectedProducts",e,7)}function A(){document.querySelectorAll('[data-action="add"]').forEach(a=>{a.addEventListener("click",t=>{let e=t.target.closest("[data-product-type]"),n=e.getAttribute("data-product-type"),o=e.querySelector("h3")?.innerText;H(n,o)||q(n,o)})})}function H(a,t){return(m("selectedProducts")||[]).some(n=>n.type===a&&n.title===t)}function L(){document.querySelectorAll('[data-action="clear"]').forEach(a=>{a.addEventListener("click",()=>{document.querySelectorAll(".selected-product").forEach(t=>{t.remove()}),S(),p()})})}function h(){document.querySelectorAll(".remove-product").forEach(a=>{a.addEventListener("click",t=>{let e=t.target.closest(".selected-product"),n=e.querySelector(".text-size-small")?.textContent,o=e.querySelector(".text-weight-semibold")?.textContent;n&&o&&(e.remove(),v(n,o),p())})})}function P(){document.querySelectorAll(".quantity-change").forEach(a=>{a.addEventListener("click",t=>{let e=t.target.closest("span")?.querySelector("input"),n=isNaN(parseInt(e.value))?0:parseInt(e.value);t.target.getAttribute("data-action")==="increase"?e.value=(n+1).toString():t.target.getAttribute("data-action")==="decrease"&&n>0&&(e.value=(n-1).toString());let o=t.target.getAttribute("data-format-name"),r=e.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent,s=e.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;r&&s&&f(r,s,o?{[o]:parseInt(e.value)}:{quantity:parseInt(e.value)})})}),document.querySelectorAll(".quantity-input").forEach(a=>{a.addEventListener("change",t=>{let e=isNaN(parseInt(t.target.value))?0:parseInt(t.target.value),n=t.target.getAttribute("data-format"),o=a.closest(".selected-product-item")?.querySelector(".text-size-small")?.textContent,r=a.closest(".selected-product-item")?.querySelector(".text-weight-semibold")?.textContent;o&&r&&(e>=0?f(o,r,n?{[n]:e}:{quantity:e}):t.target.value="0")})})}function M(){let a=document.querySelector('[data-step="1"]'),t=document.querySelector('[data-step="2"]'),e=document.querySelector("#next-to-step-2"),n=document.querySelector("#previous-to-step-1"),o=document.querySelector("[data-text-area]");t.style.display="none",e&&e.addEventListener("click",()=>{if(a&&t&&!e.hasAttribute("disabled")){a.style.display="none",t.style.display="block";let s=(m("selectedProducts")||[]).map(u=>{let{type:c,title:i,quantity:l,quantityA3:y,quantityA2:g}=u;return c==="Infographie"?`${c}: ${i} - A3: ${y} - A2: ${g}`:`${c}: ${i} - Quantit\xE9: ${l}`}).join(`
`);o&&(o.value=s)}}),n&&n.addEventListener("click",()=>{a&&t&&(t.style.display="none",a.style.display="block")})}document.addEventListener("DOMContentLoaded",()=>{T(),p(),d(),A(),h(),P(),L(),M()});})();
