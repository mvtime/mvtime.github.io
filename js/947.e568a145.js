"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[947],{947:function(e,s,a){a.r(s),a.d(s,{default:function(){return A}});var t=a(3396),i=a(9242),l=a(7139);const o={class:"addclass"},d=(0,t._)("header",{class:"modal_header"},[(0,t._)("h2",{class:"header_style modal_header_title"},"Add a Class")],-1),n={class:"overlay_contents"},c={class:"overlay_contents_text"},r={key:0},_={key:1},h={class:"inputs_row"},u=["disabled"],m=["value","disabled"],f={key:0},p={key:0,value:"",disabled:"",hidden:"",selected:""},w={key:1,value:"",disabled:"",hidden:"",selected:""},g={class:"overlay_contents_text"},y={key:0},b=(0,t._)("span",{class:"button_pointer_text"},"Share",-1),v={key:1},j={class:"bottom_actions"},k=(0,t._)("div",{class:"flex_spacer"},null,-1),C=["disabled"];function D(e,s,a,D,$,E){return(0,t.wg)(),(0,t.iD)("main",o,[d,(0,t._)("div",n,[(0,t._)("div",c,[E.is_join?((0,t.wg)(),(0,t.iD)("span",r,"Joining from your teacher's class code")):((0,t.wg)(),(0,t.iD)("span",_,"Join a new class"))]),(0,t._)("div",h,[(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>$.teacher_email=e),ref:"teacher_email",class:"styled_input",type:"text",placeholder:"Teacher's Email"},null,512),[[i.nr,$.teacher_email]]),(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":s[1]||(s[1]=e=>$.class_id=e),class:(0,l.C_)(["styled_input",{loading_bg:E.loading&&$.teacher_email}]),disabled:!E.classes||!E.classes.length},[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(E.classes,(e=>((0,t.wg)(),(0,t.iD)("option",{value:e.id,key:e.id,disabled:e.is_joined},[e.is_joined?((0,t.wg)(),(0,t.iD)("span",f,"[JOINED]")):(0,t.kq)("",!0),(0,t.Uk)(" P"+(0,l.zw)(e.period)+" - "+(0,l.zw)(e.name),1)],8,m)))),128)),$.teacher_email&&!E.classes?((0,t.wg)(),(0,t.iD)("option",p,(0,l.zw)(E.loading?"Loading...":"No classes found"),1)):((0,t.wg)(),(0,t.iD)("option",w,(0,l.zw)($.teacher_email&&E.classes?"Select a Class":""),1))],10,u),[[i.bM,$.class_id]])]),(0,t._)("div",g,[E.is_join?((0,t.wg)(),(0,t.iD)("span",y,[(0,t.Uk)("If you're having trouble, ask your teacher to share their class code again using the "),b,(0,t.Uk)(" button on the class edit page ")])):((0,t.wg)(),(0,t.iD)("span",v,"Enter your teacher's email above to see their classes"))])]),(0,t._)("div",j,[(0,t._)("button",{class:"close_action",onClick:s[2]||(s[2]=s=>e.$emit("close"))},"Close"),k,(0,t._)("button",{class:(0,l.C_)(["continue_action",{loading_bg:$.adding}]),onClick:s[3]||(s[3]=(...e)=>E.add_class&&E.add_class(...e)),disabled:!$.teacher_email||!$.class_id}," Add Class ",10,C)])])}a(7658);var $=a(8980),E=a(2745),O=a(1708),P={name:"AddClassView",emits:["close"],data(){return{teacher_email:"",class_id:"",adding:!1}},mounted(){this.$refs.teacher_email.focus(),this.use_ref()},computed:{class_obj(){return this.classes?this.classes.find((e=>e.id===this.class_id))||{}:null},loading(){return this.store.loaded_email!==this.teacher_email},classes(){return this.teacher_email?this.teacher_email===this.store.loaded_email?this.store.loaded_classes:(this.store.fetch_classes_by_email(this.teacher_email),null):null},store(){return(0,$.h)()},is_join(){return"joinclass"==this.$route?.name||"codeclass"==this.$route?.name}},methods:{async add_class(){this.adding=!0,this.store.add_class(this.teacher_email,this.class_id,this.class_obj.name,this.class_obj.period).then((()=>(this.$emit("close"),Promise.resolve()))).catch((()=>(this.adding=!1,Promise.reject())))},async use_ref(){let e=this.$route.params?.ref;if(!e&&this.$route.params?.code)try{e=await this.store.ref_from_code(this.$route.params?.code)}catch(s){new O.PK("Invalid join code",s,4e3),(0,E.E)("🔥 "+s),this.to_normal_add()}if(e&&this.is_join){(0,E.E)("🔍 Attempting to use class join ref",e);let[s,a]=e.split("~");s+="@mvla.net",this.teacher_email=s,this.store.fetch_classes_by_email(s);while(this.store.loaded_email!==s)await new Promise((e=>setTimeout(e,100)));let t=this.store.loaded_classes&&this.store.loaded_classes.find((e=>e.id===a));t?t.is_joined?(new O.OO("You've already joined that class",3e3),(0,E.E)("🔥 Already joined class",e),this.$emit("close")):(this.class_id=a,this.add_class().then((()=>{new O.bF("Successfully joined class",2e3),(0,E.E)("🎉 Successfully joined class",e)})).catch((s=>{new O.PK("Something went wrong joining that class",s,3e3),(0,E.E)("🔥 Couldn't join class from ref",e),this.to_normal_add()}))):(new O.OO("Couldn't find that class",3e3),(0,E.E)("🔥 Unfound class for join ref",e),this.to_normal_add())}else new O.OO("Please provide a join code",3e3),this.to_normal_add()},to_normal_add(){this.$router.push({name:"addclass"})}}},U=a(89);const x=(0,U.Z)(P,[["render",D]]);var A=x}}]);
//# sourceMappingURL=947.e568a145.js.map