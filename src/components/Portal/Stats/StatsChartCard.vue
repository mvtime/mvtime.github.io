<template>
  <div class="stats_view_container alt_bg" :class="{ loading_bg: !isReady }">
    <div class="stats_view_wrapper" v-if="rows.length" :class="{ toolbar: toolbar }">
      <apexchart
        class="stats_view"
        type="line"
        :series="graphs"
        width="100%"
        height="100%"
        :options="options"
      ></apexchart>
    </div>
  </div>
</template>

<script>
/**
 * Shared Stats chart card — Apex line chart, overlay-input tokens, scrollbar, empty state.
 * Styles moved 1:1 from StatsModal.vue.
 *
 * @module StatsChartCard
 */
import { rowTimestamp } from "./statSeries";

export default {
  name: "StatsChartCard",
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    graphs: {
      type: Array,
      default: () => [],
    },
    toolbar: {
      type: Boolean,
      default: false,
    },
    isReady: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    options() {
      let self = this;
      let theme = this.$store.theme;
      return {
        xaxis: {
          type: "datetime",
          labels: {
            // show: false,
          },
          tooltip: {
            enabled: false,
          },
          categories: self.rows.map((survey) => rowTimestamp(survey)),
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
      const row = this.rows[args.dataPointIndex] || {};
      let base = `<div class="apexcharts-tooltip-title" style="font-family: inherit; font-size: 12px;">${new Date(
        rowTimestamp(row)
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
</style>
