"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[572],{5572:function(e,t,s){s.r(t),s.d(t,{default:function(){return S}});s(7658);var a=s(3396),i=s(7139);const r=e=>((0,a.dD)("data-v-24311acc"),e=e(),(0,a.Cn)(),e),n={class:"entercode"},l=r((()=>(0,a._)("header",{class:"modal_header"},[(0,a._)("h2",{class:"header_style modal_header_title"},"View Statistics")],-1))),o={class:"overlay_contents",ref:"contents"},c=r((()=>(0,a._)("div",{class:"overlay_contents_text"}," The daily surveys you have completed are displayed below. ",-1))),d=r((()=>(0,a._)("br",null,null,-1))),u={class:"stats_view_controls_wrapper"},_={class:"stats_view_controls"},h=["onClick"],p=r((()=>(0,a._)("span",{class:"flex_spacer"},null,-1))),m={key:0,class:"stats_view_wrapper"},v=r((()=>(0,a._)("br",null,null,-1))),y={class:"overlay_contents_text"},f={class:"bottom_actions"},w=r((()=>(0,a._)("div",{class:"flex_spacer"},null,-1)));function g(e,t,s,r,g,b){const k=(0,a.up)("apexchart"),x=(0,a.up)("router-link");return(0,a.wg)(),(0,a.iD)("main",n,[l,(0,a._)("div",o,[c,d,(0,a._)("nav",u,[(0,a._)("div",_,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(g.filters,(e=>((0,a.wg)(),(0,a.iD)("button",{onClick:t=>{g.active.includes(e.filter)&&g.active.length>1?g.active.splice(g.active.indexOf(e.filter),1):g.active.push(e.filter)},class:(0,i.C_)(["stats_view_control__option",{active:g.active.includes(e.filter)&&g.is_ready}]),key:e.filter},(0,i.zw)(e.name),11,h)))),128))]),p,(0,a._)("button",{class:(0,i.C_)(["stats_view_control__refresh",{disabled:!g.can_update||!g.is_ready}]),onClick:t[0]||(t[0]=e=>{g.is_ready&&b.try_update()})}," Update ",2)]),(0,a._)("div",{class:(0,i.C_)(["stats_view_container alt_bg",{loading_bg:!g.is_ready}])},[g.surveys.length?((0,a.wg)(),(0,a.iD)("div",m,[(0,a.Wm)(k,{class:"stats_view",type:"line",series:b.graphs,width:"100%",height:"100%",options:{xaxis:{type:"datetime",labels:{show:!1},categories:g.surveys.map((e=>e.data.time))},yaxis:{labels:{show:!1},min:0,max:5,tickAmount:5,decimalsInFloat:0},legend:{show:!0,showForSingleSeries:!0},theme:{mode:b.store.theme},chart:{background:"var(--color-overlay-input)",fontFamily:"inherit",toolbar:{show:!1}},stroke:{curve:"smooth",width:3},tooltip:{enabled:!0,x:{format:"ddd MMM d"}}}},null,8,["series","options"])])):(0,a.kq)("",!0)],2),v,(0,a._)("div",y,[(0,a.Uk)(" We appreciate your contributions towards our research. If you have any questions, please "),(0,a.Wm)(x,{to:"/contact"},{default:(0,a.w5)((()=>[(0,a.Uk)("contact us")])),_:1}),(0,a.Uk)("! ")])],512),(0,a._)("div",f,[w,(0,a._)("button",{class:"continue_action",onClick:t[1]||(t[1]=t=>e.$emit("close"))},"Close")])])}var b=s(8980),k=s(1708),x=s(2745),C={name:"StatsModal",emits:["close"],data(){return{is_ready:!1,can_update:!0,min_delay:15e3,surveys:[],active:["stress","sentiment"],filters:[{name:"Stress Level",filter:"stress",data:{index:1,range:{from:1,to:3},scale(e){return 2.5*({positive:3,neutral:2,negative:1}[e.sentiment]-1)},label(e){return e.sentiment.charAt(0).toUpperCase()+e.sentiment.slice(1)}}},{name:"Mood",filter:"sentiment",data:{index:2,range:{from:1,to:5},scale(e){return(5*e.sentiment/100-1)*(5/4)},label(e){return e.sentiment+"%"}}},{name:"Workload",filter:"upcoming",data:{index:4,range:{from:0,to:6},scale(e){return Math.min(e.num||e.tasks?.length||0,10)/2},label(e){return(e.num||e.tasks?.length||0)+" tasks"}}}]}},computed:{store(){return(0,b.h)()},completed(){return this.store?.active_doc?.done_surveys||[]},graphs(){let e=this.filters.filter((e=>this.active.includes(e.filter))).map((e=>({name:e.name,data:this.surveys.map((t=>e.data.scale(t.data.responses[e.data.index].data))),labels:this.surveys.map((t=>e.data.label(t.data.responses[e.data.index].data)))})));return e}},methods:{try_update(){this.can_update?(this.update(!0),x.i2.log("Manualling refreshing survey data")):(new k.OO("Please wait before updating again",2e3),x.i2.warn("Blocked quick refresh of survey data "))},process(e){this.surveys=e.filter((e=>!e.error)),this.surveys.forEach(((e,t)=>{e.data.index=t})),this.is_ready=!0},update(e=!1){this.is_ready=!1,this.can_update=!1,this.last_update=Date.now(),this.surveys=[],this.store.get_cached_surveys(this.completed,e).then((e=>{this.process(e),setTimeout((()=>{this.can_update=!0}),this.min_delay)})).catch((e=>{new k.PK("Failed to get statistics",e,5e3),this.is_ready=!0,this.can_update=!0}))}},mounted(){this.update()},created(){}},M=s(89);const D=(0,M.Z)(C,[["render",g],["__scopeId","data-v-24311acc"]]);var S=D}}]);
//# sourceMappingURL=572.cb58fb6d.js.map