"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[215],{6215:function(e,s,t){t.r(s),t.d(s,{default:function(){return A}});t(7658);var a=t(3396),l=t(7139),n=t(9242);const c=e=>((0,a.dD)("data-v-e57750c4"),e=e(),(0,a.Cn)(),e),d={class:"addtask"},i={class:"modal_header"},r={class:"modal_header_title"},o={class:"overlay_contents"},u={class:"overlay_contents_text"},_={class:"inputs_row"},p=["placeholder"],k=c((()=>(0,a._)("div",{class:"flex-break"},null,-1))),m=["placeholder"],h={class:"overlay_contents_text"},y={class:"checkboxes"},v=["id","value"],w=["for"],f={class:"bottom_actions"},b=c((()=>(0,a._)("div",{class:"flex-spacer"},null,-1))),x=["disabled"];function C(e,s,t,c,C,g){return(0,a.wg)(),(0,a.iD)("main",d,[(0,a._)("header",i,[(0,a._)("h2",r,"Add a "+(0,l.zw)(g.type_full),1)]),(0,a._)("div",o,[(0,a._)("div",u," Schedule a new "+(0,l.zw)(C.task.type)+" for your class"+(0,l.zw)(g.classes&&1==g.classes.length?"":"es"),1),(0,a._)("div",_,[(0,a.wy)((0,a._)("input",{"onUpdate:modelValue":s[0]||(s[0]=e=>C.task.name=e),class:"styled_input",type:"text",placeholder:g.type_full+" Name"},null,8,p),[[n.nr,C.task.name]]),(0,a.wy)((0,a._)("input",{type:"date",class:"styled_input input_task__date","onUpdate:modelValue":s[1]||(s[1]=e=>C.task.date=e)},null,512),[[n.nr,C.task.date]]),k,(0,a.wy)((0,a._)("textarea",{"onUpdate:modelValue":s[2]||(s[2]=e=>C.task.description=e),class:"styled_input styled_textarea task_description",type:"text",placeholder:g.type_full+" Description (Optional)"},"\r\n        ",8,m),[[n.nr,C.task.description]])]),(0,a._)("div",h," Choose which classes this "+(0,l.zw)(C.task.type)+" will be added to ",1),(0,a._)("div",y,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(g.classes,(e=>((0,a.wg)(),(0,a.iD)("div",{class:"checkbox",key:e.id},[(0,a.wy)((0,a._)("input",{type:"checkbox",id:e.id,value:e.id,"onUpdate:modelValue":s[3]||(s[3]=e=>C.task_classes=e)},null,8,v),[[n.e8,C.task_classes]]),(0,a._)("label",{for:e.id},(0,l.zw)(e.name.replace("[JOINED] ","")),9,w)])))),128))])]),(0,a._)("div",f,[(0,a._)("button",{class:"close_action",onClick:s[4]||(s[4]=s=>e.$router.push("/portal"))},"Close"),b,(0,a._)("button",{class:"continue_action",onClick:s[5]||(s[5]=e=>g.store.add_task(C.task,C.task_classes)),disabled:!C.task.name||!C.task.date||!C.task_classes.length}," Add task ",8,x)])])}var g=t(8980),D={name:"AddTaskView",data(){return{task:{name:"",date:"",description:"",type:this.$route.params.tasktype?this.$route.params.tasktype:"task"},task_classes:[]}},computed:{type_full(){return{socratic:"Socratic Seminar",test:"Test",summative:"Summative Assignment",midterm:"Midterm",project:"Project",task:"Task"}[this.task.type]},class_name(){if(!this.classes)return null;let e=this.classes.find((e=>e.id===this.class_id));return e?e.name:null},store(){return(0,g.h)()},classes(){return this.store.classes}}},z=t(89);const V=(0,z.Z)(D,[["render",C],["__scopeId","data-v-e57750c4"]]);var A=V}}]);
//# sourceMappingURL=215.2f35d5a6.js.map