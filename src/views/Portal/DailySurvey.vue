<template>
  <ModalFromPages :pages="pages" @finish="saveResponses" ref="survey_modal"></ModalFromPages>
</template>

<script>
/**
 * Modal wrapper that allows users to complete a daily survey, consisting of a series of questions (from the @/components/Surveys folder), which are saved to the database.
 *
 * @module DailySurveyView
 * @description This component renders a daily survey modal that allows users to answer a series of questions and submit their responses using the ModalFromPages component.
 * @requires ModalFromPages
 * @requires module:store/MainStore
 * @emits {Function} close - An event emitted when the survey is completed or closed.
 */

/* eslint-disable vue/no-unused-components */
import ModalFromPages from "@/components/Modal/ModalFromPages.vue";
import SmileSentiment from "@/components/Surveys/SmileSentiment.vue";
import ScaleSentiment from "@/components/Surveys/ScaleSentiment.vue";
import LongResponse from "@/components/Surveys/LongResponse.vue";
import UpcomingPage from "@/components/Surveys/UpcomingPage.vue";
// Mark all components passed into page.content with shallowRef(Component)
import { shallowRef } from "vue";
import { useMainStore } from "@/store";
import { WarningToast, SuccessToast } from "@svonk/util";
export default {
  name: "DailySurvey",
  emits: ["close"],
  components: {
    ModalFromPages,
    /** Page components for the Modal */
    SmileSentiment,
    ScaleSentiment,
    LongResponse,
    UpcomingPage,
  },
  data: () => {
    return {
      /** The page data to display in the ModalToPages component */
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
          title: "Anything else?",
          content: shallowRef(LongResponse),
          submit_text: "Done",
          is_notification: true,
        },
        {
          title: "Preview what's next",
          content: shallowRef(UpcomingPage),
          is_notification: true,
        },
        {
          title: "Thank you!",
          html: `<p>Thank you for your input, you shouldn't have to answer any other questions until tomorrow!</p>`,
          submit_text: "Done",
        },
      ],
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
  },
  methods: {
    /** Save the responses to the database and close the modal */
    saveResponses(responses) {
      this.store.save_daily_survey(responses);
      window.onbeforeunload = null;
      this.$emit("close");
    },
  },
  /** If the user has already completed the survey when opened, close the modal */
  mounted() {
    if (this.store.done_daily_survey) {
      window.onbeforeunload = null;
      this.$emit("close");
      new WarningToast("You already completed the daily survey today!", 2000);
    }
  },
  /** If we find out the user has already completed the survey at any time, close the modal */
  watch: {
    store: {
      handler() {
        if (this.store.done_daily_survey) {
          window.onbeforeunload = null;
          this.$emit("close");
          if (this.done_tutorial) {
            new SuccessToast("Thanks for completing the survey!", 2000);
          }
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
