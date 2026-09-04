<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">{{ pageTitle }}</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <!-- Intro -->
      <template v-if="page === 0">
        <div class="overlay_contents_text">Your recent task counts and check-ins.</div>
        <br />
        <StatsAlert severity="info">
          Days without a survey still show when task counts are available.
        </StatsAlert>
      </template>

      <!-- Chart -->
      <template v-else-if="page === 1">
        <StatsFilterBar
          :filters="filters"
          :active="active"
          :is-ready="is_ready"
          :toolbar="toolbar"
          @update:active="active = $event"
          @update:toolbar="toolbar = $event"
        />
        <StatsAlert v-if="load_error" severity="error" text="Couldn't load your stats. Try again later." />
        <StatsAlert
          v-else-if="is_ready && !surveys.length"
          severity="warning"
          text="No stats to show yet."
        />
        <StatsChartCard
          v-else
          :rows="surveys"
          :graphs="graphs"
          :toolbar="toolbar"
          :is-ready="is_ready"
        />
      </template>

      <!-- Contact -->
      <template v-else>
        <StatsAlert severity="info">
          Questions?
          <router-link to="/contact">Contact us</router-link>.
        </StatsAlert>
      </template>
    </div>
    <div class="bottom_actions">
      <button class="close_action click_escape" @click="onBack">
        {{ page > 0 ? "Back" : "Settings" }}
      </button>
      <StatsProgressDots :current="page + 1" :total="pageCount" @open="goTo" />
      <div class="flex_spacer"></div>
      <button class="continue_action click_ctrlenter" @click="onContinue">
        {{ page < pageCount - 1 ? "Next" : "Close" }}
      </button>
    </div>
  </main>
</template>

<script>
import { ErrorToast, WarningToast } from "@svonk/util";
import StatsAlert from "@/components/Portal/Stats/StatsAlert.vue";
import StatsChartCard from "@/components/Portal/Stats/StatsChartCard.vue";
import StatsFilterBar from "@/components/Portal/Stats/StatsFilterBar.vue";
import StatsProgressDots from "@/components/Portal/Stats/StatsProgressDots.vue";
import {
  PERSONAL_STAT_FILTERS,
  buildGraphs,
  defaultActiveFilters,
  sortStatRows,
} from "@/components/Portal/Stats/statSeries";

export default {
  name: "StatsModal",
  components: { StatsAlert, StatsChartCard, StatsFilterBar, StatsProgressDots },
  emits: ["close"],
  data() {
    return {
      page: 0,
      pageCount: 3,
      is_ready: false,
      can_update: true,
      toolbar: false,
      load_error: false,
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
    pageTitle() {
      if (this.page === 0) return "View Statistics";
      if (this.page === 1) return "Your stats";
      return "Help";
    },
  },
  methods: {
    goTo(index) {
      if (index < 0 || index >= this.pageCount) return;
      this.page = index;
    },
    onBack() {
      if (this.page > 0) {
        this.page -= 1;
        return;
      }
      this.$router.push({
        name: "settings",
        query: this.$route.query,
      });
    },
    onContinue() {
      if (this.page < this.pageCount - 1) {
        this.page += 1;
        return;
      }
      this.$emit("close");
    },
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
      this.load_error = false;
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
      this.load_error = false;
      this.last_update = Date.now();
      this.surveys = [];
      this.$store
        .get_stats(undefined, force)
        .then((data) => {
          this.process(data);
          setTimeout(() => {
            this.can_update = true;
          }, this.min_delay);
        })
        .catch((err) => {
          new ErrorToast("Failed to get statistics", err, 5000);
          this.load_error = true;
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

<style scoped>
.overlay_contents > .stats_alert {
  margin-bottom: calc(var(--padding-overlay-input) / 2);
}
</style>
