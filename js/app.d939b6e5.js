(function(){var e={2745:function(e,t,a){"use strict";function n(e){const t=e.match(/^([\P{L}\p{Extended_Pictographic}]|(?:[\uD800-\uDBFF][\uDC00-\uDFFF]))/u);return t?t[0]:null}function o(){if(0==arguments.length)return;let e=Array.from(arguments),t=["%cMVTT","background:#272727;color:#C9B092;padding:7px 12px;font-family:Lato,sans-serif;font-weight:bold;font-size:1.3em"];null!=n(e[0])&&(t[0]+=" %c"+n(e[0]),t[2]="background:#C9B092aa;background:#ffffffaa;color:#272727;padding:3px 5px;margin-left:5px;border-radius:5px;font-family:monospace !important;font-weight:bold;font-size:1.25em",e[0]=e[0].substring(2).trimStart());try{console.info(...t,...e)}catch(a){console.log(...t,...e)}}a.d(t,{E:function(){return o}})},6473:function(e,t,a){"use strict";a(7658);var n=a(9242),o=a(3396),i=a(1020);const s=["_theme"];function r(e,t,a,n,i,r){const c=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)("main",{id:"themed_body",class:"parent",_theme:r.theme,onClick:t[0]||(t[0]=(...e)=>r.refreshTimeout&&r.refreshTimeout(...e)),onKeydown:t[1]||(t[1]=(...e)=>r.refreshTimeout&&r.refreshTimeout(...e)),onFocus:t[2]||(t[2]=(...e)=>r.refreshTimeout&&r.refreshTimeout(...e))},[(0,o.Wm)(c)],40,s)}var c=a(8980),l={name:"App",data(){return{platform:"",isElectron:!1}},computed:{pageTitle(){return document.title},store(){return(0,c.h)()},theme(){return this.store.get_theme}},mounted(){this.isElectron=navigator.userAgent.toLowerCase().indexOf(" electron/")>-1,this.isElectron&&(this.platform=this.$route.query.platform,!this.platform&&window.location.search&&(this.platform=window.location.search.split("=")[1]),console.log("Electron Platform: "+this.platform))},created(){const e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",t=localStorage.getItem("theme");this.isDarkMode="dark"===t||null===t&&"dark"===e},methods:{refreshTimeout(){this.store&&this.store.refresh_timeout()}}},u=a(89);const d=(0,u.Z)(l,[["render",r]]);var h=d,m=a(585),f=a(1708),_=a(2745),p=a(7387),g=a.n(p),v=a(5431);(0,v.z)("/service-worker.js",{ready(){(0,_.E)("🛠 App is being served from cache by a service worker. For more details, visit https://goo.gl/AFskqB")},registered(){(0,_.E)("🛠 Service worker has been registered.")},cached(){(0,_.E)("🛠 Content has been cached for offline use.")},updatefound(){(0,_.E)("🛠 New content is downloading.")},updated(){(0,_.E)("🛠 New content is available; please refresh.")},offline(){(0,_.E)("🛠 No internet connection found. App is running in offline mode.")},error(e){(0,_.E)("🛑 Error during service worker registration:",e)}});var w=a(6112);const k=(0,i.WB)(),b=(0,n.ri)(h);b.use(m.Z),b.use(k),b.use(w.Z,{preLoad:2,attempt:1}),b.mount("#app"),(0,o.YP)(k.state,(e=>{localStorage.setItem("MVTT_app_state",JSON.stringify(e.main))}),{deep:!0}),window.addEventListener("storage",(e=>{"MVTT_teacher_mode"===e.key&&((0,_.E)("🏫 Detected teacher mode change, reloading"),window.location.reload())})),g()(document.body).on("click",".auth-action",(function(){const e=(0,c.h)();!e.user&&g()(this).hasClass("can-login")?e.login():g()(this).hasClass("can-logout")&&(g()(this).hasClass("doprompt")?new f.GI(["Log Out","Are you sure you want to log out?"],"default",1e4,a(4856),[["removePopup()","Cancel","secondary-action fullborder"],["removePopup()","Confirm","primary-action auth-action can-logout"]]):e.logout())})),g()(document.body).on("click",".gohome",(function(){m.Z.push("/")})),m.Z.afterEach((e=>{e.meta&&e.meta.page_title?document.title="MV Test Tracker | "+e.meta.page_title:document.title="MV Test Tracker";let t=e.meta?.theme_color?.light||"#f5c14b",a=e.meta?.theme_color?.dark||"#f5c14b";g()("meta.theme-color").attr("content",t),g()("meta.theme-color-dark").attr("content",a),(0,f.hC)();const n=document.documentElement.style;n.setProperty("--theme-color",t),n.setProperty("--theme-color-dark",a);let o=e.meta?.theme_color?.text_light||"#000000",i=e.meta?.theme_color?.text_dark||"#ffffff";n.setProperty("--theme-color-text",o),n.setProperty("--theme-color-text-dark",i),n.setProperty("--theme-color-hover",o+"33"),n.setProperty("--theme-color-hover-dark",i+"33")})),window.toast=f.gy,window.$=g(),m.Z.beforeEach((e=>{const t=(0,c.h)();return e.meta&&e.meta.requiresAuth&&t&&!t.user?(new f.FN("Please log in or join to access this page","default",1500,a(1121)),{path:"/",query:{redirect:e.fullPath}}):e.meta&&e.meta.requiresTeacher&&t.user&&!t.is_teacher?(new f.FN("You must be a teacher to access this page","default",1500,a(1121)),{path:"/portal"}):void 0})),window.toggle_teacher_mode=function(){"true"===localStorage.getItem("MVTT_teacher_mode")?localStorage.setItem("MVTT_teacher_mode","false"):localStorage.setItem("MVTT_teacher_mode","true"),window.location.reload()}},585:function(e,t,a){"use strict";a.d(t,{Z:function(){return z}});var n=a(2483),o=a(3396);const i={class:"apphome hidescroll scrolloverflow"},s={class:"base fullheightcontent"};function r(e,t,a,n,r,c){const l=(0,o.up)("BaseNav"),u=(0,o.up)("router-view"),d=(0,o.up)("BaseFooter");return(0,o.wg)(),(0,o.iD)("main",i,[(0,o._)("main",s,[(0,o.Wm)(l),(0,o.Wm)(u,{class:"inner-base"})]),(0,o.Wm)(d)])}var c=a(7139);const l=e=>((0,o.dD)("data-v-03aa0216"),e=e(),(0,o.Cn)(),e),u=l((()=>(0,o._)("h1",{class:"gohome hideoverflow"},"MV Test Tracker",-1))),d=["_theme"],h=l((()=>(0,o._)("div",{class:"theme_icon"},null,-1))),m=l((()=>(0,o._)("div",{class:"toggle_text"},"Switch Theme",-1))),f=[h,m],_=l((()=>(0,o._)("span",{class:"flex_spacer"},null,-1))),p={class:"base-pages-nav"},g=l((()=>(0,o._)("span",{class:"flex_spacer"},null,-1)));function v(e,t,a,n,i,s){const r=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("header",null,[u,(0,o._)("button",{_theme:s.store.get_theme,class:"theme_button",title:"Switch Theme",onClick:t[0]||(t[0]=(...e)=>s.store.toggle_theme&&s.store.toggle_theme(...e))},f,8,d),_,i.mobile&&!i.mobile_menu_open?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"nav-mobile-btn",onClick:t[1]||(t[1]=e=>i.mobile_menu_open=!i.mobile_menu_open)})):(0,o.kq)("",!0),!i.mobile||i.mobile_menu_open?((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,c.C_)(["nav-actions",{mobile:i.mobile}])},[i.mobile?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"nav-mobile-btn alt-btn",onClick:t[2]||(t[2]=e=>i.mobile_menu_open=!i.mobile_menu_open)})):(0,o.kq)("",!0),(0,o._)("nav",p,[(0,o.Wm)(r,{class:"click-action-inline",to:"/",onClick:s.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1},8,["onClick"]),(0,o.Wm)(r,{class:"click-action-inline",to:"/about",onClick:s.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("About")])),_:1},8,["onClick"]),(0,o.Wm)(r,{class:"click-action-inline",to:"/contact",onClick:s.closeMenu},{default:(0,o.w5)((()=>[(0,o.Uk)("Contact")])),_:1},8,["onClick"])]),g,(0,o._)("button",{id:"nav-auth-btn",class:(0,c.C_)(["small-action-btn auth-action can-logout can-login click-action",{linked:s.store.personal_account}])}," Log "+(0,c.zw)(s.logged_in?"Out":"In"),3)],2)):(0,o.kq)("",!0)])}var w=a(8980),k={name:"BaseNav",data(){return{mobile_menu_open:!1,mobile:window.innerWidth<=800}},methods:{resize(){this.mobile=window.innerWidth<=800,this.mobile||this.closeMenu()},closeMenu(){this.mobile_menu_open=!1}},mounted(){window.addEventListener("resize",this.resize)},unmounted(){window.removeEventListener("resize",this.resize)},computed:{store(){return(0,w.h)()},logged_in(){return!!this.store.user}}},b=a(89);const y=(0,b.Z)(k,[["render",v],["__scopeId","data-v-03aa0216"]]);var T=y;const C=e=>((0,o.dD)("data-v-94e483ee"),e=e(),(0,o.Cn)(),e),P=C((()=>(0,o._)("p",null,[(0,o._)("span",null,"© 2022-2023 MVHS Test Tracker. "),(0,o._)("span",null,[(0,o.Uk)("Website by "),(0,o._)("a",{href:"https://svonk.me/"},"Sander Vonk")])],-1))),E=[P];function S(e,t,a,n,i,s){return(0,o.wg)(),(0,o.iD)("footer",null,E)}var O={name:"BaseFooter"};const A=(0,b.Z)(O,[["render",S],["__scopeId","data-v-94e483ee"]]);var x=A,F={name:"AppHome",components:{BaseNav:T,BaseFooter:x}};const N=(0,b.Z)(F,[["render",r]]);var q=N;const D=e=>((0,o.dD)("data-v-f34b6ee6"),e=e(),(0,o.Cn)(),e),L={class:"not-found"},M=D((()=>(0,o._)("h1",{class:"title_text err_text"},"404",-1))),I=D((()=>(0,o._)("h2",{class:"header_style err_text hideoverflow"},"Page Not Found",-1))),j=D((()=>(0,o._)("hr",{class:"err-break"},null,-1))),J=D((()=>(0,o._)("span",null," | ",-1))),U={key:1,class:"nostyle"},$=D((()=>(0,o._)("span",null," | ",-1))),Z=D((()=>(0,o._)("div",{class:"err-pad-bottom"},null,-1)));function V(e,t,a,n,i,s){const r=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("div",L,[M,I,j,(0,o._)("nav",null,[(0,o.Wm)(r,{class:"router-link click-action-inline",to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1}),J,s.logged_in?((0,o.wg)(),(0,o.j4)(r,{key:0,class:"router-link click-action-inline",to:"/portal"},{default:(0,o.w5)((()=>[(0,o.Uk)("Portal")])),_:1})):((0,o.wg)(),(0,o.iD)("span",U,[(0,o.Wm)(r,{class:"router-link click-action-inline",to:"/about"},{default:(0,o.w5)((()=>[(0,o.Uk)("About")])),_:1}),$,(0,o.Wm)(r,{class:"router-link click-action-inline",to:"/contact"},{default:(0,o.w5)((()=>[(0,o.Uk)("Contact")])),_:1})]))]),Z])}var R={name:"NotFound",computed:{store(){return(0,w.h)()},logged_in(){return this.store.user}}};const B=(0,b.Z)(R,[["render",V],["__scopeId","data-v-f34b6ee6"]]);var W=B;const K=(0,n.p7)({history:(0,n.PO)("/"),routes:[{path:"/",name:"home",component:q,meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"",name:"home",component:()=>a.e(511).then(a.bind(a,511)),meta:{page_title:"Home",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1},children:[{path:"join",name:"join",component:()=>a.e(190).then(a.bind(a,8190)),meta:{page_title:"Join the MVTT Beta",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1,block_close:!0,close_path:"/",blockStandardRedirect:!0}},{path:"link/:code?",name:"link",component:()=>Promise.all([a.e(588),a.e(60)]).then(a.bind(a,2936)),props:!0,meta:{page_title:"Link Personal Account",theme_color:{light:"#ffffff",dark:"#16130e"},close_path:"/",blockStandardRedirect:!0}}]},{path:"about",name:"about",component:()=>a.e(715).then(a.bind(a,2715)),meta:{page_title:"About",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"roadmap",name:"roadmap",component:()=>a.e(676).then(a.bind(a,2676)),meta:{page_title:"Development Roadmap",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"contact",name:"contact",component:()=>a.e(481).then(a.bind(a,3245)),meta:{page_title:"Contact",theme_color:{light:"#ffffff",dark:"#16130e"},requiresAuth:!1}},{path:"/:pathMatch(.*)*",name:"404",component:W,meta:{page_title:"404",theme_color:{light:"#ffffff",dark:"#16130e"}}}]},{path:"/portal",name:"portal",component:()=>a.e(503).then(a.bind(a,7503)),meta:{page_title:"Portal",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0},children:[{path:"/survey/daily",name:"daily",component:()=>Promise.all([a.e(588),a.e(6)]).then(a.bind(a,1037)),meta:{page_title:"Daily Check-In",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,block_close:!0,blockStandardRedirect:!0,noSurvey:!0}},{path:"/settings",name:"settings",component:()=>a.e(301).then(a.bind(a,3301)),meta:{page_title:"Settings",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,noSurvey:!0}},{path:"/portal/onboarding",name:"onboarding",component:()=>a.e(948).then(a.bind(a,8948)),meta:{page_title:"Onboarding",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,block_close:!0,noSurvey:!0}},{path:"/portal/add",name:"addclass",component:()=>a.e(98).then(a.bind(a,3098)),meta:{page_title:"Join a Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0}},{path:"/portal/create",name:"createclass",component:()=>a.e(751).then(a.bind(a,2751)),meta:{page_title:"Teacher | Create Class",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/new/:tasktype",name:"newtask",component:()=>a.e(892).then(a.bind(a,8892)),meta:{page_title:"Teacher | Add Task",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!0,requiresTeacher:!0}},{path:"/portal/task",name:"task",component:()=>a.e(632).then(a.bind(a,632)),meta:{page_title:"View Test",theme_color:{light:"#ffffff",dark:"#121212"},requiresAuth:!1,props:e=>({task:e.query.task})}}]},{path:"/app",redirect:"/portal",meta:{requiresAuth:!0}}],parseQuery:e=>a(5410).parse(e)});var z=K},8980:function(e,t,a){"use strict";a.d(t,{h:function(){return S}});a(7658);var n=a(1020),o=a(2745),i=a(1708),s=a(4287),r=a(7795),c=a(6665),l=a(6781);const u={apiKey:"AIzaSyDGqqhApln4pxm4EynPCSkfwyK8aopjfCk",authDomain:"auth.mvtt.app",projectId:"mvtrack",storageBucket:"mvtrack.appspot.com",messagingSenderId:"1070634963357",appId:"1:1070634963357:web:2a4abc725fff24a5199f74",measurementId:"G-6LNX1KCR8E"},d=(0,r.ZF)(u),h=(0,c.v0)(d),m=(0,s.ad)(d);(0,l.IH)(d);let f;h.onAuthStateChanged((e=>{g(e)}));let _,p=!1;function g(e){const t=S();if(e){if(t.set_user(e),w(),!t.user)return;v(e.uid),_=b()}else t.clear()}function v(e){const t=S();f=(0,s.cf)((0,s.JU)(m,"users",e),{includeMetadataChanges:!0},(e=>{if(e.metadata.hasPendingWrites)return void(0,o.E)("⬥ Got snapshot from local changes");if((0,o.E)("⏷ Got snapshot from remote"),!e.exists())return void t.create_doc();let a=e.data();t.user&&t.user?.uid==a.id?t.account_doc=a:t.linked_account_doc=a,t.get_classes()}),(e=>{(0,o.E)("⚠ Error getting snapshot from remote",e)})),p=!0}function w(){clearTimeout(_),f&&(f(),(0,o.E)("⬥ Unsubscribed from remote changes")),p=!1}function k(e){const t=Math.floor(e/1e3/60),a=Math.floor(e/1e3%60);return(t||!a?`${t} minute${1!=t?"s":""}`:"")+(a?`${a} second${1!=a?"s":""}`:"")}function b(e=3e5){return setTimeout((()=>{(0,o.E)(`⬥ Page unused for ${k(e)}, removing onSnapshot listener`),w()}),e)}function y(e){const t=S();p||(v(t.personal_account?t.account_doc.linked_to:t.user.uid),(0,o.E)("⬥ Resubscribed to remote changes")),clearTimeout(_),_=b(e)}var T=a(585);const C=new c.hJ;function P(e){return"mvla.net"==e.split("@")[1]}C.addScope("email"),C.addScope("profile"),h.useDeviceLanguage(),C.setCustomParameters({login_hint:"username@mvla.net"});let E=new Date;E=new Date(E.getTime()-60*E.getTimezoneOffset()*1e3),E=E.toISOString().split("T")[0];const S=(0,n.Q_)({id:"main",state:()=>{let e={};if(localStorage.getItem("MVTT_app_state")&&"undefined"!=localStorage.getItem("MVTT_app_state")&&"null"!=localStorage.getItem("MVTT_app_state"))try{return(0,o.E)("↻ Loading state from local storage"),e=JSON.parse(localStorage.getItem("MVTT_app_state")),e}catch(t){(0,o.E)("⟳ Error parsing local storage state",t)}return(0,o.E)("🔨 Setting up store from scratch"),{user:null,account_doc:null,linked_account_doc:null,classes:[],loaded_email:null,loaded_classes:null,teacher:{doc_ref:null,collection_ref:null},theme:null,personal_account:!1}},getters:{linked_accounts(){return this.user&&this.active_doc&&this.active_doc.linked||[]},get_theme(){let e=this.theme||localStorage.getItem("theme"),t=this.account_doc?.theme,a=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return t?(e!=t&&localStorage.setItem("theme",t),t||"light"):(e?a=e:localStorage.setItem("theme",a),this.account_doc&&(this.account_doc.theme=a,this.update_remote()),e||"light")},non_recent_signin(){if(!this.user)return!1;let e=this.user?.metadata?.lastSignInTime;if(!e)return!1;e=new Date(e),(0,o.E)("⏲️ Last signed-in: "+e.toLocaleString());let t=(new Date).getTime()-e.getTime();return t>864e5},recently_joined(){if(!this.user)return!1;let e=this.user?.metadata?.creationTime;if(!e)return!1;e=new Date(e);let t=(new Date).getTime()-e.getTime();return t<432e5},account_ref(){return this.user?(0,s.JU)(m,"users",this.user.uid):null},linked_account_ref(){return this.user&&this.account_doc&&this.account_doc.linked_to?(0,s.JU)(m,"users",this.account_doc.linked_to):null},get_tasks(){let e=[],t=this.classes;if(!t?.length)return[];for(let a=0;a<t.length;a++){let n=t[a].tasks;n=n||[];for(let o=0;o<n.length;o++){if(t[a].name=t[a].name?t[a].name:"Unnamed Class","string"==typeof n[o].date){let[e,t,a]=n[o].date.split("-");n[o].date=`${t}-${a}-${e}`,n[o].date=new Date(n[o].date),n[o].date=isNaN(n[o].date)?null:n[o].date}n[o].color=t[a].color,e.push({...n[o],class_name:t[a].name})}}return e},is_teacher(){if(!this.user)return!1;if("true"==window?.localStorage?.MVTT_teacher_mode)return(0,o.E)("🏫 Teacher mode enabled locally"),!0;let e=this.user.email,[t,a]=e.split("@");return"mvla.net"==a&&!/\d/.test(t)},done_daily_survey(){if(!this.active_doc)return!1;if(this.is_teacher)return!0;let e=this.active_doc.done_surveys?.includes(E);return e},active_ref(){return this.personal_account?this.linked_account_ref:this.account_ref},active_doc(){return this.personal_account?this.linked_account_doc:this.account_doc}},actions:{set_active(e){e&&(this.personal_account?this.linked_account_doc=e:this.account_doc=e)},async get_linked_account(e){try{if(!e)throw"No account code provided";let t=await(0,s.QT)((0,s.JU)(m,"users",e));if(!t.exists())throw"Account doesn't exist or you haven't been invited";let a=t.data();return Promise.resolve(a)}catch(t){return(0,o.E)("🔗 Couldn't get linked account",t),Promise.reject(t)}},async link_account_code(e){if(e)if(this.personal_account)try{let t=await this.get_linked_account(e);if(!t)throw"Account doesn't exist or you haven't been invited";this.account_doc.linked_to=e,await this.update_remote(),new i.bF(`Successfully linked to ${t.name}'s account!`,4e3)}catch(t){return new i.PK("Couldn't link account",t,2e3),Promise.reject(t)}else new i.OO("This account is a primary account and cannot be linked",3e3)},async link_account(e){if(!this.user||!this.active_doc)return;if(this.personal_account&&new i.OO("This account is already linked!",2e3),!e||P(e)||!e.includes("@"))return void new i.OO("Please enter a valid non-mvla email",2e3);if(this.linked_accounts.includes(e))return void new i.OO("That account is already linked",2e3);this.active_doc.linked||(this.personal_account?this.linked_account_doc.linked=[]:this.account_doc.linked=[]);let t=(0,s.hJ)(m,"mail");try{let a=await(0,s.ET)(t,{to:e,cc:this.user.email,from:`${this.active_doc.name} via MV Test Tracker <mail@mvtt.app>`,fromname:this.active_doc.name+" via MV Test Tracker",template:{name:"link_invite",data:{sender_name:this.active_doc.name.split(" ")[0],sender_uid:this.user.uid}}}),n=(0,s.JU)(t,a.id),r=await(0,s.QT)(n),c=1;while(!r.exists()||0==!!r.data()?.delivery?.attempts&&c<=3)await new Promise((e=>setTimeout(e,2e3*(2^c)))),r=await(0,s.QT)(n),c++;if(!r.data()?.delivery?.info?.accepted?.includes(e)||0==r.data()?.delivery?.attempts)throw(0,o.E)("📧 Email failed to send",r.data()),"Email failed to send";return this.personal_account?this.linked_account_doc.linked.push(e):this.account_doc.linked.push(e),await this.update_remote(),new i.bF(`We notified ${e}, you'll receive a copy of the email too!`,4e3),Promise.resolve()}catch(a){return new i.PK(`Couldn't invite "${e}"`,a,2e3),Promise.reject(a)}},async unlink_account(e){try{if(!this.user)return;if(this.active_doc.linked.includes(e)){let t=this.active_doc.linked.filter((t=>t!=e));this.personal_account?this.linked_account_doc.linked=t:this.account_doc.linked=t,await this.update_remote(),new i.bF(`Removed ${e} from your linked accounts`,2e3)}else new i.OO(`${e} is not linked to this account`,2e3);Promise.resolve()}catch(t){return new i.PK(`Couldn't unlink "${e}"`,t,2e3),Promise.reject(t)}},refresh_timeout(e){this.user&&y(e)},async userLoginPromise(){return new Promise((e=>{let t=setInterval((()=>{this.user&&(clearInterval(t),e())}),100)}))},async save_join_form(e){this.personal_account?this.linked_account_doc.join_form=e:this.account_doc.join_form=e,await this.update_remote()},async save_daily_survey(e){let t=(0,s.JU)(m,"survey","daily",E,this.user.uid),a={time:(new Date).getTime(),responses:e};await(0,s.pl)(t,a),this.user||await this.userLoginPromise();let n=this.active_doc?.done_surveys?this.active_doc.done_surveys:[];n.push(E),this.personal_account?this.linked_account_doc.done_surveys=n:this.account_doc.done_surveys=n,await this.update_remote(),new i.bF("Saved daily survey",2e3)},async toggle_theme(){this.theme="light"==this.get_theme?"dark":"light",localStorage.setItem("theme",this.theme),this?.account_doc&&(this.account_doc.theme=this.theme,await this.update_remote()),new i.bF(`Switched to ${this.theme} theme`,2e3),this.get_theme},async get_classes(){if(this.active_doc?.classes){let e=[...new Set(this.active_doc.classes)];e.length!=this.active_doc.classes.length&&(this.personal_account?this.linked_account_doc.classes=e:this.account_doc.classes=e,await this.update_remote(),new i.OO("Removed duplicate classes",2e3))}if(!this.active_doc?.classes)return[];let e=[];for(let t of this.active_doc.classes){let[a,n]=t.split("/");if(!a||!n){await this.remove_invalid(t);continue}let o=(0,s.JU)(m,"classes",a),i=await(0,s.QT)(o);if(!i.exists()){await this.remove_invalid(t);continue}let r=(0,s.hJ)(o,"classes");if(!r){await this.remove_invalid(t);continue}let c=(0,s.JU)(r,n),l=await(0,s.QT)(c);if(!l.exists()){await this.remove_invalid(t);continue}let u=l.data();u.id=t,e.push(u)}e.sort(((e,t)=>e.period==t.period?e.name.localeCompare(t.name):e.period-t.period)),this.classes=e},async remove_class_id_helper(e){let t=this.active_doc.classes.filter((t=>t!=e));this.personal_account?this.linked_account_doc.classes=t:this.account_doc.classes=t,await this.update_remote()},async remove_invalid(e){await this.remove_class_id_helper(e),new i.OO(`Removed non-existent class "${e}"`,2e3)},async remove_class(e){await this.remove_class_id_helper(e),(0,o.E)("🗑️ Removed class from user's doc: "+e),new i.bF("Removed class",2e3)},set_user(e){(0,s.QT)((0,s.JU)(m,"users",e.uid)).then((t=>{if(t.exists()?(this.account_doc=t.data(),this.personal_account=this.account_doc?.personal_account):(this.account_doc=null,this.linked_account_doc=null,this.personal_account=!1),!e.email||!P(e.email)&&!this.personal_account&&(!this.account_doc?.personal_account||!this.account_doc?.linked_to))return h.signOut(),new i.OO("Please use your MVLA email to log in",2e3),void this.clear();this.user=e,this.personal_account&&this.get_remote(),this.is_teacher&&((0,o.E)("🏫 Running in teacher mode"),this.teacher.doc_ref=t(m,"classes",this.user.email),this.teacher.collection_ref=(0,s.hJ)(this.teacher.doc_ref,"classes")),T.Z.currentRoute?.value?.query?.redirect&&!T.Z.currentRoute?.value?.meta?.blockStandardRedirect&&T.Z.push(T.Z.currentRoute?.value?.query?.redirect)})).catch((()=>{h.signOut(),new i.OO("Something went wrong loading your user data",2e3)}))},clear(){this.user=null,this.account_doc=null,this.linked_account_doc=null,this.classes=[],this.loaded_email=null,this.loaded_classes=null,this.personal_account=!1,this.teacher={doc_ref:null,collection_ref:null},localStorage.removeItem("MVTT_app_state"),T.Z.currentRoute?.value?.meta?.requiresAuth&&T.Z.push("/")},async login(){new i.FN("Opening login popup...","default",1e3,a(1121));let e=navigator?.userAgent?.toLowerCase()?.indexOf(" electron/")>-1;await(e?(0,c.F6)(h,C):(0,c.rh)(h,C)).then((()=>{if(this.user&&this.user.email&&P(this.user.email))return new i.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),(0,o.E)("🔑 Logged in as "+this.user.displayName),g(this.user),T.Z.currentRoute?.value?.query?.redirect||T.Z.currentRoute?.value?.meta?.blockStandardRedirect||T.Z.push("/portal"),Promise.resolve()})).catch((e=>{let t=(0,i.YY)(e);return"auth/cancelled-popup-request"==e.code||"auth/popup-closed-by-user"==e.code?new i.OO(t,2e3):new i.PK("Couldn't log in",t,2e3),Promise.reject(t)}))},async login_personal(){new i.FN("Opening login popup...","default",1e3,a(1121));let e=new c.hJ;e.addScope("email"),e.addScope("profile");let t=navigator?.userAgent?.toLowerCase()?.indexOf(" electron/")>-1;await(t?(0,c.F6)(h,e):(0,c.rh)(h,e)).then((()=>{if(this.user&&this.user.email&&!P(this.user.email))return new i.FN("Logged in as "+this.user.displayName+"!","default",2e3,a(8311)),(0,o.E)("🔑 Logged in as "+this.user.displayName),g(this.user),Promise.resolve()})).catch((e=>(new i.PK("Couldn't log in",e,2e3),Promise.reject(e))))},logout(){h.signOut(),this.clear(),new i.FN("Logged Out","default",1500,a(1121))},async get_remote(){let e=await(0,s.QT)(this.account_ref);e.exists()?this.set_active(e.data()):this.personal_account?((0,o.E)("🔗 Linked account doesn't exist, removing it and going home"),new i.OO("Linked account doesn't exist, removing it and going home",2e3),this.account_doc.linked_to=null,await this.update_wrapper_acc_doc(),this.linked_account_doc=null,T.Z.push("/")):(await this.create_doc(),await this.get_remote())},async create_doc(){(0,o.E)("📄 User document doesn't exist, creating new one..."),new i.OO("User document doesn't exist, creating new one...",2e3),this.account_doc={name:this.user.displayName,email:this.user.email,classes:[],theme:this.get_theme},this.personal_account&&(this.account_doc={linked_to:null,personal_account:!0,name:this.user.displayName,email:this.user.email}),this.is_teacher?(await this.create_teacher_doc(),new i.bF("Created user & teacher documents; Let's get started",2e3)):(await this.update_remote(),new i.bF("Created user document; Let's get started",2e3),this.personal_account||T.Z.push("/portal/onboarding"))},async create_teacher_doc(){let e=(0,s.JU)(m,"classes",this.active_doc.email||this.user.email);await(0,s.pl)(e,{name:this.active_doc.name||this.user.displayName,email:this.active_doc.email||this.user.email}),this.teacher={doc_ref:e,collection_ref:(0,s.hJ)(e,"classes")},T.Z.push("/portal/create")},async update_remote(){await(0,s.pl)(this.active_ref,this.active_doc,{merge:!0}),(0,o.E)("⏶ Pushed changes to remote")},async update_wrapper_acc_doc(){await(0,s.pl)(this.account_ref,this.account_doc,{merge:!0})},async get_classes_by_email(e){if(this.loaded_email=null,!e||!P(e))return this.loaded_classes=null,void(this.loaded_email=e);let t=await(0,s.QT)((0,s.JU)(m,"classes",e));if(t.exists()){let t=[],a=(0,s.hJ)((0,s.JU)(m,"classes",e),"classes"),n=await(0,s.PL)((0,s.IO)(a));n.forEach((a=>{let n=a.data();n.id=a.id,n.name=(n.period?"P"+n.period+" - ":"")+n.name,n.is_joined=!0,this.active_doc?.classes.includes([e,a.id].join("/"))&&(n.name="[JOINED] "+n.name),t.push(n)})),this.loaded_classes=t}else this.loaded_classes=null;this.loaded_email=e},async add_class(e,t,a,n){if(!this.active_doc?.classes)return;if(!t)return;console.log(t);let o=[e,t].join("/");return this.active_doc.classes.includes(o)?void 0:(this.personal_account?this.linked_account_doc.classes.push(o):this.account_doc.classes.push(o),await this.update_remote(),new i.bF(`Added "P${n} - ${a}" to your classes`,2e3),Promise.resolve())},async create_class(e){if((0,o.E)("🔨 Creating class",e),this.is_teacher){if(e.name&&e.period)try{if(!this.teacher.doc_ref||!this.teacher.collection_ref)return await this.create_teacher_doc(),void await this.create_class(e);let t=await(0,s.ET)(this.teacher.collection_ref,e);new i.bF(`Created class "${e.name}"`,2e3),(0,o.E)("🏫 class_doc_ref",t),await this.add_class(this.active_doc.email||this.user.email,t.id,e.name,e.period)}catch(t){new i.PK("Couldn't create class",(0,i.YY)(t),2e3)}}else new i.PK("You need to be a teacher to create a class",2e3)},async add_task(e,t){try{if(!e.name)return void new i.PK("Please enter a test name",2e3);if(!t||0==t.length)return void new i.PK("Please select at least one class",2e3);let a=(0,s.qs)(m),n=(0,s.hJ)(m,"classes"),o=(0,s.JU)(n,this.user.email),r=(0,s.hJ)(o,"classes");return t.forEach((t=>{let n=t;t=t.split("/")[t.split("/").length-1];let o=(0,s.JU)(r,t);e.class_id=n,a.update(o,{tasks:(0,s.vr)(e)})})),await a.commit(),await this.get_classes(),new i.bF(`Added test "${e.name}" to ${t.length} class${1==t.length?"":"es"}`,2e3),Promise.resolve()}catch(a){return Promise.reject(a)}},async delete_task(e){let t=e.class_id,a=t.split("/")[t.split("/").length-1],n=(0,s.JU)(this.teacher.collection_ref,a),o={class_id:e.class_id,date:new Date(e.date).toISOString().split("T")[0],description:e.description,name:e.name,type:e.type};await(0,s.r7)(n,{tasks:(0,s.Ab)(o)}),await this.get_classes(),new i.bF(`Removed task "${e.name}"`,2e3),T.Z.push("/portal")}}})},4654:function(){}},t={};function a(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,a),i.exports}a.m=e,function(){var e=[];a.O=function(t,n,o,i){if(!n){var s=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],i=e[u][2];for(var r=!0,c=0;c<n.length;c++)(!1&i||s>=i)&&Object.keys(a.O).every((function(e){return a.O[e](n[c])}))?n.splice(c--,1):(r=!1,i<s&&(s=i));if(r){e.splice(u--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var u=e.length;u>0&&e[u-1][2]>i;u--)e[u]=e[u-1];e[u]=[n,o,i]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,n){return a.f[n](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{6:"595ad899",60:"4df8111b",98:"cb02f9f8",190:"e64c2b16",301:"2f7e39cf",481:"f1b206b6",503:"257d3a22",511:"faa4778b",588:"b14de999",632:"97b1084e",676:"f4abdec9",715:"402bade3",751:"482063ab",892:"41de047b",948:"f1880664"}[e]+".js"}}(),function(){a.miniCssF=function(e){return"css/"+e+"."+{6:"0a695c79",60:"555fa526",190:"b15ecc77",301:"bb48e88b",481:"b901e163",503:"59b09df2",511:"89601130",632:"0922939f",676:"fe34aca6",715:"406fe2b7",751:"b844b2df",892:"cfa5284a"}[e]+".css"}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="mvtime:";a.l=function(n,o,i,s){if(e[n])e[n].push(o);else{var r,c;if(void 0!==i)for(var l=document.getElementsByTagName("script"),u=0;u<l.length;u++){var d=l[u];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+i){r=d;break}}r||(c=!0,r=document.createElement("script"),r.charset="utf-8",r.timeout=120,a.nc&&r.setAttribute("nonce",a.nc),r.setAttribute("data-webpack",t+i),r.src=n),e[n]=[o];var h=function(t,a){r.onerror=r.onload=null,clearTimeout(m);var o=e[n];if(delete e[n],r.parentNode&&r.parentNode.removeChild(r),o&&o.forEach((function(e){return e(a)})),t)return t(a)},m=setTimeout(h.bind(null,void 0,{type:"timeout",target:r}),12e4);r.onerror=h.bind(null,r.onerror),r.onload=h.bind(null,r.onload),c&&document.head.appendChild(r)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,t,a,n,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css";var s=function(a){if(i.onerror=i.onload=null,"load"===a.type)n();else{var s=a&&("load"===a.type?"missing":a.type),r=a&&a.target&&a.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=s,c.request=r,i.parentNode&&i.parentNode.removeChild(i),o(c)}};return i.onerror=i.onload=s,i.href=t,a?a.parentNode.insertBefore(i,a.nextSibling):document.head.appendChild(i),i},t=function(e,t){for(var a=document.getElementsByTagName("link"),n=0;n<a.length;n++){var o=a[n],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===e||i===t))return o}var s=document.getElementsByTagName("style");for(n=0;n<s.length;n++){o=s[n],i=o.getAttribute("data-href");if(i===e||i===t)return o}},n=function(n){return new Promise((function(o,i){var s=a.miniCssF(n),r=a.p+s;if(t(s,r))return o();e(n,r,null,o,i)}))},o={143:0};a.f.miniCss=function(e,t){var a={6:1,60:1,190:1,301:1,481:1,503:1,511:1,632:1,676:1,715:1,751:1,892:1};o[e]?t.push(o[e]):0!==o[e]&&a[e]&&t.push(o[e]=n(e).then((function(){o[e]=0}),(function(t){throw delete o[e],t})))}}}(),function(){var e={143:0};a.f.j=function(t,n){var o=a.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var i=new Promise((function(a,n){o=e[t]=[a,n]}));n.push(o[2]=i);var s=a.p+a.u(t),r=new Error,c=function(n){if(a.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var i=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;r.message="Loading chunk "+t+" failed.\n("+i+": "+s+")",r.name="ChunkLoadError",r.type=i,r.request=s,o[1](r)}};a.l(s,c,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,i,s=n[0],r=n[1],c=n[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(o in r)a.o(r,o)&&(a.m[o]=r[o]);if(c)var u=c(a)}for(t&&t(n);l<s.length;l++)i=s[l],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(u)},n=self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=a.O(void 0,[998],(function(){return a(6473)}));n=a.O(n)})();
//# sourceMappingURL=app.d939b6e5.js.map