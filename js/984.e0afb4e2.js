"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[984],{4984:function(e,s,t){t.r(s),t.d(s,{default:function(){return A}});t(4114);var a=t(6768),i=t(4232),o=t(5130);const l=e=>((0,a.Qi)("data-v-e0ad58a4"),e=e(),(0,a.jt)(),e),r={class:"createclass"},n=l((()=>(0,a.Lk)("header",{class:"modal_header"},[(0,a.Lk)("h2",{class:"header_style modal_header_title"},"Edit class details")],-1))),c={class:"overlay_contents",ref:"contents"},d={key:0},h={class:"overlay_contents_text"},_=["href"],u={class:"inputs_row"},p={class:"class_period_container styled_obj"},m={class:"color_input_container styled_input",title:"Class Theme Color"},g={key:1,alt:"Loading Icon",class:"loading_icon"},f={class:"bottom_actions"},v=["disabled"],y=l((()=>(0,a.Lk)("div",{class:"flex_spacer"},null,-1))),b=["disabled"],k=["disabled"];function $(e,s,t,l,$,w){return(0,a.uX)(),(0,a.CE)("main",r,[n,(0,a.Lk)("div",c,[$.ready?((0,a.uX)(),(0,a.CE)("div",d,[(0,a.Lk)("div",h,[(0,a.eW)(" You're editing "),(0,a.Lk)("a",{class:"class_name button_pointer_text",href:`/view/${e.$route.params.ref}`,onClick:s[0]||(s[0]=s=>{s.preventDefault(),e.$router.push({name:"viewclass",params:{ref:e.$route.params.ref},query:e.$route.query})}),style:(0,i.Tr)({"--color-class":$.original.color,"--color-class-alt":$.original.color+"2d"})},(0,i.v_)(e.$store.class_text($.original)),13,_)]),(0,a.Lk)("div",u,[(0,a.Lk)("div",p,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":s[1]||(s[1]=e=>$.class_obj.period=e),class:"styled_input class_period",type:"number",min:"1",max:"8",step:"1",placeholder:"#"},null,512),[[o.Jo,$.class_obj.period]])]),(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":s[2]||(s[2]=e=>$.class_obj.name=e),class:"styled_input class_name",type:"text",placeholder:"Name",enterkeyhint:"done",onKeydown:s[3]||(s[3]=(0,o.jR)(((...e)=>w.update_class&&w.update_class(...e)),["enter"]))},null,544),[[o.Jo,$.class_obj.name]]),(0,a.Lk)("div",m,[(0,a.bo)((0,a.Lk)("input",{"onUpdate:modelValue":s[4]||(s[4]=e=>$.class_obj.color=e),class:"color_input",type:"color",placeholder:"Class Color"},null,512),[[o.Jo,$.class_obj.color]])])])])):((0,a.uX)(),(0,a.CE)("img",g))],512),(0,a.Lk)("div",f,[(0,a.Lk)("button",{class:(0,i.C4)(["alt_action",{loading_bg:$.loading_share&&$.ready,click_escape:!$.ready}]),onClick:s[5]||(s[5]=s=>{$.ready?w.share_class():e.$emit("close")}),disabled:$.ready&&$.loading_share||!w.is_owned},(0,i.v_)($.ready?"Share":"Close"),11,v),y,(0,a.Lk)("button",{class:"leave_action primary_styled",onClick:s[6]||(s[6]=(...e)=>w.leave_class&&w.leave_class(...e)),disabled:!$.ready}," Leave ",8,b),(0,a.Lk)("button",{class:(0,i.C4)(["continue_action click_ctrlenter",{loading_bg:$.loading}]),onClick:s[7]||(s[7]=(...e)=>w.update_class&&w.update_class(...e)),disabled:!$.ready||!w.changed||!$.class_obj.name}," Save ",10,k)])])}t(4603),t(7566),t(8721);var w=t(6471),C=t.n(w),L=t(4186),j={name:"EditClassView",emits:["close"],mixins:[C()],data(){return{class_obj:{},original:{},loading:!1,ready:!1,ref:this.$route?.params?.ref,loading_share:!1}},computed:{changed(){return JSON.stringify(this.class_obj)!=JSON.stringify(this.original)},is_owned(){return this.$store.user.email.split("@")[0]==this.ref.split("/")[0]}},mounted(){if(this.$smoothReflow({el:this.$refs.contents,childTransitions:!0}),!this.ref||2!=this.ref.split("~").length)return new L.MY("Invalid class provided"),void this.$emit("close");this.ref=this.ref.split("~").join("/"),this.get_class(),this.is_owned||(this.$emit("close"),new L.MY("You are not the teacher of this class",2e3))},methods:{update_class(){this.loading=!0,this.$store.update_class(this.ref,this.class_obj).then((()=>{this.$emit("close")})).catch((e=>{new L.MY("Something went wrong updating the class",2500),this.$status.error("🔥Couldn't update class",this.ref,e),this.loading=!1}))},get_class(){this.ready=!1,this.$store.class_from_ref(this.ref).then((e=>{this.class_obj=e,this.original={...e},this.ready=!0})).catch((e=>{new L.MY("Couldn't find that class",2e3),this.$status.error("🔥Couldn't find class for edit",this.ref,e),this.$emit("close")}))},leave_class(){this.$router.push({name:"leave",params:{ref:this.$route?.params?.ref},query:this.$route.query})},async share_class(){this.loading_share=!0,this.$store.code_from_ref(this.ref).then((e=>{let s=new URL(`https://${this.$env.VUE_APP_BRAND_DOMAIN__ADDCLASS}/`+e);navigator.share?navigator.share({title:this.$store.class_text(this.class_obj),text:`Join my class on ${this.$env.VUE_APP_BRAND_NAME_SHORT}!`,url:s.href}).then((()=>new L.rQ("Opened share dialog",1e3))).catch((e=>this.$status.error("🔥 Error sharing",e))):navigator.clipboard?(navigator.clipboard.writeText(s.href),new L.MY("Sharing not supported, copied link to clipboard",2e3)):new L.MY("Sharing and copying not supported, sorry",2e3),this.loading_share=!1})).catch((e=>{new L.Qp("Something went wrong getting the code",e?.message||e,2e3),this.$status.error("🔥 Couldn't get code",this.ref,e),this.loading_share=!1}))}}},S=t(1241);const x=(0,S.A)(j,[["render",$],["__scopeId","data-v-e0ad58a4"]]);var A=x}}]);
//# sourceMappingURL=984.e0afb4e2.js.map