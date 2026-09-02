<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">Stats</h2>
    </header>
    <div class="overlay_contents">
      <div class="overlay_contents_text">
        Class workload trends for classes you manage. Figures are aggregates only — individual
        check-in notes are not shown.
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
      <template v-if="unavailable">
        <div class="overlay_contents_text">
          Class stats aren't available yet. This view waits on the server Stats API.
        </div>
        <StatsChartCard :rows="[]" :graphs="[]" :toolbar="toolbar" :is-ready="is_ready" />
      </template>
      <template v-else-if="!is_ready">
        <StatsChartCard :rows="[]" :graphs="[]" :toolbar="toolbar" :is-ready="false" />
      </template>
      <template v-else-if="!visibleClasses.length">
        <div class="overlay_contents_text">
          No classes you manage have aggregate stats yet.
        </div>
        <StatsChartCard :rows="[]" :graphs="[]" :toolbar="toolbar" :is-ready="true" />
      </template>
      <template v-else>
        <template v-for="(cls, i) in visibleClasses" :key="cls.classId">
          <br v-if="i > 0" />
          <div class="overlay_contents_text">{{ classLabel(cls) }}</div>
          <StatsChartCard
            :rows="cls.list"
            :graphs="graphsFor(cls.list)"
            :toolbar="toolbar"
            :is-ready="is_ready"
          />
        </template>
      </template>
      <br />
      <div class="overlay_contents_text">
        If you have any questions, please
        <router-link to="/contact">contact us</router-link>.
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
/**
 * Teacher/admin Stats modal — class-level aggregates only (no notes / survey text).
 * Data: per manageable class via GET /api/v1/me/teacher-stats?classId=&from=&to= (mvtt-server#29).
 * Gated by is_teacher on the route; store already filters can_manage_class.
 *
 * @module TeacherStatsModal
 */
import { ErrorToast } from "@svonk/util";
import StatsChartCard from "@/components/Portal/Stats/StatsChartCard.vue";
import StatsFilterBar from "@/components/Portal/Stats/StatsFilterBar.vue";
import { TEACHER_STAT_FILTERS, buildGraphs, sortStatRows } from "@/components/Portal/Stats/statSeries";

export default {
  name: "TeacherStatsModal",
  components: { StatsChartCard, StatsFilterBar },
  emits: ["close"],
  data() {
    return {
      is_ready: false,
      toolbar: false,
      unavailable: false,
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
  },
  methods: {
    classMatches(class_obj, classId) {
      if (!class_obj || !classId) return false;
      if (class_obj._class_id === classId) return true;
      if (class_obj.id === classId || class_obj.ref === classId) return true;
      if (typeof class_obj.id === "string" && (class_obj.id.endsWith("/" + classId) || class_obj.id.endsWith("~" + classId))) {
        return true;
      }
      if (typeof class_obj.ref === "string" && (class_obj.ref.endsWith("/" + classId) || class_obj.ref === classId)) {
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
      this.$store
        .fetch_teacher_stats()
        .then((data) => {
          this.process(data);
        })
        .catch((err) => {
          new ErrorToast("Failed to get class statistics", err, 5000);
          this.is_ready = true;
        });
    },
  },
  mounted() {
    this.update();
  },
};
</script>
