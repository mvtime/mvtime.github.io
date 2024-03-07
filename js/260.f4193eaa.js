"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[260],{260:function(t,e,s){s.r(e),s.d(e,{default:function(){return Q}});s(4114);var a=s(6768),i=s(4232),o=s(5130);const n=t=>((0,a.Qi)("data-v-f7767136"),t=t(),(0,a.jt)(),t),l={class:"notes_task"},r={class:"modal_header",ref:"title"},c={class:"header_style modal_header_title"},d={class:"overlay_contents",ref:"contents"},h={key:0},u={class:"overlay_contents_text change_text"},k=["href"],_={class:"inputs_row"},m=["placeholder"],p={key:1,alt:"Loading Icon",class:"loading_icon"},f={class:"bottom_actions"},g=["disabled"],y=n((()=>(0,a.Lk)("div",{class:"flex_spacer"},null,-1))),$=["disabled"],b=["disabled"];function v(t,e,s,n,v,w){return(0,a.uX)(),(0,a.CE)("main",l,[(0,a.Lk)("header",r,[(0,a.Lk)("h2",c,(0,i.v_)(v.original_note?"Update":"Add")+" "+(0,i.v_)(v.task.type||"task")+" notes ",1)],512),(0,a.Lk)("div",d,[v.ready?((0,a.uX)(),(0,a.CE)("div",h,[(0,a.Lk)("div",u,[(0,a.eW)(' Save your notes for "'+(0,i.v_)(v.task.name)+'" in ',1),(0,a.Lk)("a",{class:"class_name button_pointer_text",href:`/view/${v.task._class.ref}`,onClick:e[0]||(e[0]=e=>{e.preventDefault(),t.$router.push({name:"viewclass",params:{ref:v.task._class.ref},query:t.$route.query})}),style:(0,i.Tr)({"--color-class":v.task._class.color,"--color-class-alt":v.task._class.color+"2d"})},(0,i.v_)(t.$store.class_text(v.task._class)),13,k)]),(0,a.Lk)("div",_,[(0,a.bo)((0,a.Lk)("textarea",{"onUpdate:modelValue":e[1]||(e[1]=t=>v.note=t),class:"styled_input styled_textarea task_note",type:"text",placeholder:"Your "+w.type_full+" Notes (Optional)"},"\n          ",8,m),[[o.Jo,v.note]])])])):((0,a.uX)(),(0,a.CE)("img",p))],512),(0,a.Lk)("div",f,[v.ready&&"notes"==t.$route.name?((0,a.uX)(),(0,a.CE)("button",{key:0,class:(0,i.C4)(["back_action click_escape",{loading_bg:v.loading}]),disabled:v.loading,onClick:e[2]||(e[2]=(...t)=>w.back&&w.back(...t))}," View ",10,g)):((0,a.uX)(),(0,a.CE)("button",{key:1,class:"close_action click_escape",onClick:e[3]||(e[3]=e=>t.$emit("close"))},"Close")),y,v.ready&&"notes"!=t.$route.name?((0,a.uX)(),(0,a.CE)("button",{key:2,class:(0,i.C4)(["primary_styled",{loading_bg:v.loading}]),disabled:v.loading,onClick:e[4]||(e[4]=(...t)=>w.back&&w.back(...t))}," View ",10,$)):(0,a.Q3)("",!0),(0,a.Lk)("button",{class:(0,i.C4)(["continue_action click_ctrlenter",{loading_bg:v.loading}]),onClick:e[5]||(e[5]=(...t)=>w.try_submit&&w.try_submit(...t)),disabled:w.not_submittable},(0,i.v_)(v.original_note?"Update":"Add"),11,b)])])}var w=s(4186),C=s(6471),L=s.n(C),x={name:"EditTaskView",emits:["close","view"],mixins:[L()],data(){return{task:{},original_note:"",note:"",ready:!1,loading:!0}},mounted(){this.$smoothReflow({el:this.$refs.contents,childTransitions:!0}),this.$smoothReflow({el:this.$refs.title,hideOverflow:!0}),this.get_task()},computed:{not_submittable(){return!this.changed},type_full(){return this.$magic?.type_full(this.task.type)||"Task"},changed(){return this.original_note!==this.note}},methods:{try_submit(){this.not_submittable?new w.MY("No changes to save",1e3):this.update_note()},back(){"notes"==this.$route.name?this.$router.push({name:"viewtask",params:{ref:this.$route.params.ref},query:this.$route.query}):this.$emit("view",this.task)},async update_note(){this.loading=!0,this.$store.set_note(this.note,this.$route.params.ref).then((()=>{new w.rQ(`${this.original_note?this.note?"Updated":"Removed":"Added"} ${this.task.type||"task"} notes for ${this.task.name}`,2e3),this.back()})).catch((t=>{this.loading=!1,this.$status.error(`📃 Couldn't edit ${this.task.type||"task"} notes:`,t),new w.Qp(`Couldn't edit ${this.task.type||"task"} notes`,t,2e3)}))},async get_task(){const t=this.$route.params.ref.split("~").join("/");t?t.split("/").length<3&&(new w.MY("Invalid task specified",1500),this.$emit("close")):(new w.MY("No task specified",1500),this.$emit("close")),this.$store.task_from_ref(t).then((t=>{t?(this.task=t,this.original={...t},this.ready=!0,this.loading=!1):(new w.MY("Couldn't find that task",2e3),this.$status.warn("⚠ Couldn't find task"),this.$emit("close"));const e=this.$store.note_for(this.$route.params.ref);e&&(this.note=e,this.original_note=e)})).catch((t=>{new w.Qp("Error getting task",t,1500),this.$status.error("⚠ Error getting task",t),this.$emit("close")}))}}},E=s(1241);const X=(0,E.A)(x,[["render",v],["__scopeId","data-v-f7767136"]]);var Q=X}}]);
//# sourceMappingURL=260.f4193eaa.js.map