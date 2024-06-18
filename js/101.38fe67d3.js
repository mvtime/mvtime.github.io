"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[101],{4384:function(t,e,s){s.d(e,{A:function(){return d}});var n=s(6768);function o(t,e,s,o,a,i){const r=(0,n.g2)("Modal");return(0,n.uX)(),(0,n.Wv)(r,{ref:"modal",title:i.page.title,content:i.page.content,html:i.page.content?null:i.page.html,is_notification:i.page.is_notification,submit_text:i.page.submit_text,progress:{current:a.page_index+1,total:s.pages.length},show_progress:!0,can_continue:i.can_continue,continue_action:i.next_page,load:i.load_data,skippable:s.skippable,onOpen:i.switch_to,onUpdate:e[0]||(e[0]=t=>a.curr_data=t),onStatus:e[1]||(e[1]=t=>a.curr_done=t),onSkip:e[2]||(e[2]=e=>t.$emit("skip"))},null,8,["title","content","html","is_notification","submit_text","progress","can_continue","continue_action","load","skippable","onOpen"])}var a=s(7251);function i(){return"You haven't finished the task yet, and might lose progress. Are you sure you want to close the tab?"}var r={name:"ModalFromPages",emits:["finish","skip"],components:{Modal:a.A},props:{pages:{type:Array,required:!0},skippable:{type:Boolean,default:!1,required:!1}},data(){return{page_index:0,responses:[],curr_data:null,curr_done:!1,page_start:Date.now(),shortcuts:[{key:"ArrowLeft",description:"Go to the previous modal page"},{key:"ArrowRight",description:"Go to the next modal page"}]}},computed:{load_data(){return this.set_done(),this.responses[this.page_index]?.data||{}},page(){return 0==this.pages.length?{title:"No pages provided",content:null,html:null,is_notification:!0,submit_text:"Oops!"}:this.pages[this.page_index]},can_continue(){return!this.page.content||this.page.is_notification||this.curr_done}},mounted(){window.addEventListener("keydown",this.arrow),this.$shortcuts.register_all(this.shortcuts,"Modal")},beforeUnmount(){window.removeEventListener("keydown",this.arrow),this.$shortcuts.remove_tag("Modal")},methods:{set_done(){this.curr_done=this.responses[this.page_index]?.done||!1},arrow(t){"ArrowLeft"==t.key?this.switch_to(this.page_index-1):"ArrowRight"==t.key&&this.switch_to(this.page_index+1)},switch_to(t){t<=this.page_index||Object.prototype.hasOwnProperty.call(this.responses,Math.max(t-1,0))?this.page_index=t:this.$status.log(`⏵ ModalFromPages: page index ${t} invalid`)},next_page(){this.responses[this.page_index]={data:this.curr_data,done:this.curr_done||!this.page.content||this.page.is_notification,time:{start:this.page_start,duration:Date.now()-this.page_start}},this.can_continue&&this.page_index<this.pages.length-1?(0==this.page_index&&(window.onbeforeunload=i),this.page_index++):this.can_continue&&this.$emit("finish",this.responses)}},watch:{page_index(){this.page_start=Date.now(),this.curr_data=this.load_data,this.set_done()}}},c=s(1241);const l=(0,c.A)(r,[["render",o]]);var d=l},9101:function(t,e,s){s.r(e),s.d(e,{default:function(){return q}});var n=s(6768);function o(t,e,s,o,a,i){const r=(0,n.g2)("ModalFromPages");return(0,n.uX)(),(0,n.Wv)(r,{pages:a.pages,onFinish:i.finish,onSkip:e[0]||(e[0]=e=>t.$emit("close")),ref:"survey_modal"},null,8,["pages","onFinish"])}var a=s(144),i=s(4186),r=s(4384),c=s(4232);const l=t=>((0,n.Qi)("data-v-a628f40a"),t=t(),(0,n.jt)(),t),d={class:"personal_prompt"},u={class:"overlay_contents_text"},_={class:"inputs_row"},h=["disabled"],p=l((()=>(0,n.Lk)("div",{class:"overlay_contents_text"},"Please sign into your personal account to continue",-1)));function g(t,e,s,o,a,i){return(0,n.uX)(),(0,n.CE)("div",d,[(0,n.Lk)("div",u," If you're signed into an "+(0,c.v_)(t.$store.ORG_DOMAIN.substring(1))+" account, you should have been signed out automatically ",1),(0,n.Lk)("div",_,[(0,n.Lk)("button",{class:"primary_styled styled_input",onClick:e[0]||(e[0]=(...t)=>i.sign_into_personal&&i.sign_into_personal(...t)),disabled:a.ready}," Login to Personal Account ",8,h)]),p])}var m={name:"SignIntoPersonalAccount",emits:["skip","update","status"],data(){return{ready:!1}},methods:{logout_if_org(){this.$store?.user?.email?.includes(this.$store.ORG_DOMAIN)&&this.$store.logout()},check_and_emit(){this.$store?.linked_account_doc?.linked_to&&this.$route?.params?.code&&this.$store.linked_account_doc.linked_to==this.$route.params.code?(new i.MY("These two accounts are already linked!",2e3),this.$emit("skip")):(this.ready=this.$store.user?.email&&!this.$store.user.email.includes(this.$store.ORG_DOMAIN),this.$emit("status",!!this.ready))},sign_into_personal(){this.$store.personal_account=!0,this.$store.login_personal().then((()=>{this.logout_if_org(),this.check_and_emit()})).catch((()=>{this.check_and_emit()}))}},computed:{},mounted(){this.logout_if_org(),this.check_and_emit()},watch:{$store:{handler(){this.logout_if_org(),this.check_and_emit()},deep:!0}}},k=s(1241);const y=(0,k.A)(m,[["render",g],["__scopeId","data-v-a628f40a"]]);var v=y;const f=t=>((0,n.Qi)("data-v-1b938b9b"),t=t(),(0,n.jt)(),t),w={class:"account_linking"},b={key:0,alt:"Loading...",class:"loading_placeholder loading_icon"},x={key:1,class:"account_details"},L=f((()=>(0,n.Lk)("div",{class:"overlay_contents_text"}," Please confirm that the details below match the account you're trying to link to. ",-1))),$={class:"spaced_contents"},A={class:"styled_obj"},M=f((()=>(0,n.Lk)("span",{class:"styled_line__label"},"Name:",-1))),O=f((()=>(0,n.Lk)("span",{class:"styled_line__separator"},null,-1))),C={class:"styled_line__value"},P={class:"styled_obj"},j=f((()=>(0,n.Lk)("span",{class:"styled_line__label"},"Email:",-1))),I=f((()=>(0,n.Lk)("span",{class:"styled_line__separator"},null,-1))),S={class:"styled_line__value"},E={class:"styled_obj"},F=f((()=>(0,n.Lk)("span",{class:"styled_line__label"},"Grade:",-1))),D=f((()=>(0,n.Lk)("span",{class:"styled_line__separator"},null,-1))),T={class:"styled_line__value"},X=f((()=>(0,n.Lk)("div",{class:"overlay_contents_text"},[(0,n.eW)(" Once you've checked them, just press "),(0,n.Lk)("span",{class:"button_pointer_text"},"Link"),(0,n.eW)(" to finish connecting your accounts! ")],-1))),G={key:2,class:"overlay_contents_text"};function N(t,e,s,o,a,i){return(0,n.uX)(),(0,n.CE)("div",w,[a.loading?((0,n.uX)(),(0,n.CE)("img",b)):a.data?((0,n.uX)(),(0,n.CE)("div",x,[L,(0,n.Lk)("div",$,[(0,n.Lk)("div",A,[M,O,(0,n.Lk)("span",C,(0,c.v_)(a.data.name||"Couldn't Load"),1)]),(0,n.Lk)("div",P,[j,I,(0,n.Lk)("span",S,(0,c.v_)(a.data.email||"Couldn't Load"),1)]),(0,n.Lk)("div",E,[F,D,(0,n.Lk)("span",T,(0,c.v_)(i.gradeText(a.data.join_form&&a.data.join_form.grade)||"Couldn't Load"),1)])]),X])):((0,n.uX)(),(0,n.CE)("div",G," Something went wrong fetching the account details, please try again later. "))])}var Y={name:"LinkAccount",emits:["update","status"],props:{load:{type:Object,default:()=>({})}},data(){return{loading:!0,code:null,data:null}},computed:{},methods:{gradeText(t){switch(t){case"9":return"Freshman";case"10":return"Sophomore";case"11":return"Junior";case"12":return"Senior";default:return"Teacher"}}},mounted(){this.code=this.$route.params.code,this.$store.doc_from_uid(this.code).then((t=>{this.loading=!1,this.data=t})).catch((t=>{this.loading=!1,new i.Qp("Failed to link account",t,3e3)}))},watch:{loading(){this.$emit("status",!this.loading)}}};const R=(0,k.A)(Y,[["render",N],["__scopeId","data-v-1b938b9b"]]);var W=R,J={name:"LinkModal",emits:["close"],components:{ModalFromPages:r.A,SignIntoPersonalAccount:v,LinkAccount:W},data(){return{ready:!1,pages:[{title:"Link Personal Account",html:"<div class='overlay_contents_text'>Thank you for taking the time to link your account. This will allow you to access your account from any device.<br/><br/> You'll need to be signed into your personal account in order to continue, we'll guide you through that on the next page.</div>",submit_text:"Okay",is_notification:!0},{title:"Sign into Personal Account",content:(0,a.IJ)(v),submit_text:"Continue"},{title:"Account Details",content:(0,a.IJ)(W),submit_text:"Link"}]}},props:{code:{type:String,default:""}},computed:{},mounted(){this.code?this.ready=!0:(new i.MY("No code provided!","You must provide a code to link your account."),this.$emit("close")),this.$store.personal_account=!0,this.$store?.linked_account_doc?.linked_to&&this.$store.linked_account_doc.linked_to==this.code&&(this.$emit("close"),new i.MY("These two accounts are already linked!",2e3))},methods:{finish(){this.$store.link_account_uid(this.code).then((()=>{this.$emit("close")}))}}};const Q=(0,k.A)(J,[["render",o]]);var q=Q}}]);
//# sourceMappingURL=101.38fe67d3.js.map