(function(){"use strict";var e={2573:function(e,t,a){a(7658);var n=a(9242),o=a(1020),s=a(3396);const r={class:"parent"};function i(e,t,a,n,o,i){const l=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)("main",r,[(0,s.Wm)(l)])}var l={},c=a(89);const u=(0,c.Z)(l,[["render",i]]);var d=u,h=a(5459),m=a(1708),f=a(7387),p=a.n(f),_=a(8980);const g=(0,o.WB)(),v=(0,n.ri)(d);v.use(h.Z),v.use(g),v.mount("#app"),p()(document.body).on("click",".auth-action",(function(){const e=(0,_.h)();!e.user&&p()(this).hasClass("can-login")?e.login():p()(this).hasClass("can-logout")&&(p()(this).hasClass("doprompt")?new m.GI(["Log Out","Are you sure you want to log out?"],"default",1e4,a(4856),[["removePopup()","Cancel","secondary-action fullborder"],["removePopup()","Confirm","primary-action auth-action can-logout"]]):e.logout())})),p()(document.body).on("click",".gohome",(function(){h.Z.push("/")})),h.Z.afterEach((e=>{e.meta&&e.meta.page_title?document.title="MV Test Tracker | "+e.meta.page_title:document.title="MV Test Tracker",e.meta&&e.meta.theme_color&&e.meta.theme_color.light&&e.meta.theme_color.dark?(p()("meta.theme-color").attr("content",e.meta.theme_color.light),p()("meta.theme-color-dark").attr("content",e.meta.theme_color.dark)):(p()("meta.theme-color").attr("content","#f5c14b"),p()("meta.theme-color-dark").attr("content","#f5c14b")),(0,m.hC)()})),window.toast=m.gy,window.$=p(),h.Z.beforeEach((e=>{const t=(0,_.h)();return e.meta&&e.meta.requiresAuth&&t&&!t.user?(new m.FN("Please log in to access this page","default",1500,a(1121)),{path:"/",query:{redirect:e.fullPath}}):e.meta&&e.meta.requiresTeacher&&t&&!t.is_teacher?(new m.FN("You must be a teacher to access this page","default",1500,a(1121)),{path:"/portal"}):void 0}))},5459:function(e,t,a){a.d(t,{Z:function(){return H}});var n=a(2483),o=a(3396);const s={class:"apphome hidescroll scrolloverflow"},r={class:"base fullheightcontent"};function i(e,t,a,n,i,l){const c=(0,o.up)("BaseNav"),u=(0,o.up)("router-view"),d=(0,o.up)("BaseFooter");return(0,o.wg)(),(0,o.iD)("main",s,[(0,o._)("main",r,[(0,o.Wm)(c),(0,o.Wm)(u,{class:"inner-base"})]),(0,o.Wm)(d)])}var l=a(7139);const c=e=>((0,o.dD)("data-v-5373644a"),e=e(),(0,o.Cn)(),e),u=c((()=>(0,o._)("h1",{class:"gohome hideoverflow"},"MV Test Tracker",-1))),d=c((()=>(0,o._)("span",{class:"flex-spacer"},null,-1))),h={class:"base-pages-nav"},m=c((()=>(0,o._)("span",{class:"flex-spacer"},null,-1))),f={id:"nav-auth-btn",class:"small-action-btn auth-action can-logout can-login click-action"};function p(e,t,a,n,s,r){const i=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("header",null,[u,d,s.mobile&&!s.mobile_menu_open?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"nav-mobile-btn",onClick:t[0]||(t[0]=e=>s.mobile_menu_open=!s.mobile_menu_open)})):(0,o.kq)("",!0),!s.mobile||s.mobile_menu_open?((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,l.C_)(["nav-actions",{mobile:s.mobile}])},[s.mobile?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"nav-mobile-btn alt-btn",onClick:t[1]||(t[1]=e=>s.mobile_menu_open=!s.mobile_menu_open)})):(0,o.kq)("",!0),(0,o._)("nav",h,[(0,o.Wm)(i,{class:"click-action-inline",to:"/",onClick:r.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1},8,["onClick"]),(0,o.Wm)(i,{class:"click-action-inline",to:"/about",onClick:r.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("About")])),_:1},8,["onClick"]),(0,o.Wm)(i,{class:"click-action-inline",to:"/contact",onClick:r.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("Contact")])),_:1},8,["onClick"])]),m,(0,o._)("button",f," Log "+(0,l.zw)(r.logged_in?"Out":"In"),1)],2)):(0,o.kq)("",!0)])}var _=a(8980),g={name:"BaseNav",data(){return{mobile_menu_open:!1,mobile:window.innerWidth<=800}},methods:{resize(){this.mobile=window.innerWidth<=800,this.mobile||this.closeMenu()},closeMenu(){this.mobile_menu_open=!1}},mounted(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},computed:{store(){return(0,_.h)()},logged_in(){return!!this.store.user}}},v=a(89);const b=(0,v.Z)(g,[["render",p],["__scopeId","data-v-5373644a"]]);var w=b;const k=e=>((0,o.dD)("data-v-94e483ee"),e=e(),(0,o.Cn)(),e),y=k((()=>(0,o._)("p",null,[(0,o._)("span",null,"© 2022-2023 MVHS Test Tracker. "),(0,o._)("span",null,[(0,o.Uk)("Website by "),(0,o._)("a",{href:"https://svonk.me/"},"Sander Vonk")])],-1))),C=[y];function O(e,t,a,n,s,r){return(0,o.wg)(),(0,o.iD)("footer",null,C)}var A={name:"BaseFooter"};const q=(0,v.Z)(A,[["render",O],["__scopeId","data-v-94e483ee"]]);var N=q,P={name:"AppHome",components:{BaseNav:w,BaseFooter:N}};const T=(0,v.Z)(P,[["render",i]]);var Z=T;const D=e=>((0,o.dD)("data-v-22159f4a"),e=e(),(0,o.Cn)(),e),E={class:"not-found"},F=D((()=>(0,o._)("h1",null,"404",-1))),S=D((()=>(0,o._)("h2",{class:"hideoverflow"},"Page Not Found",-1))),j=D((()=>(0,o._)("hr",{class:"err-break"},null,-1))),U=D((()=>(0,o._)("span",null," | ",-1))),x={key:1,class:"nostyle"},L=D((()=>(0,o._)("span",null," | ",-1))),M=D((()=>(0,o._)("div",{class:"err-pad-bottom"},null,-1)));function W(e,t,a,n,s,r){const i=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",E,[F,S,j,(0,o._)("nav",null,[(0,o.Wm)(i,{class:"router-link click-action-inline",to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1}),U,r.logged_in?((0,o.wg)(),(0,o.j4)(i,{key:0,class:"router-link click-action-inline",to:"/portal"},{default:(0,o.w5)((()=>[(0,o.Uk)("Portal")])),_:1})):((0,o.wg)(),(0,o.iD)("span",x,[(0,o.Wm)(i,{class:"router-link click-action-inline",to:"/about"},{default:(0,o.w5)((()=>[(0,o.Uk)("About")])),_:1}),L,(0,o.Wm)(i,{class:"router-link click-action-inline",to:"/contact"},{default:(0,o.w5)((()=>[(0,o.Uk)("Contact")])),_:1})]))]),M])}var I={name:"NotFound",computed:{store(){return(0,_.h)()},logged_in(){return this.store.user}}};const J=(0,v.Z)(I,[["render",W],["__scopeId","data-v-22159f4a"]]);var B=J;const R=(0,n.p7)({history:(0,n.PO)("/"),routes:[{path:"/",name:"home",component:Z,meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"",name:"home",component:()=>a.e(220).then(a.bind(a,6220)),meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"about",name:"about",component:()=>a.e(980).then(a.bind(a,3980)),meta:{page_title:"About",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"/:pathMatch(.*)*",name:"404",component:B,meta:{page_title:"404",theme_color:{light:"#ffffff",dark:"#16130e"}}}]},{path:"/portal",name:"portal",component:()=>a.e(63).then(a.bind(a,4063)),meta:{page_title:"Portal",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0},children:[{path:"/portal/onboarding",name:"onboarding",component:()=>a.e(161).then(a.bind(a,5161)),meta:{page_title:"Onboarding",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/add",name:"addclass",component:()=>a.e(915).then(a.bind(a,9915)),meta:{page_title:"Join a Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/create",name:"createclass",component:()=>a.e(850).then(a.bind(a,1850)),meta:{page_title:"Teacher | Create Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}}]},{path:"/app",redirect:"/portal",meta:{requiresAuth:!0}}]});var H=R},8980:function(e,t,a){a.d(t,{h:function(){return _}});a(7658);var n=a(1020),o=a(1708),s=a(36),r=a(7795),i=a(7851),l=a(4466);const c={apiKey:"AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",authDomain:"mvtrack.firebaseapp.com",projectId:"mvtrack",storageBucket:"mvtrack.appspot.com",messagingSenderId:"1070634963357",appId:"1:1070634963357:web:2a4abc725fff24a5199f74",measurementId:"G-6LNX1KCR8E"},u=(0,r.ZF)(c),d=(0,i.v0)(u),h=(0,s.ad)(u);(0,l.IH)(u);d.onAuthStateChanged((e=>{const t=_();e?(t.set_user(e),(0,s.cf)((0,s.JU)(h,"users",e.uid),{includeMetadataChanges:!0},(e=>{e.metadata.hasPendingWrites?console.warn("local data updated"):(console.warn("remote data updated"),e.exists()?(t.doc=e.data(),t.get_classes()):t.createDoc())}))):t.clear()}));var m=a(5459);const f=new i.hJ;function p(e){return"mvla.net"==e.split("@")[1]}f.addScope("email"),f.addScope("profile"),d.useDeviceLanguage(),f.setCustomParameters({login_hint:"username@mvla.net",hd:"mvla.net"});const _=(0,n.Q_)({id:"main",state:()=>({user:null,doc:null,classes:[],loaded_email:null,loaded_classes:null,teacher:{doc_ref:null,collection_ref:null}}),getters:{userdoc_ref(){return this.user?(0,s.JU)(h,"users",this.user.uid):null},get_tests(){let e=[],t=this.classes;for(let a=0;a<t.length;a++){let n=t[a].tests;for(let o=0;o<n.length;o++)t[a].name=t[a].name?t[a].name:"Unnamed Class","string"==typeof n[o].date&&(n[o].date=new Date(n[o].date),n[o].date=isNaN(n[o].date)?null:n[o].date),e.push({...n[o],class_name:t[a].name})}return e},is_teacher(){if(!this.user)return!1;if(this.doc&&this.doc.teacher_mode)return!0;let e=this.user.email,[t,a]=e.split("@");return"mvla.net"==a&&!/\d/.test(t)}},actions:{async get_classes(){if(this.doc.classes){let e=[...new Set(this.doc.classes)];e.length!=this.doc.classes.length&&(this.doc.classes=e,await this.update_remote(),new o.OO("Removed duplicate classes",2e3))}if(!this.doc)return[];let e=[];for(let t of this.doc.classes){let[a,n]=t.split("/");if(!a||!n){await this.remove_invalid(t);continue}let o=(0,s.JU)(h,"classes",a),r=await(0,s.QT)(o);if(!r.exists()){await this.remove_invalid(t);continue}let i=(0,s.hJ)(o,"classes");if(!i){await this.remove_invalid(t);continue}let l=(0,s.JU)(i,n),c=await(0,s.QT)(l);if(!c.exists()){await this.remove_invalid(t);continue}let u=c.data();u.id=t,e.push(u)}this.classes=e},async remove_invalid(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),new o.OO("Removed non-existent class with id "+e,2e3)},async remove_class(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),console.warn("Removed class from user's doc: "+e),new o.bF("Removed class",2e3)},set_user(e){if(!e.email||!p(e.email))return d.signOut(),new o.OO("Please use your MVLA email to log in",2e3),void this.clear();this.user=e,m.Z.currentRoute?.value?.query?.redirect&&m.Z.push(m.Z.currentRoute?.value?.query?.redirect)},clear(){this.user=null,this.doc=null,this.classes=[],this.loaded_email=null,this.loaded_classes=null,this.teacher={doc_ref:null,collection_ref:null},m.Z.currentRoute?.value?.meta?.requiresAuth&&m.Z.push("/")},async login(){new o.FN("Opening login popup...","default",1e3,a(1121)),await(0,i.rh)(d,f).then((()=>{this.user&&this.user.email&&p(this.user.email)&&(new o.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),m.Z.currentRoute.value&&m.Z.currentRoute.value.query&&m.Z.currentRoute.value.query.redirect||m.Z.push("/portal"))})).catch((e=>{"auth/cancelled-popup-request"==e.code||"auth/popup-closed-by-user"==e.code?new o.OO((0,o.YY)(e),2e3):new o.PK("Couldn't log in",(0,o.YY)(e),2e3)}))},logout(){d.signOut(),new o.FN("Logged Out","default",1500,a(1121))},async get_remote(){let e=await(0,s.QT)(this.userdoc_ref);e.exists()?this.doc=e.data():(await this.create_doc(),await this.get_remote())},async create_doc(){new o.OO("User document doesn't exist, creating new one...",2e3),this.doc={name:this.user.displayName,email:this.user.email,classes:[]},this.is_teacher?(await this.create_teacher_doc(),new o.bF("Created user & teacher documents; Let's get started",2e3)):(await this.update_remote(),new o.bF("Created user document; Let's get started",2e3),m.Z.push("/portal/onboarding"))},async create_teacher_doc(){let e=(0,s.JU)(h,"classes",this.user.email);await(0,s.pl)(e,{name:this.user.displayName,email:this.user.email}),this.teacher={doc_ref:e,collection_ref:(0,s.hJ)(e,"classes")},m.Z.push("/portal/teacher-onboarding")},async update_remote(){await(0,s.pl)(this.userdoc_ref,this.doc,{merge:!0})},async get_classes_by_email(e){if(this.loaded_email=null,!e||!p(e))return this.loaded_classes=null,void(this.loaded_email=e);let t=await(0,s.QT)((0,s.JU)(h,"classes",e));if(t.exists()){let t=[],a=(0,s.hJ)((0,s.JU)(h,"classes",e),"classes"),n=await(0,s.PL)((0,s.IO)(a));n.forEach((a=>{let n=a.data();n.id=a.id,this.doc.classes.includes([e,a.id].join("/"))&&(n.name="[JOINED] "+n.name,n.is_joined=!0),t.push(n)})),this.loaded_classes=t}else this.loaded_classes=null;this.loaded_email=e},async add_class(e,t,a){this.doc&&t&&(this.doc.classes.includes(t)||(this.doc.classes.push([e,t].join("/")),await this.update_remote(),new o.bF(`Added "${a}" to your classes`,2e3),m.Z.push("/portal")))},async create_class(e){if(console.warn("create_class",e),this.is_teacher)if(e.name)try{if(!this.teacher.doc_ref||!this.teacher.collection_ref)return await this.create_teacher_doc(),void await this.create_class(e);let t=await(0,s.ET)(this.teacher.collection_ref,e);new o.bF(`Created class "${e.name}"`,2e3),console.log("class_doc_ref",t),await this.add_class(this.user.email,t.id,e.name)}catch(t){console.error(t),new o.PK("Couldn't create class",(0,o.YY)(t),2e3)}else new o.PK("Please enter a class name",2e3);else new o.PK("You need to be a teacher to create a class",2e3)}}})}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,a),s.exports}a.m=e,function(){var e=[];a.O=function(t,n,o,s){if(!n){var r=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],s=e[u][2];for(var i=!0,l=0;l<n.length;l++)(!1&s||r>=s)&&Object.keys(a.O).every((function(e){return a.O[e](n[l])}))?n.splice(l--,1):(i=!1,s<r&&(r=s));if(i){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}s=s||0;for(var u=e.length;u>0&&e[u-1][2]>s;u--)e[u]=e[u-1];e[u]=[n,o,s]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{63:"7f267fa9",161:"237a2aed",220:"93ebd832",850:"f461fdd4",915:"1c64a6c0",980:"45359bb5"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{63:"7ca0cd7d",220:"84bb0208",850:"47d436dd",980:"48a2c6af"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mvtime:";a.l=function(n,o,s,r){if(e[n])e[n].push(o);else{var i,l;if(void 0!==s)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+s){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+s),i.src=n),e[n]=[o];var h=function(t,a){i.onerror=i.onload=null,clearTimeout(m);var o=e[n];if(delete e[n],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(a)})),t)return t(a)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=h.bind(null,i.onerror),i.onload=h.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,n,o){var s=document.createElement("link");s.rel="stylesheet",s.type="text/css";var r=function(a){if(s.onerror=s.onload=null,"load"===a.type)n();else{var r=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=r,l.request=i,s.parentNode.removeChild(s),o(l)}};return s.onerror=s.onload=r,s.href=t,a?a.parentNode.insertBefore(s,a.nextSibling):document.head.appendChild(s),s},t=function(e,t){for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var o=a[n],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===e||s===t))return o}var r=document.getElementsByTagName("style");for(n=0;n<r.length;n++){o=r[n],s=o.getAttribute("data-href");if(s===e||s===t)return o}},n=function(n){return new Promise((function(o,s){var r=a.miniCssF(n),i=a.p+r;if(t(r,i))return o();e(n,i,null,o,s)}))},o={143:0};a.f.miniCss=function(e,t){var a={63:1,220:1,850:1,980:1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=n(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,n){var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var s=new Promise((function(a,n){o=e[t]=[a,n]}));n.push(o[2]=s);var r=a.p+a.u(t),i=new Error,l=function(n){if(a.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var s=n&&("load"===n.type?"missing":n.type),r=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+s+": "+r+")",i.name="ChunkLoadError",i.type=s,i.request=r,o[1](i)}};a.l(r,l,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,s,r=n[0],i=n[1],l=n[2],c=0;if(r.some((function(t){return 0!==e[t]}))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(l)var u=l(a)}for(t&&t(n);c<r.length;c++)s=r[c],a.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return a.O(u)},n=self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(2573)}));n=a.O(n)})();
//# sourceMappingURL=app.1286416f.js.map