"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[931],{7931:function(e,s,t){t.r(s),t.d(s,{default:function(){return h}});var a=t(6768),r=t(4232);const n=e=>((0,a.Qi)("data-v-d4694c42"),e=e(),(0,a.jt)(),e),l={class:"districtenv"},u={class:"env_pairs_wrappers"},i={class:"env_pairs"},c={key:0},p={class:"key"},d=n((()=>(0,a.Lk)("div",null,null,-1))),_={class:"value"},o={key:1},v={key:2,class:"unset"};function k(e,s,t,n,k,C){return(0,a.uX)(),(0,a.CE)("div",l,[(0,a.Lk)("div",u,[(0,a.Lk)("table",i,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)(C.pairs,(([e,s,t,n],l)=>((0,a.uX)(),(0,a.CE)("tr",{class:(0,r.C4)(["admin_in",{env_pair:e,blank:!e,start_section:t,end_section:n}]),style:(0,r.Tr)({animationDelay:.015*(l+1)+"s"}),key:e},[""===e?((0,a.uX)(),(0,a.CE)("br",c)):((0,a.uX)(),(0,a.CE)(a.FK,{key:1},[(0,a.Lk)("td",p,(0,r.v_)(e),1),d,(0,a.Lk)("td",_,[s&&e.includes("COLOR")?((0,a.uX)(),(0,a.CE)("span",{key:0,class:"value_color",style:(0,r.Tr)({backgroundColor:`#${s}`})},null,4)):(0,a.Q3)("",!0),s?((0,a.uX)(),(0,a.CE)("pre",o,(0,r.v_)(s),1)):((0,a.uX)(),(0,a.CE)("span",v,"No value currently set"))])],64))],6)))),128))])])])}t(4114);var C={name:"DistrictEnv",data(){return{}},computed:{pairs(){return Object.entries(this.$env).filter((([e])=>e.startsWith("VUE_APP_"))).sort((([e],[s])=>e.localeCompare(s))).map((([e,s])=>[e.replace("VUE_APP_",""),this.make_safe(s)])).reduce(((e,[s,t],a,r)=>{const n=s.split("_")[0];return a>0&&n!==r[a-1][0].split("_")[0]&&e.push(["",""]),e.push([s,t,0===a||n!==r[a-1][0].split("_")[0],a===r.length-1||n!==r[a+1][0].split("_")[0]]),e}),[])}},methods:{make_safe(e){try{return JSON.stringify(JSON.parse(e))}catch(s){return e}}}},m=t(1241);const y=(0,m.A)(C,[["render",k],["__scopeId","data-v-d4694c42"]]);var h=y}}]);
//# sourceMappingURL=931.310c5a7a.js.map