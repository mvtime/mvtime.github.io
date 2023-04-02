(function(){var e={9983:function(e,t,a){"use strict";a(7658);var n=a(9242),o=a(1020),r=a(3396);const s={class:"parent"};function i(e,t,a,n,o,i){const l=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("main",s,[(0,r.Wm)(l)])}var l={name:"App",components:{},data(){return{platform:"",isElectron:!1}},computed:{pageTitle(){return document.title}},mounted(){this.isElectron=navigator.userAgent.toLowerCase().indexOf(" electron/")>-1,this.isElectron&&(this.platform=this.$route.query.platform,!this.platform&&window.location.search&&(this.platform=window.location.search.split("=")[1]),console.log("Electron Platform: "+this.platform))}},c=a(89);const u=(0,c.Z)(l,[["render",i]]);var d=u,h=a(9218),f=a(1708),m=a(7387),p=a.n(m),g=a(8980),_=a(5431);(0,_.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});const v=(0,o.WB)(),w=(0,n.ri)(d);w.use(h.Z),w.use(v),w.mount("#app"),p()(document.body).on("click",".auth-action",(function(){const e=(0,g.h)();!e.user&&p()(this).hasClass("can-login")?e.login():p()(this).hasClass("can-logout")&&(p()(this).hasClass("doprompt")?new f.GI(["Log Out","Are you sure you want to log out?"],"default",1e4,a(4856),[["removePopup()","Cancel","secondary-action fullborder"],["removePopup()","Confirm","primary-action auth-action can-logout"]]):e.logout())})),p()(document.body).on("click",".gohome",(function(){h.Z.push("/")})),h.Z.afterEach((e=>{e.meta&&e.meta.page_title?document.title="MV Test Tracker | "+e.meta.page_title:document.title="MV Test Tracker";let t=e.meta?.theme_color?.light||"#f5c14b",a=e.meta?.theme_color?.dark||"#f5c14b";p()("meta.theme-color").attr("content",t),p()("meta.theme-color-dark").attr("content",a),(0,f.hC)();const n=document.documentElement.style;n.setProperty("--theme-color",t),n.setProperty("--theme-color-dark",a);let o=e.meta?.theme_color?.text_light||"#000000",r=e.meta?.theme_color?.text_dark||"#ffffff";n.setProperty("--theme-color-text",o),n.setProperty("--theme-color-text-dark",r),n.setProperty("--theme-color-hover",o+"33"),n.setProperty("--theme-color-hover-dark",r+"33")})),window.toast=f.gy,window.$=p(),h.Z.beforeEach((e=>{const t=(0,g.h)();return e.meta&&e.meta.requiresAuth&&t&&!t.user?(new f.FN("Please log in to access this page","default",1500,a(1121)),{path:"/",query:{redirect:e.fullPath}}):e.meta&&e.meta.requiresTeacher&&t.user&&!t.is_teacher?(new f.FN("You must be a teacher to access this page","default",1500,a(1121)),{path:"/portal"}):void 0}))},9218:function(e,t,a){"use strict";a.d(t,{Z:function(){return K}});var n=a(2483),o=a(3396);const r={class:"apphome hidescroll scrolloverflow"},s={class:"base fullheightcontent"};function i(e,t,a,n,i,l){const c=(0,o.up)("BaseNav"),u=(0,o.up)("router-view"),d=(0,o.up)("BaseFooter");return(0,o.wg)(),(0,o.iD)("main",r,[(0,o._)("main",s,[(0,o.Wm)(c),(0,o.Wm)(u,{class:"inner-base"})]),(0,o.Wm)(d)])}var l=a(7139);const c=e=>((0,o.dD)("data-v-2159cd36"),e=e(),(0,o.Cn)(),e),u=c((()=>(0,o._)("h1",{class:"gohome hideoverflow"},"MV Test Tracker",-1))),d=c((()=>(0,o._)("span",{class:"flex-spacer"},null,-1))),h={class:"base-pages-nav"},f=c((()=>(0,o._)("span",{class:"flex-spacer"},null,-1))),m={id:"nav-auth-btn",class:"small-action-btn auth-action can-logout can-login click-action"};function p(e,t,a,n,r,s){const i=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("header",null,[u,d,r.mobile&&!r.mobile_menu_open?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"nav-mobile-btn",onClick:t[0]||(t[0]=e=>r.mobile_menu_open=!r.mobile_menu_open)})):(0,o.kq)("",!0),!r.mobile||r.mobile_menu_open?((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,l.C_)(["nav-actions",{mobile:r.mobile}])},[r.mobile?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"nav-mobile-btn alt-btn",onClick:t[1]||(t[1]=e=>r.mobile_menu_open=!r.mobile_menu_open)})):(0,o.kq)("",!0),(0,o._)("nav",h,[(0,o.Wm)(i,{class:"click-action-inline",to:"/",onClick:s.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1},8,["onClick"]),(0,o.Wm)(i,{class:"click-action-inline",to:"/about",onClick:s.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("About")])),_:1},8,["onClick"]),(0,o.Wm)(i,{class:"click-action-inline",to:"/contact",onClick:s.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("Contact")])),_:1},8,["onClick"])]),f,(0,o._)("button",m," Log "+(0,l.zw)(s.logged_in?"Out":"In"),1)],2)):(0,o.kq)("",!0)])}var g=a(8980),_={name:"BaseNav",data(){return{mobile_menu_open:!1,mobile:window.innerWidth<=800}},methods:{resize(){this.mobile=window.innerWidth<=800,this.mobile||this.closeMenu()},closeMenu(){this.mobile_menu_open=!1}},mounted(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},computed:{store(){return(0,g.h)()},logged_in(){return!!this.store.user}}},v=a(89);const w=(0,v.Z)(_,[["render",p],["__scopeId","data-v-2159cd36"]]);var b=w;const k=e=>((0,o.dD)("data-v-94e483ee"),e=e(),(0,o.Cn)(),e),y=k((()=>(0,o._)("p",null,[(0,o._)("span",null,"© 2022-2023 MVHS Test Tracker. "),(0,o._)("span",null,[(0,o.Uk)("Website by "),(0,o._)("a",{href:"https://svonk.me/"},"Sander Vonk")])],-1))),C=[y];function A(e,t,a,n,r,s){return(0,o.wg)(),(0,o.iD)("footer",null,C)}var T={name:"BaseFooter"};const O=(0,v.Z)(T,[["render",A],["__scopeId","data-v-94e483ee"]]);var P=O,q={name:"AppHome",components:{BaseNav:b,BaseFooter:P}};const N=(0,v.Z)(q,[["render",i]]);var E=N;const F=e=>((0,o.dD)("data-v-22159f4a"),e=e(),(0,o.Cn)(),e),S={class:"not-found"},Z=F((()=>(0,o._)("h1",null,"404",-1))),x=F((()=>(0,o._)("h2",{class:"hideoverflow"},"Page Not Found",-1))),U=F((()=>(0,o._)("hr",{class:"err-break"},null,-1))),D=F((()=>(0,o._)("span",null," | ",-1))),L={key:1,class:"nostyle"},j=F((()=>(0,o._)("span",null," | ",-1))),J=F((()=>(0,o._)("div",{class:"err-pad-bottom"},null,-1)));function M(e,t,a,n,r,s){const i=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",S,[Z,x,U,(0,o._)("nav",null,[(0,o.Wm)(i,{class:"router-link click-action-inline",to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1}),D,s.logged_in?((0,o.wg)(),(0,o.j4)(i,{key:0,class:"router-link click-action-inline",to:"/portal"},{default:(0,o.w5)((()=>[(0,o.Uk)("Portal")])),_:1})):((0,o.wg)(),(0,o.iD)("span",L,[(0,o.Wm)(i,{class:"router-link click-action-inline",to:"/about"},{default:(0,o.w5)((()=>[(0,o.Uk)("About")])),_:1}),j,(0,o.Wm)(i,{class:"router-link click-action-inline",to:"/contact"},{default:(0,o.w5)((()=>[(0,o.Uk)("Contact")])),_:1})]))]),J])}var I={name:"NotFound",computed:{store(){return(0,g.h)()},logged_in(){return this.store.user}}};const W=(0,v.Z)(I,[["render",M],["__scopeId","data-v-22159f4a"]]);var B=W;const R=(0,n.p7)({history:(0,n.PO)("/"),routes:[{path:"/",name:"home",component:E,meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"",name:"home",component:()=>a.e(400).then(a.bind(a,400)),meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"about",name:"about",component:()=>a.e(29).then(a.bind(a,4029)),meta:{page_title:"About",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"download",name:"download",component:()=>a.e(208).then(a.bind(a,208)),meta:{page_title:"Download [BETA]",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"/:pathMatch(.*)*",name:"404",component:B,meta:{page_title:"404",theme_color:{light:"#ffffff",dark:"#16130e"}}}]},{path:"/portal",name:"portal",component:()=>a.e(192).then(a.bind(a,3192)),meta:{page_title:"Portal",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0},children:[{path:"/portal/onboarding",name:"onboarding",component:()=>a.e(277).then(a.bind(a,4277)),meta:{page_title:"Onboarding",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/add",name:"addclass",component:()=>a.e(364).then(a.bind(a,7364)),meta:{page_title:"Join a Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/create",name:"createclass",component:()=>a.e(72).then(a.bind(a,9072)),meta:{page_title:"Teacher | Create Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/new/:tasktype",name:"newtask",component:()=>a.e(371).then(a.bind(a,2371)),meta:{page_title:"Teacher | Add Task",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/task",name:"task",component:()=>a.e(984).then(a.bind(a,8371)),meta:{page_title:"View Test",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!1,props:e=>({task:e.query.task})}}]},{path:"/app",redirect:"/portal",meta:{requiresAuth:!0}}],parseQuery:e=>a(5410).parse(e)});var K=R},8980:function(e,t,a){"use strict";a.d(t,{h:function(){return g}});a(7658);var n=a(1020),o=a(1708),r=a(36),s=a(7795),i=a(7851),l=a(4466);const c={apiKey:"AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",authDomain:"mvtrack.firebaseapp.com",projectId:"mvtrack",storageBucket:"mvtrack.appspot.com",messagingSenderId:"1070634963357",appId:"1:1070634963357:web:2a4abc725fff24a5199f74",measurementId:"G-6LNX1KCR8E"},u=(0,s.ZF)(c),d=(0,i.v0)(u),h=(0,r.ad)(u);(0,l.IH)(u);d.onAuthStateChanged((e=>{const t=g();e?(t.set_user(e),(0,r.cf)((0,r.JU)(h,"users",e.uid),{includeMetadataChanges:!0},(e=>{e.metadata.hasPendingWrites?console.warn("local data updated"):(console.warn("remote data updated"),e.exists()?(t.doc=e.data(),t.get_classes()):t.create_doc())}))):t.clear()}));var f=a(9218);const m=new i.hJ;function p(e){return"mvla.net"==e.split("@")[1]}m.addScope("email"),m.addScope("profile"),d.useDeviceLanguage(),m.setCustomParameters({login_hint:"username@mvla.net",hd:"mvla.net"});const g=(0,n.Q_)({id:"main",state:()=>({user:null,doc:null,classes:[],loaded_email:null,loaded_classes:null,teacher:{doc_ref:null,collection_ref:null}}),getters:{userdoc_ref(){return this.user?(0,r.JU)(h,"users",this.user.uid):null},get_tasks(){let e=[],t=this.classes;if(!t?.length)return[];for(let a=0;a<t.length;a++){let n=t[a].tests;n=n||[];for(let o=0;o<n.length;o++){if(t[a].name=t[a].name?t[a].name:"Unnamed Class","string"==typeof n[o].date){let[e,t,a]=n[o].date.split("-");n[o].date=`${t}-${a}-${e}`,n[o].date=new Date(n[o].date),n[o].date=isNaN(n[o].date)?null:n[o].date}n[o].color=t[a].color,e.push({...n[o],class_name:t[a].name})}}return e},is_teacher(){if(!this.user)return!1;if(window?.MVTT_teacher_mode||localStorage&&localStorage.MVTT_teacher_mode)return console.warn("Teacher mode enabled (localStorage or window MVTT_teacher_mode value is true)\nFOR TESTING ONLY, does not enable nessesary server permission"),!0;if(this.doc&&this.doc.teacher_mode)return!0;let e=this.user.email,[t,a]=e.split("@");return"mvla.net"==a&&!/\d/.test(t)}},actions:{async get_classes(){if(this.doc.classes){let e=[...new Set(this.doc.classes)];e.length!=this.doc.classes.length&&(this.doc.classes=e,await this.update_remote(),new o.OO("Removed duplicate classes",2e3))}if(!this.doc)return[];let e=[];for(let t of this.doc.classes){let[a,n]=t.split("/");if(!a||!n){await this.remove_invalid(t);continue}let o=(0,r.JU)(h,"classes",a),s=await(0,r.QT)(o);if(!s.exists()){await this.remove_invalid(t);continue}let i=(0,r.hJ)(o,"classes");if(!i){await this.remove_invalid(t);continue}let l=(0,r.JU)(i,n),c=await(0,r.QT)(l);if(!c.exists()){await this.remove_invalid(t);continue}let u=c.data();u.id=t,e.push(u)}this.classes=e},async remove_invalid(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),new o.OO("Removed non-existent class with id "+e,2e3)},async remove_class(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),console.warn("Removed class from user's doc: "+e),new o.bF("Removed class",2e3)},set_user(e){if(!e.email||!p(e.email))return d.signOut(),new o.OO("Please use your MVLA email to log in",2e3),void this.clear();this.user=e,this.is_teacher&&(console.warn("teacher mode"),this.teacher.doc_ref=(0,r.JU)(h,"classes",this.user.email),this.teacher.collection_ref=(0,r.hJ)(this.teacher.doc_ref,"classes")),f.Z.currentRoute?.value?.query?.redirect&&f.Z.push(f.Z.currentRoute?.value?.query?.redirect)},clear(){this.user=null,this.doc=null,this.classes=[],this.loaded_email=null,this.loaded_classes=null,this.teacher={doc_ref:null,collection_ref:null},f.Z.currentRoute?.value?.meta?.requiresAuth&&f.Z.push("/")},async login(){new o.FN("Opening login popup...","default",1e3,a(1121));let e=navigator?.userAgent?.toLowerCase()?.indexOf(" electron/")>-1;await(e?(0,i.F6)(d,m):(0,i.rh)(d,m)).then((()=>{this.user&&this.user.email&&p(this.user.email)&&(new o.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),f.Z.currentRoute.value&&f.Z.currentRoute.value.query&&f.Z.currentRoute.value.query.redirect||f.Z.push("/portal"))})).catch((e=>{"auth/cancelled-popup-request"==e.code||"auth/popup-closed-by-user"==e.code?new o.OO((0,o.YY)(e),2e3):new o.PK("Couldn't log in",(0,o.YY)(e),2e3)}))},logout(){d.signOut(),new o.FN("Logged Out","default",1500,a(1121))},async get_remote(){let e=await(0,r.QT)(this.userdoc_ref);e.exists()?this.doc=e.data():(await this.create_doc(),await this.get_remote())},async create_doc(){new o.OO("User document doesn't exist, creating new one...",2e3),this.doc={name:this.user.displayName,email:this.user.email,classes:[]},this.is_teacher?(await this.create_teacher_doc(),new o.bF("Created user & teacher documents; Let's get started",2e3)):(await this.update_remote(),new o.bF("Created user document; Let's get started",2e3),f.Z.push("/portal/onboarding"))},async create_teacher_doc(){let e=(0,r.JU)(h,"classes",this.user.email);await(0,r.pl)(e,{name:this.user.displayName,email:this.user.email}),this.teacher={doc_ref:e,collection_ref:(0,r.hJ)(e,"classes")},f.Z.push("/portal/create")},async update_remote(){await(0,r.pl)(this.userdoc_ref,this.doc,{merge:!0})},async get_classes_by_email(e){if(this.loaded_email=null,!e||!p(e))return this.loaded_classes=null,void(this.loaded_email=e);let t=await(0,r.QT)((0,r.JU)(h,"classes",e));if(t.exists()){let t=[],a=(0,r.hJ)((0,r.JU)(h,"classes",e),"classes"),n=await(0,r.PL)((0,r.IO)(a));n.forEach((a=>{let n=a.data();n.id=a.id,this.doc.classes.includes([e,a.id].join("/"))&&(n.name="[JOINED] "+n.name,n.is_joined=!0),t.push(n)})),this.loaded_classes=t}else this.loaded_classes=null;this.loaded_email=e},async add_class(e,t,a){this.doc&&t&&(this.doc.classes.includes(t)||(this.doc.classes.push([e,t].join("/")),await this.update_remote(),new o.bF(`Added "${a}" to your classes`,2e3),f.Z.push("/portal")))},async create_class(e){if(console.warn("create_class",e),this.is_teacher)if(e.name)try{if(!this.teacher.doc_ref||!this.teacher.collection_ref)return await this.create_teacher_doc(),void await this.create_class(e);let t=await(0,r.ET)(this.teacher.collection_ref,e);new o.bF(`Created class "${e.name}"`,2e3),console.log("class_doc_ref",t),await this.add_class(this.user.email,t.id,e.name)}catch(t){console.error(t),new o.PK("Couldn't create class",(0,o.YY)(t),2e3)}else new o.PK("Please enter a class name",2e3);else new o.PK("You need to be a teacher to create a class",2e3)},async add_task(e,t){if(!e.name)return void new o.PK("Please enter a test name",2e3);if(!t||0==t.length)return void new o.PK("Please select at least one class",2e3);let a=(0,r.qs)(h),n=(0,r.hJ)(h,"classes"),s=(0,r.JU)(n,this.user.email),i=(0,r.hJ)(s,"classes");t.forEach((t=>{t=t.split("/")[t.split("/").length-1];let n=(0,r.JU)(i,t);a.update(n,{tests:(0,r.vr)(e)})})),await a.commit(),await this.get_classes(),new o.bF(`Added test "${e.name}" to ${t.length} class${1==t.length?"":"es"}`,2e3),f.Z.push("/portal")}}})},4654:function(){}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,n,o,r){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],r=e[u][2];for(var i=!0,l=0;l<n.length;l++)(!1&r||s>=r)&&Object.keys(a.O).every((function(e){return a.O[e](n[l])}))?n.splice(l--,1):(i=!1,r<s&&(s=r));if(i){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,o,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{29:"d3dd9da7",72:"031ab83c",192:"0d7f98ec",208:"e4d55caa",277:"04cafac2",364:"06a572e1",371:"305a1d68",400:"38bff73c",984:"0e929757"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{29:"22821ac8",72:"30b9bcc5",192:"1df17f4d",208:"85e27b48",371:"0f19f39a",400:"84bb0208",984:"c36f2533"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mvtime:";a.l=function(n,o,r,s){if(e[n])e[n].push(o);else{var i,l;if(void 0!==r)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+r){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+r),i.src=n),e[n]=[o];var h=function(t,a){i.onerror=i.onload=null,clearTimeout(f);var o=e[n];if(delete e[n],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(a)})),t)return t(a)},f=setTimeout(h.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=h.bind(null,i.onerror),i.onload=h.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var s=function(a){if(r.onerror=r.onload=null,"load"===a.type)n();else{var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=i,r.parentNode.removeChild(r),o(l)}};return r.onerror=r.onload=s,r.href=t,a?a.parentNode.insertBefore(r,a.nextSibling):document.head.appendChild(r),r},t=function(e,t){for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var o=a[n],r=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(r===e||r===t))return o}var s=document.getElementsByTagName("style");for(n=0;n<s.length;n++){o=s[n],r=o.getAttribute("data-href");if(r===e||r===t)return o}},n=function(n){return new Promise((function(o,r){var s=a.miniCssF(n),i=a.p+s;if(t(s,i))return o();e(n,i,null,o,r)}))},o={143:0};a.f.miniCss=function(e,t){var a={29:1,72:1,192:1,208:1,371:1,400:1,984:1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=n(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,n){var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var r=new Promise((function(a,n){o=e[t]=[a,n]}));n.push(o[2]=r);var s=a.p+a.u(t),i=new Error,l=function(n){if(a.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var r=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+s+")",i.name="ChunkLoadError",i.type=r,i.request=s,o[1](i)}};a.l(s,l,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,s=n[0],i=n[1],l=n[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(o in i)a.o(i,o)&&(a.m[o]=i[o]);if(l)var u=l(a)}for(t&&t(n);c<s.length;c++)r=s[c],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},n=self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(9983)}));n=a.O(n)})();
//# sourceMappingURL=app.40844149.js.map