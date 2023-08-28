"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[316],{9316:function(e,t,s){s.r(t),s.d(t,{default:function(){return P}});var i=s(3396),n=s(7139),a=s(9242);const l=e=>((0,i.dD)("data-v-b792f35e"),e=e(),(0,i.Cn)(),e),o={class:"settings"},c=l((()=>(0,i._)("header",{class:"modal_header"},[(0,i._)("h2",{class:"header_style modal_header_title"},"Account Preferences")],-1))),_={class:"overlay_contents"},d={key:0},r=l((()=>(0,i._)("div",{class:"overlay_contents_text"}," You can link a personal (non-mvla.net) account to access MVTT when not signed into your school account below! ",-1))),h={class:"inputs_row"},u={class:"styled_input styled_links_box"},k={class:"styled_links_display"},m={key:0,class:"placeholder"},v={key:1,class:"styled_line_links"},g=["onClick"],p=l((()=>(0,i._)("div",{class:"remove_icon"},null,-1))),w=[p],y={class:"styled_line_links__email"},b=l((()=>(0,i._)("hr",{class:"styled_links_separator"},null,-1))),f={class:"styled_links_add"},C=["disabled"],x=["disabled"],D={key:1,class:"overlay_contents_text"},U={key:0},A={key:1},q={class:"overlay_contents_text"},z=l((()=>(0,i._)("div",{class:"theme_icon icon"},null,-1))),T={class:"bottom_actions"},$=l((()=>(0,i._)("div",{class:"flex_spacer"},null,-1))),I=["disabled"];function V(e,t,s,l,p,V){return(0,i.wg)(),(0,i.iD)("div",o,[c,(0,i._)("div",_,[V.store.is_teacher?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",d,[r,(0,i._)("div",h,[(0,i._)("div",u,[(0,i._)("div",k,[V.store.linked_accounts&&V.store.linked_accounts.length?((0,i.wg)(),(0,i.iD)("div",v,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(V.store.linked_accounts,(e=>((0,i.wg)(),(0,i.iD)("div",{class:(0,n.C_)(["styled_line_links__account",{active:V.store.personal_account&&V.store.user.email==e}]),key:e},[V.store.personal_account?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",{key:0,class:"styled_line_links__remove",onClick:t=>V.uninvite_linked(e),title:"Remove Account"},w,8,g)),(0,i._)("div",y,(0,n.zw)(e),1)],2)))),128))])):((0,i.wg)(),(0,i.iD)("span",m,"No linked accounts, add one below"))]),b,(0,i._)("div",f,[(0,i.wy)((0,i._)("input",{class:"styled_links_add__text",type:"email",onInput:t[0]||(t[0]=(...e)=>V.fix_email&&V.fix_email(...e)),onUpdate:t[1]||(t[1]=(...e)=>V.fix_email&&V.fix_email(...e)),"onUpdate:modelValue":t[2]||(t[2]=e=>p.new_email=e),placeholder:"Personal Email",disabled:V.store.personal_account||p.loading},null,40,C),[[a.nr,p.new_email]]),(0,i._)("button",{class:"styled_links_add__action",onClick:t[3]||(t[3]=(...e)=>V.invite_linked&&V.invite_linked(...e)),disabled:!V.ready_to_link},(0,n.zw)(V.store.personal_account?"UNAVALIABLE":"Add"),9,x)])])])])),V.store.personal_account?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",D,[(0,i.Uk)(" Click "),(0,i._)("span",{class:"button_pointer_text click-action",onClick:t[4]||(t[4]=e=>{V.store.toggle_teacher(),p.changed=!0})}," here "),(0,i.Uk)("  to "+(0,n.zw)(V.store.is_teacher?"disable":"enable")+" teacher mode  ",1),V.store.is_teacher?((0,i.wg)(),(0,i.iD)("span",U,"to return to the student view.")):((0,i.wg)(),(0,i.iD)("span",A,"to create, and manage your own classes and tasks. This may require setup by an admin if you do not have a teacher email."))])),(0,i._)("div",q,[(0,i.Uk)(" To change your theme, use the "),(0,i._)("span",{id:"theme_pointer_button",class:"button_pointer_text button_pointer_icon click-action",onClick:t[5]||(t[5]=e=>V.store.toggle_theme())},[z,(0,i.Uk)(" Switch Theme ")]),(0,i.Uk)(" button on the left sidebar ")])]),(0,i._)("div",T,[V.store.personal_account?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("button",{key:0,class:"back_action",onClick:t[6]||(t[6]=t=>e.$emit("close"))},(0,n.zw)(p.changed||p.loading?"Cancel":"Close"),1)),$,(0,i._)("button",{class:(0,n.C_)(["continue_action",{loading_bg:p.loading}]),disabled:!V.store.personal_account&&!p.changed&&!V.store.is_teacher,onClick:t[7]||(t[7]=t=>{V.store.personal_account||V.store.is_teacher?e.$emit("close"):V.save()})},(0,n.zw)(V.store.personal_account?"Close":V.store.is_teacher?"Done":"Finish"),11,I)])])}var E=s(8980),L={name:"SettingsModal",emits:["close"],data(){return{changed:!1,loading:!1,new_email:""}},computed:{store(){return(0,E.h)()},ready_to_link(){return!this.loading&&this.new_email&&this.new_email.includes("@")&&this.new_email.split("@")[1].includes(".")}},methods:{save(){this.loading||this.$emit("close")},invite_linked(){this.store.personal_account||(this.changed=!0,this.loading=!0,this.store.invite_linked(this.new_email).then((()=>{this.loading=!1,this.new_email=""})).catch((()=>{this.loading=!1,this.changed=!1})))},uninvite_linked(e){this.changed=!0,this.loading=!0,this.store.uninvite_linked(e).then((()=>{this.loading=!1})).catch((()=>{this.loading=!1,this.changed=!1}))},fix_email(){if(this.new_email.includes("@")){let[e,t]=this.new_email.split("@");e.includes("+")&&(e=e.split("+")[0],this.new_email=`${e}@${t}`)}}}},M=s(89);const N=(0,M.Z)(L,[["render",V],["__scopeId","data-v-b792f35e"]]);var P=N}}]);
//# sourceMappingURL=316.57bad95a.js.map