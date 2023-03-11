(function(){"use strict";var e={1581:function(e,n,t){var o=t(9242),a=t(3396);const i={class:"hidescroll scrolloverflow"},r={class:"base fullheightcontent"};function c(e,n,t,o,c,l){const s=(0,a.up)("BaseNav"),u=(0,a.up)("router-view"),m=(0,a.up)("BaseFooter");return(0,a.wg)(),(0,a.iD)("main",i,[(0,a._)("main",r,[(0,a.Wm)(s),(0,a.Wm)(u,{class:"inner-base"})]),(0,a.Wm)(m)])}var l=t(7139);const s=e=>((0,a.dD)("data-v-249cc6e1"),e=e(),(0,a.Cn)(),e),u=s((()=>(0,a._)("h1",{class:"hideoverflow"},"MV Test Tracker",-1))),m=s((()=>(0,a._)("span",{class:"flex-spacer"},null,-1))),d={class:"base-pages-nav"},f=s((()=>(0,a._)("span",{class:"flex-spacer"},null,-1))),h=s((()=>(0,a._)("button",{id:"nav-auth-btn",class:"small-action-btn auth-action click-action"},"Log In",-1)));function p(e,n,t,o,i,r){const c=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("header",null,[u,m,i.mobile&&!i.mobile_menu_open?((0,a.wg)(),(0,a.iD)("button",{key:0,class:"nav-mobile-btn",onClick:n[0]||(n[0]=e=>i.mobile_menu_open=!i.mobile_menu_open)})):(0,a.kq)("",!0),!i.mobile||i.mobile_menu_open?((0,a.wg)(),(0,a.iD)("div",{key:1,class:(0,l.C_)(["nav-actions",{mobile:i.mobile}])},[i.mobile?((0,a.wg)(),(0,a.iD)("button",{key:0,class:"nav-mobile-btn alt-btn",onClick:n[1]||(n[1]=e=>i.mobile_menu_open=!i.mobile_menu_open)})):(0,a.kq)("",!0),(0,a._)("nav",d,[(0,a.Wm)(c,{class:"click-action-inline",to:"/",onClick:r.closeMenu},{default:(0,a.w5)((()=>[(0,a.Uk)("Home")])),_:1},8,["onClick"]),(0,a.Wm)(c,{class:"click-action-inline",to:"/about",onClick:r.closeMenu},{default:(0,a.w5)((()=>[(0,a.Uk)("About")])),_:1},8,["onClick"]),(0,a.Wm)(c,{class:"click-action-inline",to:"/contact",onClick:r.closeMenu},{default:(0,a.w5)((()=>[(0,a.Uk)("Contact")])),_:1},8,["onClick"])]),f,h],2)):(0,a.kq)("",!0)])}var _={name:"BaseNav",data(){return{mobile_menu_open:!1,mobile:window.innerWidth<=800}},methods:{resize(){this.mobile=window.innerWidth<=800,this.mobile||this.c()},closeMenu(){this.mobile_menu_open=!1}},mounted(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)}},v=t(89);const b=(0,v.Z)(_,[["render",p],["__scopeId","data-v-249cc6e1"]]);var k=b;const w=e=>((0,a.dD)("data-v-a35d330e"),e=e(),(0,a.Cn)(),e),g=w((()=>(0,a._)("p",null,[(0,a._)("span",null,"© 2022-2023 MVHS Test Tracker. "),(0,a._)("span",null,[(0,a.Uk)("Website by "),(0,a._)("a",{href:"https://svonk.me/"},"Sander Vonk")])],-1))),y=[g];function C(e,n,t,o,i,r){return(0,a.wg)(),(0,a.iD)("footer",null,y)}var O={name:"BaseFooter"};const W=(0,v.Z)(O,[["render",C],["__scopeId","data-v-a35d330e"]]);var D=W,T={name:"App",components:{BaseNav:k,BaseFooter:D}};const M=(0,v.Z)(T,[["render",c]]);var x=M,U=t(2483);const j={class:"home"},z=(0,a._)("div",{id:"home-main"},[(0,a._)("h2",null,"Organize. Plan. Study."),(0,a._)("h4",{class:"middle-text"},"Test tracker provides an effective way to manage upcoming exams."),(0,a._)("button",{class:"action-btn auth-action click-action"},"Sign up")],-1),B=(0,a._)("div",{id:"home-art",style:{display:"none"}},null,-1),F=[z,B];function N(e,n){return(0,a.wg)(),(0,a.iD)("main",j,F)}const P={},V=(0,v.Z)(P,[["render",N]]);var Z=V;const E=e=>((0,a.dD)("data-v-3b0e2981"),e=e(),(0,a.Cn)(),e),H={class:"not-found"},I=E((()=>(0,a._)("h1",null,"404",-1))),S=E((()=>(0,a._)("h2",{class:"hideoverflow"},"Page Not Found",-1))),q=E((()=>(0,a._)("hr",{class:"err-break"},null,-1))),A=E((()=>(0,a._)("span",null," | ",-1))),L=E((()=>(0,a._)("span",null," | ",-1))),$=E((()=>(0,a._)("div",{class:"err-pad-bottom"},null,-1)));function G(e,n,t,o,i,r){const c=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("div",H,[I,S,q,(0,a._)("nav",null,[(0,a.Wm)(c,{class:"router-link click-action-inline",to:"/"},{default:(0,a.w5)((()=>[(0,a.Uk)("Home")])),_:1}),A,(0,a.Wm)(c,{class:"router-link click-action-inline",to:"/about"},{default:(0,a.w5)((()=>[(0,a.Uk)("About")])),_:1}),L,(0,a.Wm)(c,{class:"router-link click-action-inline",to:"/contact"},{default:(0,a.w5)((()=>[(0,a.Uk)("Contact")])),_:1})]),$])}var J={name:"NotFound"};const K=(0,v.Z)(J,[["render",G],["__scopeId","data-v-3b0e2981"]]);var Q=K;const R=(0,U.p7)({history:(0,U.PO)("/"),routes:[{path:"/",name:"home",component:Z,meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#000000"}}},{path:"/:pathMatch(.*)*",name:"404",component:Q,meta:{page_title:"404",theme_color:{light:"#ffffff",dark:"#000000"}}}]});var X=R,Y=t(1708),ee=t(7387),ne=t.n(ee);(0,o.ri)(x).use(X).mount("#app"),
//! placeholder
ne()(document.body).on("click",".auth-action",(function(){(0,Y.gy)()})),X.afterEach((e=>{e.meta&&e.meta.page_title?document.title="MV Test Tracker | "+e.meta.page_title:document.title="MV Test Tracker",e.meta&&e.meta.theme_color&&e.meta.theme_color.light&&e.meta.theme_color.dark?(ne()("meta.theme-color").attr("content",e.meta.theme_color.light),ne()("meta.theme-color-dark").attr("content",e.meta.theme_color.dark)):(ne()("meta.theme-color").attr("content","#f5c14b"),ne()("meta.theme-color-dark").attr("content","#f5c14b")),(0,Y.hC)()})),window.toast=Y.gy,window.$=ne()}},n={};function t(o){var a=n[o];if(void 0!==a)return a.exports;var i=n[o]={exports:{}};return e[o].call(i.exports,i,i.exports,t),i.exports}t.m=e,function(){var e=[];t.O=function(n,o,a,i){if(!o){var r=1/0;for(u=0;u<e.length;u++){o=e[u][0],a=e[u][1],i=e[u][2];for(var c=!0,l=0;l<o.length;l++)(!1&i||r>=i)&&Object.keys(t.O).every((function(e){return t.O[e](o[l])}))?o.splice(l--,1):(c=!1,i<r&&(r=i));if(c){e.splice(u--,1);var s=a();void 0!==s&&(n=s)}}return n}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[o,a,i]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.p="/"}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,o){var a,i,r=o[0],c=o[1],l=o[2],s=0;if(r.some((function(n){return 0!==e[n]}))){for(a in c)t.o(c,a)&&(t.m[a]=c[a]);if(l)var u=l(t)}for(n&&n(o);s<r.length;s++)i=r[s],t.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return t.O(u)},o=self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[];o.forEach(n.bind(null,0)),o.push=n.bind(null,o.push.bind(o))}();var o=t.O(void 0,[998],(function(){return t(1581)}));o=t.O(o)})();
//# sourceMappingURL=app.48d11178.js.map