<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">{{ pageTitle }}</h2>
    </header>
    <div class="overlay_contents">
      <!-- Intro -->
      <template v-if="page === 0">
        <div class="overlay_contents_text">Aggregates for classes you manage.</div>
        <br />
        <StatsAlert severity="info">
          Class totals only. Individual check-in notes are not shown.
        </StatsAlert>
      </template>

      <!-- Status / empty / error (single chart slot when no class pages) -->
      <template v-else-if="statusPage">
        <StatsFilterBar
          :filters="filters"
          :active="active"
          :is-ready="is_ready"
          :toolbar="toolbar"
          @update:active="active = $event"
          @update:toolbar="toolbar = $event"
        />
        <StatsAlert v-if="load_error" severity="error" text="Couldn't load class stats. Try again later." />
        <StatsAlert v-else-if="unavailable" severity="warning" text="Class stats aren't ready yet." />
        <StatsAlert
          v-else-if="is_ready && !visibleClasses.length"
          severity="warning"
          text="No classes you manage have aggregate stats yet."
        />
        <StatsChartCard
          v-else-if="!is_ready"
          :rows="[]"
          :graphs="[]"
          :toolbar="toolbar"
          :is-ready="false"
        />
      </template>

      <!-- One page per class -->
      <template v-else-if="currentClass">
        <div class="stats_class_heading">
          <ClassNameChip :class-obj="localClassFor(currentClass.classId)" />
        </div>
        <StatsFilterBar
          :filters="filters"
          :active="active"
          :is-ready="is_ready"
          :toolbar="toolbar"
          @update:active="active = $event"
          @update:toolbar="toolbar = $event"
        />
        <StatsChartCard
          :rows="currentClass.list"
          :graphs="graphsFor(currentClass.list)"
          :toolbar="toolbar"
          :is-ready="is_ready"
        />
      </template>

      <!-- Contact (last page when classes exist) -->
      <template v-else-if="page === pageCount - 1 && visibleClasses.length">
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
/**
 * Teacher/admin Stats modal — class-level aggregates only (no notes / survey text).
 * Data: per manageable class via GET /api/v1/me/teacher-stats?classId=&from=&to= (mvtt-server#29).
 * Gated by is_teacher on the route; store already filters can_manage_class.
 *
 * Survey-like pages: intro, then one page per class (chip + filters + chart), then contact.
 *
 * @module TeacherStatsModal
 */
import { ErrorToast } from "@svonk/util";
import ClassNameChip from "@/components/Portal/ClassNameChip.vue";
import StatsAlert from "@/components/Portal/Stats/StatsAlert.vue";
import StatsChartCard from "@/components/Portal/Stats/StatsChartCard.vue";
import StatsFilterBar from "@/components/Portal/Stats/StatsFilterBar.vue";
import StatsProgressDots from "@/components/Portal/Stats/StatsProgressDots.vue";
import { TEACHER_STAT_FILTERS, buildGraphs, sortStatRows } from "@/components/Portal/Stats/statSeries";

export default {
  name: "TeacherStatsModal",
  components: {
    ClassNameChip,
    StatsAlert,
    StatsChartCard,
    StatsFilterBar,
    StatsProgressDots,
  },
  emits: ["close"],
  data() {
    return {
      page: 0,
      is_ready: false,
      toolbar: false,
      unavailable: false,
      load_error: false,
      classes: [],
      // Teacher endpoint is Work aggregates only (#29)
      active: ["upcoming"],
    };
  },
  computed: {
    filters() {
      return TEACHER_STAT_FILTERS;
    },
    managedClasses() {
      return (this.$store.classes || []).filter((c) => this.$store.can_manage_class(c));
    },
    visibleClasses() {
      return (this.classes || []).filter(
        (cls) => this.localClassFor(cls.classId) && (cls.list || []).length > 0
      );
    },
    /**
     * Pages: intro (0) + class pages + contact when classes exist;
     * otherwise intro + single status page.
     */
    pageCount() {
      const n = this.visibleClasses.length;
      if (n > 0) return 1 + n + 1; // intro + classes + contact
      return 2; // intro + status
    },
    statusPage() {
      return this.page === 1 && !this.visibleClasses.length;
    },
    classPageIndex() {
      // page 1..n map to visibleClasses[0..n-1]
      if (!this.visibleClasses.length) return -1;
      const idx = this.page - 1;
      if (idx < 0 || idx >= this.visibleClasses.length) return -1;
      return idx;
    },
    currentClass() {
      const idx = this.classPageIndex;
      return idx >= 0 ? this.visibleClasses[idx] : null;
    },
    pageTitle() {
      if (this.page === this.pageCount - 1 && this.visibleClasses.length) return "Help";
      return "Stats";
    },
  },
  watch: {
    pageCount(next) {
      if (this.page >= next) this.page = Math.max(0, next - 1);
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
    classMatches(class_obj, classId) {
      if (!class_obj || !classId) return false;
      if (class_obj._class_id === classId) return true;
      if (class_obj.id === classId || class_obj.ref === classId) return true;
      if (
        typeof class_obj.id === "string" &&
        (class_obj.id.endsWith("/" + classId) || class_obj.id.endsWith("~" + classId))
      ) {
        return true;
      }
      if (
        typeof class_obj.ref === "string" &&
        (class_obj.ref.endsWith("/" + classId) || class_obj.ref === classId)
      ) {
        return true;
      }
      return false;
    },
    localClassFor(classId) {
      return this.managedClasses.find((c) => this.classMatches(c, classId)) || null;
    },
    classLabel(cls) {
      const local = this.localClassFor(cls.classId);
      return (local && this.$store.class_text(local)) || cls.name || cls.classId;
    },
    graphsFor(list) {
      return buildGraphs(list || [], this.filters, this.active);
    },
    process(payload) {
      this.load_error = false;
      this.unavailable = !!payload?.unavailable;
      this.classes = (payload?.classes || []).map((cls) => ({
        ...cls,
        list: sortStatRows(cls.list || []),
      }));
      this.active = ["upcoming"];
      this.is_ready = true;
    },
    update() {
      this.is_ready = false;
      this.classes = [];
      this.unavailable = false;
      this.load_error = false;
      this.$store
        .fetch_teacher_stats()
        .then((data) => {
          this.process(data);
        })
        .catch((err) => {
          new ErrorToast("Failed to get class statistics", err, 5000);
          this.load_error = true;
          this.is_ready = true;
        });
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<style scoped>
.stats_class_heading {
  margin-bottom: calc(var(--padding-overlay-input) / 2);
}
.overlay_contents > .stats_alert {
  margin-bottom: calc(var(--padding-overlay-input) / 2);
}
</style>
