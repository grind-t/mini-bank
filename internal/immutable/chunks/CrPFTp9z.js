import{au as H,G as A,F as O,a0 as M,_ as Y,Q as L,av as E,L as q,aw as C,a2 as $,ax as T,i as g,g as D,d as j,m as p,N as z,ay as B,az as F,V as G,P as K,aA as Q,K as W,k as J,p as U,h as b,a as X,q as Z}from"./CoG_KEyV.js";import{d as x}from"./DCW8r8Dq.js";const rr=["touchstart","touchmove"];function ar(r){return rr.includes(r)}const V=new Set,N=new Set;function sr(r){for(var a=0;a<r.length;a++)V.add(r[a]);for(var t of N)t(r)}function m(r){var R;var a=this,t=a.ownerDocument,c=r.type,i=((R=r.composedPath)==null?void 0:R.call(r))||[],e=i[0]||r.target,f=0,_=r.__root;if(_){var u=i.indexOf(_);if(u!==-1&&(a===document||a===window)){r.__root=a;return}var h=i.indexOf(a);if(h===-1)return;u<=h&&(f=u)}if(e=i[f]||r.target,e!==a){H(r,"currentTarget",{configurable:!0,get(){return e||t}});var w=Y,o=L;A(null),O(null);try{for(var n,s=[];e!==null;){var d=e.assignedSlot||e.parentNode||e.host||null;try{var l=e["__"+c];if(l!==void 0&&!e.disabled)if(M(l)){var[I,...P]=l;I.apply(e,[r,...P])}else l.call(e,r)}catch(y){n?s.push(y):n=y}if(r.cancelBubble||d===a||d===null)break;e=d}if(n){for(let y of s)queueMicrotask(()=>{throw y});throw n}}finally{r.__root=a,delete r.currentTarget,A(w),O(o)}}}function or(r,a){var t=a==null?"":typeof a=="object"?a+"":a;t!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=t,r.nodeValue=t==null?"":t+"")}function er(r,a){return k(r,a)}function ir(r,a){E(),a.intro=a.intro??!1;const t=a.target,c=b,i=p;try{for(var e=q(t);e&&(e.nodeType!==8||e.data!==C);)e=$(e);if(!e)throw T;g(!0),D(e),j();const f=k(r,{...a,anchor:e});if(p===null||p.nodeType!==8||p.data!==z)throw B(),T;return g(!1),f}catch(f){if(f===T)return a.recover===!1&&F(),E(),G(t),g(!1),er(r,a);throw f}finally{g(c),D(i)}}const v=new Map;function k(r,{target:a,anchor:t,props:c={},events:i,context:e,intro:f=!0}){E();var _=new Set,u=o=>{for(var n=0;n<o.length;n++){var s=o[n];if(!_.has(s)){_.add(s);var d=ar(s);a.addEventListener(s,m,{passive:d});var l=v.get(s);l===void 0?(document.addEventListener(s,m,{passive:d}),v.set(s,1)):v.set(s,l+1)}}};u(K(V)),N.add(u);var h=void 0,w=Q(()=>{var o=t??a.appendChild(W());return J(()=>{if(e){U({});var n=Z;n.c=e}i&&(c.$$events=i),b&&x(o,null),h=r(o,c)||{},b&&(L.nodes_end=p),e&&X()}),()=>{var d;for(var n of _){a.removeEventListener(n,m);var s=v.get(n);--s===0?(document.removeEventListener(n,m),v.delete(n)):v.set(n,s)}N.delete(u),o!==t&&((d=o.parentNode)==null||d.removeChild(o))}});return S.set(h,w),h}let S=new WeakMap;function dr(r,a){const t=S.get(r);return t?(S.delete(r),t(a)):Promise.resolve()}export{sr as d,ir as h,er as m,or as s,dr as u};
