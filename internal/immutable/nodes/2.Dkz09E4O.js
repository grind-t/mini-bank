import{a as u,t as f,b as H}from"../chunks/DCW8r8Dq.js";import{p as D,c as d,r as c,a as F,t as y,f as Y,s as m,an as $,at as V,a7 as Z,M as n,al as N}from"../chunks/CoG_KEyV.js";import{i as P}from"../chunks/GcC8un-C.js";import{e as O}from"../chunks/CWR62LVY.js";import{p}from"../chunks/CK5RBtUc.js";import{o as tt}from"../chunks/DOykgDdZ.js";import{b as et,a as at,s as q}from"../chunks/DaBdD8Cd.js";import{s as E,r as G,c as rt,b as nt,a as st,d as it}from"../chunks/DwLpJPDm.js";import{d as J,s as w}from"../chunks/CrPFTp9z.js";import{r as ot}from"../chunks/BtoMd2cU.js";import{d as Q,p as lt}from"../chunks/DDjiXmCw.js";function K(e){var t,a,r="";if(typeof e=="string"||typeof e=="number")r+=e;else if(typeof e=="object")if(Array.isArray(e)){var s=e.length;for(t=0;t<s;t++)e[t]&&(a=K(e[t]))&&(r&&(r+=" "),r+=a)}else for(a in e)e[a]&&(r&&(r+=" "),r+=a);return r}function dt(){for(var e,t,a=0,r="",s=arguments.length;a<s;a++)(e=arguments[a])&&(t=K(e))&&(r&&(r+=" "),r+=t);return r}function ct(e){return typeof e=="object"?dt(e):e??""}var ut=f('<ul class="list"><!></ul>');function vt(e,t){D(t,!0);var a=ut(),r=d(a);E(r,()=>t.children),c(a),u(e,a),F()}const W="ru-RU";function ft(){return new Intl.DateTimeFormat(W,{month:"long"}).format(Date.now())}function gt(e){return(e.getTime()-Date.now())/315576e5}function mt(e){const t=+gt(e).toFixed(1),a=new Intl.PluralRules(W).select(Math.floor(t));return`${t} ${{zero:"лет",one:"год",two:"года",few:"года",many:"лет",other:"лет"}[a]}`}var _t=(e,t,a)=>{e.preventDefault(),a.onChange(Number(e.currentTarget.value)||0)},ht=f('<input class="input m-2" type="text">');function bt(e,t){D(t,!0);let a=ot(t,["$$slots","$$events","$$legacy"]);var r=ht();G(r),y(()=>rt(r,"placeholder",`Сумма на ${ft()??""}`)),r.__change=[_t,a,t],y(()=>nt(r,t.value||void 0)),u(e,r),F()}J(["change"]);function yt(e){switch(e){case 0:return"T-C";case 1:return"T-B";case 2:return"T-A";default:return"wtf"}}function xt(e){switch(e){case 6:return"AAA";case 5.1:return"AA+";case 5:return"AA";case 4.9:return"AA-";case 4.1:return"A+";case 4:return"A";case 3.9:return"A-";case 3.1:return"BBB+";case 3:return"BBB";case 2.9:return"BBB-";case 2.1:return"BB+";case 2:return"BB";case 1.9:return"BB-";case 1.1:return"B+";case 1:return"B";case .9:return"B-";case 0:return"N/A";default:return"wtf"}}var Bt=f("<li><!></li>");function X(e,t){D(t,!0);var a=Bt(),r=d(a);E(r,()=>t.children),c(a),y(()=>st(a,ct(["list-row [&&]:grid-cols-[3rem_3fr_2fr_2fr_2fr] [&&]:gap-4",t.sticky&&"[&&]:sticky [&&]:top-0 [&&]:bg-base-100 [&&]:z-10"]))),u(e,a),F()}var At=(e,t)=>{var a,r;e.preventDefault(),t.strategyAsset?(r=t.onRemoveFromStrategy)==null||r.call(t,t.strategyAsset):(a=t.onAddToStrategy)==null||a.call(t,{isin:t.bond.isin,weight:1})},wt=(e,t)=>navigator.clipboard.writeText(t.bond.isin),Dt=f("<div> </div>"),Ft=f("<div> </div>"),Tt=f('<div class="flex flex-col"><label><input type="checkbox" class="checkbox checkbox-xs"></label></div> <div class="flex flex-col gap-2"><div> </div> <button class="h-fit" aria-label="Скопировать isin"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 2h2.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 1 .439 1.061V9.5A1.5 1.5 0 0 1 12 11V8.621a3 3 0 0 0-.879-2.121L9 4.379A3 3 0 0 0 6.879 3.5H5.5Z"></path><path d="M4 5a1.5 1.5 0 0 0-1.5 1.5v6A1.5 1.5 0 0 0 4 14h5a1.5 1.5 0 0 0 1.5-1.5V8.621a1.5 1.5 0 0 0-.44-1.06L7.94 5.439A1.5 1.5 0 0 0 6.878 5H4Z"></path></svg></button></div> <div class="flex flex-col gap-2"><!> <!></div> <div> </div> <div><!></div>',1);function U(e,t){D(t,!0),X(e,{children:(a,r)=>{var s=Tt(),g=Y(s),x=d(g),B=d(x);G(B),B.__click=[At,t],c(x),c(g);var T=m(g,2),A=d(T),S=d(A,!0);c(A);var k=m(A,2);k.__click=[wt,t],c(T);var I=m(T,2),R=d(I);{var o=l=>{var i=Dt(),b=d(i,!0);y(()=>w(b,xt(t.bond.rating.bondFinder))),c(i),u(l,i)};P(R,l=>{t.bond.rating.bondFinder&&l(o)})}var v=m(R,2);{var _=l=>{var i=Ft(),b=d(i,!0);y(()=>w(b,yt(t.bond.rating.tInvest))),c(i),u(l,i)};P(v,l=>{t.bond.rating.tInvest!==void 0&&l(_)})}c(I);var h=m(I,2),M=d(h);c(h);var j=m(h,2),C=d(j);{var L=l=>{var i=H();y(()=>w(i,mt(new Date(t.bond.maturityDate)))),u(l,i)},z=l=>{var i=H("N/A");u(l,i)};P(C,l=>{t.bond.maturityDate?l(L):l(z,!1)})}c(j),y(()=>{it(B,!!t.strategyAsset),w(S,t.bond.name),w(M,`${(t.bond.isFloater?"~":"")??""}${t.bond.yield??""}%`)}),u(a,s)},$$slots:{default:!0}}),F()}J(["click"]);var kt=f('<div> </div> <div class="line-clamp-1">Наименование</div> <div class="line-clamp-1">Рейтинг</div> <div class="line-clamp-1">Доходность</div> <div class="line-clamp-1">Срок</div>',1);function It(e,t){D(t,!0),X(e,{sticky:!0,children:(a,r)=>{var s=kt(),g=Y(s),x=d(g);c(g),$(8),y(()=>w(x,`${t.selectedBonds.length??""} шт.`)),u(a,s)},$$slots:{default:!0}}),F()}var Mt=f("<!> <!> <!>",1),pt=f("<!> <!>",1),St=f('<main class="flex flex-col flex-1"><!></main>');function Zt(e,t){D(t,!0);let a=p({whitelist:[],yield:{gte:22,lte:32},rating:{tInvest:{gte:1},bondFinder:{gte:4}},nominal:{lte:1e4},maturityDate:{lte:Q().add(2,"years").toDate(),gte:Q().add(1,"month").toDate(),unit:"day"},currency:{in:["rub"]},sector:{nin:["real_estate"]},hasAmortization:{eq:!1},hasOffer:{eq:!1},forQual:{eq:!1}}),r=V(p([])),s=V(p({id:"bonds",currentMonthBudget:0,assets:[]})),g=N(()=>lt(n(s).assets,o=>o.isin)),x=N(()=>n(r).reduce((o,v)=>{const{isin:_,rating:h}=v;return n(g)[_]?o[0].push(v):(h.tInvest!==1||h.bondFinder)&&o[1].push(v),o},[[],[]])),B=N(()=>n(x)[0]),T=N(()=>n(x)[1]);tt(async()=>{Z(s,p(await et({id:"bonds"})??n(s))),a.whitelist=n(s).assets.map(o=>o.isin),Z(r,p(await at({filter:a})))});function A(o){n(s).assets.push(o),q(n(s))}function S(o){const v=n(s).assets.findIndex(_=>_===o);n(s).assets.splice(v,1),q(n(s))}var k=St(),I=d(k);{var R=o=>{var v=pt(),_=Y(v);bt(_,{get value(){return n(s).currentMonthBudget},onChange:M=>{n(s).currentMonthBudget=M,q(n(s))}});var h=m(_,2);vt(h,{children:(M,j)=>{var C=Mt(),L=Y(C);It(L,{get selectedBonds(){return n(B)}});var z=m(L,2);O(z,17,()=>n(B),i=>i.isin,(i,b)=>{U(i,{get bond(){return n(b)},get strategyAsset(){return n(g)[n(b).isin]},onAddToStrategy:A,onRemoveFromStrategy:S})});var l=m(z,2);O(l,17,()=>n(T),i=>i.isin,(i,b)=>{U(i,{get bond(){return n(b)},onAddToStrategy:A,onRemoveFromStrategy:S})}),u(M,C)},$$slots:{default:!0}}),u(o,v)};P(I,o=>{n(r).length&&o(R)})}c(k),u(e,k),F()}export{Zt as component};
