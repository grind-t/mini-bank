import{a as A,t as q,b as st}from"../chunks/8ocvor9c.js";import{i as it}from"../chunks/BGLk2MK5.js";import{p as at,a as ut,c as E,r as J,t as ot,q as G}from"../chunks/Dwnr3qy2.js";import{s as ct}from"../chunks/DM3jR66M.js";import{a as ft}from"../chunks/B3EHeeXm.js";import{e as dt,i as ht}from"../chunks/BJtFot1w.js";import{b as lt}from"../chunks/Dk334McP.js";function $t(g){return g&&g.__esModule&&Object.prototype.hasOwnProperty.call(g,"default")?g.default:g}var U={exports:{}},mt=U.exports,K;function pt(){return K||(K=1,function(g,V){(function(S,w){g.exports=w()})(mt,function(){var S=1e3,w=6e4,Y=36e5,b="millisecond",v="second",y="minute",M="hour",m="day",O="week",$="month",P="quarter",D="year",H="date",B="Invalid Date",tt=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,et=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,rt={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(s){var r=["th","st","nd","rd"],t=s%100;return"["+s+(r[(t-20)%10]||r[t]||r[0])+"]"}},Z=function(s,r,t){var n=String(s);return!n||n.length>=r?s:""+Array(r+1-n.length).join(t)+s},nt={s:Z,z:function(s){var r=-s.utcOffset(),t=Math.abs(r),n=Math.floor(t/60),e=t%60;return(r<=0?"+":"-")+Z(n,2,"0")+":"+Z(e,2,"0")},m:function s(r,t){if(r.date()<t.date())return-s(t,r);var n=12*(t.year()-r.year())+(t.month()-r.month()),e=r.clone().add(n,$),i=t-e<0,a=r.clone().add(n+(i?-1:1),$);return+(-(n+(t-e)/(i?e-a:a-e))||0)},a:function(s){return s<0?Math.ceil(s)||0:Math.floor(s)},p:function(s){return{M:$,y:D,w:O,d:m,D:H,h:M,m:y,s:v,ms:b,Q:P}[s]||String(s||"").toLowerCase().replace(/s$/,"")},u:function(s){return s===void 0}},C="en",x={};x[C]=rt;var Q="$isDayjsObject",z=function(s){return s instanceof N||!(!s||!s[Q])},I=function s(r,t,n){var e;if(!r)return C;if(typeof r=="string"){var i=r.toLowerCase();x[i]&&(e=i),t&&(x[i]=t,e=i);var a=r.split("-");if(!e&&a.length>1)return s(a[0])}else{var o=r.name;x[o]=r,e=o}return!n&&e&&(C=e),e||!n&&C},f=function(s,r){if(z(s))return s.clone();var t=typeof r=="object"?r:{};return t.date=s,t.args=arguments,new N(t)},u=nt;u.l=I,u.i=z,u.w=function(s,r){return f(s,{locale:r.$L,utc:r.$u,x:r.$x,$offset:r.$offset})};var N=function(){function s(t){this.$L=I(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[Q]=!0}var r=s.prototype;return r.parse=function(t){this.$d=function(n){var e=n.date,i=n.utc;if(e===null)return new Date(NaN);if(u.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var a=e.match(tt);if(a){var o=a[2]-1||0,c=(a[7]||"0").substring(0,3);return i?new Date(Date.UTC(a[1],o,a[3]||1,a[4]||0,a[5]||0,a[6]||0,c)):new Date(a[1],o,a[3]||1,a[4]||0,a[5]||0,a[6]||0,c)}}return new Date(e)}(t),this.init()},r.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},r.$utils=function(){return u},r.isValid=function(){return this.$d.toString()!==B},r.isSame=function(t,n){var e=f(t);return this.startOf(n)<=e&&e<=this.endOf(n)},r.isAfter=function(t,n){return f(t)<this.startOf(n)},r.isBefore=function(t,n){return this.endOf(n)<f(t)},r.$g=function(t,n,e){return u.u(t)?this[n]:this.set(e,t)},r.unix=function(){return Math.floor(this.valueOf()/1e3)},r.valueOf=function(){return this.$d.getTime()},r.startOf=function(t,n){var e=this,i=!!u.u(n)||n,a=u.p(t),o=function(j,l){var _=u.w(e.$u?Date.UTC(e.$y,l,j):new Date(e.$y,l,j),e);return i?_:_.endOf(m)},c=function(j,l){return u.w(e.toDate()[j].apply(e.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(l)),e)},d=this.$W,h=this.$M,p=this.$D,T="set"+(this.$u?"UTC":"");switch(a){case D:return i?o(1,0):o(31,11);case $:return i?o(1,h):o(0,h+1);case O:var k=this.$locale().weekStart||0,L=(d<k?d+7:d)-k;return o(i?p-L:p+(6-L),h);case m:case H:return c(T+"Hours",0);case M:return c(T+"Minutes",1);case y:return c(T+"Seconds",2);case v:return c(T+"Milliseconds",3);default:return this.clone()}},r.endOf=function(t){return this.startOf(t,!1)},r.$set=function(t,n){var e,i=u.p(t),a="set"+(this.$u?"UTC":""),o=(e={},e[m]=a+"Date",e[H]=a+"Date",e[$]=a+"Month",e[D]=a+"FullYear",e[M]=a+"Hours",e[y]=a+"Minutes",e[v]=a+"Seconds",e[b]=a+"Milliseconds",e)[i],c=i===m?this.$D+(n-this.$W):n;if(i===$||i===D){var d=this.clone().set(H,1);d.$d[o](c),d.init(),this.$d=d.set(H,Math.min(this.$D,d.daysInMonth())).$d}else o&&this.$d[o](c);return this.init(),this},r.set=function(t,n){return this.clone().$set(t,n)},r.get=function(t){return this[u.p(t)]()},r.add=function(t,n){var e,i=this;t=Number(t);var a=u.p(n),o=function(h){var p=f(i);return u.w(p.date(p.date()+Math.round(h*t)),i)};if(a===$)return this.set($,this.$M+t);if(a===D)return this.set(D,this.$y+t);if(a===m)return o(1);if(a===O)return o(7);var c=(e={},e[y]=w,e[M]=Y,e[v]=S,e)[a]||1,d=this.$d.getTime()+t*c;return u.w(d,this)},r.subtract=function(t,n){return this.add(-1*t,n)},r.format=function(t){var n=this,e=this.$locale();if(!this.isValid())return e.invalidDate||B;var i=t||"YYYY-MM-DDTHH:mm:ssZ",a=u.z(this),o=this.$H,c=this.$m,d=this.$M,h=e.weekdays,p=e.months,T=e.meridiem,k=function(l,_,W,F){return l&&(l[_]||l(n,i))||W[_].slice(0,F)},L=function(l){return u.s(o%12||12,l,"0")},j=T||function(l,_,W){var F=l<12?"AM":"PM";return W?F.toLowerCase():F};return i.replace(et,function(l,_){return _||function(W){switch(W){case"YY":return String(n.$y).slice(-2);case"YYYY":return u.s(n.$y,4,"0");case"M":return d+1;case"MM":return u.s(d+1,2,"0");case"MMM":return k(e.monthsShort,d,p,3);case"MMMM":return k(p,d);case"D":return n.$D;case"DD":return u.s(n.$D,2,"0");case"d":return String(n.$W);case"dd":return k(e.weekdaysMin,n.$W,h,2);case"ddd":return k(e.weekdaysShort,n.$W,h,3);case"dddd":return h[n.$W];case"H":return String(o);case"HH":return u.s(o,2,"0");case"h":return L(1);case"hh":return L(2);case"a":return j(o,c,!0);case"A":return j(o,c,!1);case"m":return String(c);case"mm":return u.s(c,2,"0");case"s":return String(n.$s);case"ss":return u.s(n.$s,2,"0");case"SSS":return u.s(n.$ms,3,"0");case"Z":return a}return null}(l)||a.replace(":","")})},r.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},r.diff=function(t,n,e){var i,a=this,o=u.p(n),c=f(t),d=(c.utcOffset()-this.utcOffset())*w,h=this-c,p=function(){return u.m(a,c)};switch(o){case D:i=p()/12;break;case $:i=p();break;case P:i=p()/3;break;case O:i=(h-d)/6048e5;break;case m:i=(h-d)/864e5;break;case M:i=h/Y;break;case y:i=h/w;break;case v:i=h/S;break;default:i=h}return e?i:u.a(i)},r.daysInMonth=function(){return this.endOf($).$D},r.$locale=function(){return x[this.$L]},r.locale=function(t,n){if(!t)return this.$L;var e=this.clone(),i=I(t,n,!0);return i&&(e.$L=i),e},r.clone=function(){return u.w(this.$d,this)},r.toDate=function(){return new Date(this.valueOf())},r.toJSON=function(){return this.isValid()?this.toISOString():null},r.toISOString=function(){return this.$d.toISOString()},r.toString=function(){return this.$d.toUTCString()},s}(),R=N.prototype;return f.prototype=R,[["$ms",b],["$s",v],["$m",y],["$H",M],["$W",m],["$M",$],["$y",D],["$D",H]].forEach(function(s){R[s[1]]=function(r){return this.$g(r,s[0],s[1])}}),f.extend=function(s,r){return s.$i||(s(r,N,f),s.$i=!0),f},f.locale=I,f.isDayjs=z,f.unix=function(s){return f(1e3*s)},f.en=x[C],f.Ls=x,f.p={},f})}(U)),U.exports}var vt=pt();const X=$t(vt);var yt=q("<pre><code> </code></pre>"),Mt=q("<pre><code>Логи отсутсвуют</code></pre>"),gt=q('<div class="mockup-code w-full h-full rounded-none bg-transparent"></div>'),Dt=q('<div class="flex flex-col h-full"><!></div>');function jt(g,V){at(V,!1),it();var S=Dt(),w=E(S);ft(w,()=>lt({id:"bonds",from:X().subtract(1,"week").toDate(),to:X().toDate()}),null,(Y,b)=>{var v=gt();dt(v,5,()=>G(b),ht,(y,M)=>{var m=yt(),O=E(m),$=E(O,!0);ot(()=>ct($,JSON.stringify(G(M),null,2))),J(O),J(m),A(y,m)},y=>{var M=Mt();A(y,M)}),J(v),A(Y,v)},Y=>{var b=st("Ошибка");A(Y,b)}),J(S),A(g,S),ut()}export{jt as component};
