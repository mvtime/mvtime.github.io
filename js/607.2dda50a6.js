"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[607],{5607:function(e,s,t){t.r(s),t.d(s,{default:function(){return Z}});var a=t(3396),l=t(7139);const n=e=>((0,a.dD)("data-v-4ec18c60"),e=e(),(0,a.Cn)(),e),i={class:"viewtask"},o={class:"modal_header",ref:"title"},r={class:"header_style modal_header_title"},_={ref:"contents",class:"overlay_contents"},d={key:0},c={class:"spaced_contents"},k={class:"styled_obj"},p=n((()=>(0,a._)("span",{class:"styled_line__label"},"Class:",-1))),h=n((()=>(0,a._)("span",{class:"styled_line__separator"},null,-1))),y={class:"styled_line__value"},u={key:0,class:"styled_obj"},m=n((()=>(0,a._)("span",{class:"styled_line__label"},"Name:",-1))),w=n((()=>(0,a._)("span",{class:"styled_line__separator"},null,-1))),v={class:"styled_line__value"},f={class:"styled_obj"},g=n((()=>(0,a._)("span",{class:"styled_line__label"},"Date:",-1))),b=n((()=>(0,a._)("span",{class:"styled_line__separator"},null,-1))),D={class:"styled_line__value"},O={key:1,class:"styled_obj"},$={class:"styled_line__label"},C=n((()=>(0,a._)("span",{class:"styled_line__separator"},null,-1))),j=["innerHTML"],T={key:2,class:"styled_obj links_obj"},z=n((()=>(0,a._)("span",{class:"styled_line__label"},"Links:",-1))),E=n((()=>(0,a._)("span",{class:"styled_line__separator"},null,-1))),x={class:"styled_line__value styled_line_links"},L=["href"],I=n((()=>(0,a._)("div",{class:"overlay_contents_text"}," Information is provided by teachers and volunteer students, and may not always be correct ",-1))),N={key:1,alt:"Loading Icon",class:"loading_icon"},q={class:"bottom_actions"},R=n((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),S=["disabled"];function H(e,s,t,n,H,K){return(0,a.wg)(),(0,a.iD)("main",i,[(0,a._)("header",o,[(0,a._)("h2",r," View "+(0,l.zw)(H.task&&H.task.type?H.task.type:"task")+" details ",1)],512),(0,a._)("div",_,[H.ready?((0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("div",c,[(0,a._)("div",k,[p,h,(0,a._)("span",y,(0,l.zw)(H.task.group||H.task.class_name),1)]),"note"!=H.task.type?((0,a.wg)(),(0,a.iD)("div",u,[m,w,(0,a._)("span",v,(0,l.zw)(H.task.name),1)])):(0,a.kq)("",!0),(0,a._)("div",f,[g,b,(0,a._)("span",D,(0,l.zw)(K.date),1)]),H.task.description||"note"==H.task.type?((0,a.wg)(),(0,a.iD)("div",O,[(0,a._)("span",$,(0,l.zw)("note"==H.task.type?"Contents":"Description")+":",1),C,(0,a._)("span",{class:"styled_line__value",innerHTML:H.task.description?H.task.description:"Not Provided"},null,8,j)])):(0,a.kq)("",!0),H.task.links?((0,a.wg)(),(0,a.iD)("div",T,[z,E,(0,a._)("span",x,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(H.task.links,(e=>((0,a.wg)(),(0,a.iD)("a",{class:"styled_line_links__link",target:"_blank",key:e.path,href:`/to/${encodeURIComponent(e.path)}`},(0,l.zw)(e.text),9,L)))),128))])])):(0,a.kq)("",!0)]),I])):((0,a.wg)(),(0,a.iD)("img",N))],512),(0,a._)("div",q,[(0,a._)("button",{class:"continue_action",onClick:s[0]||(s[0]=s=>e.$emit("close"))},"Close"),R,K.store.is_teacher&&K.store.user&&H.task&&H.task.ref.split("/")[0]==K.store.user.email.replace("@mvla.net","")?((0,a.wg)(),(0,a.iD)("button",{key:0,class:"edit_action primary_styled",onClick:s[1]||(s[1]=(...e)=>K.edit_task&&K.edit_task(...e))}," Edit ")):(0,a.kq)("",!0),(0,a._)("button",{class:"share_action",onClick:s[2]||(s[2]=(...e)=>K.share_task&&K.share_task(...e)),disabled:!H.ready},"Share",8,S)])])}t(7658);var K=t(1708),P=t(2745),V=t(8980),M=t(9529),U=t.n(M),F={name:"ViewTaskView",emits:["close"],mixins:[U()],data(){return{task:null,ready:!1}},computed:{store(){return(0,V.h)()},date(){let e=new Date(this.task?.date);if(!isNaN(e.getTime()))return e=new Date(e.getTime()+60*e.getTimezoneOffset()*1e3),new Date(e).toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}},mounted(){this.$smoothReflow({el:this.$refs.contents,hideOverflow:!0,childTransitions:!0}),this.$smoothReflow({el:this.$refs.title,hideOverflow:!0}),this.get_task()},methods:{async share_task(){if(navigator.share){let e=new URL(window.location.href);e.host="mvtt.app",e.port="",e.protocol="https",navigator.share({title:this.task.name,text:this.task.description,url:e.href}).then((()=>new K.bF("Opened share dialog",1e3))).catch((e=>(0,P.E)("Error sharing",e)))}else navigator.clipboard?(navigator.clipboard.writeText(window.location.href),new K.OO("Sharing not supported, copied link to clipboard",2e3)):new K.PK("Sharing not supported",2e3)},edit_task(){this.$router.push({name:"edit",params:{ref:this.task.ref.split("/").join("~")}})},async get_task(){const e=this.$route.params.ref.split("~").join("/");e?e.split("/").length<3&&(new K.OO("Invalid task specified",1500),this.$emit("close")):(new K.OO("No task specified",1500),this.$emit("close")),this.store.task_from_ref(e).then((e=>{e?((0,P.E)("📃 Got task data from ref"),this.task=e,this.ready=!0):(new K.OO("Couldn't find that task",2e3),this.$emit("close"))})).catch((e=>{new K.PK("Error getting task",1500),(0,P.E)("⚠ Error getting task",e),this.$emit("close")}))}}},G=t(89);const Y=(0,G.Z)(F,[["render",H],["__scopeId","data-v-4ec18c60"]]);var Z=Y}}]);
//# sourceMappingURL=607.2dda50a6.js.map