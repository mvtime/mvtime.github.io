<template>
  <ModalFromPages :pages="pages" @finish="saveResponses"></ModalFromPages>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import ModalFromPages from "@/components/ModalFromPages.vue";
import { _statuslog } from "../../common";
// Mark all components passed into page.content with shallowRef(Component)
// import { shallowRef } from "vue";
export default {
  name: "DailySurvey",
  components: {
    ModalFromPages,
    // import page components below
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
          title: "Uh oh!",
          html: `<p>This feature is still being implemented, thanks for checking it out!</p>`,
          submit_text: "Will do!",
        },
      ],
    };
  },
  methods: {
    saveResponses(responses) {
      // save responses to database
      _statuslog("Survey responses:", responses);
      // finish
      this.$router.push("/portal");
    },
  },
};
</script>

<style></style>
