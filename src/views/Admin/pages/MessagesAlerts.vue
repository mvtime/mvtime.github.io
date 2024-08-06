<template>
  <div class="messagesalerts" :page="page">
    <div class="msg_choose" v-if="page == 'choose'">
      <div
        :class="`msg_choose_page msg_choose__${p} admin_in`"
        v-for="(choice, p, i) in choices"
        :key="p"
        @click="if (!choice.disabled) page = p;"
        :style="{ animationDelay: `${(i + 2) * 0.05}s` }"
        :disabled="choice.disabled"
      >
        {{ choice.name }}
      </div>
    </div>
    <div class="msg_page_wrapper" v-else>
      <div class="msg_page_info admin_in" v-if="page != 'choose'" :style="{ animationDelay: `${2 * 0.05}s` }">
        <button class="msg_page__back" @click="page = 'choose'">
          <div class="msg_page__back__icon themed_icon"></div>
        </button>
        <div class="msg_page_info__text">{{ choices[page].active }}</div>
      </div>
      <hr class="msg_page_wrapper__separator admin_in" :style="{ animationDelay: `${3 * 0.05}s` }" />
      <div class="msg_page_container admin_in" :style="{ animationDelay: `${4 * 0.05}s` }">
        <div class="msg_page msg__view" v-if="page == 'view'">
          <table class="msg_page_list msg__view_list">
            <tr class="msg_page_list_header msg__view_list_header">
              <th style="flex: 1 2 6em; min-width: 6em">Recepient</th>
              <template v-if="!data.view.active">
                <th class="msg__nomobile" style="flex: 1 1 6em">Template</th>
                <th style="flex: 2 1 6.5em">Date</th>
                <th style="flex: 0 0 5em">Status</th>
              </template>
            </tr>
            <template v-if="!data.view.loading">
              <tr
                class="msg_page_list_item msg__view_list_item admin_in"
                :class="{ active: data.view.active == id }"
                v-for="(message, id, i) in data.view.list"
                :key="id"
                :style="{ animationDelay: `${(i + 2) * 0.03 + 0.2}s` }"
              >
                <td style="flex: 1 2 6em; min-width: 6em">
                  <span class="msg__view_to" v-if="message.to" :title="`TO: ${Array.isArray(message.to) ? message.to.join(', ') || 'empty' : message.to}`"
                    >{{ Array.isArray(message.to) ? message.to.length + " emails" : message.to.split("@")[0] }}&MediumSpace;</span
                  ><span class="msg__view_cc" v-if="message.cc" :title="`CC: ${Array.isArray(message.cc) ? message.cc.join(', ') || 'empty' : message.cc}`">[cc]&MediumSpace;</span
                  ><span class="msg__view_bcc" v-if="message.bcc" :title="`BCC: ${Array.isArray(message.cc) ? message.bcc.join(', ') || 'empty' : message.bcc}`">[bcc]</span>
                </td>
                <td class="msg__nomobile" style="flex: 1 1 6em">{{ message.template && message.template.name }}</td>
                <td style="flex: 2 1 6.5em">{{ date_of(message) }}</td>
                <td style="flex: 0 0 5em">{{ status_of(message) }}</td>
                <div class="msg_page_list_item_content msg_view_preview" v-if="data.view.active == id">
                  <div class="msg_view_preview__json">
                    <pre>{{ JSON.stringify(message, null, 2) }}</pre>
                  </div>
                </div>
                <button
                  class="msg__view_list_item__toggle msg_list_item__toggle"
                  :class="{ click_escape: data.view.active == id }"
                  @click="data.view.active = data.view.active == id ? null : id"
                  title="Close email data"
                >
                  <div class="msg_list_item__toggle__icon themed_icon" :title="`${data.view.active == id ? 'Collapse' : 'Expand'} preview of ${id}`"></div>
                </button>
              </tr>
              <tr v-if="!Object.keys(data.view.list).length" class="msg_page_list_item__empty admin_in" :style="{ animationDelay: `${2 * 0.03 + 0.2}s` }">
                <span>No sent messages exist yet</span>
              </tr>
            </template>
            <template v-else>
              <tr class="msg_page_list_item msg_page_list_item_loading msg__view_list_item part_loading_animation" v-for="j in placeholder(3)" :key="j">
                <div class="part_loading_animation msg_page_list_item_loading_button"></div>
              </tr>
            </template>
          </table>
        </div>
        <div class="msg_page msg__send" v-else-if="page == 'send'">
          <form @submit.prevent="send_message" style="max-width: 100%">
            <div class="msg__send_form">
              <div class="msg__send_form_item">
                <div class="msg__send_form_item msg__send_form_pair">
                  <label for="msg__send_to">To:</label>
                  <input v-model="data.send.to" type="text" id="msg__send_to" name="to" placeholder="Email address(es)" />
                </div>
                <div class="msg__send_form_item msg__send_form_pair">
                  <label for="msg__send_cc">CC:</label>
                  <input v-model="data.send.cc" type="text" id="msg__send_cc" name="cc" placeholder="Email address(es)" />
                </div>
                <div class="msg__send_form_item msg__send_form_pair">
                  <label for="msg__send_bcc">BCC:</label>
                  <input v-model="data.send.bcc" type="text" id="msg__send_bcc" name="bcc" placeholder="Email address(es)" />
                </div>
                <div class="msg__send_form_item msg__send_form_pair">
                  <label for="msg__send_from">From:</label>
                  <input v-model="data.send.from" type="text" id="msg__send_from" name="from" :placeholder="`The ${this.$env.VUE_APP_BRAND_NAME_LONG} Team`" />
                </div>
              </div>
              <div class="msg__send_form_item msg__send_form_template">
                <div class="msg__send_form_item msg__send_form_pair">
                  <label for="msg__send_template">Template:</label>
                  <select v-model="data.send.template" id="msg__send_template" name="template" @click="if (data.templates.loading) fetch_templates();">
                    <option value="" disabled selected>{{ data.templates.loading ? (data.templates.load_triggered ? "Loading..." : "Click to load options") : "Select a template" }}</option>
                    <option value="custom">[custom] - Create your own message</option>
                    <option v-for="(template, id) in data.templates.list" :key="id" :value="id">
                      [<strong>{{ id }}</strong
                      >] - "{{ template.subject }}"
                    </option>
                  </select>
                </div>
                <div class="msg__send_template_options msg__send_form_item" v-if="data.send.template">
                  <template v-if="data.send.template == 'custom'">
                    <input v-model="data.send.subject" type="text" id="msg__send_subject" placeholder="Enter the subject of your message" title="Enter the subject of your message" />
                    <textarea
                      v-model="data.send.content"
                      id="msg__send_contents"
                      placeholder="Enter the primary (HTML) content of your message - note that most email clients will strip out <style> tags and inline styles are recommended; css3 is not supported in most clients."
                      title="Enter the html content of your message"
                      rows="5"
                    ></textarea>
                    <textarea
                      v-model="data.send.text"
                      id="msg__send_text"
                      placeholder="Enter the alt (plaintext) content of your message (optional)"
                      title="Enter the text content of your message"
                      rows="5"
                    ></textarea>
                  </template>
                  <textarea
                    v-else
                    @input="format_template_data"
                    v-model="data.send.data"
                    id="msg__send_data"
                    placeholder="JSON data to be used when rendering the handlebars template"
                    title="Enter data to be used in the template"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div class="msg__send_form_item" v-if="data.send.template && data.send.template != 'custom'">
                <div class="toggle_line">
                  <ToggleBar class="click-action" :value="data.send.raw" @update="data.send.raw = !data.send.raw" :loads="false" />&nbsp;&nbsp;<span>Display w/o Handlebars</span>
                </div>
                <div class="toggle_line">
                  <ToggleBar
                    :disabled="template_html.error"
                    class="click-action"
                    :value="data.send.raw_html && !template_html.error"
                    @update="data.send.raw_html = !data.send.raw_html"
                    :loads="false"
                  />&nbsp;&nbsp;<span>Display as raw HTML markdown</span>
                </div>
              </div>
              <div class="msg__send_form_item">
                <button type="submit" :class="{ disabled: send_issues }" title="Attempt to send this message">Send</button>
                <button type="button" title="Clear message options" @click="clear_send()" style="flex: 0 0 auto">Clear</button>
              </div>
            </div>
          </form>
          <div class="msg_page_list_item_content msg__send_preview">
            <div v-if="data.send.template == 'custom'" class="msg_page_list_item_content__html msg__send_preview__html msg__send_template_preview__html">
              <span v-if="!data.send.content">Add some content to preview your messages</span>
              <div v-else v-html="data.send.content"></div>
            </div>
            <div v-else-if="data.send.template && data.send.raw_html && !template_html.error" class="msg_page_list_item_content__html msg__send_preview__text msg__send_custom_preview__html_text">
              {{ template_html.html }}
            </div>
            <div v-else-if="data.send.template" class="msg_page_list_item_content__html msg__send_preview__html msg__send_custom_preview__html" v-html="template_html.html"></div>
            <div v-else class="msg_page_list_item_content__html msg__send_preview__html">
              <span>Select a template to preview it here</span>
            </div>
          </div>
        </div>
        <div class="msg_page msg__templates" v-else-if="page == 'templates'">
          <table class="msg_page_list msg__templates_list">
            <tr class="msg_page_list_header msg__templates_list_header">
              <th style="flex: 0 1 10em">Template</th>
              <template v-if="!data.view.active">
                <th style="flex: 1 4 20em">Subject</th>
                <th class="msg__nomobile" style="flex: 4 10 20em">Text</th></template
              >
            </tr>
            <template v-if="!data.templates.loading">
              <tr
                class="msg_page_list_item msg__templates_list_item admin_in"
                :class="{ active: data.templates.active == id }"
                v-for="(template, id, i) in data.templates.list"
                :key="id"
                :style="{ animationDelay: `${(i + 2) * 0.03 + 0.2}s` }"
              >
                <td style="flex: 1 1 10em">{{ id }}</td>
                <td style="flex: 2 4 20em">{{ template.subject }}</td>
                <td class="msg__nomobile" style="flex: 8 10 20em">{{ template.text }}</td>
                <div class="msg_page_list_item_content msg_templates_preview" v-if="data.templates.active == id">
                  <div class="msg_templates_preview__html msg_page_list_item_content__html" v-html="template.html"></div>
                </div>
                <div class="msg_page_list_item_content msg_templates_preview" v-if="data.templates.active == id">
                  <div class="msg_templates_preview__text" v-html="template.text.replace(/\\n/g, '<br/>')"></div>
                </div>
                <button
                  class="msg__templates_list_item__toggle msg_list_item__toggle"
                  :class="{ click_escape: data.templates.active == id }"
                  @click="data.templates.active = data.templates.active == id ? null : id"
                  title="Close email contents preview"
                >
                  <div class="msg_list_item__toggle__icon themed_icon" :title="`${data.templates.active == id ? 'Collapse' : 'Expand'} preview of ${id}`"></div>
                </button>
              </tr>
              <tr v-if="!Object.keys(data.templates.list).length" class="msg_page_list_item__empty admin_in" :style="{ animationDelay: `${2 * 0.03 + 0.2}s` }">
                <span>No templates exist yet</span>
              </tr>
            </template>
            <template v-else>
              <tr class="msg_page_list_item msg_page_list_item_loading msg__templates_list_item part_loading_animation" v-for="j in placeholder(8)" :key="j">
                <div class="part_loading_animation msg_page_list_item_loading_button"></div>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { functions } from "@/firebase";
