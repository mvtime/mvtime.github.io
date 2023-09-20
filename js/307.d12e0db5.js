"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[307],{7307:function(t,e,s){s.r(e),s.d(e,{default:function(){return I}});var l=s(3396),a=s(7139),n=s(9242);const i=t=>((0,l.dD)("data-v-21dc168e"),t=t(),(0,l.Cn)(),t),d={class:"modal_header"},o={class:"header_style modal_header_title"},_=["value"],r={class:"overlay_contents",ref:"contents"},c={class:"overlay_contents_text"},k={key:0},h={key:1},p={class:"inputs_row"},u=["placeholder","disabled"],y=i((()=>(0,l._)("div",{class:"flex-break"},null,-1))),w=["placeholder"],m=i((()=>(0,l._)("div",{class:"flex-break"},null,-1))),f={class:"styled_input styled_links_box"},v={class:"styled_links_display"},b={key:0,class:"placeholder"},x={key:1,class:"styled_line_links"},g=["onClick"],D=i((()=>(0,l._)("hr",{class:"styled_links_separator"},null,-1))),C={class:"styled_links_add"},z=["disabled"],U={class:"overlay_contents_text"},$={class:"checkboxes"},L=["id","value"],V=["for"],q=["for"],O={class:"bottom_actions"},A=i((()=>(0,l._)("div",{class:"flex_spacer"},null,-1))),K=["disabled"];function j(t,e,s,i,j,R){return(0,l.wg)(),(0,l.iD)("div",{class:"create_task",onKeypress:e[11]||(e[11]=(...t)=>R.submit_key&&R.submit_key(...t))},[(0,l._)("header",d,[(0,l._)("h2",o,[(0,l._)("span",null,"Add a"+(0,a.zw)(R.is_vowel(R.type_full[0])?"n":"")+" ",1),(0,l.wy)((0,l._)("select",{title:"Task type","onUpdate:modelValue":e[0]||(e[0]=t=>j.task.type=t),class:"type_dropdown styled_input styled_select",ref:"type"},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(Object.entries(j.types),(t=>((0,l.wg)(),(0,l.iD)("option",{class:"type_dropdown__option styled_select__option",value:t[0],key:t[0]},(0,a.zw)(t[1]),9,_)))),128))],512),[[n.bM,j.task.type]])])]),(0,l._)("div",r,[(0,l._)("div",c,[R.is_note?((0,l.wg)(),(0,l.iD)("span",k,"Add a new "+(0,a.zw)(j.task.type)+" to",1)):((0,l.wg)(),(0,l.iD)("span",h,"Schedule a new "+(0,a.zw)(j.task.type)+" for",1)),(0,l.Uk)(" your class"+(0,a.zw)(R.classes&&1==R.classes.length?"":"es"),1)]),(0,l._)("div",p,[R.is_note?(0,l.kq)("",!0):(0,l.wy)(((0,l.wg)(),(0,l.iD)("input",{key:0,"onUpdate:modelValue":e[1]||(e[1]=t=>j.task.name=t),class:"styled_input",type:"text",placeholder:R.type_full+" Name",disabled:R.is_note},null,8,u)),[[n.nr,j.task.name]]),(0,l.wy)((0,l._)("input",{type:"date",class:"styled_input input_task__date","onUpdate:modelValue":e[2]||(e[2]=t=>j.task.date=t),style:(0,a.j5)({maxWidth:R.is_note?"100%":null})},null,4),[[n.nr,j.task.date]]),y,(0,l.wy)((0,l._)("textarea",{"onUpdate:modelValue":e[3]||(e[3]=t=>j.task.description=t),class:"styled_input styled_textarea task_description",type:"text",placeholder:R.type_full+(R.is_note?" Contents":" Description (Optional)")},"\r\n        ",8,w),[[n.nr,j.task.description]]),m,(0,l._)("div",f,[(0,l._)("div",v,[j.task.links&&j.task.links.length?((0,l.wg)(),(0,l.iD)("div",x,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(j.task.links,(t=>((0,l.wg)(),(0,l.iD)("a",{class:"styled_line_links__link styled_line_links__remove",target:"_blank",key:t.path,onClick:e=>R.remove_link(t)},(0,a.zw)(t.text),9,g)))),128))])):((0,l.wg)(),(0,l.iD)("span",b,(0,a.zw)(R.type_full)+" Links (Optional)",1))]),D,(0,l._)("div",C,[(0,l.wy)((0,l._)("input",{class:"styled_links_add__path",type:"url","onUpdate:modelValue":e[4]||(e[4]=t=>j.newlink.path=t),onBlur:e[5]||(e[5]=(...t)=>R.fix_newlink_path&&R.fix_newlink_path(...t)),placeholder:"Link URL (http://example.com)"},null,544),[[n.nr,j.newlink.path]]),(0,l.wy)((0,l._)("input",{class:"styled_links_add__text",type:"text","onUpdate:modelValue":e[6]||(e[6]=t=>j.newlink.text=t),placeholder:"Link Text (what students see)"},null,512),[[n.nr,j.newlink.text]]),(0,l._)("button",{class:"styled_links_add__action",onClick:e[7]||(e[7]=(...t)=>R.add_newlink&&R.add_newlink(...t)),disabled:R.newlink_not_ready}," Add ",8,z)])])]),(0,l._)("div",U," Choose which classes this "+(0,a.zw)(j.task.type)+" will be added to ",1),(0,l._)("div",$,[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(R.classes,(t=>((0,l.wg)(),(0,l.iD)("div",{class:"checkbox",key:t.id},[(0,l.wy)((0,l._)("input",{type:"checkbox",id:t.id,value:t.id,"onUpdate:modelValue":e[8]||(e[8]=t=>j.task_classes=t)},null,8,L),[[n.e8,j.task_classes]]),t.period?((0,l.wg)(),(0,l.iD)("label",{key:0,class:"button_pointer_text class_name",for:t.id,style:(0,a.j5)({"--color-class":t.color,"--color-class-alt":t.color+"2d"})}," P"+(0,a.zw)(t.period)+" - "+(0,a.zw)(t.name),13,V)):((0,l.wg)(),(0,l.iD)("label",{key:1,for:t.id},(0,a.zw)(t.name),9,q))])))),128))])],512),(0,l._)("div",O,[(0,l._)("button",{class:"close_action",onClick:e[9]||(e[9]=e=>t.$emit("close"))},"Close"),A,(0,l._)("button",{class:(0,a.C_)(["continue_action",{loading_bg:j.loading}]),onClick:e[10]||(e[10]=(...t)=>R.try_submit&&R.try_submit(...t)),disabled:!R.ready}," Add "+(0,a.zw)(j.task.type),11,K)])],32)}s(7658);var R=s(8980),P=s(2745),T=s(1708),E=s(9529),H=s.n(E),Y={name:"CreateTaskView",emits:["close"],mixins:[H()],mounted(){this.$smoothReflow({el:this.$refs.contents})},data(){return{task:{name:"",date:this.$route.query?.date?this.$route.query.date:"",description:"",type:this.$route.params.tasktype?this.$route.params.tasktype:"task"},task_classes:this.$route.query?.class?[this.$route.query.class]:[],newlink:{text:"",path:""},loading:!1,types:{note:"Note",task:"Assignment",test:"Test",project:"Project",quiz:"Quiz",exam:"Exam"}}},computed:{ready(){return(this.task.name||this.is_note)&&this.task.date&&this.task_classes.length&&(!this.is_note||this.task.description)},type_full(){return this.get_type(this.task.type)},newlink_not_ready(){if(!this.newlink.path||!this.newlink.text)return!0;try{return new URL(this.newlink.path),!1}catch(t){return!0}},class_name(){if(!this.classes)return null;let t=this.classes.find((t=>t.id===this.class_id));return t?t.name:null},store(){return(0,R.h)()},classes(){return this.store.classes},is_note(){return"note"===this.task.type}},methods:{submit_key(t){t.ctrlKey&&"Enter"===t.code&&(t.preventDefault(),this.try_submit())},try_submit(){this.ready?this.create_task():new T.OO("Please fill out all required fields",1e3)},get_type(t=this.task.type){return this.types[t]||t},is_vowel(t){return["a","e","i","o","u"].includes(t.toLowerCase())},add_newlink(){this.task.links||(this.task.links=[]),this.newlink.path=new URL(this.newlink.path).href,this.task.links.push(this.newlink),this.newlink={text:"",path:""}},create_task(){this.newlink_not_ready?(this.loading=!0,this.store.create_task(this.task,this.task_classes).then((()=>{this.$emit("close")})).catch((t=>{this.loading=!1,(0,P.E)(`📃 Couldn't create ${this.task.type||"task"}:`,t),new T.PK("Couldn't create task",t,2e3)}))):new T.OO("Don't forget to to click the 'Add' button to add your link!",2e3)},remove_link(t){this.task.links=this.task.links.filter((e=>e.path!==t.path)),this.newlink=t},fix_newlink_path(){if(this.newlink.path&&this.newlink.path.includes("."))try{this.newlink.path=new URL(this.newlink.path).href}catch(t){this.newlink.path="https://"+this.newlink.path,this.fix_newlink_path()}}}},N=s(89);const B=(0,N.Z)(Y,[["render",j],["__scopeId","data-v-21dc168e"]]);var I=B}}]);
//# sourceMappingURL=307.d12e0db5.js.map