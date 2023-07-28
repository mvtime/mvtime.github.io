(function(){var e={2745:function(e,t,a){"use strict";function o(e){const t=e.match(/^([\P{L}\p{Extended_Pictographic}]|(?:[\uD800-\uDBFF][\uDC00-\uDFFF]))/u);return t?t[0]:null}function n(){if(0==arguments.length)return;let e=Array.from(arguments),t=["%cMVTT","background:#272727;color:#C9B092;padding:7px 12px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.3em"];null!=o(e[0])&&(t[0]+=" %c"+o(e[0]),t[2]="background:#C9B092aa;background:#ffffffaa;color:#272727;padding:3px 5px;margin-left:5px;border-radius:5px;font-family:monospace !important;font-weight:bold;font-size:1.25em",e[0]=e[0].substring(2).trimStart());try{console.info(...t,...e)}catch(a){console.log(...t,...e)}}a.d(t,{E:function(){return n}})},4912:function(e,t,a){"use strict";a(7658);var o=a(9242),n=a(3396),r=a(1020);const s=["_theme"];function i(e,t,a,o,r,i){const l=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)("main",{id:"themed_body",class:"parent",_theme:i.theme},[(0,n.Wm)(l)],8,s)}var l=a(8980),c={name:"App",data(){return{platform:"",isElectron:!1}},computed:{pageTitle(){return document.title},store(){return(0,l.h)()},theme(){return this.store.get_theme}},mounted(){this.isElectron=navigator.userAgent.toLowerCase().indexOf(" electron/")>-1,this.isElectron&&(this.platform=this.$route.query.platform,!this.platform&&window.location.search&&(this.platform=window.location.search.split("=")[1]),console.log("Electron Platform: "+this.platform))},created(){const e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",t=localStorage.getItem("theme");this.isDarkMode="dark"===t||null===t&&"dark"===e}},u=a(89);const d=(0,u.Z)(c,[["render",i]]);var h=d,m=a(1599),f=a(1708),p=a(2745),g=a(7387),_=a.n(g),v=a(5431);(0,v.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var w=a(6112);const b=(0,r.WB)(),k=(0,o.ri)(h);k.use(m.Z),k.use(b),k.use(w.Z,{preLoad:2,attempt:1}),k.mount("#app"),(0,n.YP)(b.state,(e=>{localStorage.setItem("MVTT_app_state",JSON.stringify(e.main))}),{deep:!0}),window.addEventListener("storage",(e=>{"MVTT_teacher_mode"===e.key&&((0,p.E)("🏫 Detected teacher mode change, reloading"),window.location.reload())})),_()(document.body).on("click",".auth-action",(function(){const e=(0,l.h)();!e.user&&_()(this).hasClass("can-login")?e.login():_()(this).hasClass("can-logout")&&(_()(this).hasClass("doprompt")?new f.GI(["Log Out","Are you sure you want to log out?"],"default",1e4,a(4856),[["removePopup()","Cancel","secondary-action fullborder"],["removePopup()","Confirm","primary-action auth-action can-logout"]]):e.logout())})),_()(document.body).on("click",".gohome",(function(){m.Z.push("/")})),m.Z.afterEach((e=>{e.meta&&e.meta.page_title?document.title="MV Test Tracker | "+e.meta.page_title:document.title="MV Test Tracker";let t=e.meta?.theme_color?.light||"#f5c14b",a=e.meta?.theme_color?.dark||"#f5c14b";_()("meta.theme-color").attr("content",t),_()("meta.theme-color-dark").attr("content",a),(0,f.hC)();const o=document.documentElement.style;o.setProperty("--theme-color",t),o.setProperty("--theme-color-dark",a);let n=e.meta?.theme_color?.text_light||"#000000",r=e.meta?.theme_color?.text_dark||"#ffffff";o.setProperty("--theme-color-text",n),o.setProperty("--theme-color-text-dark",r),o.setProperty("--theme-color-hover",n+"33"),o.setProperty("--theme-color-hover-dark",r+"33")})),window.toast=f.gy,window.$=_(),m.Z.beforeEach((e=>{const t=(0,l.h)();return e.meta&&e.meta.requiresAuth&&t&&!t.user?(new f.FN("Please log in or join to access this page","default",1500,a(1121)),{path:"/",query:{redirect:e.fullPath}}):e.meta&&e.meta.requiresTeacher&&t.user&&!t.is_teacher?(new f.FN("You must be a teacher to access this page","default",1500,a(1121)),{path:"/portal"}):void 0})),window.toggle_teacher_mode=function(){"true"===localStorage.getItem("MVTT_teacher_mode")?localStorage.setItem("MVTT_teacher_mode","false"):localStorage.setItem("MVTT_teacher_mode","true"),window.location.reload()}},1599:function(e,t,a){"use strict";a.d(t,{Z:function(){return H}});var o=a(2483),n=a(3396);const r={class:"apphome hidescroll scrolloverflow"},s={class:"base fullheightcontent"};function i(e,t,a,o,i,l){const c=(0,n.up)("BaseNav"),u=(0,n.up)("router-view"),d=(0,n.up)("BaseFooter");return(0,n.wg)(),(0,n.iD)("main",r,[(0,n._)("main",s,[(0,n.Wm)(c),(0,n.Wm)(u,{class:"inner-base"})]),(0,n.Wm)(d)])}var l=a(7139);const c=e=>((0,n.dD)("data-v-3f557a88"),e=e(),(0,n.Cn)(),e),u=c((()=>(0,n._)("h1",{class:"gohome hideoverflow"},"MV Test Tracker",-1))),d=["_theme"],h=c((()=>(0,n._)("div",{class:"theme_icon"},null,-1))),m=c((()=>(0,n._)("div",{class:"toggle_text"},"Switch Theme",-1))),f=[h,m],p=c((()=>(0,n._)("span",{class:"flex_spacer"},null,-1))),g={class:"base-pages-nav"},_=c((()=>(0,n._)("span",{class:"flex_spacer"},null,-1))),v={id:"nav-auth-btn",class:"small-action-btn auth-action can-logout can-login click-action"};function w(e,t,a,o,r,s){const i=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("header",null,[u,(0,n._)("button",{_theme:s.store.get_theme,class:"theme_button",title:"Switch Theme",onClick:t[0]||(t[0]=(...e)=>s.store.toggle_theme&&s.store.toggle_theme(...e))},f,8,d),p,r.mobile&&!r.mobile_menu_open?((0,n.wg)(),(0,n.iD)("button",{key:0,class:"nav-mobile-btn",onClick:t[1]||(t[1]=e=>r.mobile_menu_open=!r.mobile_menu_open)})):(0,n.kq)("",!0),!r.mobile||r.mobile_menu_open?((0,n.wg)(),(0,n.iD)("div",{key:1,class:(0,l.C_)(["nav-actions",{mobile:r.mobile}])},[r.mobile?((0,n.wg)(),(0,n.iD)("button",{key:0,class:"nav-mobile-btn alt-btn",onClick:t[2]||(t[2]=e=>r.mobile_menu_open=!r.mobile_menu_open)})):(0,n.kq)("",!0),(0,n._)("nav",g,[(0,n.Wm)(i,{class:"click-action-inline",to:"/",onClick:s.closeMenu},{default:(0,n.w5)((()=>[(0,n.Uk)("Home")])),_:1},8,["onClick"]),(0,n.Wm)(i,{class:"click-action-inline",to:"/about",onClick:s.closeMenu},{default:(0,n.w5)((()=>[(0,n.Uk)("About")])),_:1},8,["onClick"]),(0,n.Wm)(i,{class:"click-action-inline",to:"/contact",onClick:s.closeMenu},{default:(0,n.w5)((()=>[(0,n.Uk)("Contact")])),_:1},8,["onClick"])]),_,(0,n._)("button",v," Log "+(0,l.zw)(s.logged_in?"Out":"In"),1)],2)):(0,n.kq)("",!0)])}var b=a(8980),k={name:"BaseNav",data(){return{mobile_menu_open:!1,mobile:window.innerWidth<=800}},methods:{resize(){this.mobile=window.innerWidth<=800,this.mobile||this.closeMenu()},closeMenu(){this.mobile_menu_open=!1}},mounted(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},computed:{store(){return(0,b.h)()},logged_in(){return!!this.store.user}}},y=a(89);const T=(0,y.Z)(k,[["render",w],["__scopeId","data-v-3f557a88"]]);var C=T;const S=e=>((0,n.dD)("data-v-94e483ee"),e=e(),(0,n.Cn)(),e),A=S((()=>(0,n._)("p",null,[(0,n._)("span",null,"© 2022-2023 MVHS Test Tracker. "),(0,n._)("span",null,[(0,n.Uk)("Website by "),(0,n._)("a",{href:"https://svonk.me/"},"Sander Vonk")])],-1))),E=[A];function O(e,t,a,o,r,s){return(0,n.wg)(),(0,n.iD)("footer",null,E)}var P={name:"BaseFooter"};const q=(0,y.Z)(P,[["render",O],["__scopeId","data-v-94e483ee"]]);var D=q,F={name:"AppHome",components:{BaseNav:C,BaseFooter:D}};const x=(0,y.Z)(F,[["render",i]]);var N=x;const I=e=>((0,n.dD)("data-v-22159f4a"),e=e(),(0,n.Cn)(),e),M={class:"not-found"},j=I((()=>(0,n._)("h1",null,"404",-1))),L=I((()=>(0,n._)("h2",{class:"hideoverflow"},"Page Not Found",-1))),Z=I((()=>(0,n._)("hr",{class:"err-break"},null,-1))),J=I((()=>(0,n._)("span",null," | ",-1))),U={key:1,class:"nostyle"},B=I((()=>(0,n._)("span",null," | ",-1))),V=I((()=>(0,n._)("div",{class:"err-pad-bottom"},null,-1)));function R(e,t,a,o,r,s){const i=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",M,[j,L,Z,(0,n._)("nav",null,[(0,n.Wm)(i,{class:"router-link click-action-inline",to:"/"},{default:(0,n.w5)((()=>[(0,n.Uk)("Home")])),_:1}),J,s.logged_in?((0,n.wg)(),(0,n.j4)(i,{key:0,class:"router-link click-action-inline",to:"/portal"},{default:(0,n.w5)((()=>[(0,n.Uk)("Portal")])),_:1})):((0,n.wg)(),(0,n.iD)("span",U,[(0,n.Wm)(i,{class:"router-link click-action-inline",to:"/about"},{default:(0,n.w5)((()=>[(0,n.Uk)("About")])),_:1}),B,(0,n.Wm)(i,{class:"router-link click-action-inline",to:"/contact"},{default:(0,n.w5)((()=>[(0,n.Uk)("Contact")])),_:1})]))]),V])}var W={name:"NotFound",computed:{store(){return(0,b.h)()},logged_in(){return this.store.user}}};const $=(0,y.Z)(W,[["render",R],["__scopeId","data-v-22159f4a"]]);var z=$;const K=(0,o.p7)({history:(0,o.PO)("/"),routes:[{path:"/",name:"home",component:N,meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"",name:"home",component:()=>a.e(950).then(a.bind(a,9950)),meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"join",name:"join",component:()=>a.e(582).then(a.bind(a,4582)),meta:{page_title:"Join the MVTT Beta",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1,block_close:!0,close_path:"/",blockStandardRedirect:!0}}]},{path:"about",name:"about",component:()=>a.e(29).then(a.bind(a,4029)),meta:{page_title:"About",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"download",name:"download",component:()=>a.e(208).then(a.bind(a,208)),meta:{page_title:"Download [BETA]",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"contact",name:"contact",component:()=>a.e(481).then(a.bind(a,3245)),meta:{page_title:"Contact",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"/:pathMatch(.*)*",name:"404",component:z,meta:{page_title:"404",theme_color:{light:"#ffffff",dark:"#16130e"}}}]},{path:"/portal",name:"portal",component:()=>a.e(890).then(a.bind(a,9890)),meta:{page_title:"Portal",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0},children:[{path:"/survey/daily",name:"daily",component:()=>a.e(756).then(a.bind(a,3756)),meta:{page_title:"Daily Check-In",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,block_close:!0,blockStandardRedirect:!0,noSurvey:!0}},{path:"/portal/onboarding",name:"onboarding",component:()=>a.e(774).then(a.bind(a,1774)),meta:{page_title:"Onboarding",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,noSurvey:!0}},{path:"/portal/add",name:"addclass",component:()=>a.e(75).then(a.bind(a,3075)),meta:{page_title:"Join a Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/create",name:"createclass",component:()=>a.e(623).then(a.bind(a,4623)),meta:{page_title:"Teacher | Create Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/new/:tasktype",name:"newtask",component:()=>a.e(382).then(a.bind(a,6382)),meta:{page_title:"Teacher | Add Task",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/task",name:"task",component:()=>a.e(766).then(a.bind(a,5766)),meta:{page_title:"View Test",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!1,props:e=>({task:e.query.task})}}]},{path:"/app",redirect:"/portal",meta:{requiresAuth:!0}}],parseQuery:e=>a(5410).parse(e)});var H=K},8980:function(e,t,a){"use strict";a.d(t,{h:function(){return v}});a(7658);var o=a(1020),n=a(2745),r=a(1708),s=a(4287),i=a(7795),l=a(6665),c=a(6781);const u={apiKey:"AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",authDomain:"mvtrack.firebaseapp.com",projectId:"mvtrack",storageBucket:"mvtrack.appspot.com",messagingSenderId:"1070634963357",appId:"1:1070634963357:web:2a4abc725fff24a5199f74",measurementId:"G-6LNX1KCR8E"},d=(0,i.ZF)(u),h=(0,l.v0)(d),m=(0,s.ad)(d);(0,c.IH)(d);h.onAuthStateChanged((e=>{const t=v();e?(t.set_user(e),(0,s.cf)((0,s.JU)(m,"users",e.uid),{includeMetadataChanges:!0},(e=>{(0,n.E)("⬥ Got snapshot from remote"),e.metadata.hasPendingWrites?(0,n.E)("⏷ Got changes from remote"):e.exists()?(t.doc=e.data(),t.get_classes()):t.create_doc()}))):t.clear()}));var f=a(1599);const p=new l.hJ;function g(e){return"mvla.net"==e.split("@")[1]}p.addScope("email"),p.addScope("profile"),h.useDeviceLanguage(),p.setCustomParameters({login_hint:"username@mvla.net",hd:"mvla.net"});let _=new Date;_=new Date(_.getTime()-60*_.getTimezoneOffset()*1e3),_=_.toISOString().split("T")[0];const v=(0,o.Q_)({id:"main",state:()=>{let e={};if(localStorage.getItem("MVTT_app_state")&&"undefined"!=localStorage.getItem("MVTT_app_state"))try{return(0,n.E)("↻ Loading state from local storage"),e=JSON.parse(localStorage.getItem("MVTT_app_state")),e}catch(t){console.error("⟳ Error parsing local storage state",t)}return(0,n.E)("🔨 Setting up store from scratch"),{user:null,doc:null,classes:[],loaded_email:null,loaded_classes:null,teacher:{doc_ref:null,collection_ref:null},theme:null}},getters:{get_theme(){let e=this.theme||localStorage.getItem("theme"),t=this.doc?.theme,a=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return t?(e!=t&&localStorage.setItem("theme",t),t||"light"):(e?a=e:localStorage.setItem("theme",a),this.doc&&(this.doc.theme=a,this.update_remote()),e||"light")},non_recent_signin(){if(!this.user)return!1;let e=this.user?.metadata?.lastSignInTime;if(!e)return!1;e=new Date(e),(0,n.E)("⏲️ Last signed-in: "+e.toLocaleString());let t=(new Date).getTime()-e.getTime();return t>864e5},recently_joined(){if(!this.user)return!1;let e=this.user?.metadata?.creationTime;if(!e)return!1;e=new Date(e);let t=(new Date).getTime()-e.getTime();return t<432e5},userdoc_ref(){return this.user?(0,s.JU)(m,"users",this.user.uid):null},get_tasks(){let e=[],t=this.classes;if(!t?.length)return[];for(let a=0;a<t.length;a++){let o=t[a].tasks;o=o||[];for(let n=0;n<o.length;n++){if(t[a].name=t[a].name?t[a].name:"Unnamed Class","string"==typeof o[n].date){let[e,t,a]=o[n].date.split("-");o[n].date=`${t}-${a}-${e}`,o[n].date=new Date(o[n].date),o[n].date=isNaN(o[n].date)?null:o[n].date}o[n].color=t[a].color,e.push({...o[n],class_name:t[a].name})}}return e},is_teacher(){if(!this.user)return!1;if("true"==window?.localStorage?.MVTT_teacher_mode)return(0,n.E)("🏫 Teacher mode enabled locally"),!0;let e=this.user.email,[t,a]=e.split("@");return"mvla.net"==a&&!/\d/.test(t)},done_daily_survey(){if(!this.doc)return!1;if(this.is_teacher)return!0;let e=this.doc.done_surveys?.includes(_);return e}},actions:{async save_join_form(e){this.doc.join_form=e,await this.update_remote()},async save_daily_survey(e){let t=(0,s.JU)(m,"survey","daily",_,this.user.uid),a={time:(new Date).getTime(),responses:e};await(0,s.pl)(t,a),this.doc.done_surveys=this.doc.done_surveys?this.doc.done_surveys:[],this.doc.done_surveys.push(_),await this.update_remote(),new r.bF("Saved daily survey",2e3)},async toggle_theme(){let e=this.theme||"light";this.theme="light"==e?"dark":"light",localStorage.setItem("theme",this.theme),this?.doc&&(this.doc.theme=this.theme,await this.update_remote()),new r.bF(`Switched to ${this.theme} theme`,2e3),this.get_theme},async get_classes(){if(this.doc.classes){let e=[...new Set(this.doc.classes)];e.length!=this.doc.classes.length&&(this.doc.classes=e,await this.update_remote(),new r.OO("Removed duplicate classes",2e3))}if(!this.doc)return[];let e=[];for(let t of this.doc.classes){let[a,o]=t.split("/");if(!a||!o){await this.remove_invalid(t);continue}let n=(0,s.JU)(m,"classes",a),r=await(0,s.QT)(n);if(!r.exists()){await this.remove_invalid(t);continue}let i=(0,s.hJ)(n,"classes");if(!i){await this.remove_invalid(t);continue}let l=(0,s.JU)(i,o),c=await(0,s.QT)(l);if(!c.exists()){await this.remove_invalid(t);continue}let u=c.data();u.id=t,e.push(u)}e.sort(((e,t)=>e.period==t.period?e.name.localeCompare(t.name):e.period-t.period)),this.classes=e},async remove_invalid(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),new r.OO(`Removed non-existent class "${e}"`,2e3)},async remove_class(e){this.doc.classes=this.doc.classes.filter((t=>t!=e)),await this.update_remote(),(0,n.E)("🗑️ Removed class from user's doc: "+e),new r.bF("Removed class",2e3)},set_user(e){if(!e.email||!g(e.email))return h.signOut(),new r.OO("Please use your MVLA email to log in",2e3),void this.clear();this.user=e,this.is_teacher&&((0,n.E)("🏫 Running in teacher mode"),this.teacher.doc_ref=(0,s.JU)(m,"classes",this.user.email),this.teacher.collection_ref=(0,s.hJ)(this.teacher.doc_ref,"classes")),f.Z.currentRoute?.value?.query?.redirect&&!f.Z.currentRoute?.value?.meta?.blockStandardRedirect&&f.Z.push(f.Z.currentRoute?.value?.query?.redirect)},clear(){this.user=null,this.doc=null,this.classes=[],this.loaded_email=null,this.loaded_classes=null,this.teacher={doc_ref:null,collection_ref:null},this.theme="light",f.Z.currentRoute?.value?.meta?.requiresAuth&&f.Z.push("/")},async login(){new r.FN("Opening login popup...","default",1e3,a(1121));let e=navigator?.userAgent?.toLowerCase()?.indexOf(" electron/")>-1;await(e?(0,l.F6)(h,p):(0,l.rh)(h,p)).then((()=>{if(this.user&&this.user.email&&g(this.user.email))return new r.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),f.Z.currentRoute?.value?.query?.redirect||f.Z.push("/portal"),Promise.resolve()})).catch((e=>{let t=(0,r.YY)(e);return"auth/cancelled-popup-request"==e.code||"auth/popup-closed-by-user"==e.code?new r.OO(t,2e3):new r.PK("Couldn't log in",t,2e3),Promise.reject(t)}))},logout(){h.signOut(),new r.FN("Logged Out","default",1500,a(1121))},async get_remote(){let e=await(0,s.QT)(this.userdoc_ref);e.exists()?this.doc=e.data():(await this.create_doc(),await this.get_remote())},async create_doc(){new r.OO("User document doesn't exist, creating new one...",2e3),this.doc={name:this.user.displayName,email:this.user.email,classes:[]},this.is_teacher?(await this.create_teacher_doc(),new r.bF("Created user & teacher documents; Let's get started",2e3)):(await this.update_remote(),new r.bF("Created user document; Let's get started",2e3),f.Z.push("/portal/onboarding"))},async create_teacher_doc(){let e=(0,s.JU)(m,"classes",this.user.email);await(0,s.pl)(e,{name:this.user.displayName,email:this.user.email}),this.teacher={doc_ref:e,collection_ref:(0,s.hJ)(e,"classes")},f.Z.push("/portal/create")},async update_remote(){await(0,s.pl)(this.userdoc_ref,this.doc,{merge:!0}),(0,n.E)("⏶ Pushed changes to remote")},async get_classes_by_email(e){if(this.loaded_email=null,!e||!g(e))return this.loaded_classes=null,void(this.loaded_email=e);let t=await(0,s.QT)((0,s.JU)(m,"classes",e));if(t.exists()){let t=[],a=(0,s.hJ)((0,s.JU)(m,"classes",e),"classes"),o=await(0,s.PL)((0,s.IO)(a));o.forEach((a=>{let o=a.data();o.id=a.id,this.doc.classes.includes([e,a.id].join("/"))&&(o.name="[JOINED] "+(o.period?"P"+o.period+" - ":"")+o.name,o.is_joined=!0),t.push(o)})),this.loaded_classes=t}else this.loaded_classes=null;this.loaded_email=e},async add_class(e,t,a,o){this.doc&&t&&(this.doc.classes.includes(t)||(this.doc.classes.push([e,t].join("/")),await this.update_remote(),new r.bF(`Added "P${o} - ${a}" to your classes`,2e3),f.Z.push("/portal")))},async create_class(e){if((0,n.E)("🔨 Creating class",e),this.is_teacher){if(e.name&&e.period)try{if(!this.teacher.doc_ref||!this.teacher.collection_ref)return await this.create_teacher_doc(),void await this.create_class(e);let t=await(0,s.ET)(this.teacher.collection_ref,e);new r.bF(`Created class "${e.name}"`,2e3),(0,n.E)("🏫 class_doc_ref",t),await this.add_class(this.user.email,t.id,e.name,e.period)}catch(t){console.error(t),new r.PK("Couldn't create class",(0,r.YY)(t),2e3)}}else new r.PK("You need to be a teacher to create a class",2e3)},async add_task(e,t){if(!e.name)return void new r.PK("Please enter a test name",2e3);if(!t||0==t.length)return void new r.PK("Please select at least one class",2e3);let a=(0,s.qs)(m),o=(0,s.hJ)(m,"classes"),n=(0,s.JU)(o,this.user.email),i=(0,s.hJ)(n,"classes");t.forEach((t=>{let o=t;t=t.split("/")[t.split("/").length-1];let n=(0,s.JU)(i,t);e.class_id=o,a.update(n,{tasks:(0,s.vr)(e)})})),await a.commit(),await this.get_classes(),new r.bF(`Added test "${e.name}" to ${t.length} class${1==t.length?"":"es"}`,2e3),f.Z.push("/portal")},async delete_task(e){let t=e.class_id,a=t.split("/")[t.split("/").length-1],o=(0,s.JU)(this.teacher.collection_ref,a),n={class_id:e.class_id,date:new Date(e.date).toISOString().split("T")[0],description:e.description,name:e.name,type:e.type};await(0,s.r7)(o,{tasks:(0,s.Ab)(n)}),await this.get_classes(),new r.bF(`Removed task "${e.name}"`,2e3),f.Z.push("/portal")}}})},4654:function(){}},t={};function a(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,o,n,r){if(!o){var s=1/0;for(u=0;u<e.length;u++){o=e[u][0],n=e[u][1],r=e[u][2];for(var i=!0,l=0;l<o.length;l++)(!1&r||s>=r)&&Object.keys(a.O).every((function(e){return a.O[e](o[l])}))?o.splice(l--,1):(i=!1,r<s&&(s=r));if(i){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[o,n,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,o){return a.f[o](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{29:"a3565ae5",75:"523d13c6",208:"c4f05a73",382:"3807ced7",481:"f1b206b6",582:"d6c6d63c",623:"5fc54a0c",756:"e10a6fa8",766:"29802968",774:"c02511c5",890:"37d87993",950:"f1abed2c"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{29:"22821ac8",208:"85e27b48",382:"4cf4f116",481:"b901e163",582:"b0a37cfa",623:"ff886aa2",756:"0e0b2473",766:"63f5fde6",890:"8db56af7",950:"fd070fdf"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mvtime:";a.l=function(o,n,r,s){if(e[o])e[o].push(n);else{var i,l;if(void 0!==r)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+r){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.setAttribute("data-webpack",t+r),i.src=o),e[o]=[n];var h=function(t,a){i.onerror=i.onload=null,clearTimeout(m);var n=e[o];if(delete e[o],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((function(e){return e(a)})),t)return t(a)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=h.bind(null,i.onerror),i.onload=h.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,o,n){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var s=function(a){if(r.onerror=r.onload=null,"load"===a.type)o();else{var s=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=s,l.request=i,r.parentNode&&r.parentNode.removeChild(r),n(l)}};return r.onerror=r.onload=s,r.href=t,a?a.parentNode.insertBefore(r,a.nextSibling):document.head.appendChild(r),r},t=function(e,t){for(var a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var n=a[o],r=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(r===e||r===t))return n}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){n=s[o],r=n.getAttribute("data-href");if(r===e||r===t)return n}},o=function(o){return new Promise((function(n,r){var s=a.miniCssF(o),i=a.p+s;if(t(s,i))return n();e(o,i,null,n,r)}))},n={143:0};a.f.miniCss=function(e,t){var a={29:1,208:1,382:1,481:1,582:1,623:1,756:1,766:1,890:1,950:1};n[e]?t.push(n[e]):0!==n[e]&&a[e]&&t.push(n[e]=o(e).then((function(){n[e]=0}),(function(t){throw delete n[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,o){var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var r=new Promise((function(a,o){n=e[t]=[a,o]}));o.push(n[2]=r);var s=a.p+a.u(t),i=new Error,l=function(o){if(a.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var r=o&&("load"===o.type?"missing":o.type),s=o&&o.target&&o.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+s+")",i.name="ChunkLoadError",i.type=r,i.request=s,n[1](i)}};a.l(s,l,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,r,s=o[0],i=o[1],l=o[2],c=0;if(s.some((function(t){return 0!==e[t]}))){for(n in i)a.o(i,n)&&(a.m[n]=i[n]);if(l)var u=l(a)}for(t&&t(o);c<s.length;c++)r=s[c],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},o=self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=a.O(void 0,[998],(function(){return a(4912)}));o=a.O(o)})();
//# sourceMappingURL=app.f7075ae1.js.map