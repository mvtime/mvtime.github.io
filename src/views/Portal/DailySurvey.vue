<template>
  <ModalFromPages :pages="pages" @finish="saveResponses"></ModalFromPages>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import ModalFromPages from "@/components/ModalFromPages.vue";
import SmileSentiment from "@/components/Surveys/SmileSentiment.vue";
import ScaleSentiment from "@/components/Surveys/ScaleSentiment.vue";
import { _statuslog } from "@/common";
// Mark all components passed into page.content with shallowRef(Component)
import { shallowRef } from "vue";
import { useMainStore } from "@/store";
import { WarningToast } from "@svonk/util";
export default {
  name: "DailySurvey",
  components: {
    ModalFromPages,
    // import page components below
    SmileSentiment,
    ScaleSentiment,
  },
  data: () => {
    return {
      pages: [
        {
          title: "Daily Survey",
          html: `<p>Thank you for taking the time to complete these questions. Your input helps us make this tool more widely avaliable to students and staff!</p>
                 <br />
                 <p>For each question, please select the answer that best describes your situation.</p>`,
          submit_text: "Okay",
        },
        {
          title: "How are you feeling today?",
          content: shallowRef(SmileSentiment),
          submit_text: "Next",
        },
        {
          title: "How stressed are you?",
          content: shallowRef(ScaleSentiment),
          submit_text: "Next",
        },
        {
          title: "Thank you!",
          html: `<p>Thank you for your input, you shouldn't have to answer any other questions until tomorrow!</p>`,
        },
      ],
    };
  },
  methods: {
    saveResponses(responses) {
      // save responses to database
      _statuslog("Survey responses:", responses);
      // save to store
      useMainStore().save_daily_survey(responses);
      // remove onbeforeunload listener
      window.onbeforeunload = null;
      // finish
      this.$router.push("/portal");
    },
  },
  mounted() {
    // if done_daily_survey is true, redirect to portal and toast
    if (useMainStore().done_daily_survey) {
      window.onbeforeunload = null;
      this.$router.push("/portal");
      new WarningToast("You already completed the daily survey today!", 200);
    }
  },
};
</script>

<style></style>
