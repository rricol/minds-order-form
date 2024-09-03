"use strict";(()=>{function p(e){let t=document.createElement("div");t.classList.add("ns_toast"),t.textContent=e,document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3)}function m(e){let{type:t,title:r,quantity:n=0}=e;return t==="Infographie"?n*3:t==="Brochure"?r==="Qui est minds ?"?n*0:n*8:t==="Publication"?n*22:t==="Jeux"?n*20:0}function f(){let e=JSON.parse(localStorage.getItem("orderList")||"[]"),t=0;return e.forEach(r=>{t+=m(r)}),t}function g(){let e=JSON.parse(localStorage.getItem("orderList")||"[]"),t=0,r=0;return r+=e.reduce((n,o)=>o.type==="Brochure"?n+(o.quantity??0):n,0),r+=e.reduce((n,o)=>o.type==="Infographie"?n+(o.quantity??0):n,0),r+=e.reduce((n,o)=>o.type==="Publication"?n+(o.quantity??0):n,0),r>1&&r<=9&&(t=9),t}function J(e){let{type:t,title:r,quantity:n}=e,o=document.createElement("tr");return o.classList.add("table_row"),o.innerHTML=`
    <td class="table_cell first">${r}</td>
    <td class="table_cell">${t}</td>
    <td class="table_cell">${n}</td>
    <td class="table_cell">${m(e)}.-</td>
    `,o}function S(){i("orderList").map(t=>{document.querySelector("[ns-mindsorder-summary]")?.querySelector("tbody")?.appendChild(J(t))})}function x(){let e=document.querySelector('[data-nmra-element="text-area"]'),t=i("orderList"),r=`
      <table style="border-collapse: collapse; color: black;">
        <tr>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Type</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Titre de la resource</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Quantit\xE9</th>
          <th style="padding: 8px; border: 1px solid black;text-align: left;">Prix</th>
        </tr>
    `;t.map(n=>{let{type:o,title:a,quantity:s}=n;r+=`
        <tr>
          <td style="padding: 8px; border: 1px solid black;">${o}</td>
          <td style="padding: 8px; border: 1px solid black;">${a}</td>
          <td style="padding: 8px; border: 1px solid black;">${s}}</td>
          <td style="padding: 8px; border: 1px solid black;">${m(n)}.-</td>
        </tr>
      `}),r+=`
      <tr>
        <td style="padding: 8px; border: 1px solid black; text-align: right; font-weight: bold;">${f()+g()} (frais de port inclus)</td>
      </tr>`,r+="</table>",e&&(e.value=r,e.disabled=!0)}function T(e){let t=document.createElement("div");return t.innerHTML=`
      <div class="ns_resource-item" ns-mindsorder-resource ns-mindsorder-resourceTitle="${e.title}" ns-mindsorder-resourceType="${e.type}">
        <div class="ns_resource-header">  
          <span class="ns_resource-type">${e.type}</span>
          <button class="ns_btn-remove" ns-mindsorder-btn="remove">Supprimer</button>
        </div>
        <h3 class="ns_resource-title">${e.title}</h3>
        <div class="ns_resource-footer">
        <span>Quantit\xE9:</span>
            <div class="ns_input-group">
              <input class="ns_input" ns-mindsorder-input type="number" value="${e.quantity}" min="1" />
              <button class="ns_input-button" ns-mindsorder-btn="decrease">-</button>
              <button class="ns_input-button" ns-mindsorder-btn="increase">+</button>
            </div>
        </div>
      </div>
    `,t}function C(e){e.preventDefault();let t=e.target.closest("[ns-mindsorder-resource]"),r=t.getAttribute("ns-mindsorder-resourceTitle"),n=t.getAttribute("ns-mindsorder-resourceType"),o=null;r&&n&&(o={title:r,type:n,quantity:1}),o&&k(o),d()}function q(e){e.preventDefault();let t=e.target.closest("[ns-mindsorder-resource]"),r=t.getAttribute("ns-mindsorder-resourceTitle"),n=t.getAttribute("ns-mindsorder-resourceType"),a=i("orderList").find(s=>s.title===r&&s.type===n);a&&I(a),d()}function R(){_(),d()}function y(e){let t=e.target.closest("[ns-mindsorder-resource]"),r=t.querySelector("[ns-mindsorder-input]"),n=t.getAttribute("ns-mindsorder-resourceTitle"),o=t.getAttribute("ns-mindsorder-resourceType"),s=i("orderList").find(u=>u.title===n&&u.type===o);if(!s)return;let c=e.target.getAttribute("ns-mindsorder-btn");c==="increase"?s.quantity!==void 0&&(s.quantity+=1,r.value=s.quantity.toString()):c==="decrease"&&s.quantity!==1&&s.quantity!==void 0&&(s.quantity-=1,r.value=s.quantity.toString()),L(s)}function A(e){let t=e.target.closest("[ns-mindsorder-resource]"),r=t.querySelector("[ns-mindsorder-input]"),n=isNaN(parseInt(r.value))?0:parseInt(r.value),o=t.getAttribute("ns-mindsorder-resourceTitle"),a=t.getAttribute("ns-mindsorder-resourceType"),c=i("orderList").find(u=>u.title===o&&u.type===a);c&&(c.quantity=n,L(c))}function M(){let e=document.querySelector('[ns-mindsorder-step="1"]'),t=document.querySelector('[ns-mindsorder-step="2"]');l()||(e&&t&&(e.style.display="none",t.style.display="block",window.scrollTo(0,0)),S(),x())}function H(){let e=document.querySelector('[ns-mindsorder-step="1"]'),t=document.querySelector('[ns-mindsorder-step="2"]');e&&t&&(e.style.display="block",t.style.display="none",window.scrollTo(0,0))}function P(){document.querySelectorAll('[ns-mindsorder-btn="add"]').forEach(e=>{e.addEventListener("click",C)})}function w(){document.querySelectorAll('[ns-mindsorder-btn="remove"]').forEach(e=>{e.addEventListener("click",q)})}function O(){document.querySelectorAll('[ns-mindsorder-btn="clear"]').forEach(e=>{e.addEventListener("click",R)})}function $(){document.querySelectorAll('[ns-mindsorder-btn="next"]').forEach(e=>{e.addEventListener("click",M)}),document.querySelectorAll('[ns-mindsorder-btn="prev"]').forEach(e=>{e.addEventListener("click",H)})}function N(){document.querySelectorAll("[ns-mindsorder-input]").forEach(e=>{e.addEventListener("change",A)})}function Q(){document.querySelectorAll('[ns-mindsorder-btn="increase"]').forEach(e=>{e.addEventListener("click",y)}),document.querySelectorAll('[ns-mindsorder-btn="decrease"]').forEach(e=>{e.addEventListener("click",y)})}function h(){let e=i("orderList");document.querySelectorAll("[ns-mindsorder-cartChip]").forEach(r=>{r.textContent=e.length.toString()})}function E(){let e=i("orderList"),t=document.querySelector("[ns-mindsorder-resourceList]");if(t.innerHTML="",e.length===0){t.innerHTML="<p>S\xE9lectionnez une ressource pour la voir appara\xEEtre ici</p>";return}e.forEach(r=>{let n=T(r);t.appendChild(n)}),w(),Q(),N()}function v(){let e=document.querySelectorAll("[ns-mindsorder-price]"),t=document.querySelectorAll("[ns-mindsorder-shipping]"),r=f(),n=g();e.forEach(o=>{o.textContent=r.toString()}),t.forEach(o=>{o.textContent=n.toString()})}function d(){h(),E(),v(),l()}function b(){if(!localStorage.getItem("orderList")){let e=[];localStorage.setItem("orderList",JSON.stringify(e))}}function i(e){return JSON.parse(localStorage.getItem(e)||"[]")}function k(e){b();let t=i("orderList");t.some(r=>r.title===e.title)||(t.push(e),localStorage.setItem("orderList",JSON.stringify(t)))}function L(e){let t=i("orderList");t.map(r=>{r.title===e.title&&(r.quantity=e.quantity)}),localStorage.setItem("orderList",JSON.stringify(t)),d()}function I(e){let r=i("orderList").filter(n=>n.title!==e.title);localStorage.setItem("orderList",JSON.stringify(r))}function _(){localStorage.removeItem("orderList")}function l(){let e=i("orderList"),t=document.querySelectorAll('[ns-mindsorder-btn="next"]');return e.length===0?(p("Votre panier est vide"),t.forEach(r=>{r.setAttribute("disabled","true"),r.classList.add("is-disabled")}),!0):(t.forEach(r=>{r.removeAttribute("disabled"),r.classList.remove("is-disabled")}),!1)}function V(){let e=document.querySelector('[ns-mindsorder-step="2"]');e.style.display="none"}function B(){V(),E(),v(),O(),$(),l()}function D(){h(),P()}document.addEventListener("DOMContentLoaded",()=>{if(typeof Storage>"u"){p("LocalStorage is not available");return}b(),window.location.pathname.split("/")[1]==="commander"&&B(),D()});})();
