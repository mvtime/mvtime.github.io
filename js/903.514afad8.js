(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[903],{3269:function(e,t,s){"use strict";s.d(t,{Z:function(){return u}});var n=s(3396),o=s(7139);const r=["closable"];function i(e,t,s,i,c,a){return(0,n.wg)(),(0,n.iD)("div",{class:(0,o.C_)(["overlay_center_view overlay_slot__wrapper",{animate_out:c.animating_out}])},[(0,n._)("div",{class:"overlay_close",onClick:t[0]||(t[0]=e=>a.closable?a.close():null),closable:a.closable},null,8,r),s.component?((0,n.wg)(),(0,n.j4)((0,n.LL)(s.component),{key:0,class:"overlay_slot",onClose:a.close},null,40,["onClose"])):(0,n.WI)(e.$slots,"default",{key:1,class:"overlay_slot",close:a.close})],2)}var c={name:"OverlayWrapper",emits:["close"],props:{component:{type:Object,default:null}},data(){return{animating_out:!1}},computed:{closable(){return!0!==this.$route?.meta?.block_close}},methods:{close(){this.animating_out=!0,setTimeout((()=>{window.onbeforeunload=null,this.$emit("close")}),250)}}},a=s(89);const p=(0,a.Z)(c,[["render",i]]);var u=p},2903:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return y}});var n=s(3396),o=s(7139);const r=e=>((0,n.dD)("data-v-52aaf6ce"),e=e(),(0,n.Cn)(),e),i={class:"home"},c={id:"home_main"},a=r((()=>(0,n._)("h2",{class:"header_style"},"Organize. Plan. Study.",-1))),p=r((()=>(0,n._)("h3",{class:"middle-text secondary_home_text"}," A more effective way to manage test schedules, long-term assignments, and exam stress. ",-1))),u={class:"homepage_actions"},l={key:0,class:"secondary_action auth-action can-login"},g={class:"home_art"},h={class:"contrast_dark"};function m(e,t,s,r,m,d){const f=(0,n.up)("router-view"),_=(0,n.up)("OverlayWrapper"),v=(0,n.Q2)("lazy");return(0,n.wg)(),(0,n.iD)("main",i,[(0,n._)("div",c,[a,p,(0,n._)("div",u,[(0,n._)("button",{class:"action-btn click-action",onClick:t[0]||(t[0]=(...e)=>d.tomain&&d.tomain(...e))},(0,o.zw)(d.logged_in?"Open App":"Get Started"),1),d.logged_in?(0,n.kq)("",!0):((0,n.wg)(),(0,n.iD)("button",l," I already have an account "))])]),(0,n._)("div",g,[(0,n.wy)((0,n._)("img",h,null,512),[[v,d.source]])]),"home"!==e.$route.name?((0,n.wg)(),(0,n.j4)(_,{key:0,onClose:d.close},{default:(0,n.w5)((e=>[(0,n.Wm)(f,{class:"router_center_view scale_in_view",onClose:e.close},null,8,["onClose"])])),_:1},8,["onClose"])):(0,n.kq)("",!0)])}s(7658);var d=s(8980),f=s(3269),_={name:"HomeView",components:{OverlayWrapper:f.Z},computed:{combo(){let e,t,s,n=localStorage.getItem("home_art"),o=n?n.split("h")[1][0]:null,r=n?n.split("s")[1][0]:null;o=o?parseInt(o):null,r=r?parseInt(r):null;while(!e||s==r||t==o)t=Math.floor(3*Math.random()),s=Math.floor(7*Math.random()),e=`h${t}s${s}`;return localStorage.setItem("home_art",e),e},store(){return(0,d.h)()},logged_in(){return this.store.user},source(){try{return s(1530)(`./${this.combo}.png`)}catch(e){return"err"}},close_path(){return this.$route?.meta?.close_path}},methods:{close(){this.$router.push(this.store?.user&&this.store?.doc?.join_form&&this.$route?.query?.redirect?this.$route.query.redirect:"/")},tomain(){this.logged_in?this.$router.push("/portal"):this.$router.push("/join")}}},v=s(89);const b=(0,v.Z)(_,[["render",m],["__scopeId","data-v-52aaf6ce"]]);var y=b},1530:function(e,t,s){var n={"./h0s0.png":1050,"./h0s1.png":6899,"./h0s2.png":9699,"./h0s3.png":2694,"./h0s4.png":900,"./h0s5.png":5967,"./h0s6.png":1061,"./h1s0.png":5887,"./h1s1.png":1486,"./h1s2.png":1082,"./h1s3.png":7514,"./h1s4.png":196,"./h1s5.png":485,"./h1s6.png":9571,"./h2s0.png":806,"./h2s1.png":9481,"./h2s2.png":719,"./h2s3.png":5446,"./h2s4.png":24,"./h2s5.png":4819,"./h2s6.png":6326};function o(e){var t=r(e);return s(t)}function r(e){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}o.keys=function(){return Object.keys(n)},o.resolve=r,e.exports=o,o.id=1530},1050:function(e,t,s){"use strict";e.exports=s.p+"img/h0s0.5abb226d.png"},6899:function(e,t,s){"use strict";e.exports=s.p+"img/h0s1.fccb8fd6.png"},9699:function(e,t,s){"use strict";e.exports=s.p+"img/h0s2.5439373a.png"},2694:function(e,t,s){"use strict";e.exports=s.p+"img/h0s3.2d6b852b.png"},900:function(e,t,s){"use strict";e.exports=s.p+"img/h0s4.f8aba1ec.png"},5967:function(e,t,s){"use strict";e.exports=s.p+"img/h0s5.92dc9efc.png"},1061:function(e,t,s){"use strict";e.exports=s.p+"img/h0s6.036667ff.png"},5887:function(e,t,s){"use strict";e.exports=s.p+"img/h1s0.f1d6b76e.png"},1486:function(e,t,s){"use strict";e.exports=s.p+"img/h1s1.d54ed4eb.png"},1082:function(e,t,s){"use strict";e.exports=s.p+"img/h1s2.2dbe946a.png"},7514:function(e,t,s){"use strict";e.exports=s.p+"img/h1s3.67f4e88b.png"},196:function(e,t,s){"use strict";e.exports=s.p+"img/h1s4.9055d7ae.png"},485:function(e,t,s){"use strict";e.exports=s.p+"img/h1s5.983b423a.png"},9571:function(e,t,s){"use strict";e.exports=s.p+"img/h1s6.f9f33564.png"},806:function(e,t,s){"use strict";e.exports=s.p+"img/h2s0.edd1929e.png"},9481:function(e,t,s){"use strict";e.exports=s.p+"img/h2s1.3ff4be9a.png"},719:function(e,t,s){"use strict";e.exports=s.p+"img/h2s2.ed03e12e.png"},5446:function(e,t,s){"use strict";e.exports=s.p+"img/h2s3.9ee0c8c8.png"},24:function(e,t,s){"use strict";e.exports=s.p+"img/h2s4.9c47b3aa.png"},4819:function(e,t,s){"use strict";e.exports=s.p+"img/h2s5.29c71018.png"},6326:function(e,t,s){"use strict";e.exports=s.p+"img/h2s6.f670312a.png"}}]);
//# sourceMappingURL=903.514afad8.js.map