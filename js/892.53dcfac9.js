"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[892],{4892:function(e,a,s){s.r(a),s.d(a,{default:function(){return q}});s(4114);var t=s(6768),r=s(4232),l=s(5130);const n=e=>((0,t.Qi)("data-v-011faf66"),e=e(),(0,t.jt)(),e),i={class:"userteacher"},o={key:0,class:"user_wrapper part_wrapper"},c={key:0,class:"users"},d={class:"user_pfp"},h=["src","alt","title"],_={class:"logs"},u=["href","onClick"],m={key:1,class:"users_empty part__empty"},p={key:2,class:"users_loading part__loading"},g=n((()=>(0,t.Lk)("div",{class:"part__loading_placeholder user__loading_placeholder part_loading_animation",title:"Loading Users"},[(0,t.Lk)("div",{class:"user__loading_placeholder_img part_loading_animation"})],-1))),k=[g],y={key:0,class:"teachers_empty part__empty",style:{animationDelay:"0.3s"}},f={key:1,class:"teachers"},v=["onClick"],$=n((()=>(0,t.Lk)("div",{class:"themed_icon unmake_teacher__icon"},null,-1))),w=[$],C=n((()=>(0,t.Lk)("hr",{class:"teacher_separator"},null,-1))),E={class:"teacher_classes"},L=["href","title","onClick"],D={key:0,class:"teacher_classes__empty class_name button_pointer_text"},X=["placeholder"],T=["disabled"],b=n((()=>(0,t.Lk)("div",{class:"themed_icon teacher_add_button__icon"},null,-1))),I=[b],N={key:4,class:"teachers_loading part__loading"},A=n((()=>(0,t.Lk)("div",{class:"part__loading_placeholder teacher__loading_placeholder part_loading_animation",title:"Loading Teachers"},null,-1))),P=[A],Q=n((()=>(0,t.Lk)("div",{class:"part__loading_placeholder part_loading_animation teacher_add__loading_placeholder"},null,-1))),U=n((()=>(0,t.Lk)("div",{class:"part__loading_placeholder part_loading_animation teacher_add__loading_placeholder"},null,-1))),M=[Q,U];function O(e,a,s,n,g,$){return(0,t.uX)(),(0,t.CE)("div",i,[g.users.length?((0,t.uX)(),(0,t.CE)("div",o,[g.users.length?((0,t.uX)(),(0,t.CE)("table",c,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(g.users,((a,s)=>((0,t.uX)(),(0,t.CE)("tr",{class:"user admin_in",key:a.id,style:(0,r.Tr)({animationDelay:.03*(s+2)+"s"})},[(0,t.Lk)("td",d,[(0,t.Lk)("img",{src:a.pfp,alt:`${a.displayName}'s Profile Picture`,title:`${a.displayName}'s Profile Picture`,class:"user_pfp__img"},null,8,h)]),(0,t.Lk)("td",null,(0,r.v_)(a.displayName),1),(0,t.Lk)("td",null,(0,r.v_)(a.email),1),(0,t.Lk)("td",null,(0,r.v_)(a.uid),1),(0,t.Lk)("td",_,[(0,t.Lk)("a",{class:"logs_link",href:`../logs?search=${a.email}`,onClick:s=>{e.$router.push({name:"admin_logs",query:{...this.$route.query,search:a.email}}),s.preventDefault()}},"Logs",8,u)])],4)))),128))])):(0,t.Q3)("",!0)])):g.users_loaded?((0,t.uX)(),(0,t.CE)("div",m,"No Users Found")):((0,t.uX)(),(0,t.CE)("div",p,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(g.user_placeholders,((e,a)=>((0,t.uX)(),(0,t.CE)("div",{class:"admin_in",key:e,style:(0,r.Tr)({animationDelay:.03*(a+2)+"s"})},k,4)))),128))])),g.teachers_loaded?((0,t.uX)(),(0,t.CE)("div",{key:3,class:(0,r.C4)(["teachers_wrapper part_wrapper",{teachers_empty:!g.teachers.length,part__empty:!g.teachers.length}])},[g.teachers.length?((0,t.uX)(),(0,t.CE)("table",f,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(g.teachers,((a,s)=>((0,t.uX)(),(0,t.CE)("tr",{class:"teacher admin_in",key:a.id,style:(0,r.Tr)({animationDelay:.15*(s+2)+"s"})},[(0,t.Lk)("td",null,(0,r.v_)(a.name),1),(0,t.Lk)("td",null,(0,r.v_)(a.email),1),(0,t.Lk)("td",null,(0,r.v_)(a.id),1),(0,t.Lk)("button",{class:"unmake_teacher",onClick:e=>$.unmake_teacher(a.id)},w,8,v),C,(0,t.Lk)("td",E,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(a.classes,((l,n)=>((0,t.uX)(),(0,t.CE)("span",{class:"class_name_wrapper admin_in",key:l.id,style:(0,r.Tr)({"--color-class":l.color,"--color-class-alt":l.color+"80",animationDelay:.15*(s+2.5)+(n+1)/a.classes.length*.1+"s"})},[(0,t.Lk)("a",{href:`/view/${e.$store.path_to_ref(a.email+"/"+l.id)}`,target:"_blank",title:`View '${e.$store.class_text(l)}'`,onClick:s=>{s.preventDefault(),$.open(e.$router.resolve({name:"publicviewclass",params:{ref:e.$store.path_to_ref(a.email+"/"+l.id)},query:e.$route.query}).href,"_blank")},class:"class_name button_pointer_text"},(0,r.v_)(e.$store.class_text(l)),9,L)],4)))),128)),a.classes&&a.classes.length?(0,t.Q3)("",!0):((0,t.uX)(),(0,t.CE)("span",D,"No Classes"))])],4)))),128))])):((0,t.uX)(),(0,t.CE)("div",y,"No Teachers Found")),g.teachers.length?((0,t.uX)(),(0,t.CE)("hr",{key:2,class:"teacher_add__separator admin_in",style:(0,r.Tr)({animationDelay:.1*(g.teachers.length+3)+"s"})},null,4)):(0,t.Q3)("",!0),(0,t.Lk)("div",{class:"teacher_add admin_in",style:(0,r.Tr)({animationDelay:.1*(g.teachers.length+4)+"s"})},[(0,t.bo)((0,t.Lk)("textarea",{onKeydown:a[0]||(a[0]=(0,l.jR)((e=>{$.add_teachers(),e.preventDefault()}),["enter"])),title:"User emails to make teachers (comma or space separated)",class:"teacher_add_list",placeholder:`(Make teachers) user1@${e.$env.VUE_APP_ORG_DOMAIN}, user2`,"onUpdate:modelValue":a[1]||(a[1]=e=>g.teacher_add_list=e),enterkeyhint:"send"},null,40,X),[[l.Jo,g.teacher_add_list]]),(0,t.Lk)("button",{onClick:a[2]||(a[2]=(...e)=>$.add_teachers&&$.add_teachers(...e)),title:"Make listed emails teachers",class:"teacher_add_button",disabled:!g.teacher_add_list.trim().length},I,8,T)],4)],2)):((0,t.uX)(),(0,t.CE)("div",N,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(g.teacher_placeholders,((e,a)=>((0,t.uX)(),(0,t.CE)("div",{class:"admin_in",key:e,style:(0,r.Tr)({animationDelay:.15*(a+2)+"s"})},P,4)))),128)),(0,t.Lk)("hr",{class:"teacher_add__separator admin_in",style:(0,r.Tr)({animationDelay:.1*(g.teacher_placeholders.length+3)+"s"})},null,4),(0,t.Lk)("div",{class:"admin_in teacher_add__loading_placeholder_wrapper",style:(0,r.Tr)({animationDelay:.1*(g.teacher_placeholders.length+4)+"s"})},M,4)]))])}var F=s(6669),R=s(4186),K={name:"UserTeacher",data(){return{teacher_add_list:"",teachers:[],teachers_loaded:!1,users:[],users_loaded:!1,user_placeholders:Array.from({length:3},((e,a)=>a)),teacher_placeholders:Array.from({length:1},((e,a)=>a))}},async mounted(){this.getUsers(),this.getTeachers()},methods:{open(e,a){return window.open(e,a)},async unmake_teacher(e){const a=Date.now(),s=(0,F.Qg)(F.Cn,"unmakeTeacher");try{this.teachers_loaded=!1,this.teacher_placeholders=Array.from({length:this.teachers.length-1},((e,a)=>a));const{data:t}=await s({uid:e});if(t.error||!t.success)throw t.error;this.$status.log(`👤 Removed teacher ${e} in ${Date.now()-a}ms`),new R.rQ(`Removed teacher status from ${this.teachers.find((a=>a.id==e)).name}`,3500),this.teachers=this.teachers.filter((a=>a.id!=e))}catch(t){this.$status.error("👤 Error removing teacher",t?.errorInfo?.code||t?.errorInfo?.message||t?.message||t),new R.Qp("Something went wrong removing that teacher",t?.errorInfo?.message||t?.message||t,3500)}this.teachers_loaded=!0},async add_teachers(){const e=Date.now(),a=(0,F.Qg)(F.Cn,"makeTeachers");try{let s=this.teacher_add_list.trim().split(/[\s,]+/);if(s=s.map((e=>e.includes("@")?e:e+"@"+this.$env.VUE_APP_ORG_DOMAIN)),s.some((e=>!e.endsWith(this.$env.VUE_APP_ORG_DOMAIN))))return this.$status.error("👤 Error setting new teachers from emails/userids","Non-org domain email found"),void new R.MY(`Cannot make linked (non-@${this.$env.VUE_APP_ORG_DOMAIN}) users teachers`,2500);if(!s.length)return this.$status.error("👤 Error setting new teachers from emails/userids","No emails found"),void new R.MY("No emails found to make teachers",2500);{const t=this.users.filter((e=>s.includes(e.email)));if(!t.length)return this.$status.error("👤 Error setting new teachers from emails/userids","No users found"),void new R.MY("No matching loaded users found",2500);this.$status.log(`👤 Setting ${t.length} found teacher${1!=t.length?"s":""}: ${t.map((e=>`${e.email}->${e.uid}`)).join(", ")}`);let r=t.filter((e=>this.teachers.some((a=>a.id==e.uid)))).length;this.teacher_placeholders=Array.from({length:this.teachers.length+(t.length-r)},((e,a)=>a)),this.teachers_loaded=!1;const{data:l}=await a({emails:t.map((e=>e.email))});if(l.error)throw l.error;this.$status.log(`👤 ${l?.users?.length} teacher${1!=l?.users?.length?"s":""} set in ${Date.now()-e}ms; ${r} ${1!=r?"were already teachers":"was already a teacher"}`),new R.rQ(`Added ${l?.users?.length-r} teacher${l?.users?.length-r!=1?"s":""}, ${r} ${1!=r?"were already teachers":"was already a teacher"}`,3500),this.teacher_add_list=""}}catch(s){return this.$status.error("👤 Error setting new teachers from emails/userids",s?.errorInfo?.message||s?.message||s),new R.Qp("Something went wrong making those users teachers",s?.errorInfo?.message||s?.message||s,3500),void(this.teachers_loaded=!0)}this.getTeachers()},async getTeachers(){this.teachers_loaded=!1;const e=Date.now(),a=(0,F.Qg)(F.Cn,"getTeachers"),{data:s}=await a();this.teachers=s,this.teachers_loaded=!0,this.$status.log(`👤 ${s?.length} teacher(s) loaded in ${Date.now()-e}ms`)},async getUsers(){const e=Date.now(),a=(0,F.Qg)(F.Cn,"getUsers"),{data:s}=await a();this.users=s,this.users_loaded=!0,this.$status.log(`👤 ${s?.length} user(s) loaded in ${Date.now()-e}ms`)}}},V=s(1241);const x=(0,V.A)(K,[["render",O],["__scopeId","data-v-011faf66"]]);var q=x}}]);
//# sourceMappingURL=892.53dcfac9.js.map