"use strict";(()=>{function s(e,t,n){let r=new Date;r.setTime(r.getTime()+n*24*60*60*1e3),document.cookie=`${e}=${JSON.stringify(t)};expires=${r.toUTCString()};path=/`}function o(e){let t=`${e}=`,n=document.cookie.split(";");for(let r=0;r<n.length;r++){let a=n[r].trim();if(a.indexOf(t)===0)return JSON.parse(a.substring(t.length))}return null}function c(e){let t=o("selectedProducts")||[];t.push(e),s("selectedProducts",t,7)}function p(e,t){return(o("selectedProducts")||[]).some(r=>r.type===e&&r.title===t)}function i(e){let t=document.createElement("div");t.classList.add("toast-success"),t.textContent=e;let n=document.createElement("button");n.classList.add("button","is-secondary","is-small","is-alternate"),n.textContent="Aller au panier",n.addEventListener("click",()=>{window.location.href="/commander-wip"}),t.appendChild(n),document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3),t.addEventListener("click",()=>{t.remove()})}function u(){let e=document.querySelector('[data-nmra-element="title"]'),t=e?.innerText,n=e.getAttribute("data-nmra-type");p(n,t)?i("La ressource est d\xE9j\xE0 dans le panier"):(c({type:n,title:t,quantity:n==="Infographie"?1:0,quantityA2:0,quantityA3:0}),i("Ressource ajout\xE9e au panier"))}document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('[data-nmra-action="add-to-cart"]').forEach(e=>{e.addEventListener("click",u)})});})();