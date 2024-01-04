"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[822],{2822:function(e,s,a){a.r(s),a.d(s,{default:function(){return j}});var t=a(3396),l=a(7139),i=a(9242);const d={class:"onboarding"},c=(0,t._)("header",{class:"modal_header"},[(0,t._)("h2",{class:"header_style modal_header_title"},"Welcome to MVTime")],-1),n={class:"overlay_contents"},o={class:"overlay_contents_text"},r={class:"inputs_row"},_=["disabled"],h=["value","disabled"],u={key:0},m={key:0,value:"",disabled:"",hidden:"",selected:""},p={key:1,value:"",disabled:"",hidden:"",selected:""},b=(0,t._)("div",{class:"overlay_contents_text"},[(0,t.Uk)(" You can add more classes later from the "),(0,t._)("span",{class:"button_pointer_text"},"Join a Class"),(0,t.Uk)(" button on the left sidebar ")],-1),g={class:"bottom_actions"},v=(0,t._)("div",{class:"flex_spacer"},null,-1),k=["disabled"];function w(e,s,a,w,y,f){return(0,t.wg)(),(0,t.iD)("div",d,[c,(0,t._)("div",n,[(0,t._)("div",o,(0,l.zw)(f.name)+" Let's get you set up with your first class",1),(0,t._)("div",r,[(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>y.teacher_email=e),ref:"teacher_email",class:"styled_input",type:"text",placeholder:"Teacher's Email"},null,512),[[i.nr,y.teacher_email]]),(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":s[1]||(s[1]=e=>y.class_id=e),class:(0,l.C_)(["styled_input",{loading_bg:f.loading&&y.teacher_email}]),disabled:!f.classes||!f.classes.length},[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(f.classes,(e=>((0,t.wg)(),(0,t.iD)("option",{value:e.id,key:e.id,disabled:e.is_joined},[e.is_joined?((0,t.wg)(),(0,t.iD)("span",u,"[JOINED]")):(0,t.kq)("",!0),(0,t.Uk)(" P"+(0,l.zw)(e.period)+" - "+(0,l.zw)(e.name),1)],8,h)))),128)),y.teacher_email&&!f.classes?((0,t.wg)(),(0,t.iD)("option",m,(0,l.zw)(f.loading?"Loading...":"No classes found"),1)):((0,t.wg)(),(0,t.iD)("option",p,(0,l.zw)(y.teacher_email&&f.classes?"Select a Class":""),1))],10,_),[[i.bM,y.class_id]])]),b]),(0,t._)("div",g,[(0,t._)("button",{class:"back_action click_escape",onClick:s[2]||(s[2]=s=>e.$emit("close"))},"Skip"),v,(0,t._)("button",{class:"continue_action click_ctrlenter",onClick:s[3]||(s[3]=(...e)=>f.add_class&&f.add_class(...e)),disabled:!y.teacher_email||!y.class_id}," Add Class ",8,k)])])}var y=a(8980),f={name:"OnboardingView",emits:["close"],data(){return{teacher_email:"",class_id:"",adding:!1}},computed:{class_obj(){return this.classes?this.classes.find((e=>e.id===this.class_id))||{}:null},loading(){return this.store.loaded_email!==this.teacher_email},classes(){return this.teacher_email?this.teacher_email===this.store.loaded_email?this.store.loaded_classes:(this.store.fetch_classes_by_email(this.teacher_email),null):null},store(){return(0,y.h)()},name(){let e=this.store;return e.user&&e.user.displayName?"Hi "+e.user.displayName.split(" ")[0]+", ":""}},mounted(){this.$refs.teacher_email.focus()},methods:{add_class(){this.adding=!0,this.store.add_class(this.teacher_email,this.class_id,this.class_obj.name,this.class_obj.period).then((()=>{this.$emit("close")})).catch((()=>{this.adding=!1}))}}},C=a(89);const D=(0,C.Z)(f,[["render",w]]);var j=D}}]);
//# sourceMappingURL=822.cae9d6e7.js.map