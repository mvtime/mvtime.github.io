(function(){var e={2745:function(e,t,a){"use strict";function o(e){const t=e.match(/^([\P{L}\p{Extended_Pictographic}]|(?:[\uD800-\uDBFF][\uDC00-\uDFFF]))/u);return t?t[0]:null}function r(){if(0==arguments.length)return;let e=Array.from(arguments),t=["%cMVTT","background:#272727;color:#C9B092;padding:7px 12px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.3em"];null!=o(e[0])&&(t[0]+=" %c"+o(e[0]),t[2]="background:#C9B092aa;background:#ffffffaa;color:#272727;padding:3px 5px;margin-left:5px;border-radius:5px;font-family:monospace !important;font-weight:bold;font-size:1.25em",e[0]=e[0].substring(2).trimStart());try{console.info(...t,...e)}catch(a){console.log(...t,...e)}}a.d(t,{E:function(){return r}})},6473:function(e,t,a){"use strict";a(7658);var o=a(9242),r=a(3396),n=a(1020);const s=["_theme"];function i(e,t,a,o,n,i){const l=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)("main",{id:"themed_body",class:"parent",_theme:i.theme,onClick:t[0]||(t[0]=(...e)=>i.refreshTimeout&&i.refreshTimeout(...e)),onKeydown:t[1]||(t[1]=(...e)=>i.refreshTimeout&&i.refreshTimeout(...e)),onFocus:t[2]||(t[2]=(...e)=>i.refreshTimeout&&i.refreshTimeout(...e))},[(0,r.Wm)(l)],40,s)}var l=a(8980),c={name:"App",data(){return{platform:"",isElectron:!1}},computed:{pageTitle(){return document.title},store(){return(0,l.h)()},theme(){return this.store.get_theme}},mounted(){this.isElectron=navigator.userAgent.toLowerCase().indexOf(" electron/")>-1,this.isElectron&&(this.platform=this.$route.query.platform,!this.platform&&window.location.search&&(this.platform=window.location.search.split("=")[1]),console.log("Electron Platform: "+this.platform))},created(){const e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",t=localStorage.getItem("theme");this.isDarkMode="dark"===t||null===t&&"dark"===e},methods:{refreshTimeout(){this.store&&this.store.refresh_timeout()}}},u=a(89);const d=(0,u.Z)(c,[["render",i]]);var h=d,m=a(7220),f=a(1708),p=a(2745),g=a(7387),_=a.n(g),v=a(5431);(0,v.z)("/service-worker.js",{ready(){(0,p.E)("🛠 App is being served from cache by a service worker. For more details, visit https://goo.gl/AFskqB")},registered(){(0,p.E)("🛠 Service worker has been registered.")},cached(){(0,p.E)("🛠 Content has been cached for offline use.")},updatefound(){(0,p.E)("🛠 New content is downloading.")},updated(){(0,p.E)("🛠 New content is available; please refresh.")},offline(){(0,p.E)("🛠 No internet connection found. App is running in offline mode.")},error(e){(0,p.E)("🛑 Error during service worker registration:",e)}});var w=a(6112);const b=(0,n.WB)(),k=(0,o.ri)(h);k.use(m.Z),k.use(b),k.use(w.Z,{preLoad:2,attempt:1}),k.mount("#app"),(0,r.YP)(b.state,(e=>{localStorage.setItem("MVTT_app_state",JSON.stringify(e.main))}),{deep:!0}),window.addEventListener("storage",(e=>{"MVTT_teacher_mode"===e.key&&((0,p.E)("🏫 Detected teacher mode change, reloading"),window.location.reload())})),_()(document.body).on("click",".auth-action",(function(){const e=(0,l.h)();!e.user&&_()(this).hasClass("can-login")?e.login():_()(this).hasClass("can-logout")&&(_()(this).hasClass("doprompt")?new f.GI(["Log Out","Are you sure you want to log out?"],"default",1e4,a(4856),[["removePopup()","Cancel","secondary-action fullborder"],["removePopup()","Confirm","primary-action auth-action can-logout"]]):e.logout())})),_()(document.body).on("click",".gohome",(function(){m.Z.push("/")})),m.Z.afterEach((e=>{e.meta&&e.meta.page_title?document.title="MV Test Tracker | "+e.meta.page_title:document.title="MV Test Tracker";let t=e.meta?.theme_color?.light||"#f5c14b",a=e.meta?.theme_color?.dark||"#f5c14b";_()("meta.theme-color").attr("content",t),_()("meta.theme-color-dark").attr("content",a),(0,f.hC)();const o=document.documentElement.style;o.setProperty("--theme-color",t),o.setProperty("--theme-color-dark",a);let r=e.meta?.theme_color?.text_light||"#000000",n=e.meta?.theme_color?.text_dark||"#ffffff";o.setProperty("--theme-color-text",r),o.setProperty("--theme-color-text-dark",n),o.setProperty("--theme-color-hover",r+"33"),o.setProperty("--theme-color-hover-dark",n+"33")})),window.toast=f.gy,window.$=_(),m.Z.beforeEach((e=>{const t=(0,l.h)();return e.meta&&e.meta.requiresAuth&&t&&!t.user?(new f.FN("Please log in or join to access this page","default",1500,a(1121)),{path:"/",query:{redirect:e.fullPath}}):e.meta&&e.meta.requiresTeacher&&t.user&&!t.is_teacher?(new f.FN("You must be a teacher to access this page","default",1500,a(1121)),{path:"/portal"}):void 0})),window.toggle_teacher_mode=function(){"true"===localStorage.getItem("MVTT_teacher_mode")?localStorage.setItem("MVTT_teacher_mode","false"):localStorage.setItem("MVTT_teacher_mode","true"),window.location.reload()}},7220:function(e,t,a){"use strict";a.d(t,{Z:function(){return H}});var o=a(2483),r=a(3396);const n={class:"apphome hidescroll scrolloverflow"},s={class:"base fullheightcontent"};function i(e,t,a,o,i,l){const c=(0,r.up)("BaseNav"),u=(0,r.up)("router-view"),d=(0,r.up)("BaseFooter");return(0,r.wg)(),(0,r.iD)("main",n,[(0,r._)("main",s,[(0,r.Wm)(c),(0,r.Wm)(u,{class:"inner-base"})]),(0,r.Wm)(d)])}var l=a(7139);const c=e=>((0,r.dD)("data-v-3f557a88"),e=e(),(0,r.Cn)(),e),u=c((()=>(0,r._)("h1",{class:"gohome hideoverflow"},"MV Test Tracker",-1))),d=["_theme"],h=c((()=>(0,r._)("div",{class:"theme_icon"},null,-1))),m=c((()=>(0,r._)("div",{class:"toggle_text"},"Switch Theme",-1))),f=[h,m],p=c((()=>(0,r._)("span",{class:"flex_spacer"},null,-1))),g={class:"base-pages-nav"},_=c((()=>(0,r._)("span",{class:"flex_spacer"},null,-1))),v={id:"nav-auth-btn",class:"small-action-btn auth-action can-logout can-login click-action"};function w(e,t,a,o,n,s){const i=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("header",null,[u,(0,r._)("button",{_theme:s.store.get_theme,class:"theme_button",title:"Switch Theme",onClick:t[0]||(t[0]=(...e)=>s.store.toggle_theme&&s.store.toggle_theme(...e))},f,8,d),p,n.mobile&&!n.mobile_menu_open?((0,r.wg)(),(0,r.iD)("button",{key:0,class:"nav-mobile-btn",onClick:t[1]||(t[1]=e=>n.mobile_menu_open=!n.mobile_menu_open)})):(0,r.kq)("",!0),!n.mobile||n.mobile_menu_open?((0,r.wg)(),(0,r.iD)("div",{key:1,class:(0,l.C_)(["nav-actions",{mobile:n.mobile}])},[n.mobile?((0,r.wg)(),(0,r.iD)("button",{key:0,class:"nav-mobile-btn alt-btn",onClick:t[2]||(t[2]=e=>n.mobile_menu_open=!n.mobile_menu_open)})):(0,r.kq)("",!0),(0,r._)("nav",g,[(0,r.Wm)(i,{class:"click-action-inline",to:"/",onClick:s.closeMenu},{default:(0,r.w5)((()=>[(0,r.Uk)("Home")])),_:1},8,["onClick"]),(0,r.Wm)(i,{class:"click-action-inline",to:"/about",onClick:s.closeMenu},{default:(0,r.w5)((()=>[(0,r.Uk)("About")])),_:1},8,["onClick"]),(0,r.Wm)(i,{class:"click-action-inline",to:"/contact",onClick:s.closeMenu},{default:(0,r.w5)((()=>[(0,r.Uk)("Contact")])),_:1},8,["onClick"])]),_,(0,r._)("button",v," Log "+(0,l.zw)(s.logged_in?"Out":"In"),1)],2)):(0,r.kq)("",!0)])}var b=a(8980),k={name:"BaseNav",data(){return{mobile_menu_open:!1,mobile:window.innerWidth<=800}},methods:{resize(){this.mobile=window.innerWidth<=800,this.mobile||this.closeMenu()},closeMenu(){this.mobile_menu_open=!1}},mounted(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},computed:{store(){return(0,b.h)()},logged_in(){return!!this.store.user}}},y=a(89);const T=(0,y.Z)(k,[["render",w],["__scopeId","data-v-3f557a88"]]);var C=T;const E=e=>((0,r.dD)("data-v-94e483ee"),e=e(),(0,r.Cn)(),e),S=E((()=>(0,r._)("p",null,[(0,r._)("span",null,"© 2022-2023 MVHS Test Tracker. "),(0,r._)("span",null,[(0,r.Uk)("Website by "),(0,r._)("a",{href:"https://svonk.me/"},"Sander Vonk")])],-1))),P=[S];function A(e,t,a,o,n,s){return(0,r.wg)(),(0,r.iD)("footer",null,P)}var O={name:"BaseFooter"};const q=(0,y.Z)(O,[["render",A],["__scopeId","data-v-94e483ee"]]);var D=q,x={name:"AppHome",components:{BaseNav:C,BaseFooter:D}};const F=(0,y.Z)(x,[["render",i]]);var I=F;const N=e=>((0,r.dD)("data-v-f34b6ee6"),e=e(),(0,r.Cn)(),e),M={class:"not-found"},L=N((()=>(0,r._)("h1",{class:"title_text err_text"},"404",-1))),j=N((()=>(0,r._)("h2",{class:"header_style err_text hideoverflow"},"Page Not Found",-1))),Z=N((()=>(0,r._)("hr",{class:"err-break"},null,-1))),J=N((()=>(0,r._)("span",null," | ",-1))),U={key:1,class:"nostyle"},R=N((()=>(0,r._)("span",null," | ",-1))),$=N((()=>(0,r._)("div",{class:"err-pad-bottom"},null,-1)));function V(e,t,a,o,n,s){const i=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",M,[L,j,Z,(0,r._)("nav",null,[(0,r.Wm)(i,{class:"router-link click-action-inline",to:"/"},{default:(0,r.w5)((()=>[(0,r.Uk)("Home")])),_:1}),J,s.logged_in?((0,r.wg)(),(0,r.j4)(i,{key:0,class:"router-link click-action-inline",to:"/portal"},{default:(0,r.w5)((()=>[(0,r.Uk)("Portal")])),_:1})):((0,r.wg)(),(0,r.iD)("span",U,[(0,r.Wm)(i,{class:"router-link click-action-inline",to:"/about"},{default:(0,r.w5)((()=>[(0,r.Uk)("About")])),_:1}),R,(0,r.Wm)(i,{class:"router-link click-action-inline",to:"/contact"},{default:(0,r.w5)((()=>[(0,r.Uk)("Contact")])),_:1})]))]),$])}var B={name:"NotFound",computed:{store(){return(0,b.h)()},logged_in(){return this.store.user}}};const W=(0,y.Z)(B,[["render",V],["__scopeId","data-v-f34b6ee6"]]);var z=W;const K=(0,o.p7)({history:(0,o.PO)("/"),routes:[{path:"/",name:"home",component:I,meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"",name:"home",component:()=>a.e(903).then(a.bind(a,2903)),meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"join",name:"join",component:()=>a.e(637).then(a.bind(a,3637)),meta:{page_title:"Join the MVTT Beta",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1,block_close:!0,close_path:"/",blockStandardRedirect:!0}}]},{path:"about",name:"about",component:()=>a.e(208).then(a.bind(a,8208)),meta:{page_title:"About",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"roadmap",name:"roadmap",component:()=>a.e(676).then(a.bind(a,2676)),meta:{page_title:"Development Roadmap",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"contact",name:"contact",component:()=>a.e(481).then(a.bind(a,3245)),meta:{page_title:"Contact",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"/:pathMatch(.*)*",name:"404",component:z,meta:{page_title:"404",theme_color:{light:"#ffffff",dark:"#16130e"}}}]},{path:"/portal",name:"portal",component:()=>a.e(899).then(a.bind(a,2899)),meta:{page_title:"Portal",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0},children:[{path:"/survey/daily",name:"daily",component:()=>a.e(832).then(a.bind(a,1832)),meta:{page_title:"Daily Check-In",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,block_close:!0,blockStandardRedirect:!0,noSurvey:!0}},{path:"/portal/onboarding",name:"onboarding",component:()=>a.e(860).then(a.bind(a,4860)),meta:{page_title:"Onboarding",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,noSurvey:!0}},{path:"/portal/add",name:"addclass",component:()=>a.e(486).then(a.bind(a,9486)),meta:{page_title:"Join a Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/create",name:"createclass",component:()=>a.e(751).then(a.bind(a,2751)),meta:{page_title:"Teacher | Create Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/new/:tasktype",name:"newtask",component:()=>a.e(302).then(a.bind(a,7302)),meta:{page_title:"Teacher | Add Task",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/task",name:"task",component:()=>a.e(632).then(a.bind(a,632)),meta:{page_title:"View Test",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!1,props:e=>({task:e.query.task})}}]},{path:"/app",redirect:"/portal",meta:{requiresAuth:!0}}],parseQuery:e=>a(5410).parse(e)});var H=K},8980:function(e,t,a){"use strict";a.d(t,{h:function(){return P}});a(7658);var o=a(1020),r=a(2745),n=a(1708),s=a(4287),i=a(7795),l=a(6665),c=a(6781);const u={apiKey:"AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",authDomain:"mvtrack.firebaseapp.com",projectId:"mvtrack",storageBucket:"mvtrack.appspot.com",messagingSenderId:"1070634963357",appId:"1:1070634963357:web:2a4abc725fff24a5199f74",measurementId:"G-6LNX1KCR8E"},d=(0,i.ZF)(u),h=(0,l.v0)(d),m=(0,s.ad)(d);(0,c.IH)(d);let f;h.onAuthStateChanged((e=>{_(e)}));let p,g=!1;function _(e){const t=P();e?(t.set_user(e),w(),v(e,t),p=k()):t.clear()}function v(e){const t=P();f=(0,s.cf)((0,s.JU)(m,"users",e.uid),{includeMetadataChanges:!0},(e=>{(0,r.E)("⬥ Got snapshot from remote"),e.metadata.hasPendingWrites?(0,r.E)("⏷ Got changes from remote"):e.exists()?(t.doc=e.data(),t.get_classes()):t.create_doc()}),(e=>{(0,r.E)("⚠ Error getting snapshot from remote",e)})),g=!0}function w(){clearTimeout(p),f&&(f(),(0,r.E)("⬥ Unsubscribed from remote changes")),g=!1}function b(e){const t=Math.floor(e/1e3/60),a=Math.floor(e/1e3%60);return(t||!a?`${t} minute${1!=t?"s":""}`:"")+(a?`${a} second${1!=a?"s":""}`:"")}function k(e=12e4){return setTimeout((()=>{(0,r.E)(`⬥ Page unused for ${b(e)}, removing onSnapshot listener`),w()}),e)}function y(e){const t=P();g||(v(t.user,t),(0,r.E)("⬥ Resubscribed to remote changes")),clearTimeout(p),p=k(e)}var T=a(7220);const C=new l.hJ;function E(e){return"mvla.net"==e.split("@")[1]}C.addScope("email"),C.addScope("profile"),h.useDeviceLanguage(),C.setCustomParameters({login_hint:"username@mvla.net",hd:"mvla.net"});let S=new Date;S=new Date(S.getTime()-60*S.getTimezoneOffset()*1e3),S=S.toISOString().split("T")[0];const P=(0,o.Q_)({id:"main",state:()=>{let e={};if(localStorage.getItem("MVTT_app_state")&&"undefined"!=localStorage.getItem("MVTT_app_state"))try{return(0,r.E)("↻ Loading state from local storage"),e=JSON.parse(localStorage.getItem("MVTT_app_state")),e}catch(t){console.error("⟳ Error parsing local storage state",t)}return(0,r.E)("🔨 Setting up store from scratch"),{user:null,doc:null,classes:[],loaded_email:null,loaded_classes:null,teacher:{doc_ref:null,collection_ref:null},theme:null}},getters:{get_theme(){let e=this.theme||localStorage.getItem("theme"),t=this.doc?.theme,a=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return t?(e!=t&&localStorage.setItem("theme",t),t||"light"):(e?a=e:localStorage.setItem("theme",a),this.doc&&(this.doc.theme=a,this.update_remote()),e||"light")},non_recent_signin(){if(!this.user)return!1;let e=this.user?.metadata?.lastSignInTime;if(!e)return!1;e=new Date(e),(0,r.E)("⏲️ Last signed-in: "+e.toLocaleString());let t=(new Date).getTime()-e.getTime();return t>864e5},recently_joined(){if(!this.user)return!1;let e=this.user?.metadata?.creationTime;if(!e)return!1;e=new Date(e);let t=(new Date).getTime()-e.getTime();return t<432e5},userdoc_ref(){return this.user?(0,s.JU)(m,"users",this.user.uid):null},get_tasks(){let e=[],t=this.classes;if(!t?.length)return[];for(let a=0;a<t.length;a++){let o=t[a].tasks;o=o||[];for(let r=0;r<o.length;r++){if(t[a].name=t[a].name?t[a].name:"Unnamed Class","string"==typeof o[r].date){let[e,t,a]=o[r].date.split("-");o[r].date=`${t}-${a}-${e}`,o[r].date=new Date(o[r].date),o[r].date=isNaN(o[r].date)?null:o[r].date}o[r].color=t[a].color,e.push({...o[r],class_name:t[a].name})}}return e},is_teacher(){if(!this.user)return!1;if("true"==window?.localStorage?.MVTT_teacher_mode)return(0,r.E)("🏫 Teacher mode enabled locally"),!0;let e=this.user.email,[t,a]=e.split("@");return"mvla.net"==a&&!/\d/.test(t)},done_daily_survey(){if(!this.doc)return!1;if(this.is_teacher)return!0;let e=this.doc.done_surveys?.includes(S);return e}},actions:{refresh_timeout(e){this.user&&y(e)},async userLoginPromise(){return new Promise((e=>{let t=setInterval((()=>{this.user&&(clearInterval(t),e())}),100)}))},async save_join_form(e){this.doc.join_form=e,await this.update_remote()},async save_daily_survey(e){let t=(0,s.JU)(m,"survey","daily",S,this.user.uid),a={time:(new Date).getTime(),responses:e};await(0,s.pl)(t,a),this.user||await this.userLoginPromise(),this.doc.done_surveys=this.doc?.done_surveys?this.doc.done_surveys:[],this.doc.done_surveys.push(S),await this.update_remote(),new n.bF("Saved daily survey",2e3)},async toggle_theme(){this.theme="light"==this.get_theme?"dark":"light",localStorage.setItem("theme",this.theme),this?.doc&&(this.doc.theme=this.theme,await this.update_remote()),new n.bF(`Switched to ${this.theme} theme`,2e3),this.get_theme},async get_classes(){if(this.doc.classes){let e=[...new Set(this.doc.classes)];e.length!=this.doc.classes.length&&(this.doc.classes=e,await this.update_remote(),new n.OO("Removed duplicate classes",2e3))}if(!this.doc)return[];let e=[];for(let t of this.doc.classes){let[a,o]=t.split("/");if(!a||!o){await this.remove_invalid(t);continue}let r=(0,s.JU)(m,"classes",a),n=await(0,s.QT)(r);if(!n.exists()){await this.remove_invalid(t);continue}let i=(0,s.hJ)(r,"classes");if(!i){await this.remove_invalid(t);continue}let l=(0,s.JU)(i,o),c=await(0,s.QT)(l);if(!c.exists()){await this.remove_invalid(t);continue}let u=c.data();u.id=t,e.push(u)}e.sort(((e,t)=>e.period==t.period?e.name.localeCompare(t.name):e.period-t.period)),this.classes=e},async remove_invalid(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),new n.OO(`Removed non-existent class "${e}"`,2e3)},async remove_class(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),(0,r.E)("🗑️ Removed class from user's doc: "+e),new n.bF("Removed class",2e3)},set_user(e){if(!e.email||!E(e.email))return h.signOut(),new n.OO("Please use your MVLA email to log in",2e3),void this.clear();this.user=e,this.is_teacher&&((0,r.E)("🏫 Running in teacher mode"),this.teacher.doc_ref=(0,s.JU)(m,"classes",this.user.email),this.teacher.collection_ref=(0,s.hJ)(this.teacher.doc_ref,"classes")),T.Z.currentRoute?.value?.query?.redirect&&!T.Z.currentRoute?.value?.meta?.blockStandardRedirect&&T.Z.push(T.Z.currentRoute?.value?.query?.redirect)},clear(){this.user=null,this.doc=null,this.classes=[],this.loaded_email=null,this.loaded_classes=null,this.teacher={doc_ref:null,collection_ref:null},this.theme="light",T.Z.currentRoute?.value?.meta?.requiresAuth&&T.Z.push("/")},async login(){new n.FN("Opening login popup...","default",1e3,a(1121));let e=navigator?.userAgent?.toLowerCase()?.indexOf(" electron/")>-1;await(e?(0,l.F6)(h,C):(0,l.rh)(h,C)).then((()=>{if(this.user&&this.user.email&&E(this.user.email))return new n.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),(0,r.E)("🔑 Logged in as "+this.user.displayName),_(this.user),T.Z.currentRoute?.value?.query?.redirect||T.Z.currentRoute?.value?.meta?.blockStandardRedirect||T.Z.push("/portal"),Promise.resolve()})).catch((e=>{let t=(0,n.YY)(e);return"auth/cancelled-popup-request"==e.code||"auth/popup-closed-by-user"==e.code?new n.OO(t,2e3):new n.PK("Couldn't log in",t,2e3),Promise.reject(t)}))},logout(){h.signOut(),new n.FN("Logged Out","default",1500,a(1121))},async get_remote(){let e=await(0,s.QT)(this.userdoc_ref);e.exists()?this.doc=e.data():(await this.create_doc(),await this.get_remote())},async create_doc(){new n.OO("User document doesn't exist, creating new one...",2e3),this.doc={name:this.user.displayName,email:this.user.email,classes:[],theme:this.get_theme},this.is_teacher?(await this.create_teacher_doc(),new n.bF("Created user & teacher documents; Let's get started",2e3)):(await this.update_remote(),new n.bF("Created user document; Let's get started",2e3),T.Z.push("/portal/onboarding"))},async create_teacher_doc(){let e=(0,s.JU)(m,"classes",this.user.email);await(0,s.pl)(e,{name:this.user.displayName,email:this.user.email}),this.teacher={doc_ref:e,collection_ref:(0,s.hJ)(e,"classes")},T.Z.push("/portal/create")},async update_remote(){await(0,s.pl)(this.userdoc_ref,this.doc,{merge:!0}),(0,r.E)("⏶ Pushed changes to remote")},async get_classes_by_email(e){if(this.loaded_email=null,!e||!E(e))return this.loaded_classes=null,void(this.loaded_email=e);let t=await(0,s.QT)((0,s.JU)(m,"classes",e));if(t.exists()){let t=[],a=(0,s.hJ)((0,s.JU)(m,"classes",e),"classes"),o=await(0,s.PL)((0,s.IO)(a));o.forEach((a=>{let o=a.data();o.id=a.id,this.doc.classes.includes([e,a.id].join("/"))&&(o.name="[JOINED] "+(o.period?"P"+o.period+" - ":"")+o.name,o.is_joined=!0),t.push(o)})),this.loaded_classes=t}else this.loaded_classes=null;this.loaded_email=e},async add_class(e,t,a,o){this.doc&&t&&(this.doc.classes.includes(t)||(this.doc.classes.push([e,t].join("/")),await this.update_remote(),new n.bF(`Added "P${o} - ${a}" to your classes`,2e3),T.Z.push("/portal")))},async create_class(e){if((0,r.E)("🔨 Creating class",e),this.is_teacher){if(e.name&&e.period)try{if(!this.teacher.doc_ref||!this.teacher.collection_ref)return await this.create_teacher_doc(),void await this.create_class(e);let t=await(0,s.ET)(this.teacher.collection_ref,e);new n.bF(`Created class "${e.name}"`,2e3),(0,r.E)("🏫 class_doc_ref",t),await this.add_class(this.user.email,t.id,e.name,e.period)}catch(t){console.error(t),new n.PK("Couldn't create class",(0,n.YY)(t),2e3)}}else new n.PK("You need to be a teacher to create a class",2e3)},async add_task(e,t){if(!e.name)return void new n.PK("Please enter a test name",2e3);if(!t||0==t.length)return void new n.PK("Please select at least one class",2e3);let a=(0,s.qs)(m),o=(0,s.hJ)(m,"classes"),r=(0,s.JU)(o,this.user.email),i=(0,s.hJ)(r,"classes");t.forEach((t=>{let o=t;t=t.split("/")[t.split("/").length-1];let r=(0,s.JU)(i,t);e.class_id=o,a.update(r,{tasks:(0,s.vr)(e)})})),await a.commit(),await this.get_classes(),new n.bF(`Added test "${e.name}" to ${t.length} class${1==t.length?"":"es"}`,2e3),T.Z.push("/portal")},async delete_task(e){let t=e.class_id,a=t.split("/")[t.split("/").length-1],o=(0,s.JU)(this.teacher.collection_ref,a),r={class_id:e.class_id,date:new Date(e.date).toISOString().split("T")[0],description:e.description,name:e.name,type:e.type};await(0,s.r7)(o,{tasks:(0,s.Ab)(r)}),await this.get_classes(),new n.bF(`Removed task "${e.name}"`,2e3),T.Z.push("/portal")}}})},4654:function(){}},t={};function a(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,a),n.exports}a.m=e,function(){var e=[];a.O=function(t,o,r,n){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],r=e[u][1],n=e[u][2];for(var i=!0,l=0;l<o.length;l++)(!1&n||s>=n)&&Object.keys(a.O).every((function(e){return a.O[e](o[l])}))?o.splice(l--,1):(i=!1,n<s&&(s=n));if(i){e.splice(u--,1);var c=r();void 0!==c&&(t=c)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[o,r,n]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,o){return a.f[o](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{208:"2fd87f96",302:"7dcac5bc",481:"f1b206b6",486:"030fd77b",632:"97b1084e",637:"b08e6b33",676:"63bf6912",751:"482063ab",832:"ddba1e63",860:"3e500108",899:"793599d0",903:"514afad8"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{208:"418bde1e",302:"521497e3",481:"b901e163",632:"0922939f",637:"b6620a73",676:"fe34aca6",751:"b844b2df",832:"0a695c79",899:"b546550e",903:"91909a46"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mvtime:";a.l=function(o,r,n,s){if(e[o])e[o].push(r);else{var i,l;if(void 0!==n)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+n){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+n),i.src=o),e[o]=[r];var h=function(t,a){i.onerror=i.onload=null,clearTimeout(m);var r=e[o];if(delete e[o],i.parentNode&&i.parentNode.removeChild(i),r&&r.forEach((function(e){return e(a)})),t)return t(a)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=h.bind(null,i.onerror),i.onload=h.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,o,r){var n=document.createElement("link");n.rel="stylesheet",n.type="text/css";var s=function(a){if(n.onerror=n.onload=null,"load"===a.type)o();else{var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=i,n.parentNode&&n.parentNode.removeChild(n),r(l)}};return n.onerror=n.onload=s,n.href=t,a?a.parentNode.insertBefore(n,a.nextSibling):document.head.appendChild(n),n},t=function(e,t){for(var a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var r=a[o],n=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(n===e||n===t))return r}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){r=s[o],n=r.getAttribute("data-href");if(n===e||n===t)return r}},o=function(o){return new Promise((function(r,n){var s=a.miniCssF(o),i=a.p+s;if(t(s,i))return r();e(o,i,null,r,n)}))},r={143:0};a.f.miniCss=function(e,t){var a={208:1,302:1,481:1,632:1,637:1,676:1,751:1,832:1,899:1,903:1};r[e]?t.push(r[e]):0!==r[e]&&a[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,o){var r=a.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var n=new Promise((function(a,o){r=e[t]=[a,o]}));o.push(r[2]=n);var s=a.p+a.u(t),i=new Error,l=function(o){if(a.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var n=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;i.message="Loading chunk "+t+" failed.\n("+n+": "+s+")",i.name="ChunkLoadError",i.type=n,i.request=s,r[1](i)}};a.l(s,l,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,n,s=o[0],i=o[1],l=o[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(r in i)a.o(i,r)&&(a.m[r]=i[r]);if(l)var u=l(a)}for(t&&t(o);c<s.length;c++)n=s[c],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(u)},o=self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=a.O(void 0,[998],(function(){return a(6473)}));o=a.O(o)})();
//# sourceMappingURL=app.737c6594.js.map