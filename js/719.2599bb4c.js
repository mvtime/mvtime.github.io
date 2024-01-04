"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[719],{3096:function(s,e,a){a.d(e,{Z:function(){return v}});var t=a(3396),i=a(7139);const l=["title"],n=(0,t._)("div",{class:"task_card_icon_container"},[(0,t._)("div",{class:"task_card_icon_container__img"})],-1),o=[n],c={class:"task_card_details"},r={class:"task_card_details__title"},_={class:"task_card_details__extended"},d={class:"task_card_details__extended__date"},p={class:"task_card_details__extended__type"};function u(s,e,a,n,u,h){return(0,t.wg)(),(0,t.iD)("a",{class:"task_card",style:(0,i.j5)({"--color-calendar-task":a.task.color})},[(0,t._)("div",{class:"task_card_icon",title:a.task.class_name},o,8,l),(0,t._)("div",c,[(0,t._)("div",r,(0,i.zw)(a.task.name),1),(0,t._)("div",_,[(0,t._)("span",d,(0,i.zw)(a.task.date.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})),1),(0,t.Uk)("  |  "),(0,t._)("span",p,(0,i.zw)(h.type_full),1)])])],4)}var h={name:"ExamCard",props:{task:{type:Object,required:!0}},computed:{type_full(){return{note:"Note",task:"Assignment",test:"Test",project:"Project",quiz:"Quiz",exam:"Exam"}[this.task.type]}}},m=a(89);const g=(0,m.Z)(h,[["render",u]]);var v=g},7719:function(s,e,a){a.r(e),a.d(e,{default:function(){return ns}});var t=a(3396),i=a(7139);const l=s=>((0,t.dD)("data-v-47ff5c96"),s=s(),(0,t.Cn)(),s),n={class:"viewclass"},o={class:"modal_header",ref:"title"},c=l((()=>(0,t._)("h2",{class:"header_style modal_header_title"},"View class details",-1))),r=[c],_={ref:"contents",class:"overlay_contents"},d={key:0,ref:"text_contents"},p={class:"spaced_contents"},u={class:"styled_obj"},h=l((()=>(0,t._)("span",{class:"styled_line__label"},"Class:",-1))),m=l((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),g={class:"styled_line__value"},v=["href"],f={class:"styled_obj"},k=l((()=>(0,t._)("span",{class:"styled_line__label"},"Period:",-1))),y=l((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),b={class:"styled_line__value"},w={class:"styled_obj"},j=l((()=>(0,t._)("span",{class:"styled_line__label"},"Name:",-1))),$=l((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),C={class:"styled_line__value"},O={class:"styled_obj"},D=l((()=>(0,t._)("span",{class:"styled_line__label"},"Description:",-1))),x=l((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),z=["innerHTML"],E={class:"styled_obj upcoming_section",ref:"upcoming"},L=l((()=>(0,t._)("span",{class:"styled_line__label"},"Upcoming:",-1))),T=l((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),I={key:0,class:"load_text"},N={key:1,class:"upcoming_tasks_container"},H={key:0,class:"upcoming_tasks_loading"},P=l((()=>(0,t._)("img",{alt:"Loading Icon",class:"loading_icon",src:"/assets/loading.svg"},null,-1))),S=[P],q={key:1,class:"upcoming_tasks"},A={key:2},M=l((()=>(0,t._)("div",{class:"overlay_contents_text"}," Information is provided by teachers and volunteer students, and may not always be correct ",-1))),R={key:1,ref:"loading_contents",alt:"Loading Icon",class:"loading_icon"},U={class:"bottom_actions"},V=l((()=>(0,t._)("div",{class:"flex_spacer"},null,-1))),Z=["disabled"],G=["disabled"],K=["disabled"];function B(s,e,a,l,c,P){const B=(0,t.up)("ExamCard");return(0,t.wg)(),(0,t.iD)("main",n,[(0,t._)("header",o,r,512),(0,t._)("div",_,[c.ready?((0,t.wg)(),(0,t.iD)("div",d,[(0,t._)("div",p,[(0,t._)("div",u,[h,m,(0,t._)("span",g,[(0,t._)("a",{class:"class_name button_pointer_text",href:`/view/${this.$route.params.ref}`,onClick:e[0]||(e[0]=s=>s.preventDefault()),style:(0,i.j5)({"--color-class":c.class_obj.color,"--color-class-alt":c.class_obj.color+"2d"})},"P"+(0,i.zw)(c.class_obj.period)+" - "+(0,i.zw)(c.class_obj.name),13,v)])]),(0,t._)("div",f,[k,y,(0,t._)("span",b,(0,i.zw)(c.class_obj.period)+" (Schedules "+(0,i.zw)(c.schedules[c.class_obj.period%2].join(", "))+")",1)]),(0,t._)("div",w,[j,$,(0,t._)("span",C,(0,i.zw)(c.class_obj.name),1)]),(0,t._)("div",O,[D,x,(0,t._)("span",{class:"styled_line__value",innerHTML:P.text||"Not Provided"},null,8,z)]),(0,t._)("div",E,[L,T,(0,t._)("span",{onClick:e[1]||(e[1]=(...s)=>P.get_upcoming&&P.get_upcoming(...s)),class:(0,i.C_)(["styled_line__value alt_bg",{loading_clickable:!c.upcoming&&!c.loading_upcoming,loading_bg:c.loading_upcoming}])},[c.upcoming||c.loading_upcoming?c.loading_upcoming?(0,t.kq)("",!0):((0,t.wg)(),(0,t.iD)("div",N,[c.loading_upcoming?((0,t.wg)(),(0,t.iD)("div",H,S)):c.upcoming&&c.upcoming.length?((0,t.wg)(),(0,t.iD)("div",q,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(c.upcoming,(s=>((0,t.wg)(),(0,t.j4)(B,{class:"upcoming_tasks__task",task:s,key:s.name,href:`/view/${s.ref}`,onClick:e=>{e.preventDefault(),P.show_task(s.ref)}},null,8,["task","href","onClick"])))),128))])):((0,t.wg)(),(0,t.iD)("span",A,"No Upcoming Tasks"))])):((0,t.wg)(),(0,t.iD)("span",I,"Click to Load"))],2)],512)]),M],512)):((0,t.wg)(),(0,t.iD)("img",R,null,512))],512),(0,t._)("div",U,[(0,t._)("button",{class:"close_action click_escape",onClick:e[2]||(e[2]=e=>s.$emit("close"))},"Close"),V,(0,t._)("button",{class:"share_action primary_styled",onClick:e[3]||(e[3]=(...s)=>P.share_class&&P.share_class(...s)),disabled:!c.ready}," Share ",8,Z),P.editable?((0,t.wg)(),(0,t.iD)("button",{key:0,class:"edit_action primary_styled",disabled:!c.ready,onClick:e[4]||(e[4]=(...s)=>P.edit_class&&P.edit_class(...s))}," Edit ",8,G)):P.store.user&&c.class_obj?((0,t.wg)(),(0,t.iD)("button",{key:1,class:(0,i.C_)(["join_leave_action primary_styled",{click_escape:P.joinable}]),disabled:!c.ready,onClick:e[5]||(e[5]=s=>{P.joinable?P.join_class():P.leave_class()})},(0,i.zw)(P.joinable?"Join":"Leave"),11,K)):(0,t.kq)("",!0)])])}a(7658);var F=a(1708),J=a(2745),Q=a(8980),Y=a(9529),W=a.n(Y),X=a(4478),ss=a.n(X),es=a(3096);let as=new(ss().Converter);var ts={name:"ViewClassView",emits:["close"],mixins:[W()],components:{ExamCard:es.Z},data(){return{class_obj:null,ready:!1,loading_upcoming:!1,upcoming:null,schedules:[["A","G","C","D","and H"],["A","G","B","E","and I"]]}},computed:{store(){return(0,Q.h)()},text(){return this.class_obj?.description&&as.makeHtml(this.class_obj?.description)},joinable(){return this.store.user&&this.class_obj&&!this.store?.active_doc?.classes?.includes(this.store.ref_to_path(this.$route.params.ref))},editable(){return this.store.is_teacher&&this.store.user&&this.class_obj&&this.$route.params.ref&&this.$route.params.ref.split("~")[0]==this.store.active_doc.email.replace(this.store.ORG_DOMAIN,"")}},mounted(){this.$smoothReflow({el:this.$refs.contents,hideOverflow:!1,childTransitions:!1}),this.$smoothReflow({el:this.$refs.title,hideOverflow:!0}),this.get_class()},methods:{async share_class(){let s=new URL("https://view.mvtt.app/"+this.$route.params.ref);navigator.share?navigator.share({title:this.class_obj.name,text:`Check out ${this.class_obj.name||"this class"} on MVTT!`,url:s.href}).then((()=>new F.bF("Opened share dialog",1e3))).catch((s=>J.i2.error("🔥 Error sharing",s))):navigator.clipboard?(navigator.clipboard.writeText(s.href),new F.OO("Sharing not supported, copied link to clipboard",2e3)):new F.OO("Sharing and copying not supported, sorry",2e3)},edit_class(){this.$router.push({name:"editclass",params:{ref:this.$route?.params?.ref}})},join_class(){this.$router.push({name:"refclass",params:{ref:this.$route?.params?.ref}})},leave_class(){this.$router.push({name:"leave",params:{ref:this.$route?.params?.ref}})},async get_upcoming(){null==this.upcoming&&(this.loading_upcoming=!0,this.store.upcoming_from_ref(this.$route.params.ref.split("~").join("/"),this.class_obj).then((s=>{this.upcoming=s,this.loading_upcoming=!1})).catch((s=>{new F.OO("Couldn't get upcoming tasks",2e3),J.i2.error("⚠ Couldn't get upcoming tasks",s),this.loading_upcoming=!1})))},async get_class(){if(!this.$route.params.ref)return new F.OO("No class specified",1500),void this.$emit("close");const s=this.$route.params.ref.split("~").join("/");return s?2!=s.split("/").length?(new F.OO("Invalid class specified",1500),void this.$emit("close")):void this.store.class_from_ref(s).then((s=>{s?(this.class_obj=s,this.ready=!0):(new F.OO("Couldn't find that class",2e3),this.$emit("close"))})).catch((s=>{new F.PK("Error getting class",s,1500),J.i2.error("⚠ Error getting class",s),this.$emit("close")})):(new F.OO("No class specified",1500),void this.$emit("close"))},show_task(s){this.$router.push({name:"viewtask",params:{ref:s}})}}},is=a(89);const ls=(0,is.Z)(ts,[["render",B],["__scopeId","data-v-47ff5c96"]]);var ns=ls}}]);
//# sourceMappingURL=719.2599bb4c.js.map