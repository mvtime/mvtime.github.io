"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[371],{8371:function(s,a,e){e.r(a),e.d(a,{default:function(){return E}});e(7658);var t=e(3396),l=e(7139);const n=s=>((0,t.dD)("data-v-21cd89cc"),s=s(),(0,t.Cn)(),s),i={class:"viewtask"},_={class:"modal_header"},r={class:"modal_header_title"},o={class:"overlay_contents"},c={class:"spaced_contents"},d={class:"styled_obj"},p=n((()=>(0,t._)("span",{class:"styled_line__label"},"Class:",-1))),u=n((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),k={class:"styled_line__value"},h={class:"styled_obj"},v=n((()=>(0,t._)("span",{class:"styled_line__label"},"Name:",-1))),y=n((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),w={class:"styled_line__value"},b={class:"styled_obj"},g=n((()=>(0,t._)("span",{class:"styled_line__label"},"Date:",-1))),m=n((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),f={class:"styled_line__value"},D={class:"styled_obj"},C=n((()=>(0,t._)("span",{class:"styled_line__label"},"Description:",-1))),x=n((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),O=["innerHTML"],j={key:0,class:"styled_obj"},z=n((()=>(0,t._)("span",{class:"styled_line__label"},"Links:",-1))),S=n((()=>(0,t._)("span",{class:"styled_line__separator"},null,-1))),L={class:"styled_line__value"},N=["href"],H=n((()=>(0,t._)("div",{class:"overlay_contents_text"}," Information is provided by teachers and volunteer students, and may not always be correct ",-1))),T={class:"bottom_actions"},$=n((()=>(0,t._)("div",{class:"flex-spacer"},null,-1)));function q(s,a,e,n,q,I){return(0,t.wg)(),(0,t.iD)("main",i,[(0,t._)("header",_,[(0,t._)("h2",r,"View "+(0,l.zw)(I.task.type?I.task.type:"task")+" details",1)]),(0,t._)("div",o,[(0,t._)("div",c,[(0,t._)("div",d,[p,u,(0,t._)("span",k,(0,l.zw)(I.task.group||I.task.class_name),1)]),(0,t._)("div",h,[v,y,(0,t._)("span",w,(0,l.zw)(I.task.name),1)]),(0,t._)("div",b,[g,m,(0,t._)("span",f,(0,l.zw)(new Date(I.task.date).toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})),1)]),(0,t._)("div",D,[C,x,(0,t._)("span",{class:"styled_line__value",innerHTML:I.task.description?I.task.description:"Not Provided"},null,8,O)]),I.task.links?((0,t.wg)(),(0,t.iD)("div",j,[z,S,(0,t._)("span",L,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(I.task.links,(s=>((0,t.wg)(),(0,t.iD)("a",{class:"styled_line__value__link",key:s.path,href:s.path},(0,l.zw)(s.text),9,N)))),128))])])):(0,t.kq)("",!0)]),H]),(0,t._)("div",T,[(0,t._)("button",{class:"share_action",onClick:a[0]||(a[0]=(...s)=>I.share_task&&I.share_task(...s))},"Share"),$,(0,t._)("button",{class:"continue_action",onClick:a[1]||(a[1]=a=>s.$router.push("/portal"))},"Close")])])}var I=e(1708),K={data(){return{}},computed:{task(){let s=this.$route?.query?.task;return s=s?JSON.parse(s):{},s&&s.length&&s.links?s.links=s.links.filter((s=>s.text&&s.path)):s.links=null,s}},created(){this.task||(new I.OO("No task specified",1e3),this.$router.push("/portal"))},methods:{share_task(){navigator.share?navigator.share({title:this.task.name,text:this.task.description,url:window.location.href}).then((()=>new I.bF("Opened share dialog",1e3))).catch((s=>console.log("Error sharing",s))):navigator.clipboard?(navigator.clipboard.writeText(window.location.href),new I.OO("Sharing not supported, copied link to clipboard",1e3)):new I.PK("Sharing not supported",1e3)}}},M=e(89);const P=(0,M.Z)(K,[["render",q],["__scopeId","data-v-21cd89cc"]]);var E=P}}]);
//# sourceMappingURL=371.290b679b.js.map