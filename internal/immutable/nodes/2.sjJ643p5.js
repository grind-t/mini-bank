import{a as w,t as D}from"../chunks/D8BGoJOW.js";import{i as U}from"../chunks/CYNWi8ek.js";import{p as X,a as j,a5 as b,K as e,ak as F,c as i,f as E,t as f,s as m,r as s,al as G,X as H}from"../chunks/CiKZJnSh.js";import{d as J,s as p}from"../chunks/BdYO1U_Q.js";import{i as L}from"../chunks/DAneCwt-.js";import{e as O,i as Q}from"../chunks/BtHT_oCF.js";import{r as Y,a as V,b as W,s as Z}from"../chunks/C0VaKHfZ.js";import{o as S}from"../chunks/CyaxJo5f.js";import{g as ee,a as te,s as C}from"../chunks/Dbo7ar3e.js";const N="ru-RU";function ae(){return new Intl.DateTimeFormat(N,{month:"long"}).format(Date.now())}function re(a){return(a.getTime()-Date.now())/315576e5}function se(a){const t=+re(a).toFixed(1),n=new Intl.PluralRules(N).select(Math.floor(t));return`${t} ${{zero:"лет",one:"год",two:"года",few:"года",many:"лет",other:"лет"}[n]}`}function ne(a){switch(a){case 6:return"AAA";case 5.1:return"AA+";case 5:return"AA";case 4.9:return"AA-";case 4.1:return"A+";case 4:return"A";case 3.9:return"A-";case 3.1:return"BBB+";case 3:return"BBB";case 2.9:return"BBB-";case 2.1:return"BB+";case 2:return"BB";case 1.9:return"BB-";case 1.1:return"B+";case 1:return"B";case .9:return"B-";case 0:return"N/A";default:return"wtf"}}var ie=(a,t)=>{e(t)&&(G(t,e(t).currentMonthBudget=Number.parseInt(a.currentTarget.value)||0),C(e(t)))},oe=(a,t,n,r)=>{var v,d;if(!e(t))return;const{checked:l}=a.currentTarget;l?(v=e(t))==null||v.assets.push({id:e(n).isin,weight:1}):(d=e(t))==null||d.assets.splice(e(r),1),C(e(t))},ce=D('<li class="list-row"><label><input type="checkbox" class="checkbox checkbox-xs"></label> <div class="list-col-grow flex"><div class="flex-3"> </div> <div class="flex-2"> </div> <div class="flex-2"> </div> <div class="flex-2"> </div></div></li>'),le=D('<input class="input m-2" type="text"> <ul class="list"></ul>',1),ue=D('<main class="flex flex-col flex-1"><!></main>');function Be(a,t){X(t,!1);let n=F(),r=F();S(async()=>{await(async o=>(b(n,o[0]),b(r,o[1])))(await Promise.all([ee(),te({id:"bonds"})])),b(r,e(r)??{id:"bonds",currentMonthBudget:0,assets:[]})}),U();var l=ue(),v=i(l);{var d=o=>{var I=le(),u=E(I);Y(u),f(()=>V(u,"placeholder",`Сумма на ${ae()??""}`)),u.__change=[ie,r];var k=m(u,2);O(k,5,()=>e(n),Q,(R,c)=>{var _=ce();const y=H(()=>e(r).assets.findIndex(K=>K.id==e(c).isin));var g=i(_),h=i(g);Y(h),h.__change=[oe,r,c,y],s(g);var M=m(g,2),x=i(M),P=i(x,!0);s(x);var B=m(x,2),$=i(B,!0);f(()=>p($,ne(e(c).rating))),s(B);var A=m(B,2),q=i(A);s(A);var T=m(A,2),z=i(T,!0);f(()=>p(z,se(new Date(e(c).maturityDate)))),s(T),s(M),s(_),f(()=>{W(h,e(y)!==-1),p(P,e(c).name),p(q,`${e(c).yield??""}%`)}),w(R,_)}),s(k),f(()=>Z(u,e(r).currentMonthBudget||"")),w(o,I)};L(v,o=>{e(n)&&e(r)&&o(d)})}s(l),w(a,l),j()}J(["change"]);export{Be as component};
