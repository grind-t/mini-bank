import{a3 as c,h as d,ad as u,ae as n,af as v}from"./Dwnr3qy2.js";let e=!1;function h(){e||(e=!0,document.addEventListener("reset",r=>{Promise.resolve().then(()=>{var s;if(!r.defaultPrevented)for(const a of r.target.elements)(s=a.__on_r)==null||s.call(a)})},{capture:!0}))}function p(r){if(d){var s=!1,a=()=>{if(!s){if(s=!0,r.hasAttribute("value")){var o=r.value;t(r,"value",null),r.value=o}if(r.hasAttribute("checked")){var f=r.checked;t(r,"checked",null),r.checked=f}}};r.__on_r=a,n(a),h()}}function y(r,s){var a=r.__attributes??(r.__attributes={});a.value===(a.value=s??void 0)||r.value===s&&(s!==0||r.nodeName!=="PROGRESS")||(r.value=s)}function A(r,s){var a=r.__attributes??(r.__attributes={});a.checked!==(a.checked=s??void 0)&&(r.checked=s)}function t(r,s,a,o){var f=r.__attributes??(r.__attributes={});d&&(f[s]=r.getAttribute(s),s==="src"||s==="srcset"||s==="href"&&r.nodeName==="LINK")||f[s]!==(f[s]=a)&&(s==="style"&&"__styles"in r&&(r.__styles={}),s==="loading"&&(r[v]=a),a==null?r.removeAttribute(s):typeof a!="string"&&g(r).includes(s)?r[s]=a:r.setAttribute(s,a))}var i=new Map;function g(r){var s=i.get(r.nodeName);if(s)return s;i.set(r.nodeName,s=[]);for(var a,o=r,f=Element.prototype;f!==o;){a=u(o);for(var _ in a)a[_].set&&s.push(_);o=c(o)}return s}export{t as a,A as b,p as r,y as s};
