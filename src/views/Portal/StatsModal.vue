<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">View Statistics</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div class="overlay_contents_text">
        The daily surveys you have completed are displayed below. To view your individual responses,
        click on the data point.
      </div>
      <br />
      <nav class="stats_view_controls_wrapper">
        <div class="stats_view_controls">
          <button
            @click="filter = tag.filter"
            class="stats_view_control__option"
            v-for="tag in filters"
            :key="tag.filter"
            :class="{ active: filter == tag.filter }"
          >
            {{ tag.name }}
          </button>
        </div>
        <span class="flex_spacer"></span>
        <button class="stats_view_control__refresh" @click="update">Update</button>
      </nav>
      <div class="stats_view_container alt_bg" :class="{ loading_bg: !is_ready }">
        <div
          class="stats_view_wrapper"
          v-if="surveys.length"
          :style="{
            '--w-scale-stat': width_entry,
            '--h-scale-stat': height_mark,
          }"
        >
          <div class="stats_view">
            <div
              class="stats_view__entry"
              v-for="survey in surveys"
              :key="survey.id"
              :style="{
                '--y-stat':
                  filters[filter].data.scale(
                    survey.data.responses[filters[filter].data.index].data
                  ) - filters[filter].data.range.from,
                '--x-stat': survey.data.index,
              }"
              @click="open_survey(survey)"
            ></div>
          </div>
        </div>
      </div>
      <br />
      <div class="overlay_contents_text">
        We appreciate your contributions towards our research. If you have any questions, please
        <router-link to="/contact">contact us</router-link>!
      </div>
    </div>
    <div class="bottom_actions">
      <!-- <button class="close_action" @click="$emit('close')">Close</button> -->
      <div class="flex_spacer"></div>
      <button class="continue_action" @click="$emit('close')">Close</button>
    </div>
  </main>
</template>

<script>
import { useMainStore } from "@/store";
import { ErrorToast } from "@svonk/util";
export default {
  name: "StatsModal",
  emits: ["close"],
  data() {
    return {
      is_ready: false,
      surveys: [],
      filter: "stress",
      filters: {
        stress: {
          name: "Stress Level",
          filter: "stress",
          data: {
            index: 1,
            range: {
              from: 1,
              to: 3,
            },
            scale(data) {
              return { positive: 3, neutral: 2, negative: 1 }[data.sentiment];
            },
          },
        },
        sentiment: {
          name: "Mood",
          filter: "sentiment",
          data: {
            index: 2,
            range: {
              from: 1,
              to: 5,
            },
            scale(data) {
              return (data.sentiment * 5) / 100;
            },
          },
        },
        upcoming: {
          name: "Workload",
          filter: "upcoming",
          data: {
            index: 4,
            range: {
              from: 0,
              to: 6,
            },
            scale(data) {
              console.log("workload", data);
              return Math.min(data.num || data.tasks?.length || 0, 6);
            },
          },
        },
      },
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    completed() {
      return this.store?.active_doc?.done_surveys || [];
    },
    width_entry() {
      // percentage of width each datapoint will occupy
      const digits = 4;
      // use E scientific notation with exponent as number of digits
      return Math.max(
        0.0,
        Math.round(Math.pow(10, digits) / this.surveys.length) / Math.pow(10, digits)
      );
    },
    height_mark() {
      // percentage of height each scale increment will occupy
      const digits = 4;
      const filter_data = this.filters[this.filter].data;
      // use E scientific notation with exponent as number of digits
      return (
        Math.round(Math.pow(10, digits) / (filter_data.range.to - filter_data.range.from)) /
        Math.pow(10, digits)
      );
    },
  },
  methods: {
    process(data) {
      this.surveys = data.filter((survey) => !survey.error);
      // map index onto surveys
      this.surveys.forEach((survey, index) => {
        survey.data.index = index;
      });
      this.is_ready = true;
    },
    update() {
      this.is_ready = false;
      this.surveys = [];
      this.store
        .get_surveys(this.completed)
        .then((data) => {
          this.process(data);
        })
        .catch((err) => {
          new ErrorToast("Failed to get statistics", err, 5000);
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
.stats_view_container {
  width: 100%;
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
  border: none;
  border-radius: var(--radius-overlay-input);
  overflow-x: auto;
}
.stats_view_container {
  /* set 1em to equal 1% height */
  font-size: 200px;
  height: 200px;
}

/* scrollbar */
.stats_view_container::-webkit-scrollbar-corner {
  display: none;
}
.stats_view_container::-webkit-scrollbar {
  background: var(--color-overlay-input);
  width: 12px;
  height: 12px;
  border-radius: var(--radius-overlay-input);
}

.stats_view_container::-webkit-scrollbar-thumb {
  width: 8px;
  height: 8px;
  background: var(--color-overlay-input-scrollbar);
  border-radius: 10px;
  border: 4px solid var(--color-overlay-input);
}

/* empty */
.stats_view_container:empty {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: inherit;
  height: 100px;
}
.stats_view_container:empty::before {
  content: "No data to display";
  opacity: 0.5;
}
/* entry wrapper */
.stats_view_container > .stats_view_wrapper {
  padding: var(--padding-overlay-input);
  height: 100%;
  min-width: 100%;
  width: fit-content;
}
.stats_view_container > .stats_view_wrapper > .stats_view {
  height: 100%;
  min-width: 100%;
  position: relative;
}
/* entries */
.stats_view_container > .stats_view_wrapper > .stats_view > .stats_view__entry {
  height: 5px;
  width: 5px;
  border-radius: 10px;
  /* background: var(--color-on-overlay-input); */
  background: var(--color-theme);
  bottom: calc(100% * var(--y-stat) * var(--h-scale-stat));
  left: calc(100% * var(--x-stat) * var(--w-scale-stat));
  position: absolute;
}

/* controls */
.stats_view_controls_wrapper {
  margin-bottom: calc(var(--padding-overlay-input) / 2);
  display: flex;
  flex-flow: row wrap;
}
.stats_view_controls {
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  border-radius: var(--radius-overlay-input);
  overflow: hidden;
  width: fit-content;
}
.stats_view_controls > button,
.stats_view_control__refresh {
  flex: 0 1 auto;
  height: 30px;
  background: var(--color-overlay-input);
  color: var(--color-on-overlay-action-disabled);
  border: none;
  padding: 0 var(--padding-overlay-input);
  font-size: 0.9em;
  font-weight: 600;
  user-select: none;
}
.stats_view_control__refresh {
  border-radius: var(--radius-overlay-input);
}
.stats_view_controls > button.active,
.stats_view_control__refresh {
  background: var(--color-overlay-input-active);
  color: var(--color-on-overlay-input);
}
</style>
