import{a as r,t as w,b as h}from"../chunks/8ocvor9c.js";import{p as y,O as H,t as _,a as C,P as D,s as o,c as l,r as n,q as f}from"../chunks/Dwnr3qy2.js";import{d as M,s as Z}from"../chunks/DM3jR66M.js";import{a as z}from"../chunks/B3EHeeXm.js";import{r as b,s as x}from"../chunks/ncpZpQHu.js";import{p as B}from"../chunks/D4R0FX1T.js";import{u as a,e as P}from"../chunks/Dk334McP.js";var S=w('<span class="loading loading-ring"></span>'),T=w('<div class="flex flex-col h-full"><label class="input m-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 mr-2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"></path></svg> <input type="password" placeholder="Пароль"></label> <label class="input m-2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 mr-2"><path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z"></path></svg> <input type="text" placeholder="ID счета t-invest"></label> <button class="btn btn-primary mt-auto mb-2 mx-2"><!></button></div>');function G(A,I){y(I,!0);let d=D(void 0);var p=T(),c=l(p),i=o(l(c),2);b(i),i.__change=t=>{a.password=t.currentTarget.value},n(c);var v=o(c,2),u=o(l(v),2);b(u),u.__change=t=>{a.tInvestAccountId=t.currentTarget.value},n(v);var m=o(v,2);m.__click=()=>{H(d,B(P({strategyId:"bonds",accountId:a.tInvestAccountId})))};var k=l(m);z(k,()=>f(d),t=>{var e=S();r(t,e)},(t,e)=>{var s=h("Запустить DCA");r(t,s)},(t,e)=>{var s=h();_(()=>{var g;return Z(s,(g=f(e))==null?void 0:g.message)}),r(t,s)}),n(m),n(p),_(()=>{x(i,a.password),x(u,a.tInvestAccountId)}),r(A,p),C()}M(["change","click"]);export{G as component};