import { httpsCallable } from "firebase/functions";
import { ErrorToast, WarningToast, SuccessToast } from "@svonk/util";

import Handlebars from "handlebars";
import ToggleBar from "@/components/ToggleBar.vue";

export default {
  name: "MessagesAlerts",
  components: {
    ToggleBar,
  },
  data() {
    return {
      page: "choose",
      choices: {
        view: { name: "View Sent", active: "Sent Messages" },
        send: { name: "Send New", active: "Create Message" /*, disabled: true */ },
        templates: { name: "Templates", active: "Message Templates" },
      },
      data: {
        view: {
          list: {},
          loading: true,
          active: null,
          placeholder: this.placeholder(3),
        },
        send: {
          sending: false,
          to: "",
          cc: "",
          bcc: "",
          // template
          template: "",
          data: "",
          // custom message
          content: "",
          text: "",
          subject: "",
          // view settings
          raw: false,
          raw_html: false,
        },
        templates: {
          list: {},
          loading: true,
          load_triggered: false,
          active: null,
          placeholder: this.placeholder(8),
        },
      },
    };
  },
  methods: {
    async fetch_templates() {
      this.data.templates.list = {};
      this.data.templates.loading = true;
      if (this.data.templates.load_triggered) return;
      this.data.templates.load_triggered = true;
      const templates = httpsCallable(functions, "getTemplates");

      const start = Date.now();
      const { data, error } = await templates();
      const elapsed = Date.now() - start;

      if (error) {
        this.$status.error(`📃 Failed to fetch templates after ${elapsed}ms`, error);
        new ErrorToast("Something went wrong loading the templates", error, 2500);
        return;
      } else {
        const len = Object.keys(data || {}).length;
        this.$status.log(`📃 Fetched ${len} template${len == 1 ? "" : "s"} in ${elapsed}ms`);
        this.data.templates.list = data || {};
        this.data.templates.loading = false;
        this.data.templates.load_triggered = false;
      }
    },
    async fetch_messages() {
      this.data.view.list = {};
      this.data.view.loading = true;
      const messages = httpsCallable(functions, "getSentMessages");

      const start = Date.now();
      const { data, error } = await messages();
      const elapsed = Date.now() - start;

      if (error) {
        this.$status.error(`📃 Failed to fetch messages after ${elapsed}ms`, error);
        new ErrorToast("Something went wrong loading sent messages", error, 2500);
        return;
      } else {
        const len = Object.keys(data || {}).length;
        this.$status.log(`📃 Fetched ${len} messages${len == 1 ? "" : "s"} in ${elapsed}ms`);
        this.data.view.list = data || {};
        this.data.view.loading = false;
      }
    },
    placeholder(n) {
      return Array.from({ length: n }, (_, i) => i);
    },
    date_of(message) {
      const ms = (message?.delivery?.startTime?._seconds + message?.delivery?.startTime?._nanoseconds / 1e9) * 1000;
      const date = new Date(ms);
      return isNaN(date.getTime()) ? "Unknown" : date.toLocaleDateString();
    },
    status_of(message) {
      return message?.delivery?.state || "N/A";
    },
    format_template_data() {
      try {
        this.data.send.data = JSON.stringify(JSON.parse(this.data.send.data), null, 2);

        let existing = document.querySelector(".toast:not(.noremove)");
        if (existing) existing.style = "animation:slideOut 0.25s forwards";

        return true;
      } catch (e) {
        new WarningToast("Failed to parse JSON data, your message will not send correctly: " + e, 3500);
        return false;
      }
    },
    clear_send(show = true) {
      this.data.send = {
        sending: false,
        to: "",
        cc: "",
        bcc: "",
        template: "",
        data: "",
        content: "",
        text: "",
        subject: "",
      };
      if (show) new SuccessToast("Message options cleared", 2000);
    },
    async send_message() {
      // log errors
      if (this.send_issues) {
        new ErrorToast("Cannot send message", this.send_issues, Math.max(2500, Math.min(this.send_issues.split(",").length * 1000, 8000)));
      } else {
        this.data.send.sending = true;
        const send = httpsCallable(functions, "sendEmail");

        const start = Date.now();
        const { data } = await send({
          to: this.data.send.to,
          cc: this.data.send.cc,
          from: {
            name: this.data.send.from || `The ${this.$env.VUE_APP_BRAND_NAME_LONG} Team`,
            address: this.$env.VUE_APP_BRAND_MAIL_ADDRESS,
          },
          bcc: this.data.send.bcc,
          ...(this.data.send.template == "custom"
            ? {
                message: {
                  subject: this.data.send.subject,
                  html: this.data.send.content,
                  text: this.data.send.text,
                },
              }
            : {
                template: { name: this.data.send.template, data: JSON.parse(this.data.send.data) },
              }),
        });
        const elapsed = Date.now() - start;

        if (data) {
          this.$status.log(`📧 Queued message in ${elapsed}ms as ${data.id}`, data);
          new SuccessToast(`Message queued successfully`, 2000);
          this.clear_send(false);
          // this.fetch_messages();
        } else {
          this.$status.error(`📧 Failed to send message after ${elapsed}ms`, data);
          new ErrorToast("Failed to send message", data, 2500);
        }
      }
    },
  },
  computed: {
    template_html() {
      if (this.data.send.raw) return { html: new Handlebars.SafeString(this.data.templates.list[this.data.send.template]?.html), error: false };
      const template = Handlebars.compile(this.data.templates.list[this.data.send.template]?.html);
      try {
        const data = JSON.parse(this.data.send.data || "{}");

        return { html: template(data || {}), error: false };
      } catch (e) {
        return { html: new Handlebars.SafeString(`<b>Failed to build html from template:</b> <pre>${e}</pre>`), error: true };
      }
    },
    send_issues() {
      //return all the issues present as an array of strings
      let issues = [];
      if (this.data.send.sending) return "Message already being queued...";

      // check email (some combination of to, cc, bcc) and that they are valid (comma separated list)

      // check if no emails
      if (!this.data.send.to && !this.data.send.cc && !this.data.send.bcc) {
        issues.push("No recipient email address provided");
      } else {
        // check if each field's emails are valid
        for (let field of ["to", "cc", "bcc"]) {
          if (!this.data.send[field]) continue;
          let emails = this.data.send[field].trim().split(/[\s,]+/);
          for (let email of emails) {
            if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
              issues.push(`Invalid email address in '${field}': "${email}"`);
            }
          }
        }
      }

      // check template selected (for existing: require data, for custom: content)
      if (!this.data.send.template) {
        issues.push("No template selected");
      } else if (this.data.send.template == "custom") {
        if (!this.data.send.subject) issues.push("No subject provided");
        if (!this.data.send.content) issues.push("No content provided");
      } else if (!this.data.send.data) {
        issues.push("No data provided for template");
      } else if (!this.format_template_data()) {
        issues.push("Cannot parse JSON template data");
      }

      return issues.join(", ");
    },
  },
  mounted() {
    if (this.$route?.query?.action) {
      this.page = this.$route.query.action;
    }
  },
  watch: {
    page() {
      this.$router.push({
        query: { ...this.$route.query, action: this.page == "choose" ? undefined : this.page },
      });
      if (
        this.page == "templates" &&
        //  || this.page == "send"
        this.data.templates.loading
      ) {
        this.fetch_templates();
      } else if (this.page == "view" && this.data.view.loading) {
        this.fetch_messages();
      }
      this.data.templates.active = null;
      this.data.view.active = null;
    },
  },
};
</script>
<style scoped>
/* choices */
.messagesalerts.admin_main .msg_choose {
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  align-items: stretch;
  gap: 10px;
  width: 100%;
  font-weight: 600;

  max-width: 800px;
  margin: 0 auto;
}
.msg_choose > .msg_choose_page {
  padding: 10px 20px;
  min-height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  background: var(--color-on-bg);
  user-select: none;
  cursor: pointer;
  flex: 1 1 150px;
  text-align: center;
}
@media (max-width: 670px) {
  .msg_choose > .msg_choose_page {
    flex-basis: 100%;
  }
}

