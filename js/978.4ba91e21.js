"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[978],{8978:function(e,t,s){s.r(t),s.d(t,{default:function(){return K}});var i=s(3396),n=s(7139),o=s(9242);const a=e=>((0,i.dD)("data-v-6543cd89"),e=e(),(0,i.Cn)(),e),l={class:"settings"},c=a((()=>(0,i._)("header",{class:"modal_header"},[(0,i._)("h2",{class:"header_style modal_header_title"},"Account Preferences")],-1))),d={class:"overlay_contents"},_={key:0},r={class:"overlay_contents_text"},u={class:"inputs_row"},h={class:"styled_input styled_links_box"},p={class:"styled_links_display"},g={key:0,class:"placeholder"},m={key:1,class:"styled_line_links"},k=["onClick"],v=a((()=>(0,i._)("div",{class:"remove_icon"},null,-1))),w=[v],y={class:"styled_line_links__email"},b=a((()=>(0,i._)("hr",{class:"styled_links_separator"},null,-1))),f={class:"styled_links_add"},C=["disabled"],D=["disabled"],x={key:1,class:"overlay_contents_text"},U={key:0},T={key:1},z={class:"overlay_contents_text pause_popup_section"},A={class:"overlay_contents_text"},q=a((()=>(0,i._)("div",{class:"theme_icon icon"},null,-1))),B={class:"bottom_actions"},$=a((()=>(0,i._)("div",{class:"flex_spacer"},null,-1))),I=["disabled"];function S(e,t,s,a,v,S){const F=(0,i.up)("ToggleBar");return(0,i.wg)(),(0,i.iD)("div",l,[c,(0,i._)("div",d,[S.store.is_teacher?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",_,[(0,i._)("div",r," You can link a personal (non-"+(0,n.zw)(this.store.ORG_DOMAIN.substring(1))+") account to access MVTT when not signed into your school account below! ",1),(0,i._)("div",u,[(0,i._)("div",h,[(0,i._)("div",p,[S.store.linked_accounts&&S.store.linked_accounts.length?((0,i.wg)(),(0,i.iD)("div",m,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(S.store.linked_accounts,(e=>((0,i.wg)(),(0,i.iD)("div",{class:(0,n.C_)(["styled_line_links__account",{active:S.store.personal_account&&S.store.user.email==e}]),key:e},[S.store.personal_account?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",{key:0,class:"styled_line_links__remove",onClick:t=>S.uninvite_linked(e),title:"Remove Account"},w,8,k)),(0,i._)("div",y,(0,n.zw)(e),1)],2)))),128))])):((0,i.wg)(),(0,i.iD)("span",g,"No linked accounts, add one below"))]),b,(0,i._)("div",f,[(0,i.wy)((0,i._)("input",{class:"styled_links_add__text",type:"email",onInput:t[0]||(t[0]=(...e)=>S.fix_email&&S.fix_email(...e)),onUpdate:t[1]||(t[1]=(...e)=>S.fix_email&&S.fix_email(...e)),"onUpdate:modelValue":t[2]||(t[2]=e=>v.new_email=e),placeholder:"Personal Email",disabled:S.store.personal_account||v.loading},null,40,C),[[o.nr,v.new_email]]),(0,i._)("button",{class:"styled_links_add__action",onClick:t[3]||(t[3]=(...e)=>S.invite_linked&&S.invite_linked(...e)),disabled:!S.ready_to_link},(0,n.zw)(S.store.personal_account?"UNAVALIABLE":"Add"),9,D)])])])])),S.store.personal_account?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("div",x,[(0,i.Uk)(" Click "),(0,i._)("span",{class:"button_pointer_text click-action",onClick:t[4]||(t[4]=e=>{S.store.toggle_teacher(),v.changed=!0})}," here "),(0,i.Uk)("  to "+(0,n.zw)(S.store.is_teacher?"disable":"enable")+" teacher mode ",1),S.store.is_teacher?((0,i.wg)(),(0,i.iD)("span",U,"and return to the student view.")):((0,i.wg)(),(0,i.iD)("span",T,"to create, and manage your own classes and tasks. This may require setup by an admin if you do not have a teacher email."))])),(0,i._)("div",z,[(0,i.Wm)(F,{class:"click-action",value:S.show_timeout,onUpdate:S.update_timeout_option,loads:!0},null,8,["value","onUpdate"]),(0,i.Uk)("   "),(0,i._)("span",null,"Session timeout popup "+(0,n.zw)(S.show_timeout?"enabled":"disabled"),1)]),(0,i._)("div",A,[(0,i.Uk)(" To change your theme, use the "),(0,i._)("span",{id:"theme_pointer_button",class:"button_pointer_text button_pointer_icon click-action",onClick:t[5]||(t[5]=e=>S.store.toggle_theme())},[q,(0,i.Uk)(" Switch Theme ")]),(0,i.Uk)(" button on the left sidebar ")])]),(0,i._)("div",B,[S.store.personal_account?(0,i.kq)("",!0):((0,i.wg)(),(0,i.iD)("button",{key:0,class:"back_action",onClick:t[6]||(t[6]=t=>e.$emit("close"))},(0,n.zw)(v.changed||v.loading?"Cancel":"Close"),1)),$,(0,i._)("button",{class:(0,n.C_)(["continue_action",{loading_bg:v.loading}]),disabled:!S.store.personal_account&&!v.changed&&!S.store.is_teacher,onClick:t[7]||(t[7]=t=>{S.store.personal_account||S.store.is_teacher?e.$emit("close"):S.save()})},(0,n.zw)(v.changed?"Finish":S.store.personal_account?"Close":S.store.is_teacher?"Done":"Finish"),11,I)])])}var F=s(8980);const M=e=>((0,i.dD)("data-v-6313031a"),e=e(),(0,i.Cn)(),e),N=["disabled"],V=M((()=>(0,i._)("span",{class:"loading_bg"},null,-1))),Y=[V],E=M((()=>(0,i._)("div",{class:"toggle_switch_knob"},null,-1)));function L(e,t,s,o,a,l){return(0,i.wg)(),(0,i.iD)("div",{class:(0,n.C_)(["toggle_switch",{toggle_switch__on:a.is_on,transition:!s.loads}]),disabled:s.disabled,onClick:t[0]||(t[0]=(...e)=>l.toggle&&l.toggle(...e))},[s.loads?((0,i.wg)(),(0,i.iD)("div",{key:0,class:(0,n.C_)(["toggle_switch__loading",{is_loading:a.loading}])},Y,2)):(0,i.kq)("",!0),E],10,N)}var O={name:"ToggleSwitch",props:{value:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loads:{type:Boolean,default:!1}},emits:["update"],data(){return{is_on:this.value,loading:!1}},watch:{value(){this.is_on=this.value,this.loading=!1}},methods:{toggle(){this.disabled||(this.loads?this.loading=!0:this.is_on=!this.is_on,this.$emit("update",!this.is_on))}}},P=s(89);const R=(0,P.Z)(O,[["render",L],["__scopeId","data-v-6313031a"]]);var W=R,Z=s(1708),G={name:"SettingsModal",emits:["close"],components:{ToggleBar:W},data(){return{changed:!1,loading:!1,new_email:""}},computed:{store(){return(0,F.h)()},show_timeout(){return!this.store?.account_doc?.prefs?.hide_timeout},ready_to_link(){return!this.loading&&this.new_email&&this.new_email.includes("@")&&this.new_email.split("@")[1].includes(".")}},methods:{update_timeout_option(e){if(this.store.account_doc){let t=!this.store.account_doc?.prefs?.hide_timeout;t!=e&&this.store.update_wrapper_with_merge({prefs:{...this.store.account_doc.prefs,hide_timeout:!e}}).then((()=>{this.changed=!0,new Z.bF(e?"We'll show the popup when your session times out":"You won't see the timeout popup anymore",2e3)}))}},save(){this.loading||this.$emit("close")},invite_linked(){this.store.personal_account||(this.changed=!0,this.loading=!0,this.store.invite_linked(this.new_email).then((()=>{this.loading=!1,this.new_email=""})).catch((()=>{this.loading=!1,this.changed=!1})))},uninvite_linked(e){this.changed=!0,this.loading=!0,this.store.uninvite_linked(e).then((()=>{this.loading=!1})).catch((()=>{this.loading=!1,this.changed=!1}))},fix_email(){if(this.new_email.includes("@")){let[e,t]=this.new_email.split("@");e.includes("+")&&(e=e.split("+")[0],this.new_email=`${e}@${t}`)}}}};const H=(0,P.Z)(G,[["render",S],["__scopeId","data-v-6543cd89"]]);var K=H}}]);
//# sourceMappingURL=978.4ba91e21.js.map