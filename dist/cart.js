"use strict";(()=>{function c(e,n,t){let r=new Date;r.setTime(r.getTime()+t*24*60*60*1e3),document.cookie=`${e}=${JSON.stringify(n)};expires=${r.toUTCString()};path=/`}function o(e){let n=`${e}=`,t=document.cookie.split(";");for(let r=0;r<t.length;r++){let s=t[r].trim();if(s.indexOf(n)===0)return JSON.parse(s.substring(n.length))}return null}function a(){return(o("selectedProducts")||[]).length}function i(e){let n=o("selectedProducts")||[];n.push(e),c("selectedProducts",n,7)}function u(){document.querySelectorAll('[data-nmra-element="cart"]').forEach(n=>{let t=n.querySelector('[data-nmra-element="cart-count"]');t&&(t.textContent=a().toString())})}function y(e,n){return(o("selectedProducts")||[]).some(r=>r.type===e&&r.title===n)}function l(e,n){let t=document.createElement("div");if(t.classList.add("toast-success"),t.textContent=e,n){let r=document.createElement("button");r.classList.add("button","is-secondary","is-small","is-alternate"),r.textContent="Aller au panier",r.addEventListener("click",()=>{window.location.href="/commander-wip"}),t.appendChild(r)}document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3),t.addEventListener("click",()=>{t.remove()})}function d(){let e=document.querySelector('[data-nmra-element="title"]'),n=e?.innerText,t=e.getAttribute("data-nmra-type");y(t,n)?l("La ressource est d\xE9j\xE0 dans le panier",!0):(i({type:t,title:n,quantity:t==="Infographie"?1:0,quantityA2:0,quantityA3:0}),l("Ressource ajout\xE9e au panier",!0))}document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('[data-nmra-action="add-to-cart"]').forEach(e=>{e.addEventListener("click",d)}),u()});})();
