"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[829],{1829:function(e,s,a){a.r(s),a.d(s,{default:function(){return T}});a(7658);var t=a(3396),i=a(7139),l=a(9242);const o={class:"addclass"},d={class:"modal_header"},c={class:"header_style modal_header_title"},r={class:"overlay_contents",ref:"contents"},n={class:"overlay_contents_text"},_={key:0},h={key:1},u={key:0,class:"inputs_row"},m=["disabled"],p=["value","disabled"],f={key:0},g={key:0,value:"",disabled:"",hidden:"",selected:""},b={key:1,value:"",disabled:"",hidden:"",selected:""},w={key:1,class:"inputs_row"},j={key:2,class:"overlay_contents_text"},y=["href"],v={key:3,class:"overlay_contents_text"},k=(0,t._)("br",null,null,-1),$=[k],C={class:"overlay_contents_text"},D={key:0},x=(0,t._)("span",{class:"button_pointer_text"},"Share",-1),z={key:1},O={class:"bottom_actions"},U=(0,t._)("div",{class:"flex_spacer"},null,-1),A=["disabled"];function E(e,s,a,k,E,P){return(0,t.wg)(),(0,t.iD)("main",o,[(0,t._)("header",d,[(0,t._)("h2",c,(0,i.zw)(P.is_join?"Join":"Add a")+" Class",1)]),(0,t._)("div",r,[(0,t._)("div",n,[P.is_join?((0,t.wg)(),(0,t.iD)("span",_,(0,i.zw)(P.store.loaded_email==E.teacher_email?"Loaded":"Loading")+" from your teacher's class "+(0,i.zw)(P.code?"code":"ref"),1)):((0,t.wg)(),(0,t.iD)("span",h,[(0,t.Uk)("Join a class with your teacher's details or "),(0,t._)("span",{class:"click-action button_pointer_text",onClick:s[0]||(s[0]=s=>e.$router.push({name:"codeenterclass"}))},"enter a class code")]))]),P.is_join?((0,t.wg)(),(0,t.iD)("div",w,[(0,t._)("div",{id:"code_ref",class:(0,i.C_)(["styled_input",{code:P.code,ref:e.$route.params.ref}]),type:"text",placeholder:"Join Code / Reference"},(0,i.zw)(P.code||e.$route.params.ref||""),3)])):((0,t.wg)(),(0,t.iD)("div",u,[(0,t.wy)((0,t._)("input",{"onUpdate:modelValue":s[1]||(s[1]=e=>E.teacher_email=e),ref:"teacher_email",class:"styled_input",type:"text",placeholder:"Teacher's Email"},null,512),[[l.nr,E.teacher_email]]),(0,t.wy)((0,t._)("select",{"onUpdate:modelValue":s[2]||(s[2]=e=>E.class_id=e),class:(0,i.C_)(["styled_input",{loading_bg:P.loading&&E.teacher_email}]),disabled:!P.classes||!P.classes.length},[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(P.classes,(e=>((0,t.wg)(),(0,t.iD)("option",{value:e.id,key:e.id,disabled:e.is_joined&&!E.adding},[e.is_joined&&!E.adding?((0,t.wg)(),(0,t.iD)("span",f,"[JOINED]")):(0,t.kq)("",!0),(0,t.Uk)(" P"+(0,i.zw)(e.period)+" - "+(0,i.zw)(e.name),1)],8,p)))),128)),E.teacher_email&&!P.classes?((0,t.wg)(),(0,t.iD)("option",g,(0,i.zw)(P.loading?"Loading...":"No classes found"),1)):((0,t.wg)(),(0,t.iD)("option",b,(0,i.zw)(E.teacher_email&&P.classes?"Select a Class":""),1))],10,m),[[l.bM,E.class_id]])])),P.class_obj?((0,t.wg)(),(0,t.iD)("div",j,[(0,t.Uk)((0,i.zw)(P.class_obj&&P.class_obj.is_joined&&!E.adding?"You've already joined":"You'll be joining")+" ",1),(0,t._)("a",{class:"class_name button_pointer_text",href:`/view/${P.cleaned_ref}`,onClick:s[3]||(s[3]=s=>{s.preventDefault(),e.$router.push("/portal"+s.target.getAttribute("href"))}),style:(0,i.j5)({"--color-class":P.class_obj.color,"--color-class-alt":P.class_obj.color+"2d"})},(0,i.zw)(`P${P.class_obj.period} - ${P.class_obj.name}`),13,y)])):(0,t.kq)("",!0),P.class_obj?((0,t.wg)(),(0,t.iD)("div",v,$)):(0,t.kq)("",!0),(0,t._)("div",C,[P.is_join?((0,t.wg)(),(0,t.iD)("span",D,[(0,t.Uk)("If you're having trouble, ask your teacher to share their class code again using the "),x,(0,t.Uk)(" button on the class edit page ")])):((0,t.wg)(),(0,t.iD)("span",z,"Enter your teacher's email above to see their classes"))])],512),(0,t._)("div",O,[(0,t._)("button",{class:"close_action",onClick:s[4]||(s[4]=s=>e.$emit("close"))},"Close"),U,(0,t._)("button",{class:(0,i.C_)(["continue_action",{loading_bg:E.adding||P.is_join&&P.loading,alt_bg:!E.teacher_email||!E.class_id||P.class_obj&&P.class_obj.is_joined&&!E.adding}]),onClick:s[5]||(s[5]=(...e)=>P.add_class&&P.add_class(...e)),disabled:!E.teacher_email||!E.class_id||P.class_obj&&P.class_obj.is_joined&&!E.adding}," Add Class ",10,A)])])}var P=a(8980),q=a(2745),I=a(1708),J=a(9529),L=a.n(J),Y={name:"AddClassView",emits:["close"],mixins:[L()],data(){return{teacher_email:"",class_id:"",adding:!1}},mounted(){this.$smoothReflow({el:this.$refs.contents,childTransitions:!0}),this.$refs.teacher_email&&this.$refs.teacher_email.focus(),this.use_ref(),!this.is_join&&this.store.loaded_email&&this.store.get_loaded_classes.some((e=>!e.is_joined))&&(this.teacher_email=this.store.loaded_email)},computed:{class_obj(){return this.classes&&this.classes.find((e=>e.id===this.class_id))||!1},cleaned_ref(){return this.store.path_to_ref(this.teacher_email,this.class_id)},loading(){return this.store.loaded_email!==this.teacher_email},classes(){return this.teacher_email?this.teacher_email===this.store.loaded_email?this.store.get_loaded_classes:(this.store.fetch_classes_by_email(this.teacher_email),null):null},store(){return(0,P.h)()},is_join(){return"refclass"==this.$route?.name||"codeclass"==this.$route?.name},code(){return this.$route?.params?.code&&this.$route.params?.code.toLowerCase()}},methods:{async add_class(){this.adding=!0,this.store.add_class(this.teacher_email,this.class_id,this.class_obj.name,this.class_obj.period).then((()=>(this.$emit("close"),Promise.resolve()))).catch((()=>(this.adding=!1,Promise.reject())))},async use_ref(){let e=this.$route.params?.ref;if(!e&&this.code)try{e=await this.store.ref_from_code(this.code)}catch(s){return new I.PK("Invalid join code",s,4e3),(0,q.E)("🔥 "+s),void(this.$route?.query?.manual?this.$router.push({name:"codeenterclass"}):this.to_normal_add())}if(e&&this.is_join){(0,q.E)("🔍 Attempting to use class join ref",e);let[s,a]=e.split("~");s+=this.store.ORG_DOMAIN,this.teacher_email=s,this.store.fetch_classes_by_email(s);while(this.store.loaded_email!==this.teacher_email)await new Promise((e=>setTimeout(e,100)));let t=this.store?.get_loaded_classes?.find((e=>e.id===a));t?(this.class_id=a,t.is_joined&&(new I.OO("You've already joined this class",3e3),(0,q.E)("🔥 Already joined class",e))):(new I.OO("Couldn't find that class",3e3),(0,q.E)("🔥 Unfound class for join ref",e),this.to_normal_add())}else this.is_join&&(new I.OO("Please provide a join code",3e3),this.to_normal_add())},to_normal_add(){this.$router.push({name:"addclass"})}}},N=a(89);const R=(0,N.Z)(Y,[["render",E]]);var T=R}}]);
//# sourceMappingURL=829.a19dc0f2.js.map