/* pages */
.msg_page_wrapper {
  display: flex;
  flex-flow: column nowrap;
}

/* pages - info */

.msg_page_wrapper .msg_page_info {
  display: flex;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5px;
}
.msg_page_wrapper .msg_page_info > * {
  border: none;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  background: var(--color-on-bg);
}
.msg_page_wrapper .msg_page_info button.msg_page__back {
  height: 40px;
  width: 40px;
  flex: 0 0 40px;
  padding: 0;
}
.msg_page_wrapper .msg_page_info button.msg_page__back .msg_page__back__icon {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/img/general/portal/nav/left.png);
  background-image: url(@/assets/img/general/portal/nav/left.svg);
}
.msg_page_wrapper .msg_page_info .msg_page_info__text {
  flex: 1 1 auto;
  padding: 5px 7px;
  min-height: 40px;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  user-select: none;
}

/* pages - separator */

.msg_page_wrapper .msg_page_wrapper__separator {
  border: none;
  margin: 10px auto;
  width: 60%;
  max-width: 350px;
  min-width: 100px;
  height: 5px;
  border-radius: 5px;
  background: var(--color-on-bg);
}

/* pages - page */
table.msg_page_list {
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: stretch;
  align-items: stretch;
  gap: 10px;
}
table.msg_page_list tr.msg_page_list_item {
  height: calc(1.5em + 14px);
}
table.msg_page_list tr.msg_page_list_item,
table.msg_page_list tr.msg_page_list_header {
  display: flex;
  flex-flow: row nowrap;
  background: var(--color-on-bg);
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  padding: 7px 12px;
  line-height: 1.5em;
  gap: 5px;
}
table.msg_page_list tr.msg_page_list_item td,
table.msg_page_list tr.msg_page_list_header th {
  display: block;
  flex: 1 1 100px;
  width: 100px;
  text-align: left;
  line-height: 1.5em;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
table.msg_page_list tr.msg_page_list_header {
  opacity: 0.5;
  font-size: 16px;
  height: calc(12px * 1.5 + 14px);
  padding: 0 12px;
  gap: 5px;
}
table.msg_page_list tr.msg_page_list_header > :last-child {
  margin-right: calc(1.5em + 3px);
}
table.msg_page_list > tr.msg_page_list_header > th {
  width: 100px;
  transform-origin: left;
  scale: 0.8;
  line-height: calc(12px * 1.5 + 14px);
  font-weight: 700 !important;
  border-color: #00000000 !important;
}

table.msg_page_list tr.msg_page_list_item.msg_page_list_item_loading {
  height: calc(1.5em + 14px);
  opacity: 0.75;
  background: linear-gradient(90deg, #00000000 0%, var(--color-theme-alt) 50%, #00000000 100%);
  background-size: 200% 100%;
  animation: loading_swipe 2.5s infinite;
  position: relative;
}
table.msg_page_list tr.msg_page_list_item.msg_page_list_item_loading .msg_page_list_item_loading_button {
  width: 1.5em;
  height: 1.5em;
  position: absolute;
  right: 7px;
  top: 7px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) - 7px);
}
table.msg_page_list tr.msg_page_list_item__empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  padding: 20px 40px;
  margin-bottom: 5px;
}
table.msg_page_list tr.msg_page_list_item__empty span {
  opacity: 0.5;
}
/* pages - send */

