var Mn=Array.isArray,Qt=Array.prototype.indexOf,Yn=Array.from,Hn=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,tn=Object.getOwnPropertyDescriptors,jn=Object.prototype,Bn=Array.prototype,nn=Object.getPrototypeOf;const Un=()=>{};function Vn(t){return typeof(t==null?void 0:t.then)=="function"}function Gn(t){return t()}function wt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,mt=4,X=8,ot=16,A=32,q=64,G=128,S=256,K=512,d=1024,k=2048,P=4096,b=8192,F=16384,rn=32768,Tt=65536,Kn=1<<17,en=1<<19,gt=1<<20,ht=Symbol("$state"),$n=Symbol("legacy props"),Zn=Symbol("");function At(t){return t===this.v}function sn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function xt(t){return!sn(t,this.v)}function ln(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function an(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function un(t){throw new Error("https://svelte.dev/e/effect_orphan")}function on(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function zn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Jn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Wn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Xn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function fn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function _n(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let Q=!1;function Qn(){Q=!0}const tr=1,nr=2,rr=4,er=8,sr=16,lr=1,ar=2,ur=4,or=8,ir=16,fr=1,_r=2,cn="[",vn="[!",pn="]",kt={},cr=Symbol();function it(t,n){var r={f:0,v:t,reactions:null,equals:At,rv:0,wv:0};return r}function vr(t){return hn(it(t))}function pr(t,n=!1){var e;const r=it(t);return n||(r.equals=xt),Q&&u!==null&&u.l!==null&&((e=u.l).s??(e.s=[])).push(r),r}function hn(t){return o!==null&&o.f&y&&(m===null?Sn([t]):m.push(t)),t}function hr(t,n){return o!==null&&tt()&&o.f&(y|ot)&&(m===null||!m.includes(t))&&_n(),dn(t,n)}function dn(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Gt(),It(t,k),tt()&&_!==null&&_.f&d&&!(_.f&(A|q))&&(g===null?On([t]):g.push(t))),n}function It(t,n){var r=t.reactions;if(r!==null)for(var e=tt(),s=r.length,l=0;l<s;l++){var a=r[l],i=a.f;i&k||!e&&a===_||(T(a,n),i&(d|S)&&(i&y?It(a,P):rt(a)))}}function Dt(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let R=!1;function dr(t){R=t}let w;function M(t){if(t===null)throw Dt(),kt;return w=t}function Er(){return M(O(w))}function yr(t){if(R){if(O(w)!==null)throw Dt(),kt;w=t}}function wr(t=1){if(R){for(var n=t,r=w;n--;)r=O(r);w=r}}function mr(){for(var t=0,n=w;;){if(n.nodeType===8){var r=n.data;if(r===pn){if(t===0)return n;t-=1}else(r===cn||r===vn)&&(t+=1)}var e=O(n);n.remove(),n=e}}var dt,Rt,St;function Tr(){if(dt===void 0){dt=window;var t=Element.prototype,n=Node.prototype;Rt=pt(n,"firstChild").get,St=pt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function et(t=""){return document.createTextNode(t)}function st(t){return Rt.call(t)}function O(t){return St.call(t)}function gr(t,n){if(!R)return st(t);var r=st(w);if(r===null)r=w.appendChild(et());else if(n&&r.nodeType!==3){var e=et();return r==null||r.before(e),M(e),e}return M(r),r}function Ar(t,n){if(!R){var r=st(t);return r instanceof Comment&&r.data===""?O(r):r}return w}function xr(t,n=1,r=!1){let e=R?w:t;for(var s;n--;)s=e,e=O(e);if(!R)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var a=et();return e===null?s==null||s.after(a):e.before(a),M(a),a}return M(e),e}function kr(t){t.textContent=""}function En(t){var n=y|k;_===null?n|=S:_.f|=gt;var r=o!==null&&o.f&y?o:null;const e={children:null,ctx:u,deps:null,equals:At,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??_};return r!==null&&(r.children??(r.children=[])).push(e),e}function Ir(t){const n=En(t);return n.equals=xt,n}function Ot(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ft(e):x(e)}}}function yn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Ct(t){var n,r=_;J(yn(t));try{Ot(t),n=$t(t)}finally{J(r)}return n}function Nt(t){var n=Ct(t),r=(D||t.f&S)&&t.deps!==null?P:d;T(t,r),t.equals(n)||(t.v=n,t.wv=Gt())}function ft(t){Ot(t),j(t,0),T(t,F),t.v=t.children=t.deps=t.ctx=t.reactions=null}function bt(t){_===null&&o===null&&un(),o!==null&&o.f&S&&an(),_t&&ln()}function wn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function L(t,n,r,e=!0){var s=(t&q)!==0,l=_,a={ctx:u,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|k,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,wv:0};if(r){var i=C;try{Et(!0),ct(a),a.f|=rn}catch(v){throw x(a),v}finally{Et(i)}}else n!==null&&rt(a);var c=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&(gt|G))===0;if(!c&&!s&&e&&(l!==null&&wn(a,l),o!==null&&o.f&y)){var p=o;(p.children??(p.children=[])).push(a)}return a}function Dr(t){bt();var n=_!==null&&(_.f&A)!==0&&u!==null&&!u.m;if(n){var r=u;(r.e??(r.e=[])).push({fn:t,effect:_,reaction:o})}else{var e=qt(t);return e}}function Rr(t){return bt(),mn(t)}function Sr(t){const n=L(q,t,!0);return()=>{x(n)}}function Or(t){const n=L(q,t,!0);return(r={})=>new Promise(e=>{r.outro?An(n,()=>{x(n),e(void 0)}):(x(n),e(void 0))})}function qt(t){return L(mt,t,!1)}function mn(t){return L(X,t,!0)}function Cr(t){return Tn(t)}function Tn(t,n=0){return L(X|ot|n,t,!0)}function Nr(t,n=!0){return L(X|A,t,!0,n)}function Pt(t){var n=t.teardown;if(n!==null){const r=_t,e=o;yt(!0),z(null);try{n.call(null)}finally{yt(r),z(e)}}}function Ft(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ft(n[r])}}function Lt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;x(r,n),r=e}}function gn(t){for(var n=t.first;n!==null;){var r=n.next;n.f&A||x(n),n=r}}function x(t,n=!0){var r=!1;if((n||t.f&en)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:O(e);e.remove(),e=l}r=!0}Lt(t,n&&!r),Ft(t),j(t,0),T(t,F);var a=t.transitions;if(a!==null)for(const c of a)c.stop();Pt(t);var i=t.parent;i!==null&&i.first!==null&&Mt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Mt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function An(t,n){var r=[];Yt(t,r,!0),xn(r,()=>{x(t),n&&n()})}function xn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Yt(t,n,r){if(!(t.f&b)){if(t.f^=b,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&Tt)!==0||(e.f&A)!==0;Yt(e,n,l?r:!1),e=s}}}function br(t){Ht(t,!0)}function Ht(t,n){if(t.f&b){t.f^=b,t.f&d||(t.f^=d),B(t)&&(T(t,k),rt(t));for(var r=t.first;r!==null;){var e=r.next,s=(r.f&Tt)!==0||(r.f&A)!==0;Ht(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const kn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let $=!1,Z=!1,lt=[],at=[];function jt(){$=!1;const t=lt.slice();lt=[],wt(t)}function Bt(){Z=!1;const t=at.slice();at=[],wt(t)}function qr(t){$||($=!0,queueMicrotask(jt)),lt.push(t)}function Pr(t){Z||(Z=!0,kn(Bt)),at.push(t)}function In(){$&&jt(),Z&&Bt()}function Dn(t){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}const Ut=0,Rn=1;let U=!1,V=Ut,Y=!1,H=null,C=!1,_t=!1;function Et(t){C=t}function yt(t){_t=t}let I=[],N=0;let o=null;function z(t){o=t}let _=null;function J(t){_=t}let m=null;function Sn(t){m=t}let h=null,E=0,g=null;function On(t){g=t}let Vt=1,W=0,D=!1,u=null;function Fr(t){u=t}function Gt(){return++Vt}function tt(){return!Q||u!==null&&u.l===null}function B(t){var p;var n=t.f;if(n&k)return!0;if(n&P){var r=t.deps,e=(n&S)!==0;if(r!==null){var s,l,a=(n&K)!==0,i=e&&_!==null&&!D,c=r.length;if(a||i){for(s=0;s<c;s++)l=r[s],(a||!((p=l==null?void 0:l.reactions)!=null&&p.includes(t)))&&(l.reactions??(l.reactions=[])).push(t);a&&(t.f^=K)}for(s=0;s<c;s++)if(l=r[s],B(l)&&Nt(l),l.wv>t.wv)return!0}(!e||_!==null&&!D)&&T(t,d)}return!1}function Cn(t,n){for(var r=n;r!==null;){if(r.f&G)try{r.fn(t);return}catch{r.f^=G}r=r.parent}throw U=!1,t}function Nn(t){return(t.f&F)===0&&(t.parent===null||(t.parent.f&G)===0)}function nt(t,n,r,e){if(U){if(r===null&&(U=!1),Nn(n))throw t;return}r!==null&&(U=!0);{Cn(t,n);return}}function Kt(t,n,r=0){var e=t.reactions;if(e!==null)for(var s=0;s<e.length;s++){var l=e[s];l.f&y?Kt(l,n,r+1):n===l&&(r===0?T(l,k):l.f&d&&T(l,P),rt(l))}}function $t(t){var vt;var n=h,r=E,e=g,s=o,l=D,a=m,i=u,c=t.f;h=null,E=0,g=null,o=c&(A|q)?null:t,D=!C&&(c&S)!==0,m=null,u=t.ctx,W++;try{var p=(0,t.fn)(),v=t.deps;if(h!==null){var f;if(j(t,E),v!==null&&E>0)for(v.length=E+h.length,f=0;f<h.length;f++)v[E+f]=h[f];else t.deps=v=h;if(!D)for(f=E;f<v.length;f++)((vt=v[f]).reactions??(vt.reactions=[])).push(t)}else v!==null&&E<v.length&&(j(t,E),v.length=E);if(tt()&&g!==null&&!(t.f&(y|P|k)))for(f=0;f<g.length;f++)Kt(g[f],t);return s!==null&&W++,p}finally{h=n,E=r,g=e,o=s,D=l,m=a,u=i}}function bn(t,n){let r=n.reactions;if(r!==null){var e=Qt.call(r,t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(h===null||!h.includes(n))&&(T(n,P),n.f&(S|K)||(n.f^=K),j(n,0))}function j(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)bn(t,r[e])}function ct(t){var n=t.f;if(!(n&F)){T(t,d);var r=_,e=u;_=t;try{n&ot?gn(t):Lt(t),Ft(t),Pt(t);var s=$t(t);t.teardown=typeof s=="function"?s:null,t.wv=Vt;var l=t.deps,a}catch(i){nt(i,t,r,e||t.ctx)}finally{_=r}}}function Zt(){if(N>1e3){N=0;try{on()}catch(t){if(H!==null)nt(t,H,null);else throw t}}N++}function zt(t){var n=t.length;if(n!==0){Zt();var r=C;C=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&d||(s.f^=d);var l=[];Jt(s,l),qn(l)}}finally{C=r}}}function qn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(F|b)))try{B(e)&&(ct(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Mt(e):e.fn=null))}catch(s){nt(s,e,null,e.ctx)}}}function Pn(){if(Y=!1,N>1001)return;const t=I;I=[],zt(t),Y||(N=0,H=null)}function rt(t){V===Ut&&(Y||(Y=!0,queueMicrotask(Pn))),H=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(q|A)){if(!(r&d))return;n.f^=d}}I.push(n)}function Jt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&A)!==0,a=l&&(s&d)!==0,i=r.next;if(!a&&!(s&b))if(s&X){if(l)r.f^=d;else try{B(r)&&ct(r)}catch(f){nt(f,r,null,r.ctx)}var c=r.first;if(c!==null){r=c;continue}}else s&mt&&e.push(r);if(i===null){let f=r.parent;for(;f!==null;){if(t===f)break t;var p=f.next;if(p!==null){r=p;continue t}f=f.parent}}r=i}for(var v=0;v<e.length;v++)c=e[v],n.push(c),Jt(c,n)}function Wt(t){var n=V,r=I;try{Zt();const s=[];V=Rn,I=s,Y=!1,zt(r);var e=t==null?void 0:t();return In(),(I.length>0||s.length>0)&&Wt(),N=0,H=null,e}finally{V=n,I=r}}async function Lr(){await Promise.resolve(),Wt()}function Mr(t){var v;var n=t.f,r=(n&y)!==0;if(r&&n&F){var e=Ct(t);return ft(t),e}if(o!==null){m!==null&&m.includes(t)&&fn();var s=o.deps;t.rv<W&&(t.rv=W,h===null&&s!==null&&s[E]===t?E++:h===null?h=[t]:h.push(t))}else if(r&&t.deps===null)for(var l=t,a=l.parent,i=l;a!==null;)if(a.f&y){var c=a;i=c,a=c.parent}else{var p=a;(v=p.deriveds)!=null&&v.includes(i)||(p.deriveds??(p.deriveds=[])).push(i);break}return r&&(l=t,B(l)&&Nt(l)),t.v}function Yr(t){const n=o;try{return o=null,t()}finally{o=n}}const Fn=-7169;function T(t,n){t.f=t.f&Fn|n}function Hr(t){return Xt().get(t)}function jr(t,n){return Xt().set(t,n),n}function Xt(t){return u===null&&Dn(),u.c??(u.c=new Map(Ln(u)||void 0))}function Ln(t){let n=t.p;for(;n!==null;){const r=n.c;if(r!==null)return r;n=n.p}return null}function Br(t,n=!1,r){u={p:u,c:null,e:null,m:!1,s:t,x:null,l:null},Q&&!n&&(u.l={s:null,u:null,r1:[],r2:it(!1)})}function Ur(t){const n=u;if(n!==null){const a=n.e;if(a!==null){var r=_,e=o;n.e=null;try{for(var s=0;s<a.length;s++){var l=a[s];J(l.effect),z(l.reaction),qt(l.fn)}}finally{J(r),z(e)}}u=n.p,n.m=!0}return{}}function Vr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ht in t)ut(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ht in r&&ut(r)}}}function ut(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{ut(t[e],n)}catch{}const r=nn(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=tn(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}export{sr as $,it as A,pr as B,J as C,z as D,Tt as E,Fr as F,Wt as G,vn as H,et as I,st as J,Mr as K,pn as L,b as M,Yn as N,_ as O,tr as P,nr as Q,Yt as R,kr as S,xn as T,cr as U,x as V,rr as W,Ir as X,o as Y,er as Z,Mn as _,Ur as a,O as a0,ht as a1,jn as a2,Bn as a3,Wn as a4,hr as a5,pt as a6,Xn as a7,nn as a8,Rr as a9,ur as aA,xt as aB,A as aC,q as aD,lr as aE,ar as aF,or as aG,$n as aH,ir as aI,Lr as aJ,Sr as aK,sn as aL,wt as aa,Gn as ab,Vr as ac,En as ad,Qn as ae,vr as af,wr as ag,jr as ah,Hr as ai,Un as aj,Pr as ak,tn as al,Zn as am,Hn as an,Tr as ao,cn as ap,kt as aq,Dt as ar,zn as as,Or as at,fr as au,_r as av,qt as aw,mn as ax,Jn as ay,Kn as az,Tn as b,gr as c,Er as d,mr as e,Ar as f,M as g,R as h,dr as i,br as j,Nr as k,An as l,w as m,u as n,Dn as o,Br as p,Q as q,yr as r,xr as s,Cr as t,Dr as u,Yr as v,tt as w,Vn as x,dn as y,qr as z};
