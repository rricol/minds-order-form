"use strict";(()=>{function f(t){let e=document.createElement("div");e.classList.add("ns_toast"),e.textContent=t,document.body.appendChild(e),setTimeout(()=>{e.remove()},3e3)}function g(t){let{type:e,title:r,quantity:n=0}=t;return e==="Infographie"?n*3:e==="Brochure"?r==="Qui est minds ?"?n*0:n*8:e==="Publication"?n*22:e==="Jeux"?n*20:0}function p(){let t=JSON.parse(localStorage.getItem("orderList")||"[]"),e=0;return t.forEach(r=>{e+=g(r)}),e}function m(){let t=JSON.parse(localStorage.getItem("orderList")||"[]"),e=0,r=t.reduce((o,s)=>s.type==="Brochure"?o+(s.quantity??0):o,0),n=t.reduce((o,s)=>s.type==="Infographie"?o+(s.quantity??0):o,0),i=t.reduce((o,s)=>s.type==="Publication"?o+(s.quantity??0):o,0),c=t.reduce((o,s)=>s.type==="Jeux"?o+(s.quantity??0):o,0);return e=r+n+i+c,r<4&&r===e||c<4&&c===e||r<4&&c<4&&e===r+c?0:e>1&&e<10?9:0}function D(t){let{type:e,title:r,quantity:n}=t,i=document.createElement("tr");return i.classList.add("table_row"),i.innerHTML=`
    <td class="table_cell first">${r}</td>
    <td class="table_cell">${e}</td>
    <td class="table_cell">${n}</td>
    <td class="table_cell">${g(t)}.-</td>
    `,i}function S(){let t=a("orderList"),e=p()+m(),r=document.querySelector("[ns-mindsorder-priceTotal]");r&&(r.textContent=e.toString()),t.map(n=>{document.querySelector("[ns-mindsorder-summary]")?.querySelector("tbody")?.appendChild(D(n))})}function x(){let t=document.querySelector("[ns-mindsorder-textArea]"),e=a("orderList"),r=`
      <table style="border-collapse: collapse; color: black;">
        <tr>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantit\xE9</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
        </tr>
    `;e.map(n=>{let{type:i,title:c,quantity:o}=n;r+=`
        <tr>
          <td style="padding: 8px; border: 1px solid black;">${i}</td>
          <td style="padding: 8px; border: 1px solid black;">${c}</td>
          <td style="padding: 8px; border: 1px solid black;">${o}}</td>
          <td style="padding: 8px; border: 1px solid black;">${g(n)}.-</td>
        </tr>
      `}),r+=`
      <tr>
        <td style="padding: 8px; border: 1px solid black; text-align: right; font-weight: bold;">${p()+m()} (frais de port inclus)</td>
      </tr>`,r+="</table>",t&&(t.value=r,t.disabled=!0)}function T(t){let e=document.createElement("div");return e.innerHTML=`
      <div class="ns_resource-item" ns-mindsorder-resource ns-mindsorder-resourceTitle="${t.title}" ns-mindsorder-resourceType="${t.type}">
        <div class="ns_resource-header">  
          <span class="ns_resource-type">${t.type}</span>
          <button class="ns_btn-remove" ns-mindsorder-btn="remove">Supprimer</button>
        </div>
        <h3 class="ns_resource-title">${t.title}</h3>
        <div class="ns_resource-footer">
        <span>Quantit\xE9:</span>
            <div class="ns_input-group">
              <input class="ns_input" ns-mindsorder-input type="number" value="${t.quantity}" min="1" />
              <button class="ns_input-button" ns-mindsorder-btn="decrease">-</button>
              <button class="ns_input-button" ns-mindsorder-btn="increase">+</button>
            </div>
        </div>
      </div>
    `,e}function q(t){t.preventDefault();let e=t.target.closest("[ns-mindsorder-resource]"),r=e.getAttribute("ns-mindsorder-resourceTitle"),n=e.getAttribute("ns-mindsorder-resourceType"),i=null;r&&n&&(i={title:r,type:n,quantity:1}),i&&k(i),d()}function C(t){t.preventDefault();let e=t.target.closest("[ns-mindsorder-resource]"),r=e.getAttribute("ns-mindsorder-resourceTitle"),n=e.getAttribute("ns-mindsorder-resourceType"),c=a("orderList").find(o=>o.title===r&&o.type===n);c&&I(c),d()}function A(){P(),d()}function y(t){let e=t.target.closest("[ns-mindsorder-resource]"),r=e.querySelector("[ns-mindsorder-input]"),n=e.getAttribute("ns-mindsorder-resourceTitle"),i=e.getAttribute("ns-mindsorder-resourceType"),o=a("orderList").find(u=>u.title===n&&u.type===i);if(!o)return;let s=t.target.getAttribute("ns-mindsorder-btn");s==="increase"?o.quantity!==void 0&&(o.quantity+=1,r.value=o.quantity.toString()):s==="decrease"&&o.quantity!==1&&o.quantity!==void 0&&(o.quantity-=1,r.value=o.quantity.toString()),L(o)}function R(t){let e=t.target.closest("[ns-mindsorder-resource]"),r=e.querySelector("[ns-mindsorder-input]"),n=isNaN(parseInt(r.value))?0:parseInt(r.value),i=e.getAttribute("ns-mindsorder-resourceTitle"),c=e.getAttribute("ns-mindsorder-resourceType"),s=a("orderList").find(u=>u.title===i&&u.type===c);s&&(s.quantity=n,L(s))}function M(){let t=document.querySelector('[ns-mindsorder-step="1"]'),e=document.querySelector('[ns-mindsorder-step="2"]');l()||(t&&e&&(t.style.display="none",e.style.display="block",window.scrollTo(0,0)),S(),x())}function H(){let t=document.querySelector('[ns-mindsorder-step="1"]'),e=document.querySelector('[ns-mindsorder-step="2"]');t&&e&&(t.style.display="block",e.style.display="none",window.scrollTo(0,0))}function _(){document.querySelectorAll('[ns-mindsorder-btn="add"]').forEach(t=>{t.addEventListener("click",q)})}function w(){document.querySelectorAll('[ns-mindsorder-btn="remove"]').forEach(t=>{t.addEventListener("click",C)})}function O(){document.querySelectorAll('[ns-mindsorder-btn="clear"]').forEach(t=>{t.addEventListener("click",A)})}function $(){document.querySelectorAll('[ns-mindsorder-btn="next"]').forEach(t=>{t.addEventListener("click",M)}),document.querySelectorAll('[ns-mindsorder-btn="prev"]').forEach(t=>{t.addEventListener("click",H)})}function N(){document.querySelectorAll("[ns-mindsorder-input]").forEach(t=>{t.addEventListener("change",R)})}function Q(){document.querySelectorAll('[ns-mindsorder-btn="increase"]').forEach(t=>{t.addEventListener("click",y)}),document.querySelectorAll('[ns-mindsorder-btn="decrease"]').forEach(t=>{t.addEventListener("click",y)})}function h(){let t=a("orderList");document.querySelectorAll("[ns-mindsorder-cartChip]").forEach(r=>{r.textContent=t.length.toString()})}function E(){let t=a("orderList"),e=document.querySelector("[ns-mindsorder-resourceList]");if(e.innerHTML="",t.length===0){e.innerHTML="<p>S\xE9lectionnez une ressource pour la voir appara\xEEtre ici</p>";return}t.forEach(r=>{let n=T(r);e.appendChild(n)}),w(),Q(),N()}function v(){let t=document.querySelectorAll("[ns-mindsorder-price]"),e=document.querySelectorAll("[ns-mindsorder-shipping]"),r=p(),n=m();t.forEach(i=>{i.textContent=r.toString()}),e.forEach(i=>{i.textContent=n.toString()})}function d(){h(),E(),v(),l()}function b(){if(!localStorage.getItem("orderList")){let t=[];localStorage.setItem("orderList",JSON.stringify(t))}}function a(t){return JSON.parse(localStorage.getItem(t)||"[]")}function k(t){b();let e=a("orderList");e.some(r=>r.title===t.title)||(e.push(t),localStorage.setItem("orderList",JSON.stringify(e)))}function L(t){let e=a("orderList");e.map(r=>{r.title===t.title&&(r.quantity=t.quantity)}),localStorage.setItem("orderList",JSON.stringify(e)),d()}function I(t){let r=a("orderList").filter(n=>n.title!==t.title);localStorage.setItem("orderList",JSON.stringify(r))}function P(){localStorage.removeItem("orderList")}function l(){let t=a("orderList"),e=document.querySelectorAll('[ns-mindsorder-btn="next"]');return t.length===0?(f("Votre panier est vide"),e.forEach(r=>{r.setAttribute("disabled","true"),r.classList.add("is-disabled")}),!0):(e.forEach(r=>{r.removeAttribute("disabled"),r.classList.remove("is-disabled")}),!1)}function V(){let t=document.querySelector('[ns-mindsorder-step="2"]');t.style.display="none"}function B(){V(),E(),v(),O(),$(),l()}function J(){h(),_()}document.addEventListener("DOMContentLoaded",()=>{if(typeof Storage>"u"){f("LocalStorage is not available");return}b(),window.location.pathname.split("/")[1]==="commander"&&B(),J()});})();
