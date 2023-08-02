"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[514],{3269:function(e,t,s){s.d(t,{Z:function(){return _}});var a=s(3396),n=s(7139);const i=["closable"];function l(e,t,s,l,o,c){return(0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["overlay_center_view overlay_slot__wrapper",{animate_out:o.animating_out}])},[(0,a._)("div",{class:"overlay_close",onClick:t[0]||(t[0]=e=>c.closable?c.close():null),closable:c.closable},null,8,i),s.component?((0,a.wg)(),(0,a.j4)((0,a.LL)(s.component),{key:0,class:"overlay_slot",onClose:c.close},null,40,["onClose"])):(0,a.WI)(e.$slots,"default",{key:1,class:"overlay_slot",close:c.close})],2)}var o={name:"OverlayWrapper",emits:["close"],props:{component:{type:Object,default:null}},data(){return{animating_out:!1}},computed:{closable(){return!0!==this.$route?.meta?.block_close}},methods:{close(){this.animating_out=!0,setTimeout((()=>{window.onbeforeunload=null,this.$emit("close")}),250)}}},c=s(89);const r=(0,c.Z)(o,[["render",l]]);var _=r},3514:function(e,t,s){s.r(t),s.d(t,{default:function(){return St}});s(7658);var a=s(3396),n=s(7139);const i={class:"portal"},l={class:"portal_content__spaced"},o={class:"portal_info"},c={class:"portal_info_title"},r={class:"portal_info_usertype"},_={class:"portal_info_date"},d={class:"portal_info_welcome"};function u(e,t,s,u,h,m){const p=(0,a.up)("LeftBar"),v=(0,a.up)("CalendarBlock"),g=(0,a.up)("RightBar"),k=(0,a.up)("router-view"),y=(0,a.up)("OverlayWrapper");return(0,a.wg)(),(0,a.iD)("main",i,[(0,a.Wm)(p,{ref:"LeftBar",onToggle_filtered_class:m.toggle_filtered_class,onClear_filters:t[0]||(t[0]=e=>h.filtered_classes=[]),onClose_right_bar:m.close_right_bar,filtered_classes:h.filtered_classes},null,8,["onToggle_filtered_class","onClose_right_bar","filtered_classes"]),(0,a._)("div",{class:"portal_content",onClick:t[2]||(t[2]=e=>{m.close_right_bar(),m.close_left_bar()})},[(0,a._)("div",l,[(0,a._)("header",o,[(0,a._)("div",c,[(0,a._)("span",r,(0,n.zw)(m.store.is_teacher?"Teacher":"Student")+" Dashboard",1),(0,a._)("span",_,(0,n.zw)((new Date).toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})),1)]),(0,a._)("div",d,(0,n.zw)(m.store.recently_joined?"Welcome to MVTT":m.store.non_recent_signin?"Welcome Back":m.random_welcome)+" "+(0,n.zw)(m.name)+"! ",1)]),(0,a.Wm)(v,{filtered_classes:h.filtered_classes,onTaskclick:t[1]||(t[1]=e=>m.show_task(e))},null,8,["filtered_classes"])])]),(0,a.Wm)(g,{ref:"RightBar",onClose_left_bar:m.close_left_bar},null,8,["onClose_left_bar"]),"portal"!==e.$route.name?((0,a.wg)(),(0,a.j4)(y,{key:0,onClose:t[3]||(t[3]=t=>m.close_path?e.$router.push(m.close_path):e.$router.push("/portal"))},{default:(0,a.w5)((e=>[(0,a.Wm)(k,{class:"router_center_view",onClose:e.close},null,8,["onClose"])])),_:1})):(0,a.kq)("",!0)])}const h=e=>((0,a.dD)("data-v-68c092cf"),e=e(),(0,a.Cn)(),e),m={class:"sidebar_overflow"},p=h((()=>(0,a._)("div",{class:"branding-title gohome"},"MV Test Tracker",-1))),v=h((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),g=h((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),k=["_theme"],y=h((()=>(0,a._)("div",{class:"theme_icon"},null,-1))),f=h((()=>(0,a._)("div",{class:"toggle_text"},"Switch Theme",-1))),w=[y,f];function b(e,t,s,i,l,o){const c=(0,a.up)("ActionsPanel"),r=(0,a.up)("ClassList"),_=(0,a.up)("SidebarToggle");return(0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["left-bar portal_sidebar",{active:l.sidebar_open}]),onClick:t[1]||(t[1]=(...e)=>o.show_if_inactive&&o.show_if_inactive(...e))},[(0,a._)("div",m,[p,v,o.store&&o.store.is_teacher?((0,a.wg)(),(0,a.j4)(c,{key:0})):(0,a.kq)("",!0),(0,a.Wm)(r,(0,n.vs)((0,a.F4)(e.$attrs)),null,16),g]),(0,a._)("button",{_theme:o.store.get_theme,class:"theme_button click-action",title:"Switch Theme",onClick:t[0]||(t[0]=(...e)=>o.store.toggle_theme&&o.store.toggle_theme(...e))},w,8,k),(0,a.Wm)(_,{class:"right",onClick:o.close_sidebar},null,8,["onClick"])],2)}const C=e=>((0,a.dD)("data-v-2e4cb15c"),e=e(),(0,a.Cn)(),e),D={class:"sidebar_toggle click-action",title:"Close Sidebar"},T=C((()=>(0,a._)("div",{class:"arrow-icon"},null,-1))),S=[T];function $(e,t,s,n,i,l){return(0,a.wg)(),(0,a.iD)("button",D,S)}var x={name:"SidebarToggle"},L=s(89);const j=(0,L.Z)(x,[["render",$],["__scopeId","data-v-2e4cb15c"]]);var M=j;const z=e=>((0,a.dD)("data-v-15ebe7ca"),e=e(),(0,a.Cn)(),e),W={class:"class_list"},B=["title"],N=z((()=>(0,a._)("hr",{class:"class_list_hr"},null,-1))),Z=["onClick"],O=["onClick"],P=z((()=>(0,a._)("div",{class:"class_swatch__icon"},null,-1))),U=[P],q={key:0,class:"class_name"},I={key:1,class:"class_name"},H=z((()=>(0,a._)("div",{class:"class_swatch"},[(0,a._)("div",{class:"class_swatch__add_icon"})],-1))),E=z((()=>(0,a._)("span",{class:"class_name"},"Join a Class",-1))),A=[H,E];function R(e,t,s,i,l,o){return(0,a.wg)(),(0,a.iD)("div",W,[(0,a._)("div",{class:(0,n.C_)(["class_list__not_empty",{filtering:!!s.filtered_classes.length}])},[(0,a._)("h5",{onClick:t[0]||(t[0]=t=>e.$emit("clear_filters")),title:s.filtered_classes.length?"Click to clear filters":""}," Classes ",8,B),N,(0,a._)("div",{class:(0,n.C_)(["classes_container",{filtering:!!s.filtered_classes.length}])},[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.classes,(t=>((0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["classes_container_class",{filter_active:s.filtered_classes.includes(t.id)}]),key:t.name,onClick:s=>e.$emit("toggle_filtered_class",t.id),style:(0,n.j5)({"--color-class":t.color,"--color-class-alt":t.color+"40"})},[(0,a._)("div",{class:"class_swatch",title:"Remove Class",onClick:s=>{o.store.remove_class(t.id),e.$emit("clear_filters"),s.stopPropagation()}},U,8,O),t.period?((0,a.wg)(),(0,a.iD)("span",q,"P"+(0,n.zw)(t.period)+" - "+(0,n.zw)(t.name),1)):((0,a.wg)(),(0,a.iD)("span",I,(0,n.zw)(t.name),1))],14,Z)))),128)),o.store.is_teacher?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",{key:0,class:"classes_container_class classes_container_class__add_class",onClick:t[1]||(t[1]=t=>e.$router.push("/portal/add"))},A))],2)],2)])}var Y=s(8980),K={props:{filtered_classes:{type:Array,default:()=>[]}},name:"ClassList",computed:{store(){return(0,Y.h)()},classes(){return this.store.classes}},emits:["toggle_filtered_class","clear_filters"]};const V=(0,L.Z)(K,[["render",R],["__scopeId","data-v-15ebe7ca"]]);var F=V;const J={class:"teacher_actions"},G=["onClick"],Q=(0,a._)("div",{class:"teacher_action__icon icon__add"},null,-1),X={class:"teacher_action__text"},ee=(0,a._)("div",{class:"teacher_action__icon icon__create"},null,-1),te=(0,a._)("div",{class:"teacher_action__text"},"Create a Class",-1),se=[ee,te];function ae(e,t,s,i,l,o){return(0,a.wg)(),(0,a.iD)("div",J,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.test_types,(t=>((0,a.wg)(),(0,a.iD)("div",{key:t[0],class:"teacher_action",onClick:s=>e.$router.push({name:"newtask",params:{tasktype:t[0]}})},[Q,(0,a._)("div",X,"Schedule a "+(0,n.zw)(t[1]),1)],8,G)))),128)),(0,a._)("div",{class:"teacher_action",onClick:t[0]||(t[0]=t=>e.$router.push("/portal/create"))},se)])}var ne={data(){return{test_types:[["socratic","Socratic Seminar"],["test","Test"],["summative","Summative Assignment"],["midterm","Midterm"],["project","Project"]]}}};const ie=(0,L.Z)(ne,[["render",ae]]);var le=ie,oe=s(1708),ce={name:"LeftBar",components:{SidebarToggle:M,ClassList:F,ActionsPanel:le},emits:["close_right_bar","set_class"],data(){return{sidebar_open:!1}},computed:{store(){return(0,Y.h)()}},mounted(){window.addEventListener("resize",this.close_sidebar)},unmounted(){window.removeEventListener("resize",this.close_sidebar)},methods:{placeholderToast:oe.gy,show_if_inactive(){this.sidebar_open||(this.sidebar_open=!0),this.$emit("close_right_bar")},close_sidebar(){this.sidebar_open&&setTimeout((()=>this.sidebar_open=!1),10)},set_class(e){this.$emit("set_class",e)}}};const re=(0,L.Z)(ce,[["render",b],["__scopeId","data-v-68c092cf"]]);var _e=re;const de=e=>((0,a.dD)("data-v-0b39926e"),e=e(),(0,a.Cn)(),e),ue={class:"sidebar_overflow"},he=de((()=>(0,a._)("div",{class:"auth-action can-logout doprompt"},"Log Out",-1))),me=de((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),pe=de((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),ve=de((()=>(0,a._)("div",{class:"settings_icon"},null,-1))),ge=[ve];function ke(e,t,s,i,l,o){const c=(0,a.up)("UpcomingTests"),r=(0,a.up)("SidebarToggle");return(0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["right-bar portal_sidebar",{active:l.sidebar_open}]),onClick:t[1]||(t[1]=(...e)=>o.show_if_inactive&&o.show_if_inactive(...e))},[(0,a._)("div",ue,[he,me,(0,a.Wm)(c),pe]),(0,a._)("button",{class:"settings_button click-action",title:"Settings",onClick:t[0]||(t[0]=t=>e.$router.push("/settings"))},ge),(0,a.Wm)(r,{onClick:o.close_sidebar},null,8,["onClick"])],2)}const ye=e=>((0,a.dD)("data-v-40e18018"),e=e(),(0,a.Cn)(),e),fe={class:"upcoming_tasks"},we={key:0,class:"upcoming_tasks__not_empty"},be=ye((()=>(0,a._)("h5",null,"Upcoming",-1))),Ce=ye((()=>(0,a._)("hr",{class:"upcoming_tasks_hr"},null,-1))),De={class:"tasks_container"},Te={key:1,class:"upcoming_tasks__empty"},Se=ye((()=>(0,a._)("h5",null,"No Upcoming Tasks!",-1))),$e=[Se];function xe(e,t,s,n,i,l){const o=(0,a.up)("ExamCard");return(0,a.wg)(),(0,a.iD)("div",fe,[l.tasks&&l.tasks.length?((0,a.wg)(),(0,a.iD)("div",we,[be,Ce,(0,a._)("div",De,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(l.tasks,(e=>((0,a.wg)(),(0,a.j4)(o,{class:"tasks_container_task",task:e,key:e.name,onClick:t=>l.show_task(e)},null,8,["task","onClick"])))),128))])])):((0,a.wg)(),(0,a.iD)("div",Te,$e))])}const Le=(0,a._)("div",{class:"task_card_icon"},[(0,a._)("div",{class:"task_card_icon_container"},[(0,a._)("div",{class:"task_card_icon_container__img"})])],-1),je={class:"task_card_details"},Me={class:"task_card_details__title"},ze={class:"task_card_details__extended"},We={class:"task_card_details__extended__date"},Be={class:"task_card_details__extended__type"};function Ne(e,t,s,i,l,o){return(0,a.wg)(),(0,a.iD)("div",{class:"task_card",style:(0,n.j5)({"--color-calendar-task":s.task.color})},[Le,(0,a._)("div",je,[(0,a._)("div",Me,(0,n.zw)(s.task.name),1),(0,a._)("div",ze,[(0,a._)("span",We,(0,n.zw)(s.task.date.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})),1),(0,a.Uk)("  |  "),(0,a._)("span",Be,(0,n.zw)(o.type_full),1)])])],4)}var Ze={name:"ExamCard",props:{task:{type:Object,required:!0}},computed:{type_full(){return{socratic:"Socratic Seminar",test:"Test",summative:"Summative Assignment",midterm:"Midterm",project:"Project",task:"Task"}[this.task.type]}}};const Oe=(0,L.Z)(Ze,[["render",Ne]]);var Pe=Oe,Ue={name:"UpcomingTasks",components:{ExamCard:Pe},computed:{store(){return(0,Y.h)()},tasks(){return this.store.get_tasks.filter((e=>e.date?.getTime()>=Date.now()&&!e.is_assignment)).sort(((e,t)=>e.date<t.date?-1:e.date>t.date?1:0)).slice(0,4)}},methods:{show_task(e){let t=JSON.stringify({name:e.name,group:e.class_name,date:e.date.toLocaleDateString("en-US").replace("/","-"),description:e.description,links:e.links,type:e.type});this.$router.push({name:e.is_assignment?"assignment":"task",query:{task:t}})}}};const qe=(0,L.Z)(Ue,[["render",xe],["__scopeId","data-v-40e18018"]]);var Ie=qe,He={name:"RightBar",components:{SidebarToggle:M,UpcomingTests:Ie},emits:["close_left_bar"],data(){return{sidebar_open:!1}},mounted(){window.addEventListener("resize",this.close_sidebar)},unmounted(){window.removeEventListener("resize",this.close_sidebar)},methods:{show_if_inactive(){this.sidebar_open||(this.sidebar_open=!0),this.$emit("close_left_bar")},close_sidebar(){this.sidebar_open&&setTimeout((()=>this.sidebar_open=!1),10)}}};const Ee=(0,L.Z)(He,[["render",ke],["__scopeId","data-v-0b39926e"]]);var Ae=Ee;const Re=e=>((0,a.dD)("data-v-01f732c6"),e=e(),(0,a.Cn)(),e),Ye={class:"calendar"},Ke={class:"calendar_header"},Ve=["title"],Fe={class:"calendar_actions"},Je=Re((()=>(0,a._)("div",{class:"action_icon arrow-icon left"},null,-1))),Ge=[Je],Qe=Re((()=>(0,a._)("div",{class:"action_icon arrow-icon right"},null,-1))),Xe=[Qe],et={class:"calendar_days_container"},tt={class:"calendar_days"},st={class:"calendar_day_date"},at={class:"calendar_day_date__short"},nt={class:"calendar_day_date__long",style:{display:"none"}},it={class:"calendar_day_tasks"},lt=["title","onClick"],ot={key:0,class:"calendar__no_tasks",style:{display:"none"}};function ct(e,t,s,i,l,o){const c=(0,a.up)("LoadingCover");return(0,a.wg)(),(0,a.iD)("main",Ye,[l.is_ready?(0,a.kq)("",!0):((0,a.wg)(),(0,a.j4)(c,{key:0,class:"calendar_loading",covering:"Calendar Tasks"})),(0,a._)("div",Ke,[(0,a._)("div",{class:"calendar_date",title:"Currently viewing "+l.loaded_month.toLocaleDateString(void 0,{month:"long",year:"numeric"})},(0,n.zw)(l.loaded_month.toLocaleDateString("en-US",{month:"long",year:"numeric"})),9,Ve),(0,a._)("nav",Fe,[(0,a._)("button",{class:"calendar_action",onClick:t[0]||(t[0]=(...e)=>o.prev_month&&o.prev_month(...e)),title:"Previous month"},Ge),(0,a._)("button",{class:"calendar_action",onClick:t[1]||(t[1]=(...e)=>o.this_month&&o.this_month(...e)),title:"Current month"},[(0,a._)("div",{class:(0,n.C_)(["action_icon cal-icon",{alt:o.tasks.length}])},null,2)]),(0,a._)("button",{class:"calendar_action",onClick:t[2]||(t[2]=(...e)=>o.next_month&&o.next_month(...e)),title:"Next month"},Xe)])]),(0,a._)("div",et,[(0,a._)("div",tt,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(o.days,(t=>((0,a.wg)(),(0,a.iD)("div",{class:(0,n.C_)(["calendar_day",{calendar_day__placeholder:t.is_placeholder,calendar_day__hastask:!!t.tasks&&t.tasks.length,calendar_day__today:t.is_today}]),key:t.date},[(0,a._)("div",st,[(0,a._)("span",at,(0,n.zw)(new Date(t.date).getDate()),1),(0,a._)("span",nt,(0,n.zw)(new Date(t.date).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})),1)]),(0,a._)("div",it,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(t.tasks,(t=>((0,a.wg)(),(0,a.iD)("div",{class:"calendar_day_task",key:t.name,title:t.classes_class,style:(0,n.j5)({"--color-calendar-task":t.color}),onClick:s=>e.$emit("taskclick",t)},[(0,a._)("span",null,(0,n.zw)(t.name),1)],12,lt)))),128))])],2)))),128)),o.tasks_loaded_month?(0,a.kq)("",!0):((0,a.wg)(),(0,a.iD)("div",ot," Relax! No Tasks. "))])])])}const rt=e=>((0,a.dD)("data-v-5a6b564c"),e=e(),(0,a.Cn)(),e),_t=["title"],dt=rt((()=>(0,a._)("div",{class:"loading_cover__overlay"},null,-1))),ut={class:"loading_cover__content"},ht={class:"loading_cover__content__icon"},mt=(0,a.uE)('<defs data-v-5a6b564c><circle id="dot" r="3" data-v-5a6b564c></circle></defs><g fill="var(--color-loading-dot, #000)" data-v-5a6b564c><circle cx="33%" cy="50%" r="3" data-v-5a6b564c><animate attributeName="r" values="3;7;3" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" data-v-5a6b564c></animate><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" data-v-5a6b564c></animate></circle><circle cx="50%" cy="50%" r="3" data-v-5a6b564c><animate attributeName="r" values="3;7;3" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.2s" data-v-5a6b564c></animate><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.2s" data-v-5a6b564c></animate></circle><circle cx="67%" cy="50%" r="3" data-v-5a6b564c><animate attributeName="r" values="3;7;3" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.4s" data-v-5a6b564c></animate><animate attributeName="opacity" values="0.2;1;0.2" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.42 0 0.58 1;0.42 0 0.58 1" begin="0.4s" data-v-5a6b564c></animate></circle></g>',2),pt=[mt];function vt(e,t,s,i,l,o){return(0,a.wg)(),(0,a.iD)("div",{class:"loading_cover",title:"Loading "+s.covering},[dt,(0,a._)("div",ut,[(0,a._)("div",ht,[((0,a.wg)(),(0,a.iD)("svg",{viewBox:"0 0 100 20",style:(0,n.j5)({width:"calc(33% + 100px)",minWidth:"100px",maxWidth:"400px"})},pt,4))]),(0,a.WI)(e.$slots,"default",{},void 0,!0)])],8,_t)}var gt={name:"LoadingCover",props:{covering:{type:String,default:"Content"}}};const kt=(0,L.Z)(gt,[["render",vt],["__scopeId","data-v-5a6b564c"]]);var yt=kt,ft={name:"CalendarBlock",components:{LoadingCover:yt},props:{filtered_classes:Array,default:()=>[]},emits:["taskclick"],data(){return{loaded_month:new Date((new Date).setDate(1)),is_ready:!0}},methods:{day_matches(e,t){return e.getDate()===t.getDate()&&e.getMonth()===t.getMonth()&&e.getFullYear()===t.getFullYear()},get_day_tasks(e){return this.tasks.filter((t=>{const s=new Date(t.date);return this.day_matches(s,e)&&(!this.filtered_classes.length||this.filtered_classes.includes(t.class_id))}))},next_month(){this.loaded_month=new Date(this.loaded_month.setMonth(this.loaded_month.getMonth()+1))},this_month(){this.loaded_month=new Date((new Date).setDate(1))},prev_month(){this.loaded_month=new Date(this.loaded_month.setMonth(this.loaded_month.getMonth()-1))}},computed:{tasks_loaded_month(){return this.tasks.some((e=>{new Date(e.date);return!0}))},tasks(){return this.store.get_tasks},store(){return(0,Y.h)()},days(){const e=[],t=this.loaded_month.getTime();function s(){return new Date(t)}const a=new Date(s().setDate(1)),n=new Date(s().setMonth(s().getMonth()+1,0));for(let i=a.getDay();i>0;i--){const t=new Date(s().setDate(-i));e.push({date:t,tasks:this.get_day_tasks(t),is_placeholder:!0})}for(let i=1;i<=n.getDate();i++){const t=new Date(s().setDate(i));e.push({date:t,tasks:this.get_day_tasks(t),is_today:this.day_matches(t,new Date)})}for(let i=1;e.length<42;i++){const t=new Date(s().setDate(n.getDate()+i));e.push({date:t,tasks:this.get_day_tasks(t),is_placeholder:!0})}return e}},watch:{tasks(){this.is_ready=!0}}};const wt=(0,L.Z)(ft,[["render",ct],["__scopeId","data-v-01f732c6"]]);var bt=wt,Ct=s(3269),Dt={name:"AppPortal",components:{LeftBar:_e,RightBar:Ae,CalendarBlock:bt,OverlayWrapper:Ct.Z},data(){return{filtered_classes:[],welcomes:["Welcome","Hi","Hello","Hey","Howdy"]}},computed:{close_path(){return this.$route?.query?.redirect||this.$route?.meta?.close_path},store(){return(0,Y.h)()},name(){let e=this.store;return e.user&&e.user.displayName?e.user.displayName.split(" ")[0]:"User"},did_survey(){return this.store?.done_daily_survey},random_welcome(){return this.welcomes[Math.floor(Math.random()*this.welcomes.length)]}},methods:{do_survey(){this.$router.push({name:"daily",query:{redirect:this.$route.fullPath}}),new oe.OO("Please complete the daily survey to use MVTT today!",3e3)},close_left_bar(){this.$refs.LeftBar.close_sidebar()},close_right_bar(){this.$refs.RightBar.close_sidebar()},placeholderToast:oe.gy,show_task(e){let t=JSON.stringify({name:e.name,group:e.class_name,date:e.date.toLocaleDateString("en-US").replace("/","-"),description:e.description,links:e.links,type:e.type,class_id:e.class_id});this.$router.push({name:"task",query:{task:t}})},toggle_filtered_class(e){this.filtered_classes.includes(e)?this.filtered_classes=this.filtered_classes.filter((t=>t!==e)):this.filtered_classes.push(e)},check_and_do_survey(){this?.store?.user&&!this?.did_survey&&!0!==this.$route?.meta?.noSurvey&&this.do_survey()},check_and_do_join(){this.store?.user&&this.store?.doc&&!this.store?.doc?.join_form&&(this.$router.push({name:"join",query:{redirect:this.$route.fullPath}}),new oe.OO("Please fill out the join form to use MVTT!",3e3))}},mounted(){this.check_and_do_join(),this.check_and_do_survey()},watch:{did_survey(){this.check_and_do_survey()},$route(){this.check_and_do_survey()},store:{handler(){this.check_and_do_join()},deep:!0}}};const Tt=(0,L.Z)(Dt,[["render",u],["__scopeId","data-v-5acc58f0"]]);var St=Tt}}]);
//# sourceMappingURL=514.e4164af2.js.map