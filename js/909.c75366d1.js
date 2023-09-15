"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[909],{1909:function(t,e,s){s.r(e),s.d(e,{default:function(){return A}});var a=s(3396),i=s(7139),n=s(9242);const l=t=>((0,a.dD)("data-v-1f49bb18"),t=t(),(0,a.Cn)(),t),o={class:"create_task"},d={class:"modal_header",ref:"title"},r={class:"header_style modal_header_title"},k={class:"overlay_contents",ref:"contents"},_={key:0},h={class:"overlay_contents_text change_text"},c={class:"inputs_row"},p=["placeholder","disabled"],u=l((()=>(0,a._)("div",{class:"flex-break"},null,-1))),y=["placeholder"],w=l((()=>(0,a._)("div",{class:"flex-break"},null,-1))),m={class:"styled_input styled_links_box"},f={class:"styled_links_display"},g={key:0,class:"placeholder"},b={key:1,class:"styled_line_links"},v=["onClick"],x=l((()=>(0,a._)("hr",{class:"styled_links_separator"},null,-1))),$={class:"styled_links_add"},C=["disabled"],D={key:1,alt:"Loading Icon",class:"loading_icon"},O={class:"bottom_actions"},j=l((()=>(0,a._)("div",{class:"flex_spacer"},null,-1))),z=["disabled"],U=["disabled"];function E(t,e,s,l,E,L){return(0,a.wg)(),(0,a.iD)("div",o,[(0,a._)("header",d,[(0,a._)("h2",r,"Edit "+(0,i.zw)(E.task.type||"task")+" details",1)],512),(0,a._)("div",k,[E.ready?((0,a.wg)(),(0,a.iD)("div",_,[(0,a._)("div",h,[(0,a.Uk)(" Change the details of your "+(0,i.zw)(E.task.type||"task")+(0,i.zw)(E.original.name?` "${E.original.name}"`:"")+" in ",1),(0,a._)("span",{class:"class_name button_pointer_text",style:(0,i.j5)({"--color-class":L.class_obj.color,"--color-class-alt":L.class_obj.color+"2d"})},(0,i.zw)(`P${L.class_obj.period} - ${L.class_obj.name}`),5)]),(0,a._)("div",c,[L.is_note?(0,a.kq)("",!0):(0,a.wy)(((0,a.wg)(),(0,a.iD)("input",{key:0,"onUpdate:modelValue":e[0]||(e[0]=t=>E.task.name=t),class:"styled_input",type:"text",placeholder:L.type_full+" Name",disabled:L.is_note},null,8,p)),[[n.nr,E.task.name]]),(0,a.wy)((0,a._)("input",{type:"date",class:"styled_input input_task__date","onUpdate:modelValue":e[1]||(e[1]=t=>E.task.date=t),style:(0,i.j5)({maxWidth:L.is_note?"100%":null})},null,4),[[n.nr,E.task.date]]),u,(0,a.wy)((0,a._)("textarea",{"onUpdate:modelValue":e[2]||(e[2]=t=>E.task.description=t),class:"styled_input styled_textarea task_description",type:"text",placeholder:L.type_full+(L.is_note?" Contents":" Description (Optional)")},"\r\n          ",8,y),[[n.nr,E.task.description]]),w,(0,a._)("div",m,[(0,a._)("div",f,[E.task.links&&E.task.links.length?((0,a.wg)(),(0,a.iD)("div",b,[((0,a.wg)(!0),(0,a.iD)(a.HY,null,(0,a.Ko)(E.task.links,(t=>((0,a.wg)(),(0,a.iD)("a",{class:"styled_line_links__link styled_line_links__remove",target:"_blank",key:t.path,onClick:e=>L.remove_link(t)},(0,i.zw)(t.text),9,v)))),128))])):((0,a.wg)(),(0,a.iD)("span",g,(0,i.zw)(L.type_full)+" Links (Optional)",1))]),x,(0,a._)("div",$,[(0,a.wy)((0,a._)("input",{class:"styled_links_add__path",type:"url","onUpdate:modelValue":e[3]||(e[3]=t=>E.newlink.path=t),onBlur:e[4]||(e[4]=(...t)=>L.fix_newlink_path&&L.fix_newlink_path(...t)),placeholder:"Link URL (http://example.com)"},null,544),[[n.nr,E.newlink.path]]),(0,a.wy)((0,a._)("input",{class:"styled_links_add__text",type:"text","onUpdate:modelValue":e[5]||(e[5]=t=>E.newlink.text=t),placeholder:"Link Text (what students see)"},null,512),[[n.nr,E.newlink.text]]),(0,a._)("button",{class:"styled_links_add__action",onClick:e[6]||(e[6]=(...t)=>L.add_newlink&&L.add_newlink(...t)),disabled:L.newlink_not_ready}," Add ",8,C)])])])])):((0,a.wg)(),(0,a.iD)("img",D))],512),(0,a._)("div",O,[(0,a._)("button",{class:"close_action",onClick:e[7]||(e[7]=e=>t.$emit("close"))},"Cancel"),j,(0,a._)("button",{class:"delete_action primary_styled",onClick:e[8]||(e[8]=(...t)=>L.delete_task&&L.delete_task(...t)),disabled:!E.ready||E.loading}," Delete ",8,z),(0,a._)("button",{class:(0,i.C_)(["continue_action",{loading_bg:E.loading}]),onClick:e[9]||(e[9]=(...t)=>L.update_task&&L.update_task(...t)),disabled:!L.changed||!E.task.name&&!L.is_note||!E.task.date||L.is_note&&!E.task.description}," Save "+(0,i.zw)(E.task.type||"task"),11,U)])])}s(7658);var L=s(8980),T=s(2745),N=s(1708),V=s(9529),R=s.n(V),P={name:"EditTaskView",emits:["close"],mixins:[R()],data(){return{task:{},original:{},newlink:{text:"",path:""},ready:!1,loading:!0,types:{note:"Note",task:"Assignment",test:"Test",project:"Project",quiz:"Quiz",exam:"Exam"}}},mounted(){this.$smoothReflow({el:this.$refs.contents,childTransitions:!0}),this.$smoothReflow({el:this.$refs.title,hideOverflow:!0}),this.get_task()},computed:{type_full(){return this.types[this.task.type]||this.task.type||"Task"},newlink_not_ready(){return!this.newlink.path||!this.newlink.text||!this.newlink.path.startsWith("http")},class_obj(){let t=this.store?.classes;return t?t.find((t=>t.id===this.original.class_id))||{}:null},store(){return(0,L.h)()},is_note(){return"note"===this.task.type},changed(){return JSON.stringify(this.task)!==JSON.stringify(this.original)},date(){let t=new Date(this.task?.date);if(!isNaN(t.getTime()))return t=new Date(t.getTime()+60*t.getTimezoneOffset()*1e3),new Date(t).toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}},methods:{add_newlink(){this.task.links||(this.task.links=[]),this.newlink.path=new URL(this.newlink.path).href,this.task.links.push(this.newlink),this.newlink={text:"",path:""}},async update_task(){this.newlink_not_ready?(this.loading=!0,this.store.update_task(this.task.ref,this.task).then((()=>{this.$router.push({name:"viewtask",params:{type:this.task.type,ref:this.$route.params.ref}})})).catch((t=>{this.loading=!1,(0,T.E)(`📃 Couldn't create ${this.task.type||"task"}:`,t),new N.PK("Couldn't create task",t,2e3)}))):new N.OO("Don't forget to to click the 'Add' button to add your link!",2e3)},delete_task(){this.$router.push({name:"delete",params:{type:this.task.type,ref:this.$route.params.ref},query:{title:this.is_note?this.task.description:this.task.name}})},async get_task(){const t=this.$route.params.ref.split("~").join("/");t?t.split("/").length<3&&(new N.OO("Invalid task specified",1500),this.$emit("close")):(new N.OO("No task specified",1500),this.$emit("close")),this.store.task_from_ref(t).then((t=>{t?(this.task=t,this.original={...t},this.ready=!0,this.loading=!1):(new N.OO("Couldn't find that task",2e3),(0,T.E)("⚠ Couldn't find task"),this.$emit("close"))})).catch((t=>{new N.PK("Error getting task",1500),(0,T.E)("⚠ Error getting task",t),this.$emit("close")}))},remove_link(t){this.task.links=this.task.links.filter((e=>e.path!==t.path)),this.newlink=t},fix_newlink_path(){if(this.newlink.path&&this.newlink.path.includes("."))try{this.newlink.path=new URL(this.newlink.path).href}catch(t){this.newlink.path="https://"+this.newlink.path,this.fix_newlink_path()}}}},S=s(89);const q=(0,S.Z)(P,[["render",E],["__scopeId","data-v-1f49bb18"]]);var A=q}}]);
//# sourceMappingURL=909.c75366d1.js.map