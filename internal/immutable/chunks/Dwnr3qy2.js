var Yn=Array.isArray,Qt=Array.prototype.indexOf,Hn=Array.from,jn=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,tn=Object.getOwnPropertyDescriptors,Bn=Object.prototype,Un=Array.prototype,nn=Object.getPrototypeOf;const Vn=()=>{};function Gn(t){return typeof(t==null?void 0:t.then)=="function"}function Kn(t){return t()}function wt(t){for(var n=0;n<t.length;n++)t[n]()}const y=2,mt=4,J=8,ot=16,A=32,b=64,G=128,I=256,K=512,d=1024,R=2048,q=4096,C=8192,P=16384,rn=32768,Tt=65536,$n=1<<17,en=1<<19,gt=1<<20,ht=Symbol("$state"),Zn=Symbol("legacy props"),zn=Symbol("");function At(t){return t===this.v}function sn(t,n){return t!=t?n==n:t!==n||t!==null&&typeof t=="object"||typeof t=="function"}function kt(t){return!sn(t,this.v)}function ln(t){throw new Error("https://svelte.dev/e/effect_in_teardown")}function an(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function un(t){throw new Error("https://svelte.dev/e/effect_orphan")}function on(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function Wn(){throw new Error("https://svelte.dev/e/hydration_failed")}function Xn(t){throw new Error("https://svelte.dev/e/props_invalid_value")}function Jn(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function Qn(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function fn(){throw new Error("https://svelte.dev/e/state_unsafe_local_read")}function _n(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}let Q=!1;function tr(){Q=!0}const nr=1,rr=2,er=16,sr=1,lr=2,ar=4,ur=8,or=16,ir=1,fr=2,cn="[",vn="[!",pn="]",Rt={},_r=Symbol();function it(t,n){var r={f:0,v:t,reactions:null,equals:At,rv:0,wv:0};return r}function cr(t){return xt(it(t))}function hn(t,n=!1){var e;const r=it(t);return n||(r.equals=kt),Q&&_!==null&&_.l!==null&&((e=_.l).s??(e.s=[])).push(r),r}function vr(t,n=!1){return xt(hn(t,n))}function xt(t){return u!==null&&u.f&y&&(w===null?Sn([t]):w.push(t)),t}function pr(t,n){return dn(t,Ln(()=>Fn(t))),n}function dn(t,n){return u!==null&&tt()&&u.f&(y|ot)&&(w===null||!w.includes(t))&&_n(),En(t,n)}function En(t,n){return t.equals(n)||(t.v,t.v=n,t.wv=Kt(),Dt(t,R),tt()&&f!==null&&f.f&d&&!(f.f&(A|b))&&(T===null?On([t]):T.push(t))),n}function Dt(t,n){var r=t.reactions;if(r!==null)for(var e=tt(),s=r.length,l=0;l<s;l++){var a=r[l],o=a.f;o&R||!e&&a===f||(m(a,n),o&(d|I)&&(o&y?Dt(a,q):rt(a)))}}function It(t){console.warn("https://svelte.dev/e/hydration_mismatch")}let N=!1;function hr(t){N=t}let g;function M(t){if(t===null)throw It(),Rt;return g=t}function dr(){return M(F(g))}function Er(t){if(N){if(F(g)!==null)throw It(),Rt;g=t}}function yr(){for(var t=0,n=g;;){if(n.nodeType===8){var r=n.data;if(r===pn){if(t===0)return n;t-=1}else(r===cn||r===vn)&&(t+=1)}var e=F(n);n.remove(),n=e}}var dt,St,Ot;function wr(){if(dt===void 0){dt=window;var t=Element.prototype,n=Node.prototype;St=pt(n,"firstChild").get,Ot=pt(n,"nextSibling").get,t.__click=void 0,t.__className="",t.__attributes=null,t.__styles=null,t.__e=void 0,Text.prototype.__t=void 0}}function et(t=""){return document.createTextNode(t)}function st(t){return St.call(t)}function F(t){return Ot.call(t)}function mr(t,n){if(!N)return st(t);var r=st(g);if(r===null)r=g.appendChild(et());else if(n&&r.nodeType!==3){var e=et();return r==null||r.before(e),M(e),e}return M(r),r}function Tr(t,n){if(!N){var r=st(t);return r instanceof Comment&&r.data===""?F(r):r}return g}function gr(t,n=1,r=!1){let e=N?g:t;for(var s;n--;)s=e,e=F(e);if(!N)return e;var l=e==null?void 0:e.nodeType;if(r&&l!==3){var a=et();return e===null?s==null||s.after(a):e.before(a),M(a),a}return M(e),e}function Ar(t){t.textContent=""}function yn(t){var n=y|R;f===null?n|=I:f.f|=gt;var r=u!==null&&u.f&y?u:null;const e={children:null,ctx:_,deps:null,equals:At,f:n,fn:t,reactions:null,rv:0,v:null,wv:0,parent:r??f};return r!==null&&(r.children??(r.children=[])).push(e),e}function kr(t){const n=yn(t);return n.equals=kt,n}function Ct(t){var n=t.children;if(n!==null){t.children=null;for(var r=0;r<n.length;r+=1){var e=n[r];e.f&y?ft(e):k(e)}}}function wn(t){for(var n=t.parent;n!==null;){if(!(n.f&y))return n;n=n.parent}return null}function Nt(t){var n,r=f;W(wn(t));try{Ct(t),n=Zt(t)}finally{W(r)}return n}function bt(t){var n=Nt(t),r=(D||t.f&I)&&t.deps!==null?q:d;m(t,r),t.equals(n)||(t.v=n,t.wv=Kt())}function ft(t){Ct(t),j(t,0),m(t,P),t.v=t.children=t.deps=t.ctx=t.reactions=null}function qt(t){f===null&&u===null&&un(),u!==null&&u.f&I&&an(),_t&&ln()}function mn(t,n){var r=n.last;r===null?n.last=n.first=t:(r.next=t,t.prev=r,n.last=t)}function L(t,n,r,e=!0){var s=(t&b)!==0,l=f,a={ctx:_,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:t|R,first:null,fn:n,last:null,next:null,parent:s?null:l,prev:null,teardown:null,transitions:null,wv:0};if(r){var o=S;try{Et(!0),ct(a),a.f|=rn}catch(v){throw k(a),v}finally{Et(o)}}else n!==null&&rt(a);var c=r&&a.deps===null&&a.first===null&&a.nodes_start===null&&a.teardown===null&&(a.f&(gt|G))===0;if(!c&&!s&&e&&(l!==null&&mn(a,l),u!==null&&u.f&y)){var p=u;(p.children??(p.children=[])).push(a)}return a}function Rr(t){qt();var n=f!==null&&(f.f&A)!==0&&_!==null&&!_.m;if(n){var r=_;(r.e??(r.e=[])).push({fn:t,effect:f,reaction:u})}else{var e=Pt(t);return e}}function xr(t){return qt(),Tn(t)}function Dr(t){const n=L(b,t,!0);return()=>{k(n)}}function Ir(t){const n=L(b,t,!0);return(r={})=>new Promise(e=>{r.outro?kn(n,()=>{k(n),e(void 0)}):(k(n),e(void 0))})}function Pt(t){return L(mt,t,!1)}function Tn(t){return L(J,t,!0)}function Sr(t){return gn(t)}function gn(t,n=0){return L(J|ot|n,t,!0)}function Or(t,n=!0){return L(J|A,t,!0,n)}function Ft(t){var n=t.teardown;if(n!==null){const r=_t,e=u;yt(!0),z(null);try{n.call(null)}finally{yt(r),z(e)}}}function Lt(t){var n=t.deriveds;if(n!==null){t.deriveds=null;for(var r=0;r<n.length;r+=1)ft(n[r])}}function Mt(t,n=!1){var r=t.first;for(t.first=t.last=null;r!==null;){var e=r.next;k(r,n),r=e}}function An(t){for(var n=t.first;n!==null;){var r=n.next;n.f&A||k(n),n=r}}function k(t,n=!0){var r=!1;if((n||t.f&en)&&t.nodes_start!==null){for(var e=t.nodes_start,s=t.nodes_end;e!==null;){var l=e===s?null:F(e);e.remove(),e=l}r=!0}Mt(t,n&&!r),Lt(t),j(t,0),m(t,P);var a=t.transitions;if(a!==null)for(const c of a)c.stop();Ft(t);var o=t.parent;o!==null&&o.first!==null&&Yt(t),t.next=t.prev=t.teardown=t.ctx=t.deps=t.fn=t.nodes_start=t.nodes_end=null}function Yt(t){var n=t.parent,r=t.prev,e=t.next;r!==null&&(r.next=e),e!==null&&(e.prev=r),n!==null&&(n.first===t&&(n.first=e),n.last===t&&(n.last=r))}function kn(t,n){var r=[];Ht(t,r,!0),Rn(r,()=>{k(t),n&&n()})}function Rn(t,n){var r=t.length;if(r>0){var e=()=>--r||n();for(var s of t)s.out(e)}else n()}function Ht(t,n,r){if(!(t.f&C)){if(t.f^=C,t.transitions!==null)for(const a of t.transitions)(a.is_global||r)&&n.push(a);for(var e=t.first;e!==null;){var s=e.next,l=(e.f&Tt)!==0||(e.f&A)!==0;Ht(e,n,l?r:!1),e=s}}}function Cr(t){jt(t,!0)}function jt(t,n){if(t.f&C){t.f^=C,t.f&d||(t.f^=d),B(t)&&(m(t,R),rt(t));for(var r=t.first;r!==null;){var e=r.next,s=(r.f&Tt)!==0||(r.f&A)!==0;jt(r,s?n:!1),r=e}if(t.transitions!==null)for(const l of t.transitions)(l.is_global||n)&&l.in()}}const xn=typeof requestIdleCallback>"u"?t=>setTimeout(t,1):requestIdleCallback;let $=!1,Z=!1,lt=[],at=[];function Bt(){$=!1;const t=lt.slice();lt=[],wt(t)}function Ut(){Z=!1;const t=at.slice();at=[],wt(t)}function Nr(t){$||($=!0,queueMicrotask(Bt)),lt.push(t)}function br(t){Z||(Z=!0,xn(Ut)),at.push(t)}function Dn(){$&&Bt(),Z&&Ut()}const Vt=0,In=1;let U=!1,V=Vt,Y=!1,H=null,S=!1,_t=!1;function Et(t){S=t}function yt(t){_t=t}let x=[],O=0;let u=null;function z(t){u=t}let f=null;function W(t){f=t}let w=null;function Sn(t){w=t}let h=null,E=0,T=null;function On(t){T=t}let Gt=1,X=0,D=!1,_=null;function qr(t){_=t}function Kt(){return++Gt}function tt(){return!Q||_!==null&&_.l===null}function B(t){var p;var n=t.f;if(n&R)return!0;if(n&q){var r=t.deps,e=(n&I)!==0;if(r!==null){var s,l,a=(n&K)!==0,o=e&&f!==null&&!D,c=r.length;if(a||o){for(s=0;s<c;s++)l=r[s],(a||!((p=l==null?void 0:l.reactions)!=null&&p.includes(t)))&&(l.reactions??(l.reactions=[])).push(t);a&&(t.f^=K)}for(s=0;s<c;s++)if(l=r[s],B(l)&&bt(l),l.wv>t.wv)return!0}(!e||f!==null&&!D)&&m(t,d)}return!1}function Cn(t,n){for(var r=n;r!==null;){if(r.f&G)try{r.fn(t);return}catch{r.f^=G}r=r.parent}throw U=!1,t}function Nn(t){return(t.f&P)===0&&(t.parent===null||(t.parent.f&G)===0)}function nt(t,n,r,e){if(U){if(r===null&&(U=!1),Nn(n))throw t;return}r!==null&&(U=!0);{Cn(t,n);return}}function $t(t,n,r=0){var e=t.reactions;if(e!==null)for(var s=0;s<e.length;s++){var l=e[s];l.f&y?$t(l,n,r+1):n===l&&(r===0?m(l,R):l.f&d&&m(l,q),rt(l))}}function Zt(t){var vt;var n=h,r=E,e=T,s=u,l=D,a=w,o=_,c=t.f;h=null,E=0,T=null,u=c&(A|b)?null:t,D=!S&&(c&I)!==0,w=null,_=t.ctx,X++;try{var p=(0,t.fn)(),v=t.deps;if(h!==null){var i;if(j(t,E),v!==null&&E>0)for(v.length=E+h.length,i=0;i<h.length;i++)v[E+i]=h[i];else t.deps=v=h;if(!D)for(i=E;i<v.length;i++)((vt=v[i]).reactions??(vt.reactions=[])).push(t)}else v!==null&&E<v.length&&(j(t,E),v.length=E);if(tt()&&T!==null&&!(t.f&(y|q|R)))for(i=0;i<T.length;i++)$t(T[i],t);return s!==null&&X++,p}finally{h=n,E=r,T=e,u=s,D=l,w=a,_=o}}function bn(t,n){let r=n.reactions;if(r!==null){var e=Qt.call(r,t);if(e!==-1){var s=r.length-1;s===0?r=n.reactions=null:(r[e]=r[s],r.pop())}}r===null&&n.f&y&&(h===null||!h.includes(n))&&(m(n,q),n.f&(I|K)||(n.f^=K),j(n,0))}function j(t,n){var r=t.deps;if(r!==null)for(var e=n;e<r.length;e++)bn(t,r[e])}function ct(t){var n=t.f;if(!(n&P)){m(t,d);var r=f,e=_;f=t;try{n&ot?An(t):Mt(t),Lt(t),Ft(t);var s=Zt(t);t.teardown=typeof s=="function"?s:null,t.wv=Gt;var l=t.deps,a}catch(o){nt(o,t,r,e||t.ctx)}finally{f=r}}}function zt(){if(O>1e3){O=0;try{on()}catch(t){if(H!==null)nt(t,H,null);else throw t}}O++}function Wt(t){var n=t.length;if(n!==0){zt();var r=S;S=!0;try{for(var e=0;e<n;e++){var s=t[e];s.f&d||(s.f^=d);var l=[];Xt(s,l),qn(l)}}finally{S=r}}}function qn(t){var n=t.length;if(n!==0)for(var r=0;r<n;r++){var e=t[r];if(!(e.f&(P|C)))try{B(e)&&(ct(e),e.deps===null&&e.first===null&&e.nodes_start===null&&(e.teardown===null?Yt(e):e.fn=null))}catch(s){nt(s,e,null,e.ctx)}}}function Pn(){if(Y=!1,O>1001)return;const t=x;x=[],Wt(t),Y||(O=0,H=null)}function rt(t){V===Vt&&(Y||(Y=!0,queueMicrotask(Pn))),H=t;for(var n=t;n.parent!==null;){n=n.parent;var r=n.f;if(r&(b|A)){if(!(r&d))return;n.f^=d}}x.push(n)}function Xt(t,n){var r=t.first,e=[];t:for(;r!==null;){var s=r.f,l=(s&A)!==0,a=l&&(s&d)!==0,o=r.next;if(!a&&!(s&C))if(s&J){if(l)r.f^=d;else try{B(r)&&ct(r)}catch(i){nt(i,r,null,r.ctx)}var c=r.first;if(c!==null){r=c;continue}}else s&mt&&e.push(r);if(o===null){let i=r.parent;for(;i!==null;){if(t===i)break t;var p=i.next;if(p!==null){r=p;continue t}i=i.parent}}r=o}for(var v=0;v<e.length;v++)c=e[v],n.push(c),Xt(c,n)}function Jt(t){var n=V,r=x;try{zt();const s=[];V=In,x=s,Y=!1,Wt(r);var e=t==null?void 0:t();return Dn(),(x.length>0||s.length>0)&&Jt(),O=0,H=null,e}finally{V=n,x=r}}async function Pr(){await Promise.resolve(),Jt()}function Fn(t){var v;var n=t.f,r=(n&y)!==0;if(r&&n&P){var e=Nt(t);return ft(t),e}if(u!==null){w!==null&&w.includes(t)&&fn();var s=u.deps;t.rv<X&&(t.rv=X,h===null&&s!==null&&s[E]===t?E++:h===null?h=[t]:h.push(t))}else if(r&&t.deps===null)for(var l=t,a=l.parent,o=l;a!==null;)if(a.f&y){var c=a;o=c,a=c.parent}else{var p=a;(v=p.deriveds)!=null&&v.includes(o)||(p.deriveds??(p.deriveds=[])).push(o);break}return r&&(l=t,B(l)&&bt(l)),t.v}function Ln(t){const n=u;try{return u=null,t()}finally{u=n}}const Mn=-7169;function m(t,n){t.f=t.f&Mn|n}function Fr(t,n=!1,r){_={p:_,c:null,e:null,m:!1,s:t,x:null,l:null},Q&&!n&&(_.l={s:null,u:null,r1:[],r2:it(!1)})}function Lr(t){const n=_;if(n!==null){const a=n.e;if(a!==null){var r=f,e=u;n.e=null;try{for(var s=0;s<a.length;s++){var l=a[s];W(l.effect),z(l.reaction),Pt(l.fn)}}finally{W(r),z(e)}}_=n.p,n.m=!0}return{}}function Mr(t){if(!(typeof t!="object"||!t||t instanceof EventTarget)){if(ht in t)ut(t);else if(!Array.isArray(t))for(let n in t){const r=t[n];typeof r=="object"&&r&&ht in r&&ut(r)}}}function ut(t,n=new Set){if(typeof t=="object"&&t!==null&&!(t instanceof EventTarget)&&!n.has(t)){n.add(t),t instanceof Date&&t.getTime();for(let e in t)try{ut(t[e],n)}catch{}const r=nn(t);if(r!==Object.prototype&&r!==Array.prototype&&r!==Map.prototype&&r!==Set.prototype&&r!==Date.prototype){const e=tn(r);for(let s in e){const l=e[s].get;if(l)try{l.call(t)}catch{}}}}}export{Un as $,Rn as A,k as B,kr as C,u as D,Tt as E,hn as F,it as G,vn as H,C as I,rr as J,Yn as K,nr as L,er as M,F as N,dn as O,cr as P,tt as Q,Gn as R,Nr as S,W as T,_r as U,z as V,qr as W,Jt as X,_ as Y,ht as Z,Bn as _,Lr as a,Jn as a0,pt as a1,Qn as a2,nn as a3,Q as a4,Rr as a5,Ln as a6,xr as a7,wt as a8,Kn as a9,lr as aA,ur as aB,Zn as aC,or as aD,Pr as aE,Dr as aF,Vn as aG,sn as aH,Mr as aa,yn as ab,tr as ac,tn as ad,br as ae,zn as af,vr as ag,pr as ah,jn as ai,wr as aj,cn as ak,Rt as al,It as am,Wn as an,Ir as ao,ir as ap,fr as aq,Pt as ar,Tn as as,Xn as at,$n as au,ar as av,kt as aw,A as ax,b as ay,sr as az,gn as b,mr as c,dr as d,yr as e,Tr as f,M as g,N as h,hr as i,Cr as j,Or as k,kn as l,g as m,st as n,et as o,Fr as p,Fn as q,Er as r,gr as s,Sr as t,pn as u,Hn as v,f as w,En as x,Ht as y,Ar as z};
