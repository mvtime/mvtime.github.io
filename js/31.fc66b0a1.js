"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[31],{31:function(t,e,n){n.r(e),n.d(e,{default:function(){return p}});var i=n(6768);function s(t,e,n,s,h,o){const a=(0,i.g2)("Modal");return(0,i.uX)(),(0,i.Wv)(a,{can_continue:!0,title:"Leaving "+t.$env.VUE_APP_BRAND_SHORT_NAME,html:o.contents,continue_action:o.open,skippable:!0,skip_text:"Cancel",onSkip:e[0]||(e[0]=e=>t.$emit("close")),submit_text:"Continue"},null,8,["title","html","continue_action"])}n(4603),n(7566),n(8721);var h=n(7251),o=n(4186),a={name:"RedirectView",components:{Modal:h.A},emits:["close"],data(){return{path:""}},mounted(){this.path=this.$route?.params?.path,this.path?this.path=this.path.startsWith("http")?this.path:`https://${this.path}`:(new o.MY("Missing redirect path"),this.$emit("close"));try{const t=new URL(this.path);(this.$env.VUE_APP_BRAND_DOMAIN==t.host||t.host.endsWith("."+this.$env.VUE_APP_BRAND_DOMAIN))&&(new o.rQ(`Redirecting to ${this.$env.VUE_APP_BRAND_SHORT_NAME}`),this.open())}catch{this.$status.log(`Couldn not verify path domain is not ${this.$env.VUE_APP_BRAND_SHORT_NAME}`)}},computed:{contents(){return this.path?`You are being redirected to <a href="${this.path}">${new URL(this.path).host}</a>\n            <br><br>\n           Content outside of ${this.$env.VUE_APP_BRAND_SHORT_NAME} is not vetted by our team, and may be harmful.`:"Missing redirect path"}},methods:{open(){this.$emit("close"),window.location.replace(this.path)}}},r=n(1241);const c=(0,r.A)(a,[["render",s]]);var p=c}}]);
//# sourceMappingURL=31.fc66b0a1.js.map