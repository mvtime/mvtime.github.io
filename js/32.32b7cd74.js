"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[32],{5032:function(s,e,a){a.r(e),a.d(e,{default:function(){return j}});var l=a(3396),t=a(9242);const c=s=>((0,l.dD)("data-v-243ab9f0"),s=s(),(0,l.Cn)(),s),o={class:"createclass"},n=c((()=>(0,l._)("header",{class:"modal_header"},[(0,l._)("h2",{class:"header_style modal_header_title"},"Create a Class")],-1))),_={class:"overlay_contents"},i=c((()=>(0,l._)("div",{class:"overlay_contents_text"},"Let's create a new class",-1))),r={class:"inputs_row"},d={class:"class_period_container styled_obj"},u={class:"color_input_container styled_input",title:"Class Theme Color"},p={class:"bottom_actions"},m=c((()=>(0,l._)("div",{class:"flex_spacer"},null,-1))),b=["disabled"];function h(s,e,a,c,h,v){return(0,l.wg)(),(0,l.iD)("main",o,[n,(0,l._)("div",_,[i,(0,l._)("div",r,[(0,l._)("div",d,[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":e[0]||(e[0]=s=>h.class_obj.period=s),class:"styled_input class_period",type:"number",min:"1",max:"8",step:"1",placeholder:"#"},null,512),[[t.nr,h.class_obj.period]])]),(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":e[1]||(e[1]=s=>h.class_obj.name=s),class:"styled_input class_name",type:"text",placeholder:"Name"},null,512),[[t.nr,h.class_obj.name]]),(0,l._)("div",u,[(0,l.wy)((0,l._)("input",{"onUpdate:modelValue":e[2]||(e[2]=s=>h.class_obj.color=s),class:"color_input",type:"color",placeholder:"Class Color"},null,512),[[t.nr,h.class_obj.color]])])])]),(0,l._)("div",p,[(0,l._)("button",{class:"close_action click_escape",onClick:e[3]||(e[3]=e=>s.$emit("close"))},"Close"),m,(0,l._)("button",{class:"continue_action",onClick:e[4]||(e[4]=(...s)=>v.create_class&&v.create_class(...s)),disabled:!h.class_obj.name}," Create Class ",8,b)])])}var v={name:"AddClassView",emits:["close"],data(){return{class_obj:{name:"",period:null,description:"",color:`#${this.$env.VUE_APP_THEME_COLOR}`}}},methods:{create_class(){this.$store.create_class(this.class_obj).then((()=>{this.$emit("close")}))}}},C=a(89);const y=(0,C.Z)(v,[["render",h],["__scopeId","data-v-243ab9f0"]]);var j=y}}]);
//# sourceMappingURL=32.32b7cd74.js.map