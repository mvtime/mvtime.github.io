"use strict";(self["webpackChunkmvtime"]=self["webpackChunkmvtime"]||[]).push([[332],{7385:function(e,t,s){s.d(t,{Z:function(){return p}});var o=s(3396),n=s(7139);const i=e=>((0,o.dD)("data-v-521703de"),e=e(),(0,o.Cn)(),e),a=["disabled"],l=i((()=>(0,o._)("span",{class:"loading_bg"},null,-1))),c=[l],_=i((()=>(0,o._)("div",{class:"toggle_switch_knob"},null,-1)));function r(e,t,s,i,l,r){return(0,o.wg)(),(0,o.iD)("div",{class:(0,n.C_)(["toggle_switch",{toggle_switch__on:l.is_on,transition:!s.loads}]),disabled:s.disabled,onClick:t[0]||(t[0]=(...e)=>r.toggle&&r.toggle(...e))},[s.loads?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,n.C_)(["toggle_switch__loading",{is_loading:l.loading}])},c,2)):(0,o.kq)("",!0),_],10,a)}var d={name:"ToggleBar",props:{value:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loads:{type:Boolean,default:!1}},emits:["update"],data(){return{is_on:this.value,loading:!1}},watch:{value(){this.is_on=this.value,this.loading=!1}},methods:{toggle(){this.disabled||(this.loads?this.loading=!0:this.is_on=!this.is_on,this.$emit("update",!this.is_on))}}},u=s(89);const h=(0,u.Z)(d,[["render",r],["__scopeId","data-v-521703de"]]);var p=h},2332:function(e,t,s){s.r(t),s.d(t,{default:function(){return oe}});s(7658);var o=s(3396),n=s(7139),i=s(9242);const a=e=>((0,o.dD)("data-v-752cb5cc"),e=e(),(0,o.Cn)(),e),l={class:"settings"},c=a((()=>(0,o._)("header",{class:"modal_header"},[(0,o._)("h2",{class:"header_style modal_header_title"},"Account Preferences")],-1))),_={class:"overlay_contents"},r={key:0,class:"overlay_contents_section"},d={class:"overlay_contents_text"},u={key:0,class:"overlay_contents_text"},h=a((()=>(0,o._)("br",null,null,-1))),p={class:"inputs_row linked_accounts_row"},k={class:"styled_input styled_links_box"},m={class:"styled_links_display"},v={key:0,class:"placeholder"},g={key:1,class:"styled_line_links"},y=["onClick"],w=a((()=>(0,o._)("div",{class:"remove_icon"},null,-1))),f=[w],b={class:"styled_line_links__email"},$=a((()=>(0,o._)("hr",{class:"styled_links_separator"},null,-1))),U=["disabled"],C=["disabled"],D={key:1,class:"overlay_contents_text overlay_contents_section"},x={key:0},A={key:1},z={class:"overlay_contents_text overlay_contents_section"},T={class:"notes_priority_section"},Y={class:"show_finished_section"},N={class:"overlay_contents_text overlay_contents_section"},P={class:"pause_popup_section"},B={class:"pause_popup_section__details overlay_contents_section_details"},E={class:"overlay_contents_text overlay_contents_section"},W=a((()=>(0,o._)("div",{class:"theme_icon icon"},null,-1))),q={class:"overlay_contents_text overlay_contents_section"},R=a((()=>(0,o._)("div",{class:"stats_icon themed_icon icon"},null,-1))),S={class:"overlay_contents_text overlay_contents_section"},V={class:"tutorial_redo_section"},F={class:"simplified_view_section"},H={key:0},M={key:1},O={class:"overlay_contents_text overlay_contents_section"},I=a((()=>(0,o._)("p",{class:"email_text"}," You can find controls for your email preferences below. You're opted into all important emails by default. ",-1))),K={class:"email_sections"},Z={class:"email_section__details overlay_contents_section_details"},L={class:"bottom_actions"},G=a((()=>(0,o._)("div",{class:"flex_spacer"},null,-1))),j=["disabled"];function J(e,t,s,a,w,J){const Q=(0,o.up)("ToggleBar");return(0,o.wg)(),(0,o.iD)("div",l,[c,(0,o._)("div",_,[e.$store.is_teacher?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",r,[(0,o._)("div",d," You can link a personal (non-"+(0,n.zw)(e.$store.ORG_DOMAIN.substring(1))+") account to access "+(0,n.zw)(e.$env.VUE_APP_BRAND_SHORT_NAME)+" when not signed into your school account below! ",1),e.$store.personal_account?((0,o.wg)(),(0,o.iD)("div",u,[h,(0,o.Uk)(" You're currently signed in using a personal account. You can unlink it, or link more emails, through your main account. ")])):(0,o.kq)("",!0),(0,o._)("div",p,[(0,o._)("div",k,[(0,o._)("div",m,[e.$store.linked_accounts&&e.$store.linked_accounts.length?((0,o.wg)(),(0,o.iD)("div",g,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.$store.linked_accounts,(t=>((0,o.wg)(),(0,o.iD)("div",{class:(0,n.C_)(["styled_line_links__account",{active:e.$store.personal_account&&e.$store.user.email==t}]),key:t},[e.$store.personal_account?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",{key:0,class:"styled_line_links__remove",onClick:e=>J.uninvite_linked(t),title:"Remove Account"},f,8,y)),(0,o._)("div",b,(0,n.zw)(t),1)],2)))),128))])):((0,o.wg)(),(0,o.iD)("span",v,"No linked accounts, add one below"))]),$,(0,o._)("div",{class:(0,n.C_)(["styled_links_add",{links_personal:e.$store.personal_account}])},[(0,o.wy)((0,o._)("input",{class:"styled_links_add__text",type:"email",onInput:t[0]||(t[0]=(...e)=>J.fix_email&&J.fix_email(...e)),onUpdate:t[1]||(t[1]=(...e)=>J.fix_email&&J.fix_email(...e)),"onUpdate:modelValue":t[2]||(t[2]=e=>w.new_email=e),placeholder:"Personal Email",disabled:e.$store.personal_account||w.loading},null,40,U),[[i.nr,w.new_email]]),(0,o._)("button",{class:"styled_links_add__action",onClick:t[3]||(t[3]=(...e)=>J.invite_linked&&J.invite_linked(...e)),disabled:!J.ready_to_link},(0,n.zw)(e.$store.personal_account?"UNAVALIABLE":"Add"),9,C)],2)])])])),e.$store.personal_account?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",D,[(0,o.Uk)(" Click "),(0,o._)("span",{class:"button_pointer_text click-action",onClick:t[4]||(t[4]=t=>{e.$store.toggle_teacher(),w.changed=!0})}," here "),(0,o.Uk)("  to "+(0,n.zw)(e.$store.is_teacher?"disable":"enable")+" teacher mode ",1),e.$store.is_teacher?((0,o.wg)(),(0,o.iD)("span",x,"and return to the student view.")):((0,o.wg)(),(0,o.iD)("span",A,"to create, and manage your own classes and tasks. This may require setup by an admin if you do not have a teacher email."))])),(0,o._)("div",z,[(0,o._)("div",T,[(0,o.Wm)(Q,{class:"click-action",value:J.prioritize_notes,onUpdate:t[5]||(t[5]=e=>J.update_account_pref("derank_notes",!e,["We'll show notes above other items on your claendar","You won't see notes above other items anymore"])),loads:!0},null,8,["value"]),(0,o.Uk)("   "),(0,o._)("span",null,[(0,o.Uk)("Notes priority set to "),(0,o._)("b",null,(0,n.zw)(J.prioritize_notes?"high":"low"),1)])]),(0,o._)("div",Y,[(0,o.Wm)(Q,{class:"click-action",value:J.include_finished,onUpdate:t[6]||(t[6]=e=>J.update_account_pref("hide_finished",!e,["You'll see finished tasks in your calendar","You won't see finished tasks in your calendar anymore"])),loads:!0},null,8,["value"]),(0,o.Uk)("   "),(0,o._)("span",null,[(0,o.Uk)("Finished tasks "),(0,o._)("b",null,(0,n.zw)(J.include_finished?"shown":"not shown"),1),(0,o.Uk)(" in calendar")])])]),(0,o._)("div",N,[(0,o._)("div",P,[(0,o.Wm)(Q,{class:"click-action",value:J.show_timeout,onUpdate:t[7]||(t[7]=e=>J.update_account_pref("hide_timeout",e,["We'll show the popup when your session times out","You won't see the timeout popup anymore"])),loads:!0},null,8,["value"]),(0,o.Uk)("   "),(0,o._)("span",null,[(0,o.Uk)("Session timeout popup "),(0,o._)("b",null,(0,n.zw)(J.show_timeout?"enabled":"disabled"),1)])]),(0,o._)("div",B," The popup helps conserve local and network resources. To have "+(0,n.zw)(e.$env.VUE_APP_BRAND_SHORT_NAME)+" open on the side without it getting in the way, you can toggle it above, though you may then have to reload to get the newest data ",1)]),(0,o._)("div",E,[(0,o.Uk)(" To change your theme, use the "),(0,o._)("span",{id:"theme_pointer_button",class:"button_pointer_text button_pointer_icon click-action",onClick:t[8]||(t[8]=t=>e.$store.toggle_theme())},[W,(0,o.Uk)(" Switch Theme ")]),(0,o.Uk)(" button on the left sidebar or homepage ")]),(0,o._)("div",q,[(0,o.Uk)(" To see how you've been feeling, "),(0,o._)("span",{id:"stats_pointer_button",class:"button_pointer_text button_pointer_icon click-action",onClick:t[9]||(t[9]=t=>e.$router.push({name:"stats",query:e.$route.query}))},[R,(0,o.Uk)(" View your stats ")]),(0,o.Uk)(" and get an insight into your mental health and productivity ")]),(0,o._)("div",S,[(0,o._)("span",V,[(0,o.Uk)(" Feeling lost? Try "),(0,o._)("span",{class:"button_pointer_text click-action",onClick:t[10]||(t[10]=t=>{w.changed=!0,e.$store.finish_tutorial(!1).then((()=>{e.$emit("close")}))})}," redoing the tutorial "),(0,o.Uk)(". We'll keep this updated as we add new features! ")]),(0,o._)("span",F,[(0,o.Uk)(" You can also "),(0,o._)("span",{class:"button_pointer_text click-action",onClick:t[11]||(t[11]=t=>{w.changed=!0,e.$store.set_account_pref("simplified",!e.$store.simplified)})},(0,n.zw)(e.$store.simplified?"leave":"enter")+" simplified view ",1),(0,o.Uk)(" to "),e.$store.simplified?((0,o.wg)(),(0,o.iD)("span",M,"get back the classic interface")):((0,o.wg)(),(0,o.iD)("span",H,"make "+(0,n.zw)(e.$env.VUE_APP_BRAND_SHORT_NAME)+" easier to use on slower devices",1)),(0,o.Uk)(". ")])]),(0,o._)("div",O,[I,(0,o._)("div",K,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(w.email_categories,(e=>((0,o.wg)(),(0,o.iD)("div",{class:"email_section",key:e.sort_as},[(0,o.Wm)(Q,{class:"click-action",value:!J.unsubed_from[e.sort_as],disabled:e.locked,onUpdate:t=>J.update_email_pref(e.key,e.description),loads:!0},null,8,["value","disabled","onUpdate"]),(0,o.Uk)("   "),(0,o._)("span",null,(0,n.zw)(e.label),1)])))),128))]),(0,o._)("div",Z," We'll try to send you as few emails as possible, but some notifications are essential to the operation of "+(0,n.zw)(e.$env.VUE_APP_BRAND_SHORT_NAME)+", such as those for account linkage and important account changes. Note that linked accounts may also inherit some of your email preferences from their student account. ",1)])]),(0,o._)("div",L,[e.$store.personal_account?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("button",{key:0,class:"back_action click_escape",onClick:t[12]||(t[12]=t=>e.$emit("close"))},(0,n.zw)(w.changed||w.loading?"Cancel":"Close"),1)),G,(0,o._)("button",{class:(0,n.C_)(["continue_action click_ctrlenter",{loading_bg:w.loading}]),disabled:!e.$store.personal_account&&!w.changed&&!e.$store.is_teacher,onClick:t[13]||(t[13]=t=>{e.$store.personal_account||e.$store.is_teacher?e.$emit("close"):J.save()})},(0,n.zw)(w.changed?"Finish":e.$store.personal_account?"Close":e.$store.is_teacher?"Done":"Finish"),11,j)])])}var Q=s(7385),X=s(1708),ee={name:"SettingsModal",emits:["close"],components:{ToggleBar:Q.Z},data(){return{changed:!1,loading:!1,new_email:"",email_categories:[{key:"task-created",label:"Task creation notifications",description:"emails about newly created tasks",sort_as:"task-created"},{key:"task-updated",label:"Task update notifications",description:"emails about changed tasks",sort_as:"task-updated"},{key:"task-moved",label:"Task date change notifications",description:"emails when tasks are moved",sort_as:"task-moved"},{key:"task-archived",label:"Task deletion notifications",description:"emails about removed tasks",sort_as:"task-archived"},{key:"scheduled-weekly",label:"Weekly summary emails",description:"weekly summary emails",sort_as:"scheduled-weekly"},{key:null,label:"Essential emails (required)",description:"essential emails about your account",locked:!0,sort_as:"essential"}]}},computed:{show_timeout(){return!this.$store?.account_doc?.prefs?.hide_timeout},prioritize_notes(){return!this.$store?.account_doc?.prefs?.derank_notes},include_finished(){return!this.$store?.account_doc?.prefs?.hide_finished},ready_to_link(){return!this.loading&&this.new_email&&this.new_email.includes("@")&&this.new_email.split("@")[1].includes(".")},unsubed_from(){return this.email_categories.reduce(((e,t)=>(e[t.key]=this.$store.account_doc?.prefs?.unsub_from?.[t.key]||!1,e)),{})}},methods:{update_account_pref(e,t,[s,o]){if(this.$store.account_doc){let n=this.$store.account_doc?.prefs?.[e];n!=t&&this.$store.update_wrapper_with_merge({prefs:{...this.$store.account_doc.prefs,[e]:t}}).then((()=>{this.changed=!0,new X.bF(t?o:s,2e3)})).catch((t=>{this.changed=!1,new X.PK(`Couldn't update key ${e} of preferences`,t,2e3),this.$status.error('⚙️ Couldn\'t update preferences key "${key}" to "${value}"')}))}},update_email_pref(e,t){if(this.$store.account_doc){const s=this.$store.account_doc?.prefs?.unsub_from||{},o=!s[e],n={...s,[e]:!s[e]};this.$store.update_wrapper_with_merge({prefs:{...this.$store.account_doc.prefs,unsub_from:n}}).then((()=>{this.changed=!0,new X.bF(o?`You'll no longer get ${t}`:`You'll now get ${t}`,2e3)})).catch((e=>{this.changed=!1,new X.PK(o?`We couldn't unsubscribe you from ${t}`:`We couldn't subscribe you to ${t}`,e,2e3)}))}},save(){this.loading||this.$emit("close")},invite_linked(){this.$store.personal_account||(this.changed=!0,this.loading=!0,this.$store.invite_linked(this.new_email).then((()=>{this.loading=!1,this.new_email=""})).catch((()=>{this.loading=!1,this.changed=!1})))},uninvite_linked(e){this.changed=!0,this.loading=!0,this.$store.uninvite_linked(e).then((()=>{this.loading=!1})).catch((()=>{this.loading=!1,this.changed=!1}))},fix_email(){if(this.new_email.includes("@")){let[e,t]=this.new_email.split("@");e.includes("+")&&(e=e.split("+")[0],this.new_email=`${e}@${t}`)}}}},te=s(89);const se=(0,te.Z)(ee,[["render",J],["__scopeId","data-v-752cb5cc"]]);var oe=se}}]);
//# sourceMappingURL=332.2806a238.js.map