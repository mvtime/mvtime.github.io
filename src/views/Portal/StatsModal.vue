<template>
  <main class="entercode">
    <header class="modal_header">
      <h2 class="header_style modal_header_title">View Statistics</h2>
    </header>
    <div class="overlay_contents" ref="contents">
      <div class="overlay_contents_text">
        The daily surveys you have completed are displayed below.
        <!-- To view your individual responses, click on the data point. -->
      </div>
      <br />
      <nav class="stats_view_controls_wrapper">
        <div class="stats_view_controls">
          <button
            @click="
              if (active.includes(tag.filter) && active.length > 1) {
                active.splice(active.indexOf(tag.filter), 1);
              } else {
                active.push(tag.filter);
              }
            "
            class="stats_view_control__option"
            v-for="tag in filters"
            :key="tag.filter"
            :class="{ active: active.includes(tag.filter) && is_ready }"
          >
            {{ tag.name }}
          </button>
        </div>
        <!-- <button
          class="stats_view_control__refresh"
          @click="
            if (is_ready) {
              try_update();
            }
          "
          :class="{ disabled: !can_update || !is_ready }"
        >
          Update
        </button> -->
        <span class="flex_spacer"></span>
        <button
          class="stats_view_control__toggle"
          @click="toolbar = !toolbar"
          :class="{ disabled: !is_ready }"
        >
          {{ toolbar ? "Less" : "More" }}
        </button>
      </nav>
      <div class="stats_view_container alt_bg" :class="{ loading_bg: !is_ready }">
        <div class="stats_view_wrapper" v-if="surveys.length" :class="{ toolbar: toolbar }">
          <apexchart
            class="stats_view"
            type="line"
            :series="graphs"
            width="100%"
            height="100%"
            :options="options"
          ></apexchart>
          <!-- <div class="stats_view"></div> -->
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
import { ErrorToast, WarningToast } from "@svonk/util";
import { _status } from "../../common";
export default {
  name: "StatsModal",
  emits: ["close"],
  data() {
    return {
      is_ready: false,
      can_update: true,
      toolbar: false,
      min_delay: 1000 * 15,
      surveys: [],
      active: ["mood", "stress"],
      filters: [
        {
          name: "Mood",
          filter: "mood",
          data: {
            index: 1,
            range: {
              from: 1,
              to: 3,
            },
            scale(data) {
              return ({ positive: 3, neutral: 2, negative: 1 }[data.sentiment] - 1) * (5 / 2);
            },
            label(data) {
              return data.sentiment.charAt(0).toUpperCase() + data.sentiment.slice(1);
            },
          },
        },
        {
          name: "Stress",
          filter: "stress",
          data: {
            index: 2,
            range: {
              from: 1,
              to: 5,
            },
            scale(data) {
              return ((data.sentiment * 5) / 100 - 1) * (5 / 4);
            },
            label(data) {
              return (data.sentiment * 5) / 100 + "/5";
            },
          },
        },
        {
          name: "Work",
          filter: "upcoming",
          data: {
            index: 4,
            range: {
              from: 0,
              to: 6,
            },
            scale(data) {
              return Math.min(data.num || data.tasks?.length || 0, 10) / 2;
            },
            label(data) {
              return (data.num || data.tasks?.length || 0) + " tasks";
            },
          },
        },
        {
          name: "Notes",
          filter: "additional",
          data: {
            index: 3,
            range: {
              from: 0,
              to: 0,
            },
            scale(data) {
              void data;
              return data.input ? -0.8 : -1000;
            },
            label(data) {
              // first 20 chars
              return data.input
                ? data.input.length > 20
                  ? `"${data.input.slice(0, 18)}...`
                  : `"${data.input}"`
                : "None";
            },
          },
        },
      ],
    };
  },
  computed: {
    store() {
      return useMainStore();
    },
    completed() {
      return this.store?.active_doc?.done_surveys || [];
    },
    graphs() {
      let graphs = this.filters
        .filter((f) => this.active.includes(f.filter))
        .map((f) => {
          return {
            name: f.name,
            data: this.surveys.map((survey) => {
              return f.data.scale(survey.data.responses[f.data.index].data);
            }),
            labels: this.surveys.map((survey) => {
              return f.data.label(survey.data.responses[f.data.index].data);
            }),
          };
        });
      return graphs;
    },
    options() {
      let self = this;
      let theme = this.store.theme;
      return {
        xaxis: {
          type: "datetime",
          labels: {
            // show: false,
          },
          tooltip: {
            enabled: false,
          },
          categories: self.surveys.map((survey) => survey.data.time),
        },
        yaxis: {
          labels: {
            show: false,
          },
          // scale from 0 to 5
          min: -0.5,
          max: 5.5,
          tickAmount: 10,
          decimalsInFloat: 0,
        },
        legend: {
          show: true,
          showForSingleSeries: true,
        },
        theme: {
          mode: theme,
        },
        chart: {
          background: "var(--color-overlay-input)",
          fontFamily: "inherit",
          toolbar: {
            show: self.toolbar,
          },
          width: "100%",
          height: "100%",
        },
        grid: {
          show: false,
        },
        stroke: {
          //   curve: "smooth",
          curve: "straight",
          width: 3,
        },
        tooltip: {
          custom: function (series, seriesIndex, dataPointIndex, w) {
            // use the vue method to get the html w/ custom_tooltip
            return self.custom_tooltip(series, seriesIndex, dataPointIndex, w);
          },
          enabled: true,
          // don't show the label below the axis, but do show it in the tooltip
          x: {
            format: "ddd MMM d",
          },
        },
      };
    },
  },
  methods: {
    custom_tooltip(args) {
      let base = `<div class="apexcharts-tooltip-title" style="font-family: inherit; font-size: 12px;">${new Date(
        this.surveys[args.dataPointIndex].data.time
      ).toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })}</div>`;
      for (let index in this.graphs) {
        let series = this.graphs[index];
        base += `<div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;">
                <span class="apexcharts-tooltip-marker" style="background-color: ${
                  args.w.globals.colors[index]
                }"></span>
                <div class="apexcharts-tooltip-text" style="font-family: inherit; font-size: 12px;">
                    <div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label">${
                      series.name
                    }: </span><span class="apexcharts-tooltip-text-y-value">${
          series.labels[args.dataPointIndex]
        }</span></div>
                </div></div>`;
      }
      base += `</div>`;
      return base;
    },
    try_update() {
      if (this.can_update) {
        this.update(true);
        _status.log("Manualling refreshing survey data");
      } else {
        new WarningToast("Please wait before updating again", 2000);
        _status.warn("Blocked quick refresh of survey data ");
      }
    },
    process(data) {
      this.surveys = data.filter((survey) => !survey.error);
      // map index onto surveys
      try {
        this.surveys.forEach((survey, index) => {
          survey.data.index = index;
        });
      } catch {
        throw "Failed to map indices onto survey data";
      }
      this.is_ready = true;
    },
    update(force = false) {
      this.is_ready = false;
      this.can_update = false;
      this.last_update = Date.now();
      this.surveys = [];
      this.store
        .get_cached_surveys(this.completed, force)
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

<style scoped>
.stats_view_container {
  width: 100%;
  background-color: var(--color-overlay-input);
  color: var(--color-on-overlay-input);
  border: none;
  border-radius: var(--radius-overlay-input);
  /* overflow-x: auto; */
}
.stats_view_container {
  height: 250px;
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
  padding: calc(var(--padding-overlay-input) - 5px) calc(var(--padding-overlay-input) - 10px);
  padding-bottom: var(--padding-overlay-input);
  height: 100%;
  min-width: 100%;
  width: fit-content;
}
.stats_view_container > .stats_view_wrapper:not(.toolbar) {
  padding-top: 0;
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
  /* justify-content: space-between; */
  justify-content: flex-start;
  gap: 5px;
}
.stats_view_controls {
  height: 30px;
  display: flex;
  flex-flow: row nowrap;
  gap: 2px;
  border-radius: var(--radius-overlay-input);
  overflow: hidden;
  width: fit-content;
}
.stats_view_controls > button,
.stats_view_control__refresh,
.stats_view_control__toggle {
  flex: 0 1 auto;
  height: 30px;
  background: var(--color-overlay-input-alt);
  color: var(--color-on-overlay-input-alt);
  border: none;
  padding: 0 var(--padding-overlay-input);
  font-size: 0.9em;
  font-weight: 600;
  user-select: none;
}
@media (max-width: 500px) {
  .stats_view_controls_wrapper,
  .stats_view_controls_wrapper > .stats_view_controls {
    display: flex;
    flex-flow: row wrap;
    justify-content: stretch;
    width: 100%;
  }
  .stats_view_controls > button {
    flex: 1 0 auto;
  }
  .stats_view_control__toggle,
  .stats_view_controls_wrapper > .flex_spacer {
    display: none;
  }
}
.stats_view_control__refresh,
.stats_view_control__toggle {
  border-radius: var(--radius-overlay-input);
}
.stats_view_control__refresh.disabled,
.stats_view_control__toggle.disabled {
  cursor: not-allowed;
}
.stats_view_controls > button.active,
.stats_view_control__refresh:not(.disabled),
.stats_view_control__toggle:not(.disabled) {
  background: var(--color-overlay-input-active);
  color: var(--color-on-overlay-input);
}
</style>
