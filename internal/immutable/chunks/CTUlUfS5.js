import{h as d,a4 as c,a5 as u,A as n,a6 as v,a7 as h}from"./CItU8Cv1.js";import{p}from"./CH9-KQgV.js";let f=!1;function g(){f||(f=!0,document.addEventListener("reset",r=>{Promise.resolve().then(()=>{var s;if(!r.defaultPrevented)for(const a of r.target.elements)(s=a.__on_r)==null||s.call(a)})},{capture:!0}))}function l(r){if(d){var s=!1,a=()=>{if(!s){if(s=!0,r.hasAttribute("value")){var o=r.value;_(r,"value",null),r.value=o}if(r.hasAttribute("checked")){var t=r.checked;_(r,"checked",null),r.checked=t}}};r.__on_r=a,c(a),g()}}function N(r,s){var a=r.__attributes??(r.__attributes={});a.value===(a.value=s??void 0)||r.value===s&&(s!==0||r.nodeName!=="PROGRESS")||(r.value=s)}function S(r,s){var a=r.__attributes??(r.__attributes={});a.checked!==(a.checked=s??void 0)&&(r.checked=s)}function _(r,s,a,o){var t=r.__attributes??(r.__attributes={});d&&(t[s]=r.getAttribute(s),s==="src"||s==="srcset"||s==="href"&&r.nodeName==="LINK")||t[s]!==(t[s]=a)&&(s==="style"&&"__styles"in r&&(r.__styles={}),s==="loading"&&(r[u]=a),a==null?r.removeAttribute(s):typeof a!="string"&&k(r).includes(s)?r[s]=a:r.setAttribute(s,a))}var i=new Map;function k(r){var s=i.get(r.nodeName);if(s)return s;i.set(r.nodeName,s=[]);for(var a,o=r,t=Element.prototype;t!==o;){a=v(o);for(var e in a)a[e].set&&s.push(e);o=n(o)}return s}const y=p({name:"admin",password:localStorage.getItem("password")||""});h(()=>{localStorage.setItem("password",y.password)});export{_ as a,S as b,l as r,N as s,y as u};