.msg_page.msg__send {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
}
.msg_page.msg__send > * {
  flex: 1 1 400px;
}
.msg__send_form {
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
}
.msg__send_form_item {
  flex: 1 1 auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: stretch;
  align-items: flex-start;
  gap: 10px;
  align-items: center;
  gap: 10px;
}
.toggle_line {
  display: flex;
  align-items: center;
}
.msg__send_form_pair {
  flex-wrap: nowrap;
}
.msg__send_form_item input,
.msg__send_form_item textarea,
.msg__send_form_item select,
.msg__send_form button {
  flex: 1 1 300px;
  width: 170px;
  padding: 8px 12px;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar));
  border: 2px solid var(--color-on-bg);
  background: var(--color-on-bg);
  color: var(--color-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.msg__send_form_item.msg__send_form_template > div {
  flex-basis: 100%;
}
.msg__send_form_item textarea {
  resize: vertical;
  min-height: 100px;
  width: 100%;
  white-space: unset;
}
.msg__send_form button {
  font-weight: 500;
}
.msg__send_form button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.msg__send_form_item label {
  font-weight: 600;
  font-size: 16px;
  user-select: none;
}
.msg_page_list_item_content.msg__send_preview {
  flex-grow: 2;
  background: var(--color-on-bg);
  min-height: 200px;
}
.msg__send_template_options.msg__send_form_item > * {
  width: 100%;
  flex: 1 1 100%;
}
/* toggle icon */
.msg_list_item__toggle {
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) - 7px);
  font-size: 16px;
  width: 1.5em;
  height: 1.5em;
  padding: 0;
  border: none;
  background: var(--color-bg);
}
table.msg_page_list tr.msg_page_list_item:not(.active):has(button.msg_list_item__toggle) > :nth-last-child(2) {
  margin-right: calc(1.5em + 3px);
}
table.msg_page_list button.msg_list_item__toggle {
  position: absolute;
  top: 7px;
  right: 7px;
}

