"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[988],{1458:function(e,t,s){s.d(t,{Z:function(){return _}});var a=s(3396),n=s(7139);const l=["closable"];function i(e,t,s,i,o,c){return(0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["overlay_center_view overlay_slot__wrapper",{animate_out:o.animating_out}])},[(0,a._)("div",{class:"overlay_close",onClick:t[0]||(t[0]=e=>c.closable?c.close():null),closable:c.closable},null,8,l),s.component?((0,a.wg)(),(0,a.j4)((0,a.LL)(s.component),{key:0,class:"overlay_slot",onClose:c.close},null,40,["onClose"])):(0,a.WI)(e.$slots,"default",{key:1,class:"overlay_slot",close:c.close})],2)}var o={name:"OverlayWrapper",emits:["close"],props:{component:{type:Object,default:null}},data(){return{animating_out:!1}},computed:{closable(){return!0!==this.$route?.meta?.block_close}},methods:{close(){this.animating_out=!0,setTimeout((()=>{window.onbeforeunload=null,this.$emit("close"),this.animating_out=!1}),250)}}},c=s(89);const r=(0,c.Z)(o,[["render",i]]);var _=r},988:function(e,t,s){s.r(t),s.d(t,{default:function(){return $t}});s(7658);var a=s(3396),n=s(7139);const l={class:"portal"},i={class:"portal_content__spaced"},o={class:"portal_info"},c={class:"portal_info_title"},r={class:"portal_info_usertype"},_={class:"portal_info_date"},d={class:"portal_info_welcome"};function h(e,t,s,h,u,m){const p=(0,a.up)("LeftBar"),v=(0,a.up)("CalendarBlock"),g=(0,a.up)("RightBar"),k=(0,a.up)("router-view"),f=(0,a.up)("OverlayWrapper");return(0,a.wg)(),(0,a.iD)("main",l,[(0,a.Wm)(p,{ref:"LeftBar",onToggle_filtered_class:m.toggle_filtered_class,onClear_filters:t[0]||(t[0]=e=>u.filtered_classes=[]),onClose_right_bar:m.close_right_bar,filtered_classes:u.filtered_classes},null,8,["onToggle_filtered_class","onClose_right_bar","filtered_classes"]),(0,a._)("div",{class:"portal_content",onClick:t[2]||(t[2]=e=>{m.close_right_bar(),m.close_left_bar()})},[(0,a._)("div",i,[(0,a._)("header",o,[(0,a._)("div",c,[(0,a._)("span",r,(0,n.zw)(m.store.is_teacher?"Teacher":"Student")+" Dashboard",1),(0,a._)("span",_,(0,n.zw)((new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})),1)]),(0,a._)("div",d,(0,n.zw)(m.store.recently_joined?"Welcome to MVTT":m.store.non_recent_signin?"Welcome Back":m.random_welcome)+" "+(0,n.zw)(m.name)+"! ",1)]),(0,a.Wm)(v,{filtered_classes:u.filtered_classes,onTaskclick:t[1]||(t[1]=e=>m.show_task(e))},null,8,["filtered_classes"])])]),(0,a.Wm)(g,{ref:"RightBar",onClose_left_bar:m.close_left_bar},null,8,["onClose_left_bar"]),"portal"!==e.$route.name?((0,a.wg)(),(0,a.j4)(f,{key:0,onClose:t[3]||(t[3]=t=>m.close_path?e.$router.push(m.close_path):e.$router.push("/portal"))},{default:(0,a.w5)((e=>[(0,a.Wm)(k,{class:"router_center_view",onClose:e.close},null,8,["onClose"])])),_:1})):(0,a.kq)("",!0)])}const u=e=>((0,a.dD)("data-v-68c092cf"),e=e(),(0,a.Cn)(),e),m={class:"sidebar_overflow"},p=u((()=>(0,a._)("div",{class:"branding-title gohome"},"MV Test Tracker",-1))),v=u((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),g=u((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),k=["_theme"],f=u((()=>(0,a._)("div",{class:"theme_icon"},null,-1))),y=u((()=>(0,a._)("div",{class:"toggle_text"},"Switch Theme",-1))),w=[f,y];function b(e,t,s,l,i,o){const c=(0,a.up)("ActionsPanel"),r=(0,a.up)("ClassList"),_=(0,a.up)("SidebarToggle");return(0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["left-bar portal_sidebar",{active:i.sidebar_open}]),onClick:t[1]||(t[1]=(...e)=>o.show_if_inactive&&o.show_if_inactive(...e))},[(0,a._)("div",m,[p,v,o.store&&o.store.is_teacher?((0,a.wg)(),(0,a.j4)(c,{key:0})):(0,a.kq)("",!0),(0,a.Wm)(r,(0,n.vs)((0,a.F4)(e.$attrs)),null,16),g]),(0,a._)("button",{_theme:o.store.get_theme,class:"theme_button click-action",title:"Switch Theme",onClick:t[0]||(t[0]=(...e)=>o.store.toggle_theme&&o.store.toggle_theme(...e))},w,8,k),(0,a.Wm)(_,{class:"right",onClick:o.close_sidebar},null,8,["onClick"])],2)}const C=e=>((0,a.dD)("data-v-2e4cb15c"),e=e(),(0,a.Cn)(),e),D={class:"sidebar_toggle click-action",title:"Close Sidebar"},T=C((()=>(0,a._)("div",{class:"arrow-icon"},null,-1))),S=[T];function $(e,t,s,n,l,i){return(0,a.wg)(),(0,a.iD)("button",D,S)}var x={name:"SidebarToggle"},L=s(89);const j=(0,L.Z)(x,[["render",$],["__scopeId","data-v-2e4cb15c"]]);var z=j;const M=e=>((0,a.dD)("data-v-15ebe7ca"),e=e(),(0,a.Cn)(),e),W={class:"class_list"},B=["title"],E=M((()=>(0,a._)("hr",{class:"class_list_hr"},null,-1))),Z=["onClick"],N=["onClick"],P=M((()=>(0,a._)("div",{class:"class_swatch__icon"},null,-1))),q=[P],I={key:0,class:"class_name"},O={key:1,class:"class_name"},U=M((()=>(0,a._)("div",{class:"class_swatch"},[(0,a._)("div",{class:"class_swatch__add_icon"})],-1))),H=M((()=>(0,a._)("span",{class:"class_name"},"Join a Class",-1))),A=[U,H];function R(e,t,s,l,i,o){return(0,a.wg)(),(0,a.iD)("div",W,[(0,a._)("div",{class:(0,n.C_)(["class_list__not_empty",{filtering:!!s.filtered_classes.length}])},[(0,a._)("h5",{onClick:t[0]||(t[0]=t=>e.$emit("clear_filters")),title:s.filtered_classes.length?"Click to clear filters":""}," Classes ",8,B),E,(0,a._)("div",{class:(0,n.C_)(["classes_container",{filtering:!!s.filtered_classes.length}])},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.classes,(t=>((0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["classes_container_class",{filter_active:s.filtered_classes.includes(t.id)}]),key:t.name,onClick:s=>e.$emit("toggle_filtered_class",t.id),style:(0,n.j5)({"--color-class":t.color,"--color-class-alt":t.color+"40"})},[(0,a._)("div",{class:"class_swatch",title:"Remove Class",onClick:s=>{o.store.remove_class(t.id),e.$emit("clear_filters"),s.stopPropagation()}},q,8,N),t.period?((0,a.wg)(),(0,a.iD)("span",I,"P"+(0,n.zw)(t.period)+" - "+(0,n.zw)(t.name),1)):((0,a.wg)(),(0,a.iD)("span",O,(0,n.zw)(t.name),1))],14,Z)))),128)),o.store.is_teacher?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",{key:0,class:"classes_container_class classes_container_class__add_class",onClick:t[1]||(t[1]=t=>e.$router.push("/portal/add"))},A))],2)],2)])}var Y=s(8980),K={props:{filtered_classes:{type:Array,default:()=>[]}},name:"ClassList",computed:{store(){return(0,Y.h)()},classes(){return this.store.classes}},emits:["toggle_filtered_class","clear_filters"]};const V=(0,L.Z)(K,[["render",R],["__scopeId","data-v-15ebe7ca"]]);var F=V;const Q={class:"teacher_actions"},J=["onClick"],G=(0,a._)("div",{class:"teacher_action__icon icon__add"},null,-1),X={class:"teacher_action__text"},ee=(0,a._)("div",{class:"teacher_action__icon icon__create"},null,-1),te=(0,a._)("div",{class:"teacher_action__text"},"Create a Class",-1),se=[ee,te];function ae(e,t,s,l,i,o){return(0,a.wg)(),(0,a.iD)("div",Q,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.task_types,(t=>((0,a.wg)(),(0,a.iD)("div",{key:t[0],class:"teacher_action",onClick:s=>e.$router.push({name:"newtask",params:{tasktype:t[0]}})},[G,(0,a._)("div",X,(0,n.zw)(t[1]),1)],8,J)))),128)),(0,a._)("div",{class:"teacher_action",onClick:t[0]||(t[0]=t=>e.$router.push("/portal/create"))},se)])}var ne={data(){return{task_types:[["note","Add a Note"],["task","Schedule an Assignment"],["project","Schedule a Project"],["test","Schedule a Test"],["quiz","Schedule a Quiz"],["exam","Schedule an Exam"]]}}};const le=(0,L.Z)(ne,[["render",ae]]);var ie=le,oe=s(1708),ce={name:"LeftBar",components:{SidebarToggle:z,ClassList:F,ActionsPanel:ie},emits:["close_right_bar","set_class"],data(){return{sidebar_open:!1}},computed:{store(){return(0,Y.h)()}},mounted(){window.addEventListener("resize",this.close_sidebar)},unmounted(){window.removeEventListener("resize",this.close_sidebar)},methods:{placeholderToast:oe.gy,show_if_inactive(){this.sidebar_open||(this.sidebar_open=!0),this.$emit("close_right_bar")},close_sidebar(){this.sidebar_open&&setTimeout((()=>this.sidebar_open=!1),10)},set_class(e){this.$emit("set_class",e)}}};const re=(0,L.Z)(ce,[["render",b],["__scopeId","data-v-68c092cf"]]);var _e=re;const de=e=>((0,a.dD)("data-v-0b39926e"),e=e(),(0,a.Cn)(),e),he={class:"sidebar_overflow"},ue=de((()=>(0,a._)("div",{class:"auth-action can-logout doprompt"},"Log Out",-1))),me=de((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),pe=de((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),ve=de((()=>(0,a._)("div",{class:"settings_icon"},null,-1))),ge=[ve];function ke(e,t,s,l,i,o){const c=(0,a.up)("UpcomingTests"),r=(0,a.up)("SidebarToggle");return(0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["right-bar portal_sidebar",{active:i.sidebar_open}]),onClick:t[1]||(t[1]=(...e)=>o.show_if_inactive&&o.show_if_inactive(...e))},[(0,a._)("div",he,[ue,me,(0,a.Wm)(c),pe]),(0,a._)("button",{class:"settings_button click-action",title:"Settings",onClick:t[0]||(t[0]=t=>e.$router.push("/settings"))},ge),(0,a.Wm)(r,{onClick:o.close_sidebar},null,8,["onClick"])],2)}const fe=e=>((0,a.dD)("data-v-581278ec"),e=e(),(0,a.Cn)(),e),ye={class:"upcoming_tasks"},we={key:0,class:"upcoming_tasks__not_empty"},be=fe((()=>(0,a._)("h5",null,"Upcoming",-1))),Ce=fe((()=>(0,a._)("hr",{class:"upcoming_tasks_hr"},null,-1))),De={class:"tasks_container"},Te={key:1,class:"upcoming_tasks__empty"},Se=fe((()=>(0,a._)("h5",null,"No Upcoming Tasks!",-1))),$e=[Se];function xe(e,t,s,n,l,i){const o=(0,a.up)("ExamCard");return(0,a.wg)(),(0,a.iD)("div",ye,[i.tasks&&i.tasks.length?((0,a.wg)(),(0,a.iD)("div",we,[be,Ce,(0,a._)("div",De,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(i.tasks,(e=>((0,a.wg)(),(0,a.j4)(o,{class:"tasks_container_task",task:e,key:e.name,onClick:t=>i.show_task(e)},null,8,["task","onClick"])))),128))])])):((0,a.wg)(),(0,a.iD)("div",Te,$e))])}const Le=(0,a._)("div",{class:"task_card_icon"},[(0,a._)("div",{class:"task_card_icon_container"},[(0,a._)("div",{class:"task_card_icon_container__img"})])],-1),je={class:"task_card_details"},ze={class:"task_card_details__title"},Me={class:"task_card_details__extended"},We={class:"task_card_details__extended__date"},Be={class:"task_card_details__extended__type"};function Ee(e,t,s,l,i,o){return(0,a.wg)(),(0,a.iD)("div",{class:"task_card",style:(0,n.j5)({"--color-calendar-task":s.task.color})},[Le,(0,a._)("div",je,[(0,a._)("div",ze,(0,n.zw)(s.task.name),1),(0,a._)("div",Me,[(0,a._)("span",We,(0,n.zw)(s.task.date.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})),1),(0,a.Uk)("  |  "),(0,a._)("span",Be,(0,n.zw)(o.type_full),1)])])],4)}var Ze={name:"ExamCard",props:{task:{type:Object,required:!0}},computed:{type_full(){return{note:"Note",task:"Assignment",test:"Test",project:"Project",quiz:"Quiz",exam:"Exam"}[this.task.type]}}};const Ne=(0,L.Z)(Ze,[["render",Ee]]);var Pe=Ne,qe={name:"UpcomingTasks",components:{ExamCard:Pe},computed:{store(){return(0,Y.h)()},tasks(){return this.store.tasks?this.store.tasks.filter((e=>(e?.date?.getTime?e.date.getTime():0)>=Date.now()&&!e.is_assignment)).sort(((e,t)=>e.date<t.date?-1:e.date>t.date?1:0)).slice(0,4):[]}},methods:{show_task(e){this.$router.push({name:e.is_assignment?"assignment":"task",params:{ref:e.ref}})}}};const Ie=(0,L.Z)(qe,[["render",xe],["__scopeId","data-v-581278ec"]]);var Oe=Ie,Ue={name:"RightBar",components:{SidebarToggle:z,UpcomingTests:Oe},emits:["close_left_bar"],data(){return{sidebar_open:!1}},mounted(){window.addEventListener("resize",this.close_sidebar)},unmounted(){window.removeEventListener("resize",this.close_sidebar)},methods:{show_if_inactive(){this.sidebar_open||(this.sidebar_open=!0),this.$emit("close_left_bar")},close_sidebar(){this.sidebar_open&&setTimeout((()=>this.sidebar_open=!1),10)}}};const He=(0,L.Z)(Ue,[["render",ke],["__scopeId","data-v-0b39926e"]]);var Ae=He;const Re=e=>((0,a.dD)("data-v-5ef6891b"),e=e(),(0,a.Cn)(),e),Ye={class:"calendar"},Ke={class:"calendar_header"},Ve=["title"],Fe={class:"calendar_actions"},Qe=Re((()=>(0,a._)("div",{class:"action_icon arrow-icon left"},null,-1))),Je=[Qe],Ge=Re((()=>(0,a._)("div",{class:"action_icon arrow-icon right"},null,-1))),Xe=[Ge],et={class:"calendar_days_container"},tt={class:"calendar_days"},st={class:"calendar_day_date"},at={class:"calendar_day_date__short"},nt={class:"calendar_day_date__long",style:{display:"none"}},lt={class:"calendar_day_tasks"},it=["is_note","title","onClick"],ot={key:0,class:"calendar__no_tasks",style:{display:"none"}};function ct(e,t,s,l,i,o){const c=(0,a.up)("LoadingCover");return(0,a.wg)(),(0,a.iD)("main",Ye,[i.is_ready?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(c,{key:0,class:"calendar_loading",covering:"Calendar Tasks"})),(0,a._)("div",Ke,[(0,a._)("div",{class:"calendar_date",title:"Currently viewing "+i.loaded_month.toLocaleDateString(void 0,{month:"long",year:"numeric"})},(0,n.zw)(i.loaded_month.toLocaleDateString("en-US",{month:"long",year:"numeric"})),9,Ve),(0,a._)("nav",Fe,[(0,a._)("button",{class:"calendar_action",onClick:t[0]||(t[0]=(...e)=>o.prev_month&&o.prev_month(...e)),title:"Previous month"},Je),(0,a._)("button",{class:"calendar_action",onClick:t[1]||(t[1]=(...e)=>o.this_month&&o.this_month(...e)),title:"Current month"},[(0,a._)("div",{class:(0,n.C_)(["action_icon cal-icon",{alt:i.tasks.length}])},null,2)]),(0,a._)("button",{class:"calendar_action",onClick:t[2]||(t[2]=(...e)=>o.next_month&&o.next_month(...e)),title:"Next month"},Xe)])]),(0,a._)("div",et,[(0,a._)("div",tt,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.days,(t=>((0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["calendar_day",{calendar_day__placeholder:t.is_placeholder,calendar_day__hastask:!!t.tasks&&t.tasks.length,calendar_day__today:t.is_today}]),key:t.date},[(0,a._)("div",st,[(0,a._)("span",at,(0,n.zw)(new Date(t.date).getDate()),1),(0,a._)("span",nt,(0,n.zw)(new Date(t.date).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})),1)]),(0,a._)("div",lt,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.tasks,(t=>((0,a.wg)(),(0,a.iD)("div",{class:"calendar_day_task",is_note:"note"===t.type,key:t.name,title:t.classes_class,style:(0,n.j5)({"--color-calendar-task":t.color}),onClick:s=>e.$emit("taskclick",t)},[(0,a._)("span",null,(0,n.zw)(t.name),1)],12,it)))),128))])],2)))),128)),o.tasks_loaded_month?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",ot," Relax! No Tasks. "))])])])}const rt=e=>((0,a.dD)("data-v-5a6b564c"),e=e(),(0,a.Cn)(),e),_t=["title"],dt=rt((()=>(0,a._)("div",{class:"loading_cover__overlay"},null,-1))),ht={class:"loading_cover__content"},ut={class:"loading_cover__content__icon"},mt=(0,a.uE)('<defs data-v-5a6b564c><circle id="dot" r="3" data-v-5a6b564c></circle></defs><g fill="var(--color-loading-dot, #000)" data-v-5a6b564c><circle cx="33%" cy="50%" r="3" data-v-5a6b564c><animate attributeName="r" values="3;7;3" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" data-v-5a6b564c></animate><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" data-v-5a6b564c></animate></circle><circle cx="50%" cy="50%" r="3" data-v-5a6b564c><animate attributeName="r" values="3;7;3" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.2s" data-v-5a6b564c></animate><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.2s" data-v-5a6b564c></animate></circle><circle cx="67%" cy="50%" r="3" data-v-5a6b564c><animate attributeName="r" values="3;7;3" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.4s" data-v-5a6b564c></animate><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.4s" data-v-5a6b564c></animate></circle></g>',2),pt=[mt];function vt(e,t,s,l,i,o){return(0,a.wg)(),(0,a.iD)("div",{class:"loading_cover",title:"Loading "+s.covering},[dt,(0,a._)("div",ht,[(0,a._)("div",ut,[((0,a.wg)(),(0,a.iD)("svg",{viewBox:"0 0 100 20",style:(0,n.j5)({width:"calc(33% + 100px)",minWidth:"100px",maxWidth:"400px"})},pt,4))]),(0,a.WI)(e.$slots,"default",{},void 0,!0)])],8,_t)}var gt={name:"LoadingCover",props:{covering:{type:String,default:"Content"}}};const kt=(0,L.Z)(gt,[["render",vt],["__scopeId","data-v-5a6b564c"]]);var ft=kt,yt=s(2745),wt={name:"CalendarBlock",components:{LoadingCover:ft},props:{filtered_classes:Array,default:()=>[]},emits:["taskclick"],data(){return{loaded_month:new Date((new Date).setDate(1)),is_ready:!1,tasks:[]}},mounted(){this.store.fetch_classes().then((()=>{this.run_get_tasks()})).catch((e=>{(0,yt.E)("🔥 Couldn't fetch classes",e)}))},methods:{day_matches(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()},get_day_tasks(e){return this.tasks.filter((t=>{const s=new Date(t.date);return this.day_matches(s,e)&&(!this.filtered_classes.length||this.filtered_classes.includes(t.class_id))}))},next_month(){this.loaded_month=new Date(this.loaded_month.setMonth(this.loaded_month.getMonth()+1))},this_month(){this.loaded_month=new Date((new Date).setDate(1))},prev_month(){this.loaded_month=new Date(this.loaded_month.setMonth(this.loaded_month.getMonth()-1))},run_get_tasks(){this.tasks=this.store.tasks,this.store.get_tasks().then((()=>{this.is_ready=!0})).catch((e=>{(0,yt.E)("🔥 Couldn't get tasks",e)}))}},computed:{tasks_loaded_month(){return this.tasks.some((e=>{new Date(e.date);return!0}))},store(){return(0,Y.h)()},days(){const e=[],t=this.loaded_month.getTime();function s(){return new Date(t)}const a=new Date(s().setDate(1)),n=new Date(s().setMonth(s().getMonth()+1,0));for(let l=a.getDay();l>0;l--){const t=new Date(s().setDate(-l));e.push({date:t,tasks:this.get_day_tasks(t),is_placeholder:!0})}for(let l=1;l<=n.getDate();l++){const t=new Date(s().setDate(l));e.push({date:t,tasks:this.get_day_tasks(t),is_today:this.day_matches(t,new Date)})}for(let l=1;e.length<42;l++){const t=new Date(s().setDate(n.getDate()+l));e.push({date:t,tasks:this.get_day_tasks(t),is_placeholder:!0})}return e}},watch:{"store.classes":{handler(e,t){e.length!=t.length&&this.store.fetch_classes().then((()=>{this.run_get_tasks()})).catch((e=>{(0,yt.E)("🔥 Couldn't fetch classes",e)}))},deep:!0},"store.tasks":{handler(){this.tasks=this.store.tasks},deep:!0}}};const bt=(0,L.Z)(wt,[["render",ct],["__scopeId","data-v-5ef6891b"]]);var Ct=bt,Dt=s(1458),Tt={name:"AppPortal",components:{LeftBar:_e,RightBar:Ae,CalendarBlock:Ct,OverlayWrapper:Dt.Z},data(){return{filtered_classes:[],welcomes:["Welcome","Hi","Hello","Hey","Howdy"]}},computed:{close_path(){return this.$route?.query?.redirect||this.$route?.meta?.close_path},name(){return this.store.user?.displayName?.split(" ")[0]||"User"},did_survey(){return this.store.done_daily_survey},random_welcome(){return this.welcomes[Math.floor(Math.random()*this.welcomes.length)]},store(){return(0,Y.h)()}},methods:{do_survey(){this.$router.replace({name:"daily",query:{redirect:this.$route.fullPath}}),new oe.OO("Please complete the daily survey to use MVTT today!",3e3)},close_left_bar(){this.$refs.LeftBar.close_sidebar()},close_right_bar(){this.$refs.RightBar.close_sidebar()},show_task(e){this.$router.push({name:"task",params:{ref:e.ref.replace("@mvla.net","").split("/").join("~")}})},toggle_filtered_class(e){this.filtered_classes.includes(e)?this.filtered_classes=this.filtered_classes.filter((t=>t!==e)):this.filtered_classes.push(e)},check_and_do_survey(){this?.store?.user&&!this?.did_survey&&!0!==this.$route?.meta?.noSurvey&&this.do_survey()},check_and_do_join(){this.store.done_join_form||(this.$router.push({name:"join",query:{redirect:this.$route.fullPath}}),new oe.OO("Please fill out the join form to use MVTT!",3e3))}},mounted(){this.check_and_do_join(),this.check_and_do_survey()},watch:{did_survey(){this.check_and_do_survey()},$route(){this.check_and_do_survey()},store:{handler(){this.check_and_do_join()},deep:!0}}};const St=(0,L.Z)(Tt,[["render",h],["__scopeId","data-v-63e4e8dc"]]);var $t=St}}]);
//# sourceMappingURL=988.bb59686a.js.map