import{ay as C,z as A,y as D,Z as H,X as P,N as k,az as T,G as Y,aA as $,$ as j,aB as E,J as g,F as O,k as z,v as y,K as B,aC as q,aD as F,R as G,M as J,aE as K,E as W,o as X,p as Z,j as b,a as Q,b as U}from"./DdDzDoP8.js";import{d as x}from"./DZ-V2tqX.js";const rr=["touchstart","touchmove"];function ar(r){return rr.includes(r)}const I=new Set,N=new Set;function sr(r){for(var a=0;a<r.length;a++)I.add(r[a]);for(var t of N)t(r)}function m(r){var S;var a=this,t=a.ownerDocument,c=r.type,i=((S=r.composedPath)==null?void 0:S.call(r))||[],e=i[0]||r.target,f=0,_=r.__root;if(_){var u=i.indexOf(_);if(u!==-1&&(a===document||a===window)){r.__root=a;return}var h=i.indexOf(a);if(h===-1)return;u<=h&&(f=u)}if(e=i[f]||r.target,e!==a){C(r,"currentTarget",{configurable:!0,get(){return e||t}});var w=P,o=k;A(null),D(null);try{for(var n,s=[];e!==null;){var d=e.assignedSlot||e.parentNode||e.host||null;try{var l=e["__"+c];if(l!==void 0&&!e.disabled)if(H(l)){var[M,...V]=l;M.apply(e,[r,...V])}else l.call(e,r)}catch(p){n?s.push(p):n=p}if(r.cancelBubble||d===a||d===null)break;e=d}if(n){for(let p of s)queueMicrotask(()=>{throw p});throw n}}finally{r.__root=a,delete r.currentTarget,A(w),D(o)}}}function or(r,a){var t=a==null?"":typeof a=="object"?a+"":a;t!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=t,r.nodeValue=t==null?"":t+"")}function er(r,a){return L(r,a)}function ir(r,a){T(),a.intro=a.intro??!1;const t=a.target,c=b,i=y;try{for(var e=Y(t);e&&(e.nodeType!==8||e.data!==$);)e=j(e);if(!e)throw E;g(!0),O(e),z();const f=L(r,{...a,anchor:e});if(y===null||y.nodeType!==8||y.data!==B)throw q(),E;return g(!1),f}catch(f){if(f===E)return a.recover===!1&&F(),T(),G(t),g(!1),er(r,a);throw f}finally{g(c),O(i)}}const v=new Map;function L(r,{target:a,anchor:t,props:c={},events:i,context:e,intro:f=!0}){T();var _=new Set,u=o=>{for(var n=0;n<o.length;n++){var s=o[n];if(!_.has(s)){_.add(s);var d=ar(s);a.addEventListener(s,m,{passive:d});var l=v.get(s);l===void 0?(document.addEventListener(s,m,{passive:d}),v.set(s,1)):v.set(s,l+1)}}};u(J(I)),N.add(u);var h=void 0,w=K(()=>{var o=t??a.appendChild(W());return X(()=>{if(e){Z({});var n=U;n.c=e}i&&(c.$$events=i),b&&x(o,null),h=r(o,c)||{},b&&(k.nodes_end=y),e&&Q()}),()=>{var d;for(var n of _){a.removeEventListener(n,m);var s=v.get(n);--s===0?(document.removeEventListener(n,m),v.delete(n)):v.set(n,s)}N.delete(u),o!==t&&((d=o.parentNode)==null||d.removeChild(o))}});return R.set(h,w),h}let R=new WeakMap;function dr(r,a){const t=R.get(r);return t?(R.delete(r),t(a)):Promise.resolve()}export{sr as d,ir as h,er as m,or as s,dr as u};
