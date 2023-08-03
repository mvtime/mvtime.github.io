"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[892],{8892:function(e,s,t){t.r(s),t.d(s,{default:function(){return P}});t(7658);var a=t(3396),l=t(7139),n=t(9242);const i=e=>((0,a.dD)("data-v-3cc96152"),e=e(),(0,a.Cn)(),e),d={class:"addtask"},c={class:"modal_header"},_={class:"header_style modal_header_title"},o={class:"overlay_contents"},r={class:"overlay_contents_text"},k={class:"inputs_row"},p=["placeholder"],u=i((()=>(0,a._)("div",{class:"flex-break"},null,-1))),h=["placeholder"],y=i((()=>(0,a._)("div",{class:"flex-break"},null,-1))),w={class:"styled_input styled_links_box"},m={class:"styled_links_display"},v={key:0,class:"placeholder"},f={key:1,class:"styled_line_links"},x=["href"],b=i((()=>(0,a._)("hr",{class:"styled_links_separator"},null,-1))),g={class:"styled_links_add"},D=["disabled"],z={class:"overlay_contents_text"},C={class:"checkboxes"},U=["id","value"],V=["for"],A=["for"],L={class:"bottom_actions"},S=i((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),T=["disabled"];function $(e,s,t,i,$,j){return(0,a.wg)(),(0,a.iD)("div",d,[(0,a._)("header",c,[(0,a._)("h2",_,"Add a "+(0,l.zw)(j.type_full),1)]),(0,a._)("div",o,[(0,a._)("div",r," Schedule a new "+(0,l.zw)($.task.type)+" for your class"+(0,l.zw)(j.classes&&1==j.classes.length?"":"es"),1),(0,a._)("div",k,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>$.task.name=e),class:"styled_input",type:"text",placeholder:j.type_full+" Name"},null,8,p),[[n.nr,$.task.name]]),(0,a.wy)((0,a._)("input",{type:"date",class:"styled_input input_task__date","onUpdate:modelValue":s[1]||(s[1]=e=>$.task.date=e)},null,512),[[n.nr,$.task.date]]),u,(0,a.wy)((0,a._)("textarea",{"onUpdate:modelValue":s[2]||(s[2]=e=>$.task.description=e),class:"styled_input styled_textarea task_description",type:"text",placeholder:j.type_full+" Description (Optional)"},"\r\n        ",8,h),[[n.nr,$.task.description]]),y,(0,a._)("div",w,[(0,a._)("div",m,[$.task.links&&$.task.links.length?((0,a.wg)(),(0,a.iD)("div",f,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)($.task.links,(e=>((0,a.wg)(),(0,a.iD)("a",{class:"styled_line_links__link",target:"_blank",href:e.path,key:e.path},(0,l.zw)(e.text),9,x)))),128))])):((0,a.wg)(),(0,a.iD)("span",v,(0,l.zw)(j.type_full)+" Links (Optional)",1))]),b,(0,a._)("div",g,[(0,a.wy)((0,a._)("input",{class:"styled_links_add__path",type:"url","onUpdate:modelValue":s[3]||(s[3]=e=>$.newlink.path=e),placeholder:"Link URL (http://example.com)"},null,512),[[n.nr,$.newlink.path]]),(0,a.wy)((0,a._)("input",{class:"styled_links_add__text",type:"text","onUpdate:modelValue":s[4]||(s[4]=e=>$.newlink.text=e),placeholder:"Link Text (what students see)"},null,512),[[n.nr,$.newlink.text]]),(0,a._)("button",{class:"styled_links_add__action",onClick:s[5]||(s[5]=(...e)=>j.add_newlink&&j.add_newlink(...e)),disabled:j.newlink_ready}," Add ",8,D)])])]),(0,a._)("div",z," Choose which classes this "+(0,l.zw)($.task.type)+" will be added to ",1),(0,a._)("div",C,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(j.classes,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"checkbox",key:e.id},[(0,a.wy)((0,a._)("input",{type:"checkbox",id:e.id,value:e.id,"onUpdate:modelValue":s[6]||(s[6]=e=>$.task_classes=e)},null,8,U),[[n.e8,$.task_classes]]),e.period?((0,a.wg)(),(0,a.iD)("label",{key:0,for:e.id}," P"+(0,l.zw)(e.period)+" - "+(0,l.zw)(e.name),9,V)):((0,a.wg)(),(0,a.iD)("label",{key:1,for:e.id},(0,l.zw)(e.name),9,A))])))),128))])]),(0,a._)("div",L,[(0,a._)("button",{class:"close_action",onClick:s[7]||(s[7]=s=>e.$router.push("/portal"))},"Close"),S,(0,a._)("button",{class:(0,l.C_)(["continue_action",{loading_bg:$.loading}]),onClick:s[8]||(s[8]=(...e)=>j.add_task&&j.add_task(...e)),disabled:!$.task.name||!$.task.date||!$.task_classes.length}," Add "+(0,l.zw)($.task.type),11,T)])])}var j=t(8980),H={name:"AddTaskView",emits:["close"],data(){return{task:{name:"",date:"",description:"",type:this.$route.params.tasktype?this.$route.params.tasktype:"task"},task_classes:[],newlink:{text:"",path:""},loading:!1}},computed:{type_full(){return{socratic:"Socratic Seminar",test:"Test",summative:"Summative Assignment",midterm:"Midterm",project:"Project",task:"Task"}[this.task.type]},newlink_ready(){return!this.newlink.path||!this.newlink.text||!this.newlink.path.startsWith("http")},class_name(){if(!this.classes)return null;let e=this.classes.find((e=>e.id===this.class_id));return e?e.name:null},store(){return(0,j.h)()},classes(){return this.store.classes}},methods:{add_newlink(){this.task.links||(this.task.links=[]),this.task.links.push(this.newlink),this.newlink={text:"",path:""}},add_task(){this.loading=!0,this.store.add_task(this.task,this.task_classes).then((()=>{this.$emit("close")})).catch((e=>{this.loading=!1,console.error(e)}))}}},K=t(89);const O=(0,K.Z)(H,[["render",$],["__scopeId","data-v-3cc96152"]]);var P=O}}]);
//# sourceMappingURL=892.41de047b.js.map