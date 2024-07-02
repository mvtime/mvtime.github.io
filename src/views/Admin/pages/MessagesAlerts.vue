<template>
  <div class="messagesalerts" :page="page">
    <div class="msg_choose" v-if="page == 'choose'">
      <div
        :class="`msg_choose_page msg_choose__${p} admin_in`"
        v-for="(choice, p, i) in choices"
        :key="p"
        @click="page = p"
        :style="{ animationDelay: `${(i + 2) * 0.05}s` }"
      >
        {{ choice.name }}
      </div>
    </div>
    <div class="msg_page_wrapper" v-else>
      <div class="msg_page_info" v-if="page != 'choose'">
        <button class="msg_page__back" @click="page = 'choose'">
          <div class="msg_page__back__icon themed_icon"></div>
        </button>
        <div class="msg_page_info__text">{{ choices[page].active }}</div>
      </div>
      <hr class="msg_page_wrapper__separator" />
      <div class="msg_page msg__view" v-if="page == 'view'"></div>
      <div class="msg_page msg__send" v-else-if="page == 'send'"></div>
      <div class="msg_page msg__templates" v-else-if="page == 'templates'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessagesAlerts",
  data() {
    return {
      page: "choose",
      choices: {
        view: { name: "View Sent", active: "Sent Messages" },
        send: { name: "Send New", active: "Create Message" },
        templates: { name: "Templates", active: "Message Templates" },
      },
    };
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

@media (max-width: 670px) {
  .msg_choose > .msg_choose_page {
    flex-basis: 100%;
  }
}
</style>
