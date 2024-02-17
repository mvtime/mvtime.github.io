<template>
  <div class="account_linking">
    <img v-if="loading" alt="Loading..." class="loading_placeholder loading_icon" />
    <div v-else-if="data" class="account_details">
      <div class="overlay_contents_text">
        Please confirm that the details below match the account you're trying to link to.
      </div>
      <div class="spaced_contents">
        <div class="styled_obj">
          <span class="styled_line__label">Name:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ data.name || "Couldn't Load" }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Email:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{ data.email || "Couldn't Load" }}</span>
        </div>
        <div class="styled_obj">
          <span class="styled_line__label">Grade:</span>
          <span class="styled_line__separator"></span>
          <span class="styled_line__value">{{
            gradeText(data.join_form && data.join_form.grade) || "Couldn't Load"
          }}</span>
        </div>
      </div>
      <div class="overlay_contents_text">
        Once you've checked them, just press <span class="button_pointer_text">Link</span> to finish
        connecting your accounts!
      </div>
    </div>
    <div v-else class="overlay_contents_text">
      Something went wrong fetching the account details, please try again later.
    </div>
  </div>
</template>

<script>
import { ErrorToast } from "@svonk/util";
export default {
  name: "LinkAccount",
  emits: ["update", "status"],
  props: {
    load: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: true,
      code: null,
      data: null,
    };
  },
  computed: {},
  methods: {
    gradeText(numeric) {
      switch (numeric) {
        case "9":
          return "Freshman";
        case "10":
          return "Sophomore";
        case "11":
          return "Junior";
        case "12":
          return "Senior";
        default:
          return "Teacher";
      }
    },
  },
  mounted() {
    // get code prop from route
    this.code = this.$route.params.code;
    this.$store
      .doc_from_uid(this.code)
      .then((result) => {
        this.loading = false;
        this.data = result;
      })
      .catch((err) => {
        this.loading = false;
        new ErrorToast("Failed to link account", err, 3000);
      });
  },
  watch: {
    loading() {
      this.$emit("status", !this.loading);
    },
  },
};
</script>

<style scoped>
div.account_linking,
.account_details {
  display: flex;
  flex-flow: column nowrap;
}

.loading_placeholder {
  min-width: 100%;
  max-height: 131px;
}
</style>