table.msg_page_list .msg_list_item__toggle__icon {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/general/portal/admin/add.png");
  background-image: url("@/assets/img/general/portal/admin/add.svg");
  transition: rotate 0.2s cubic-bezier(0.49, -0.02, 0.16, 1.94);
}
table.msg_page_list .msg_page_list_item.active {
  padding: 3px;
  padding-top: calc(1.5em + 14px);
  height: auto;
}
table.msg_page_list .msg_page_list_item.active td:not(:first-child) {
  display: none;
}
table.msg_page_list .msg_page_list_item td:first-child,
table.msg_page_list .msg_page_list_header th:first-child {
  font-weight: 500;
  user-select: none;
  border-right: solid 2px var(--color-bg);
  margin-right: 1em;
  padding-right: 0.5em;
  padding: 7px 0;
  position: relative;
  top: -7px;
  margin-bottom: -14px;
}
table.msg_page_list .msg_page_list_item.active td:first-child {
  position: absolute;
  top: 0px;
  left: 12px;
  width: max-content;
  max-width: calc(100% - 1.5em - 14px);
  border-right: none;
}
table.msg_page_list .msg_page_list_item.active .msg_list_item__toggle__icon {
  rotate: 45deg;
}
table.msg_page_list .msg_page_list_item.active {
  flex-flow: column nowrap;
}
.msg_page_list_item_content {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: auto;
  padding: 10px;
  background: var(--color-bg);
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) - 3px);
}
.msg_page_list_item_content .msg_page_list_item_content__html {
  pointer-events: none;
  user-select: none;
}
@media (max-width: 900px) {
  .msg__nomobile {
    display: none !important;
  }
  table.msg_page_list tr.msg_page_list_item:not(.active):has(button.msg_list_item__toggle):has(.msg__nomobile:nth-last-child(2)) > :nth-last-child(3) {
    margin-right: calc(1.5em + 3px);
  }
}
</style>
