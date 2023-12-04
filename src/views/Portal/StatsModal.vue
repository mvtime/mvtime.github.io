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
        <span class="flex_spacer"></span>
        <button
          class="stats_view_control__refresh"
          @click="
            if (is_ready) {
              try_update();
            }
          "
          :class="{ disabled: !can_update || !is_ready }"
        >
          Update
        </button>
      </nav>
      <div class="stats_view_container alt_bg" :class="{ loading_bg: !is_ready }">
        <div class="stats_view_wrapper" v-if="surveys.length">
          <apexchart
            class="stats_view"
            type="line"
            :series="graphs"
            width="100%"
            height="100%"
            :options="{
              xaxis: {
                type: 'datetime',
                labels: {
                  show: false,
                },
                categories: surveys.map((survey) => survey.data.time),
              },
              yaxis: {
                labels: {
                  show: false,
                },
                // scale from 0 to 5
                min: 0,
                max: 5,
                tickAmount: 5,
                decimalsInFloat: 0,
              },
              legend: {
                show: true,
                showForSingleSeries: true,
              },
              theme: {
                mode: store.theme,
              },
              chart: {
                background: 'var(--color-overlay-input)',
                fontFamily: 'inherit',
                toolbar: {
                  show: false,
                },
              },
              stroke: {
                curve: 'smooth',
                width: 3,
              },
              tooltip: {
                enabled: true,
                // don't show the label below the axis, but do show it in the tooltip
                x: {
                  format: 'ddd MMM d',
                },
              },
            }"
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
      min_delay: 1000 * 15,
      surveys: [],
      active: ["stress", "sentiment"],
      filters: [
        {
          name: "Stress Level",
          filter: "stress",
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
          name: "Mood",
          filter: "sentiment",
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
              return data.sentiment + "%";
            },
          },
        },
        {
          name: "Workload",
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
  },
  methods: {
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
      this.surveys.forEach((survey, index) => {
        survey.data.index = index;
      });
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
  created() {},
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
  background: var(--color-overlay-input-alt);
  color: var(--color-on-overlay-input-alt);
  border: none;
  padding: 0 var(--padding-overlay-input);
  font-size: 0.9em;
  font-weight: 600;
  user-select: none;
}
.stats_view_control__refresh {
  border-radius: var(--radius-overlay-input);
}
.stats_view_control__refresh.disabled {
  cursor: not-allowed;
}
.stats_view_controls > button.active,
.stats_view_control__refresh:not(.disabled) {
  background: var(--color-overlay-input-active);
  color: var(--color-on-overlay-input);
}
</style>
