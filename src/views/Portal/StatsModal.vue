<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">View Statistics</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div class="overlay_contents_text">
        Your daily workload and check-ins are shown below. Days without a survey still appear when
        task counts are available.
      </div>
      <br />
      <StatsFilterBar
        :filters="filters"
        :active="active"
        :is-ready="is_ready"
        :toolbar="toolbar"
        @update:active="active = $event"
        @update:toolbar="toolbar = $event"
      />
      <StatsChartCard
        :rows="surveys"
        :graphs="graphs"
        :toolbar="toolbar"
        :is-ready="is_ready"
      />
      <br />
      <div class="overlay_contents_text">
        We appreciate your contributions towards our research. If you have any questions, please
        <router-link to="/contact">contact us</router-link>!
      </div>
    </div>
    <div class="bottom_actions">
      <button
        class="close_action click_escape"
        @click="
          $router.push({
            name: 'settings',
            query: $route.query,
          })
        "
      >
        Back
      </button>
      <div class="flex_spacer"></div>
      <button class="continue_action click_ctrlenter" @click="$emit('close')">Close</button>
    </div>
  </main>
</template>

<script>
import { ErrorToast, WarningToast } from "@svonk/util";
import StatsChartCard from "@/components/Portal/Stats/StatsChartCard.vue";
import StatsFilterBar from "@/components/Portal/Stats/StatsFilterBar.vue";
import {
  PERSONAL_STAT_FILTERS,
  buildGraphs,
  defaultActiveFilters,
  sortStatRows,
} from "@/components/Portal/Stats/statSeries";

export default {
  name: "StatsModal",
  components: { StatsChartCard, StatsFilterBar },
  emits: ["close"],
  data() {
    return {
      is_ready: false,
      can_update: true,
      toolbar: false,
      min_delay: 1000 * 15,
      surveys: [],
      active: ["mood", "stress", "upcoming"],
    };
  },
  computed: {
    filters() {
      return PERSONAL_STAT_FILTERS;
    },
    graphs() {
      return buildGraphs(this.surveys, this.filters, this.active);
    },
  },
  methods: {
    try_update() {
      if (this.can_update) {
        this.update(true);
        this.$status.log("Manualling refreshing survey data");
      } else {
        new WarningToast("Please wait before updating again", 2000);
        this.$status.warn("Blocked quick refresh of survey data ");
      }
    },
    process(data) {
      this.surveys = sortStatRows((data || []).filter((survey) => !survey.error));
      try {
        this.surveys.forEach((survey, index) => {
          survey.index = index;
        });
      } catch {
        throw "Failed to map indices onto stats data";
      }
      this.active = defaultActiveFilters(this.surveys);
      this.is_ready = true;
    },
    update(force = false) {
      this.is_ready = false;
      this.can_update = false;
      this.last_update = Date.now();
      this.surveys = [];
      this.$store
        .get_stats(undefined, force)
        .then((data) => {
          this.process(data);
          // set a timeout to allow the user to update again
          setTimeout(() => {
            this.can_update = true;
          }, this.min_delay);
        })
        .catch((err) => {
          new ErrorToast("Failed to get statistics", err, 5000);
          this.is_ready = true;
          this.can_update = true;
        });
    },
  },
  mounted() {
    this.update();
  },
};
</script>
