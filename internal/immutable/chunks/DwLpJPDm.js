import{b as n,E as u,k as d,aB as v,X as l,h as f,m as h,aa as p,aC as N,aD as g,aE as k}from"./CoG_KEyV.js";let c=!1;function A(){c||(c=!0,document.addEventListener("reset",s=>{Promise.resolve().then(()=>{var r;if(!s.defaultPrevented)for(const a of s.target.elements)(r=a.__on_r)==null||r.call(a)})},{capture:!0}))}function b(s,r,...a){var t=s,e=v,i;n(()=>{e!==(e=r())&&(i&&(l(i),i=null),i=d(()=>e(t,...a)))},u),f&&(t=h)}function R(s){if(f){var r=!1,a=()=>{if(!r){if(r=!0,s.hasAttribute("value")){var t=s.value;_(s,"value",null),s.value=t}if(s.hasAttribute("checked")){var e=s.checked;_(s,"checked",null),s.checked=e}}};s.__on_r=a,N(a),A()}}function T(s,r){var a=s.__attributes??(s.__attributes={});a.value===(a.value=r??void 0)||s.value===r&&(r!==0||s.nodeName!=="PROGRESS")||(s.value=r)}function P(s,r){var a=s.__attributes??(s.__attributes={});a.checked!==(a.checked=r??void 0)&&(s.checked=r)}function _(s,r,a,t){var e=s.__attributes??(s.__attributes={});f&&(e[r]=s.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&s.nodeName==="LINK")||e[r]!==(e[r]=a)&&(r==="style"&&"__styles"in s&&(s.__styles={}),r==="loading"&&(s[k]=a),a==null?s.removeAttribute(r):typeof a!="string"&&y(s).includes(r)?s[r]=a:s.setAttribute(r,a))}var o=new Map;function y(s){var r=o.get(s.nodeName);if(r)return r;o.set(s.nodeName,r=[]);for(var a,t=s,e=Element.prototype;e!==t;){a=g(t);for(var i in a)a[i].set&&r.push(i);t=p(t)}return r}function S(s,r,a){var t=s.__className,e=E(r);f&&s.className===e?s.__className=e:(t!==e||f&&s.className!==e)&&(r==null?s.removeAttribute("class"):s.className=e,s.__className=e)}function E(s,r){return(s??"")+""}function w(s,r,a){if(a){if(s.classList.contains(r))return;s.classList.add(r)}else{if(!s.classList.contains(r))return;s.classList.remove(r)}}export{S as a,T as b,_ as c,P as d,R as r,b as s,w as t};
