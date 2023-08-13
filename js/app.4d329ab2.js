(function(){var e={2745:function(e,t,a){"use strict";function o(e){const t=e.match(/^([\P{L}\p{Extended_Pictographic}]|(?:[\uD800-\uDBFF][\uDC00-\uDFFF]))/u);return t?t[0]:null}function n(){if(0==arguments.length)return;let e=Array.from(arguments),t=["%cMVTT","background:#272727;color:#C9B092;padding:7px 12px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.3em"];null!=o(e[0])&&(t[0]+=" %c"+o(e[0]),t[2]="background:#C9B092aa;background:#ffffffaa;color:#272727;padding:3px 5px;margin-left:5px;border-radius:5px;font-family:monospace !important;font-weight:bold;font-size:1.25em",e[0]=e[0].substring(2).trimStart());try{console.info(...t,...e)}catch(a){console.log(...t,...e)}}a.d(t,{E:function(){return n}})},451:function(e,t,a){"use strict";a(7658);var o=a(9242),n=a(3396),r=a(1020);const i=["_theme"];function s(e,t,a,o,r,s){const c=(0,n.up)("router-view");return(0,n.wg)(),(0,n.iD)("main",{id:"themed_body",class:"parent",_theme:s.theme,onClick:t[0]||(t[0]=(...e)=>s.refreshTimeout&&s.refreshTimeout(...e)),onKeydown:t[1]||(t[1]=(...e)=>s.refreshTimeout&&s.refreshTimeout(...e)),onFocus:t[2]||(t[2]=(...e)=>s.refreshTimeout&&s.refreshTimeout(...e))},[(0,n.Wm)(c)],40,i)}var c=a(8980),l={name:"App",data(){return{platform:"",isElectron:!1}},computed:{pageTitle(){return document.title},store(){return(0,c.h)()},theme(){return this.store.get_theme}},mounted(){this.isElectron=navigator.userAgent.toLowerCase().indexOf(" electron/")>-1,this.isElectron&&(this.platform=this.$route.query.platform,!this.platform&&window.location.search&&(this.platform=window.location.search.split("=")[1]),console.log("Electron Platform: "+this.platform))},created(){const e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",t=localStorage.getItem("theme");this.isDarkMode="dark"===t||null===t&&"dark"===e},methods:{refreshTimeout(){this.store&&this.store.refresh_timeout()}}},u=a(89);const d=(0,u.Z)(l,[["render",s]]);var h=d,m=a(262),f=a(1708),_=a(2745),p=a(7387),g=a.n(p),v=a(5431);(0,v.z)("/service-worker.js",{ready(){(0,_.E)("🛠 App is being served from cache by a service worker. For more details, visit https://goo.gl/AFskqB")},registered(){(0,_.E)("🛠 Service worker has been registered.")},cached(){(0,_.E)("🛠 Content has been cached for offline use.")},updatefound(){(0,_.E)("🛠 New content is downloading.")},updated(){(0,_.E)("🛠 New content is available; please refresh."),localStorage.clear(),window.location.reload(!0)},offline(){(0,_.E)("🛠 No internet connection found. App is running in offline mode.")},error(e){(0,_.E)("🛑 Error during service worker registration:",e)}});var w=a(6112);const k=(0,r.WB)(),y=(0,o.ri)(h);y.use(m.Z),y.use(k),y.use(w.Z,{preLoad:2,attempt:1}),y.mount("#app"),(0,n.YP)(k.state,(e=>{localStorage.setItem("MVTT_app_state",JSON.stringify(e.main))}),{deep:!0}),window.addEventListener("storage",(e=>{"MVTT_teacher_mode"===e.key&&((0,_.E)("🏫 Detected teacher mode change, reloading"),window.location.reload())})),g()(document.body).on("click",".auth-action",(function(){const e=(0,c.h)();!e.user&&g()(this).hasClass("can-login")?e.login():g()(this).hasClass("can-logout")&&(g()(this).hasClass("doprompt")?new f.GI(["Log Out","Are you sure you want to log out?"],"default",1e4,a(4856),[["removePopup()","Cancel","secondary-action fullborder"],["removePopup()","Confirm","primary-action auth-action can-logout"]]):e.logout())})),g()(document.body).on("click",".gohome",(function(){m.Z.push("/")})),m.Z.afterEach((e=>{e.meta&&e.meta.page_title?document.title="MV Test Tracker | "+e.meta.page_title:document.title="MV Test Tracker";let t=e.meta?.theme_color?.light||"#f5c14b",a=e.meta?.theme_color?.dark||"#f5c14b";g()("meta.theme-color").attr("content",t),g()("meta.theme-color-dark").attr("content",a),(0,f.hC)();const o=document.documentElement.style;o.setProperty("--theme-color",t),o.setProperty("--theme-color-dark",a);let n=e.meta?.theme_color?.text_light||"#000000",r=e.meta?.theme_color?.text_dark||"#ffffff";o.setProperty("--theme-color-text",n),o.setProperty("--theme-color-text-dark",r),o.setProperty("--theme-color-hover",n+"33"),o.setProperty("--theme-color-hover-dark",r+"33")})),window.toast=f.gy,window.$=g(),m.Z.beforeEach((e=>{const t=(0,c.h)();return e.meta&&e.meta.requiresAuth&&t&&!t.user?(new f.FN("Please log in or join to access this page","default",1500,a(1121)),{path:"/",query:{redirect:e.fullPath}}):e.meta&&e.meta.requiresTeacher&&t.user&&!t.is_teacher?(new f.FN("You must be a teacher to access this page","default",1500,a(1121)),{path:"/portal"}):void 0})),window.toggle_teacher_mode=function(){"true"===localStorage.getItem("MVTT_teacher_mode")?localStorage.setItem("MVTT_teacher_mode","false"):localStorage.setItem("MVTT_teacher_mode","true"),window.location.reload()},window.test_onboarding=function(){m.Z.push({name:"onboarding",query:{redirect:"/settings"}})}},262:function(e,t,a){"use strict";a.d(t,{Z:function(){return Q}});var o=a(2483),n=a(3396);const r={class:"apphome hidescroll scrolloverflow"},i={class:"base fullheightcontent"};function s(e,t,a,o,s,c){const l=(0,n.up)("BaseNav"),u=(0,n.up)("router-view"),d=(0,n.up)("BaseFooter");return(0,n.wg)(),(0,n.iD)("main",r,[(0,n._)("main",i,[(0,n.Wm)(l),(0,n.Wm)(u,{class:"inner-base"})]),(0,n.Wm)(d)])}var c=a(7139);const l=e=>((0,n.dD)("data-v-254f2d7d"),e=e(),(0,n.Cn)(),e),u=l((()=>(0,n._)("h1",{class:"gohome hideoverflow"},"MV Test Tracker",-1))),d=["_theme"],h=l((()=>(0,n._)("div",{class:"theme_icon"},null,-1))),m=l((()=>(0,n._)("div",{class:"toggle_text"},"Switch Theme",-1))),f=[h,m],_=l((()=>(0,n._)("span",{class:"flex_spacer"},null,-1))),p={class:"base-pages-nav"},g=l((()=>(0,n._)("span",{class:"flex_spacer"},null,-1)));function v(e,t,a,o,r,i){const s=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("header",null,[u,(0,n._)("button",{_theme:i.store.get_theme,class:"theme_button",title:"Switch Theme",onClick:t[0]||(t[0]=(...e)=>i.store.toggle_theme&&i.store.toggle_theme(...e))},f,8,d),_,r.mobile&&!r.mobile_menu_open?((0,n.wg)(),(0,n.iD)("button",{key:0,class:"nav-mobile-btn",onClick:t[1]||(t[1]=e=>r.mobile_menu_open=!r.mobile_menu_open)})):(0,n.kq)("",!0),!r.mobile||r.mobile_menu_open?((0,n.wg)(),(0,n.iD)("div",{key:1,class:(0,c.C_)(["nav-actions",{mobile:r.mobile}])},[r.mobile?((0,n.wg)(),(0,n.iD)("button",{key:0,class:"nav-mobile-btn alt-btn",onClick:t[2]||(t[2]=e=>r.mobile_menu_open=!r.mobile_menu_open)})):(0,n.kq)("",!0),(0,n._)("nav",p,[(0,n.Wm)(s,{class:"click-action-inline",to:"/",onClick:i.closeMenu},{default:(0,n.w5)((()=>[(0,n.Uk)("Home")])),_:1},8,["onClick"]),(0,n.Wm)(s,{class:"click-action-inline",to:"/about",onClick:i.closeMenu},{default:(0,n.w5)((()=>[(0,n.Uk)("About")])),_:1},8,["onClick"]),(0,n.Wm)(s,{class:"click-action-inline",to:"/contact",onClick:i.closeMenu},{default:(0,n.w5)((()=>[(0,n.Uk)("Contact")])),_:1},8,["onClick"])]),g,(0,n._)("button",{id:"nav-auth-btn",class:(0,c.C_)(["small-action-btn auth-action can-logout can-login click-action",{linked:i.store.personal_account&&i.store.user}])}," Log "+(0,c.zw)(i.logged_in?"Out":"In"),3)],2)):(0,n.kq)("",!0)])}var w=a(8980),k={name:"BaseNav",data(){return{mobile_menu_open:!1,mobile:window.innerWidth<=800}},methods:{resize(){this.mobile=window.innerWidth<=800,this.mobile||this.closeMenu()},closeMenu(){this.mobile_menu_open=!1}},mounted(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},computed:{store(){return(0,w.h)()},logged_in(){return!!this.store.user}}},y=a(89);const b=(0,y.Z)(k,[["render",v],["__scopeId","data-v-254f2d7d"]]);var T=b;const P=e=>((0,n.dD)("data-v-94e483ee"),e=e(),(0,n.Cn)(),e),E=P((()=>(0,n._)("p",null,[(0,n._)("span",null,"© 2022-2023 MVHS Test Tracker. "),(0,n._)("span",null,[(0,n.Uk)("Website by "),(0,n._)("a",{href:"https://svonk.me/"},"Sander Vonk")])],-1))),C=[E];function S(e,t,a,o,r,i){return(0,n.wg)(),(0,n.iD)("footer",null,C)}var O={name:"BaseFooter"};const A=(0,y.Z)(O,[["render",S],["__scopeId","data-v-94e483ee"]]);var j=A,x={name:"AppHome",components:{BaseNav:T,BaseFooter:j}};const q=(0,y.Z)(x,[["render",s]]);var N=q;const F=e=>((0,n.dD)("data-v-f34b6ee6"),e=e(),(0,n.Cn)(),e),D={class:"not-found"},L=F((()=>(0,n._)("h1",{class:"title_text err_text"},"404",-1))),M=F((()=>(0,n._)("h2",{class:"header_style err_text hideoverflow"},"Page Not Found",-1))),I=F((()=>(0,n._)("hr",{class:"err-break"},null,-1))),J=F((()=>(0,n._)("span",null," | ",-1))),U={key:1,class:"nostyle"},Z=F((()=>(0,n._)("span",null," | ",-1))),$=F((()=>(0,n._)("div",{class:"err-pad-bottom"},null,-1)));function V(e,t,a,o,r,i){const s=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",D,[L,M,I,(0,n._)("nav",null,[(0,n.Wm)(s,{class:"router-link click-action-inline",to:"/"},{default:(0,n.w5)((()=>[(0,n.Uk)("Home")])),_:1}),J,i.logged_in?((0,n.wg)(),(0,n.j4)(s,{key:0,class:"router-link click-action-inline",to:"/portal"},{default:(0,n.w5)((()=>[(0,n.Uk)("Portal")])),_:1})):((0,n.wg)(),(0,n.iD)("span",U,[(0,n.Wm)(s,{class:"router-link click-action-inline",to:"/about"},{default:(0,n.w5)((()=>[(0,n.Uk)("About")])),_:1}),Z,(0,n.Wm)(s,{class:"router-link click-action-inline",to:"/contact"},{default:(0,n.w5)((()=>[(0,n.Uk)("Contact")])),_:1})]))]),$])}var R={name:"NotFound",computed:{store(){return(0,w.h)()},logged_in(){return this.store.user}}};const B=(0,y.Z)(R,[["render",V],["__scopeId","data-v-f34b6ee6"]]);var W=B;const K=(0,o.p7)({history:(0,o.PO)("/"),routes:[{path:"/",name:"home",component:N,meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"",name:"home",component:()=>a.e(989).then(a.bind(a,6989)),meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"join",name:"join",component:()=>a.e(877).then(a.bind(a,877)),meta:{page_title:"Join the MVTT Beta",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1,block_close:!0,close_path:"/",blockStandardRedirect:!0}},{path:"link/:code?",name:"link",component:()=>Promise.all([a.e(529),a.e(86)]).then(a.bind(a,7086)),props:!0,meta:{page_title:"Link Personal Account",theme_color:{light:"#ffffff",dark:"#16130e"},close_path:"/",blockStandardRedirect:!0}}]},{path:"about",name:"about",component:()=>a.e(371).then(a.bind(a,7371)),meta:{page_title:"About",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"legal/privacy",name:"privacy",component:()=>a.e(524).then(a.bind(a,9524)),meta:{page_title:"Legal - Privacy Policy",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"legal/tos",name:"tos",component:()=>a.e(12).then(a.bind(a,6012)),meta:{page_title:"Legal - Terms of Service",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"download",name:"download",component:()=>a.e(504).then(a.bind(a,6504)),meta:{page_title:"Download [BETA]",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"roadmap",name:"roadmap",component:()=>a.e(676).then(a.bind(a,2676)),meta:{page_title:"Development Roadmap",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"contact",name:"contact",component:()=>a.e(481).then(a.bind(a,3245)),meta:{page_title:"Contact",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"/:pathMatch(.*)*",name:"404",component:W,meta:{page_title:"404",theme_color:{light:"#ffffff",dark:"#16130e"}}}]},{path:"/portal",name:"portal",component:()=>a.e(391).then(a.bind(a,7391)),meta:{page_title:"Portal",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0},children:[{path:"/survey/daily",name:"daily",component:()=>Promise.all([a.e(529),a.e(923)]).then(a.bind(a,923)),meta:{page_title:"Daily Check-In",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,block_close:!0,blockStandardRedirect:!0,noSurvey:!0}},{path:"/settings",name:"settings",component:()=>a.e(868).then(a.bind(a,9868)),meta:{page_title:"Settings",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,noSurvey:!0}},{path:"/portal/onboarding",name:"onboarding",component:()=>a.e(7).then(a.bind(a,7)),meta:{page_title:"Onboarding",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,block_close:!0,noSurvey:!0}},{path:"/portal/add",name:"addclass",component:()=>a.e(750).then(a.bind(a,9750)),meta:{page_title:"Join a Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/create",name:"createclass",component:()=>a.e(478).then(a.bind(a,2478)),meta:{page_title:"Teacher | Create Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/new/:tasktype",name:"newtask",component:()=>a.e(717).then(a.bind(a,1717)),meta:{page_title:"Teacher | Add Task",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/task/:ref?",name:"task",component:()=>Promise.all([a.e(529),a.e(396)]).then(a.bind(a,621)),meta:{page_title:"View Test",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!1,props:e=>({ref:e.params.ref})}}]},{path:"/app",redirect:"/portal",meta:{requiresAuth:!0}}],parseQuery:e=>a(5410).parse(e)});var Q=K},8980:function(e,t,a){"use strict";a.d(t,{h:function(){return A}});a(7658);var o=a(1020),n=a(2745),r=a(1708),i=a(4287),s=a(7795),c=a(6665),l=a(6781);const u={apiKey:"AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",authDomain:"auth.mvtt.app",projectId:"mvtrack",storageBucket:"mvtrack.appspot.com",messagingSenderId:"1070634963357",appId:"1:1070634963357:web:2a4abc725fff24a5199f74",measurementId:"G-6LNX1KCR8E"},d=(0,s.ZF)(u),h=(0,c.v0)(d),m=(0,i.ad)(d);(0,l.IH)(d);let f;h.onAuthStateChanged((e=>{g(e)}));let _,p=!1;function g(e){const t=A();if(e){if(t.set_user(e),w(),!t.user)return;v(e.uid),_=y()}else t.clear()}function v(e){const t=A();f=(0,i.cf)((0,i.JU)(m,"users",e),{includeMetadataChanges:!0},(e=>{if(e.metadata.hasPendingWrites)return void(0,n.E)("⬥ Got snapshot from local changes");if((0,n.E)("⏷ Got snapshot from remote"),!e.exists())return void t.create_doc();let a=e.data();t.user&&t.user?.uid==a.id?t.account_doc=a:t.linked_account_doc=a,t.fetch_classes()}),(e=>{(0,n.E)("⚠ Error getting snapshot from remote",e)})),p=!0}function w(){clearTimeout(_),f&&(f(),(0,n.E)("⬥ Unsubscribed from remote changes")),p=!1}function k(e){const t=Math.floor(e/1e3/60),a=Math.floor(e/1e3%60);return(t||!a?`${t} minute${1!=t?"s":""}`:"")+(a?`${a} second${1!=a?"s":""}`:"")}function y(e=3e5){return setTimeout((()=>{(0,n.E)(`⬥ Page unused for ${k(e)}, removing onSnapshot listener`),w()}),e)}function b(e){const t=A();p||(v(t.personal_account?t.account_doc.linked_to:t.user.uid),(0,n.E)("⬥ Resubscribed to remote changes")),clearTimeout(_),_=y(e)}var T=a(262);const P=new c.hJ,E=navigator?.userAgent?.toLowerCase()?.indexOf(" electron/")>-1;function C(e){return"mvla.net"==e.split("@")[1]}function S(){try{return window.self!==window.top}catch(e){return!0}}P.addScope("email"),P.addScope("profile"),h.useDeviceLanguage(),P.setCustomParameters({login_hint:"username@mvla.net"});let O=new Date;O=new Date(O.getTime()-60*O.getTimezoneOffset()*1e3),O=O.toISOString().split("T")[0];const A=(0,o.Q_)({id:"main",state:()=>{let e={};if(localStorage.getItem("MVTT_app_state")&&"undefined"!=localStorage.getItem("MVTT_app_state")&&"null"!=localStorage.getItem("MVTT_app_state"))try{return(0,n.E)("↻ Loading state from local storage"),e=JSON.parse(localStorage.getItem("MVTT_app_state")),e}catch(t){(0,n.E)("⟳ Error parsing local storage state",t)}return(0,n.E)("🔨 Setting up store from scratch"),{user:null,account_doc:null,linked_account_doc:null,classes:[],tasks:[],loaded_email:null,loaded_classes:null,teacher:{doc_ref:null,collection_ref:null},theme:null,personal_account:!1}},getters:{linked_accounts(){return this.user&&this.active_doc&&this.active_doc.linked||[]},non_recent_signin(){if(!this.user)return!1;let e=this.user?.metadata?.lastSignInTime;if(!e)return!1;e=new Date(e),(0,n.E)("⏲️ Last signed-in: "+e.toLocaleString());let t=(new Date).getTime()-e.getTime();return t>864e5},recently_joined(){if(!this.user)return!1;let e=this.user?.metadata?.creationTime;if(!e)return!1;e=new Date(e);let t=(new Date).getTime()-e.getTime();return t<432e5},is_teacher(){if(!this.user)return!1;if("true"==window?.localStorage?.MVTT_teacher_mode)return this.personal_account?((0,n.E)("🏫 Personal account, overriding local teacher mode"),!1):((0,n.E)("🏫 Teacher mode enabled locally"),!0);let e=this.user.email,[t,a]=e.split("@");return"mvla.net"==a&&!/\d/.test(t)},done_daily_survey(){return!!this.active_doc&&(!!this.is_teacher||this.active_doc.done_surveys?.includes(O))},done_join_form(){return!!this.user&&!!this.active_doc?.join_form},account_ref(){return this.user?(0,i.JU)(m,"users",this.user.uid):null},linked_account_ref(){return this.user&&this.account_doc&&this.account_doc.linked_to?(0,i.JU)(m,"users",this.account_doc.linked_to):null},active_ref(){return this.personal_account?this.linked_account_ref:this.account_ref},active_doc(){return this.personal_account?this.linked_account_doc:this.account_doc},get_theme(){let e=this.theme||localStorage.getItem("theme"),t=this.account_doc?.theme,a=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return t?(e!=t&&localStorage.setItem("theme",t),t||"light"):(e?a=e:localStorage.setItem("theme",a),this.account_doc&&(this.account_doc.theme=a,this.update_remote()),e||"light")}},actions:{async get_tasks(){try{if(!this.classes?.length)return Promise.resolve([]);let e=[],t=this.classes;for(let a=0;a<t.length;a++){let o=t[a].tasks;o=o||[];for(let n=0;n<o.length;n++){if(t[a].name=t[a].name?t[a].name:"Unnamed Class","string"==typeof o[n].date){o[n].date=o[n].date.split("T")[0];let[e,t,a]=o[n].date.split("-");o[n].date=`${t}-${a}-${e}`,o[n].date=new Date(o[n].date),o[n].date=isNaN(o[n].date)?null:o[n].date}o[n].color=t[a].color,e.push({...o[n],class_name:t[a].name})}}return this.tasks=e,Promise.resolve(e)}catch(e){return Promise.reject(e)}},clear(){this.user=null,this.account_doc=null,this.linked_account_doc=null,this.classes=[],this.tasks=[],this.loaded_email=null,this.loaded_classes=null,this.personal_account=!1,this.teacher={doc_ref:null,collection_ref:null},localStorage.removeItem("MVTT_app_state"),T.Z.currentRoute?.value?.meta?.requiresAuth&&T.Z.push("/")},set_active(e){e&&(this.personal_account?this.linked_account_doc=e:this.account_doc=e)},async doc_from_uid(e){try{if(!e)throw"No account uid provided";let t=await(0,i.QT)((0,i.JU)(m,"users",e));if(!t.exists())throw"Account doesn't exist or you haven't been added yet";let a=t.data();return Promise.resolve(a)}catch(t){return(0,n.E)("🔗 Couldn't get linking account's document",t),Promise.reject(t)}},async link_account_uid(e){if(e)if(this.personal_account)try{let t=await this.doc_from_uid(e);if(!t)throw"Account doesn't exist or you haven't been invited";this.account_doc.linked_to=e,await this.update_remote(),new r.bF(`Successfully linked to ${t.name}'s account!`,4e3)}catch(t){return new r.PK("Couldn't link account",t,2e3),Promise.reject(t)}else new r.OO("This account is a primary account and cannot be linked",3e3)},async invite_linked(e){if(!this.user||!this.active_doc)return;if(this.personal_account&&new r.OO("This account is already linked!",2e3),!e||C(e)||!e.includes("@"))return void new r.OO("Please enter a valid non-mvla email",2e3);if(this.linked_accounts.includes(e))return void new r.OO("That account is already linked",2e3);this.active_doc.linked||(this.personal_account?this.linked_account_doc.linked=[]:this.account_doc.linked=[]);let t=(0,i.hJ)(m,"mail");try{let a=await(0,i.ET)(t,{to:e,cc:this.user.email,from:`${this.active_doc.name} via MV Test Tracker <mail@mvtt.app>`,fromname:this.active_doc.name+" via MV Test Tracker",template:{name:"link_invite",data:{sender_name:this.active_doc.name.split(" ")[0],sender_uid:this.user.uid}}}),o=(0,i.JU)(t,a.id),s=await(0,i.QT)(o),c=1;while(!s.exists()||0==!!s.data()?.delivery?.attempts&&c<=3)await new Promise((e=>setTimeout(e,2e3*(2^c)))),s=await(0,i.QT)(o),c++;if(!s.data()?.delivery?.info?.accepted?.includes(e)||0==s.data()?.delivery?.attempts)throw(0,n.E)("📧 Email failed to send",s.data()),"Email failed to send";return this.personal_account?this.linked_account_doc.linked.push(e):this.account_doc.linked.push(e),await this.update_remote(),new r.bF(`We notified ${e}, you'll receive a copy of the email too!`,4e3),Promise.resolve()}catch(a){return new r.PK(`Couldn't invite "${e}"`,a,2e3),Promise.reject(a)}},async uninvite_linked(e){try{if(!this.user)return;if(this.active_doc.linked.includes(e)){let t=this.active_doc.linked.filter((t=>t!=e));this.personal_account?this.linked_account_doc.linked=t:this.account_doc.linked=t,await this.update_remote(),new r.bF(`Removed ${e} from your linked accounts`,2e3)}else new r.OO(`${e} is not linked to this account`,2e3);Promise.resolve()}catch(t){return new r.PK(`Couldn't unlink "${e}"`,t,2e3),Promise.reject(t)}},refresh_timeout(e){this.user&&b(e)},async login_promise(){return new Promise((e=>{let t=setInterval((()=>{this.user&&(clearInterval(t),e(this.user))}),100)}))},async save_join_form(e){try{if(!this.user||!this.active_doc)throw"No doc to save join form to";return this.personal_account?(this.linked_account_doc=this.linked_account_doc||{},this.linked_account_doc.join_form=e):(this.account_doc=this.account_doc||{},this.account_doc.join_form=e),await this.update_remote(),Promise.resolve()}catch(t){return Promise.reject(t)}},async save_daily_survey(e){try{this.user||await this.login_promise();let t=(0,i.JU)(m,"survey","daily",O,this.user.uid),a={time:(new Date).getTime(),responses:e};await(0,i.pl)(t,a);let o=this.active_doc?.done_surveys?this.active_doc.done_surveys:[];return o.push(O),this.personal_account?this.linked_account_doc.done_surveys=o:this.account_doc.done_surveys=o,await this.update_remote(),new r.bF("Saved daily survey",2e3),Promise.resolve()}catch(t){return new r.PK("Couldn't save daily survey",t,2e3),Promise.reject(t)}},async toggle_theme(){this.theme="light"==this.get_theme?"dark":"light",localStorage.setItem("theme",this.theme),this?.account_doc&&(this.account_doc.theme=this.theme,await this.update_remote()),new r.bF(`Switched to ${this.theme} theme`,2e3),this.get_theme},async remove_class_id_helper(e){let t=this.active_doc.classes.filter((t=>t!=e));this.personal_account?this.linked_account_doc.classes=t:this.account_doc.classes=t,await this.update_remote()},async remove_invalid(e){await this.remove_class_id_helper(e),new r.OO(`Removed non-existent class "${e}"`,2e3)},async remove_class(e){await this.remove_class_id_helper(e),(0,n.E)("🗑️ Removed class from user's doc: "+e),new r.bF("Removed class",2e3)},set_user(e){(0,i.QT)((0,i.JU)(m,"users",e.uid)).then((t=>{if(t.exists()?(this.account_doc=t.data(),this.personal_account=this.account_doc?.personal_account):(this.account_doc=null,this.linked_account_doc=null,this.personal_account=!1),!e.email||!C(e.email)&&!this.personal_account&&(!this.account_doc?.personal_account||!this.account_doc?.linked_to))return h.signOut(),new r.OO("Please use your MVLA email to log in, or use an account that has been linked",4e3),void this.clear();this.user=e,this.personal_account&&this.get_remote(),this.is_teacher&&((0,n.E)("🏫 Running in teacher mode"),this.teacher.doc_ref=(0,i.JU)(m,"classes",this.user.email),this.teacher.collection_ref=(0,i.hJ)(this.teacher.doc_ref,"classes")),T.Z.currentRoute?.value?.query?.redirect&&!T.Z.currentRoute?.value?.meta?.blockStandardRedirect&&T.Z.replace(T.Z.currentRoute?.value?.query?.redirect)})).catch((e=>{h.signOut(),new r.OO("Something went wrong loading your user data",2e3),(0,n.E)("🔥 Error loading user data: "+e)}))},async login(){new r.FN("Opening login popup...","default",1e3,a(1121)),await(E||S()?(0,c.F6)(h,P):(0,c.rh)(h,P)).then((()=>{if(this.user&&this.user.email&&C(this.user.email))return new r.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),(0,n.E)("🔑 Logged in as "+this.user.displayName),g(this.user),T.Z.currentRoute?.value?.query?.redirect||T.Z.currentRoute?.value?.meta?.blockStandardRedirect||T.Z.push("/portal"),Promise.resolve()})).catch((e=>{let t=(0,r.YY)(e);return"auth/cancelled-popup-request"==e.code||"auth/popup-closed-by-user"==e.code||"auth/user-cancelled"==e.code?new r.OO(t,2e3):new r.PK("Couldn't log in",t,2e3),Promise.reject(t)}))},async login_personal(){new r.FN("Opening login popup...","default",1e3,a(1121));const e=new c.hJ;e.addScope("email"),e.addScope("profile"),await(E||S()?(0,c.F6)(h,e):(0,c.rh)(h,e)).then((()=>{if(this.user&&this.user.email&&!C(this.user.email))return new r.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),(0,n.E)("🔑 Logged in as "+this.user.displayName),g(this.user),Promise.resolve()})).catch((e=>(new r.PK("Couldn't log in",e,2e3),Promise.reject(e))))},logout(){h.signOut(),this.clear(),new r.FN("Logged Out","default",1500,a(1121))},async get_remote(){let e=await(0,i.QT)(this.account_ref);e.exists()?this.set_active(e.data()):this.personal_account?((0,n.E)("🔗 Linked account doesn't exist, removing it and going home"),new r.OO("Linked account doesn't exist, removing it and going home",2e3),this.account_doc.linked_to=null,await this.update_wrapper_acc_doc(),this.linked_account_doc=null,T.Z.push("/")):(await this.create_doc(),await this.get_remote())},async update_remote(){await(0,i.pl)(this.active_ref,this.active_doc,{merge:!0}),(0,n.E)("⏶ Pushed changes to remote")},async update_wrapper_acc_doc(){await(0,i.pl)(this.account_ref,this.account_doc,{merge:!0})},async create_doc(){(0,n.E)("📄 User document doesn't exist, creating new one..."),new r.OO("User document doesn't exist, creating new one...",2e3),this.account_doc={name:this.user.displayName,email:this.user.email,classes:[],theme:this.get_theme},this.personal_account&&(this.account_doc={linked_to:null,personal_account:!0,name:this.user.displayName,email:this.user.email}),this.is_teacher?(await this.create_teacher_doc(),new r.bF("Created user & teacher documents; Let's get started",2e3)):(await this.update_remote(),new r.bF("Created user document; Let's get started",2e3),this.personal_account||T.Z.push({name:"onboarding",query:{redirect:"/settings?redirect=/portal"}}))},async create_teacher_doc(){let e=(0,i.JU)(m,"classes",this.active_doc.email||this.user.email);await(0,i.pl)(e,{name:this.active_doc.name||this.user.displayName,email:this.active_doc.email||this.user.email}),this.teacher={doc_ref:e,collection_ref:(0,i.hJ)(e,"classes")},T.Z.push("/portal/create")},async fetch_classes(){this.active_doc?.classes||Promise.resolve();let e=[...new Set(this.active_doc.classes)];e.length!=this.active_doc.classes.length&&(this.personal_account?this.linked_account_doc.classes=e:this.account_doc.classes=e,await this.update_remote(),new r.OO("Removed duplicate classes",2e3));let t=[];for(let a of this.active_doc.classes){let[e,o]=a.split("/");if(!e||!o){await this.remove_invalid(a);continue}let n=(0,i.JU)(m,"classes",e),r=await(0,i.QT)(n);if(!r.exists()){await this.remove_invalid(a);continue}let s=(0,i.hJ)(n,"classes");if(!s){await this.remove_invalid(a);continue}let c=(0,i.JU)(s,o),l=await(0,i.QT)(c);if(!l.exists()){await this.remove_invalid(a);continue}let u=l.data();u.id=a,u.ref=[e,o].join("/"),t.push(u)}await Promise.all(t.map((async e=>{let t=[],[a,o]=e.ref.split("/"),n=(0,i.JU)(m,"classes",a,"classes",o),r=(0,i.hJ)(n,"tasks"),s=await(0,i.PL)(r);s.forEach((e=>{let n=e.data();n.ref=[a,o,e.id].join("/"),t.push(n)})),e.tasks=t}))),t.sort(((e,t)=>e.period==t.period?e.name.localeCompare(t.name):e.period-t.period)),this.classes=t,Promise.resolve()},async fetch_classes_by_email(e){if(this.loaded_email=null,!e||!C(e))return this.loaded_classes=null,void(this.loaded_email=e);let t=await(0,i.QT)((0,i.JU)(m,"classes",e));if(t.exists()){let t=[],a=(0,i.hJ)((0,i.JU)(m,"classes",e),"classes"),o=await(0,i.PL)((0,i.IO)(a));o.forEach((a=>{let o=a.data();o.id=a.id,o.name=(o.period?"P"+o.period+" - ":"")+o.name,this.active_doc?.classes.includes([e,a.id].join("/"))&&(o.is_joined=!0,o.name="[JOINED] "+o.name),t.push(o)})),t.sort(((e,t)=>e.period==t.period?e.name.localeCompare(t.name):e.period-t.period)),this.loaded_classes=t}else this.loaded_classes=null;this.loaded_email=e},async add_class(e,t,a,o){if(!this.active_doc?.classes)return;if(!t)return;let n=[e,t].join("/");return this.active_doc.classes.includes(n)?void 0:(this.personal_account?this.linked_account_doc.classes.push(n):this.account_doc.classes.push(n),await this.update_remote(),new r.bF(`Added "P${o} - ${a}" to your classes`,2e3),Promise.resolve())},async create_class(e){if((0,n.E)("🔨 Creating class",e),this.is_teacher){if(e.name&&e.period)try{if(!this.teacher.doc_ref||!this.teacher.collection_ref)return await this.create_teacher_doc(),void await this.create_class(e);let t=await(0,i.ET)(this.teacher.collection_ref,e);return new r.bF(`Created class "${e.name}"`,2e3),(0,n.E)("🏫 class_doc_ref",t),await this.add_class(this.active_doc.email||this.user.email,t.id,e.name,e.period),Promise.resolve()}catch(t){return new r.PK("Couldn't create class",(0,r.YY)(t),2e3),Promise.reject(t)}}else new r.PK("You need to be a teacher to create a class",2e3)},async create_task(e,t){try{if(!e.name)return void new r.PK("Please enter a test name",2e3);if(!t||0==t.length)return void new r.PK("Please select at least one class",2e3);let a=(0,i.qs)(m);return t.forEach((t=>{let o=t;t=t.split("/")[t.split("/").length-1];let n=(0,i.hJ)(m,"classes",this.user.email,"classes",t,"tasks");e.class_id=o,a.set((0,i.JU)(n),e)})),await a.commit(),this.fetch_classes(),new r.bF(`Added test "${e.name}" to ${t.length} class${1==t.length?"":"es"}`,2e3),Promise.resolve()}catch(a){return Promise.reject(a)}},async delete_task(e){try{let[t,a,o]=e.split("/");await(0,i.oe)((0,i.JU)(m,"classes",t,"classes",a,"tasks",o))}catch(t){return Promise.reject(t)}try{this.fetch_classes()}catch(t){(0,n.E)("🔥 Error fetching classes after task delete",t)}return Promise.resolve()},async task_from_ref(e){try{let[t,a,o]=e.split("/");t+="@mvla.net";let n=await(0,i.QT)((0,i.JU)(m,"classes",t,"classes",a)),r=n.data(),s=await(0,i.QT)((0,i.JU)(m,"classes",t,"classes",a,"tasks",o)),c=s.data();return c.ref=e,c.class_name=r.name||"Unknown Class",Promise.resolve(c)}catch(t){return Promise.reject(t)}}}})},4654:function(){}},t={};function a(o){var n=t[o];if(void 0!==n)return n.exports;var r=t[o]={exports:{}};return e[o].call(r.exports,r,r.exports,a),r.exports}a.m=e,function(){var e=[];a.O=function(t,o,n,r){if(!o){var i=1/0;for(u=0;u<e.length;u++){o=e[u][0],n=e[u][1],r=e[u][2];for(var s=!0,c=0;c<o.length;c++)(!1&r||i>=r)&&Object.keys(a.O).every((function(e){return a.O[e](o[c])}))?o.splice(c--,1):(s=!1,r<i&&(i=r));if(s){e.splice(u--,1);var l=n();void 0!==l&&(t=l)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[o,n,r]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,o){return a.f[o](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{7:"3c192daf",12:"6a4dd3b6",86:"f5120402",371:"d81c8726",391:"e780448c",396:"7f31e618",478:"d91a1366",481:"f1b206b6",504:"d02f5ffc",524:"44aa6c24",529:"7efec34f",676:"a1a452a9",717:"aaa3adfa",750:"4dba7f7c",868:"acb0f7d9",877:"538cf32d",923:"ce56ef50",989:"b4807167"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{86:"bf62a8f0",371:"6b00815e",391:"3e5fb3b8",396:"e2345db5",478:"878f223e",481:"b901e163",504:"1221cfec",676:"fe34aca6",717:"d096cf50",868:"6c84acf6",877:"83a796e7",923:"0a695c79",989:"a77cb536"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mvtime:";a.l=function(o,n,r,i){if(e[o])e[o].push(n);else{var s,c;if(void 0!==r)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+r){s=d;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.setAttribute("data-webpack",t+r),s.src=o),e[o]=[n];var h=function(t,a){s.onerror=s.onload=null,clearTimeout(m);var n=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((function(e){return e(a)})),t)return t(a)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=h.bind(null,s.onerror),s.onload=h.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,o,n){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(a){if(r.onerror=r.onload=null,"load"===a.type)o();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=i,c.request=s,r.parentNode&&r.parentNode.removeChild(r),n(c)}};return r.onerror=r.onload=i,r.href=t,a?a.parentNode.insertBefore(r,a.nextSibling):document.head.appendChild(r),r},t=function(e,t){for(var a=document.getElementsByTagName("link"),o=0;o<a.length;o++){var n=a[o],r=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(r===e||r===t))return n}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){n=i[o],r=n.getAttribute("data-href");if(r===e||r===t)return n}},o=function(o){return new Promise((function(n,r){var i=a.miniCssF(o),s=a.p+i;if(t(i,s))return n();e(o,s,null,n,r)}))},n={143:0};a.f.miniCss=function(e,t){var a={86:1,371:1,391:1,396:1,478:1,481:1,504:1,676:1,717:1,868:1,877:1,923:1,989:1};n[e]?t.push(n[e]):0!==n[e]&&a[e]&&t.push(n[e]=o(e).then((function(){n[e]=0}),(function(t){throw delete n[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,o){var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)o.push(n[2]);else{var r=new Promise((function(a,o){n=e[t]=[a,o]}));o.push(n[2]=r);var i=a.p+a.u(t),s=new Error,c=function(o){if(a.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var r=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+r+": "+i+")",s.name="ChunkLoadError",s.type=r,s.request=i,n[1](s)}};a.l(i,c,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,o){var n,r,i=o[0],s=o[1],c=o[2],l=0;if(i.some((function(t){return 0!==e[t]}))){for(n in s)a.o(s,n)&&(a.m[n]=s[n]);if(c)var u=c(a)}for(t&&t(o);l<i.length;l++)r=i[l],a.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return a.O(u)},o=self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=a.O(void 0,[998],(function(){return a(451)}));o=a.O(o)})();
//# sourceMappingURL=app.4d329ab2.js.map