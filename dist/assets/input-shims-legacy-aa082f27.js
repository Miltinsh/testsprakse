System.register(["./index-legacy-55307427.js"],(function(e,t){"use strict";var o,n,i,r,s,a,d,l,c,u;return{setters:[e=>{o=e.K,n=e.e,i=e.g,r=e.b,s=e.f,a=e.h,d=e.j,l=e.k,c=e.l,u=e.m}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
const t=new WeakMap,m=(e,o,n,i=0,r=!1)=>{t.has(e)!==n&&(n?v(e,o,i,r):f(e,o))},v=(e,o,n,i=!1)=>{const r=o.parentNode,s=o.cloneNode(!1);s.classList.add("cloned-input"),s.tabIndex=-1,i&&(s.disabled=!0),r.appendChild(s),t.set(e,s);const a="rtl"===e.ownerDocument.dir?9999:-9999;e.style.pointerEvents="none",o.style.transform=`translate3d(${a}px,${n}px,0) scale(0)`},f=(e,o)=>{const n=t.get(e);n&&(t.delete(e),n.remove()),e.style.pointerEvents="",o.style.transform=""},y="input, textarea, [no-blur], [contenteditable]",p=(e,t,o,n)=>{const i=e.top,r=e.bottom,s=t.top,a=s+15,d=Math.min(t.bottom,n-o)-50-r,l=a-i,c=Math.round(d<0?-d:l>0?-l:0),u=Math.min(c,i-s),m=Math.abs(u)/.3;return{scrollAmount:u,scrollDuration:Math.min(400,Math.max(150,m)),scrollPadding:o,inputSafeY:4-(i-a)}},w="$ionPaddingTimer",h=(e,t,o)=>{const n=e[w];n&&clearTimeout(n),t>0?e.style.setProperty("--keyboard-offset",`${t}px`):e[w]=setTimeout((()=>{e.style.setProperty("--keyboard-offset","0px"),o&&o()}),120)},b=(e,t,o)=>{e.addEventListener("focusout",(()=>{t&&h(t,0,o)}),{once:!0})};let g=0;const E="data-ionic-skip-scroll-assist",S=e=>{document.activeElement!==e&&(e.setAttribute(E,"true"),e.focus())},L=async(e,t,o,n,i,r,s=!1,a=0,d=!0)=>{if(!o&&!n)return;const v=((e,t,o,n)=>{var i;const r=null!==(i=e.closest("ion-item,[ion-item]"))&&void 0!==i?i:e;return p(r.getBoundingClientRect(),t.getBoundingClientRect(),o,n)})(e,o||n,i,a);if(o&&Math.abs(v.scrollAmount)<4)return S(t),void(r&&null!==o&&(h(o,g),b(t,o,(()=>g=0))));if(m(e,t,!0,v.inputSafeY,s),S(t),l((()=>e.click())),r&&o&&(g=v.scrollPadding,h(o,g)),"undefined"!=typeof window){let n;const i=async()=>{void 0!==n&&clearTimeout(n),window.removeEventListener("ionKeyboardDidShow",s),window.removeEventListener("ionKeyboardDidShow",i),o&&await u(o,0,v.scrollAmount,v.scrollDuration),m(e,t,!1,v.inputSafeY),S(t),r&&b(t,o,(()=>g=0))},s=()=>{window.removeEventListener("ionKeyboardDidShow",s),window.addEventListener("ionKeyboardDidShow",i)};if(o){const e=await c(o),r=e.scrollHeight-e.clientHeight;if(d&&v.scrollAmount>r-e.scrollTop)return"password"===t.type?(v.scrollAmount+=50,window.addEventListener("ionKeyboardDidShow",s)):window.addEventListener("ionKeyboardDidShow",i),void(n=setTimeout(i,1e3))}i()}};e("startInputShims",(async(e,t)=>{const l=document,c="ios"===t,u="android"===t,v=e.getNumber("keyboardHeight",290),f=e.getBoolean("scrollAssist",!0),p=e.getBoolean("hideCaretOnScroll",c),w=e.getBoolean("inputBlurring",c),h=e.getBoolean("scrollPadding",!0),b=Array.from(l.querySelectorAll("ion-input, ion-textarea")),g=new WeakMap,S=new WeakMap,D=await o.getResizeMode(),x=async e=>{await new Promise((t=>r(e,t)));const t=e.shadowRoot||e,o=t.querySelector("input")||t.querySelector("textarea"),l=s(e),c=l?null:e.closest("ion-footer");if(o){if(l&&p&&!g.has(e)){const t=((e,t,o)=>{if(!o||!t)return()=>{};const r=o=>{var n;(n=t)===n.getRootNode().activeElement&&m(e,t,o)},s=()=>m(e,t,!1),a=()=>r(!0),d=()=>r(!1);return n(o,"ionScrollStart",a),n(o,"ionScrollEnd",d),t.addEventListener("blur",s),()=>{i(o,"ionScrollStart",a),i(o,"ionScrollEnd",d),t.removeEventListener("blur",s)}})(e,o,l);g.set(e,t)}if("date"!==o.type&&"datetime-local"!==o.type&&(l||c)&&f&&!S.has(e)){const t=((e,t,o,n,i,r,s,l=!1)=>{const c=r&&(void 0===s||s.mode===a.None);let u=!1;const m=void 0!==d?d.innerHeight:0,v=i=>{!1!==u?L(e,t,o,n,i.detail.keyboardHeight,c,l,m,!1):u=!0},f=()=>{u=!1,null==d||d.removeEventListener("ionKeyboardDidShow",v),e.removeEventListener("focusout",f,!0)},y=async()=>{t.hasAttribute(E)?t.removeAttribute(E):(L(e,t,o,n,i,c,l,m),null==d||d.addEventListener("ionKeyboardDidShow",v),e.addEventListener("focusout",f,!0))};return e.addEventListener("focusin",y,!0),()=>{e.removeEventListener("focusin",y,!0),null==d||d.removeEventListener("ionKeyboardDidShow",v),e.removeEventListener("focusout",f,!0)}})(e,o,l,c,v,h,D,u);S.set(e,t)}}};w&&(()=>{let e=!0,t=!1;const o=document,i=()=>{t=!0},r=()=>{e=!0},s=n=>{if(t)return void(t=!1);const i=o.activeElement;if(!i)return;if(i.matches(y))return;const r=n.target;r!==i&&(r.matches(y)||r.closest(y)||(e=!1,setTimeout((()=>{e||i.blur()}),50)))};n(o,"ionScrollStart",i),o.addEventListener("focusin",r,!0),o.addEventListener("touchend",s,!1)})();for(const o of b)x(o);l.addEventListener("ionInputDidLoad",(e=>{x(e.detail)})),l.addEventListener("ionInputDidUnload",(e=>{(e=>{if(p){const t=g.get(e);t&&t(),g.delete(e)}if(f){const t=S.get(e);t&&t(),S.delete(e)}})(e.detail)}))}))}}}));
