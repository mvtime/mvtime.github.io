<template>
  <div class="districtenv">
    <div class="env_pairs_wrappers">
      <table class="env_pairs">
        <tr
          class="admin_in"
          v-for="([key, value, start, end], index) in pairs"
          :style="{ animationDelay: `${(index + 1) * 0.015}s` }"
          :key="key"
          :class="{
            env_pair: key,
            blank: !key,
            start_section: start,
            end_section: end,
          }"
        >
          <template v-if="key === ''">
            <br />
          </template>
          <template v-else>
            <td class="key">{{ key }}</td>
            <div></div>
            <td class="value">
              <span
                class="value_color"
                v-if="value && key.includes('COLOR')"
                :style="{ backgroundColor: `#${value}` }"
              ></span>
              <pre v-if="value">{{ value }}</pre>

              <span v-else class="unset">No value currently set</span>
            </td>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DistrictEnv",
  data() {
    return {};
  },
  computed: {
    pairs() {
      return (
        Object.entries(this.$env)
          .filter(([key]) => {
            return key.startsWith("VUE_APP_");
          })
          .sort(([key1], [key2]) => {
            return key1.localeCompare(key2);
          })
          .map(([key, value]) => {
            return [key.replace("VUE_APP_", ""), this.make_safe(value)];
          })
          // add blank pairings between groups of keys starting with the same prefix (part of key before first underscore)
          .reduce((acc, [key, value], index, array) => {
            const prefix = key.split("_")[0];
            if (index > 0 && prefix !== array[index - 1][0].split("_")[0]) {
              acc.push(["", ""]);
            }
            acc.push([
              key,
              value,
              index === 0 || prefix !== array[index - 1][0].split("_")[0],
              index === array.length - 1 || prefix !== array[index + 1][0].split("_")[0],
            ]);
            return acc;
          }, [])
      );
    },
  },
  methods: {
    make_safe(value) {
      try {
        // nicely format json strings to multi-line tabbed format
        return JSON.stringify(JSON.parse(value));
      } catch (e) {
        return value;
      }
    },
  },
};
</script>

<style scoped>
.districtenv > div.env_pairs_wrappers {
  padding: calc(var(--padding-sidebar) / 2);
  --inner-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 2);
}
.env_pairs {
  display: flex;
  flex-flow: column nowrap;
}
.env_pairs .env_pair {
  background: var(--color-on-bg);
  margin-top: 5px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-items: stretch;
  margin-top: 5px;
  border-radius: 3px;
}
tr.blank {
  margin-top: 2px;
  user-select: none;
}
.env_pairs .env_pair td {
  display: block;
  padding: 10px 20px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.env_pairs .env_pair td.key {
  font-weight: bold;
  flex: 0 1 270px;
  width: 270px;
  padding: 10px;
}
.env_pairs .env_pair div {
  margin: 0;
  padding: 0;
  border: 0;
  width: 2px;
  flex: 0 0 2px;
  background: var(--color-bg);
  opacity: 0.5;
}
.env_pairs .env_pair td.value {
  flex: 2 7 400px;
  width: 400px;
  display: flex;
  flex-flow: row nowrap;
}

td.value .value_color {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  border-radius: calc(var(--inner-radius) - 5px);
  position: relative;
  left: -10px;
  box-shadow: var(--shadow-highlight);
  user-select: none;
}

.env_pairs .env_pair td.value pre {
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  flex: 1 1 20em;
  width: 20em;
}
.env_pairs .env_pair td.value span.unset {
  opacity: 0.4;
  user-select: none;
}
.env_pairs .env_pair .env_pair:first-child,
.blank + .env_pair,
.env_pair.start_section {
  border-top-right-radius: var(--inner-radius);
  border-top-left-radius: var(--inner-radius);
  margin-top: 0px;
}
.env_pair:last-child,
.env_pair.end_section {
  border-bottom-right-radius: var(--inner-radius);
  border-bottom-left-radius: var(--inner-radius);
}
@media (max-width: 840px) {
  .env_pair {
    border-radius: 3px;
  }
  .env_pairs .env_pair {
    display: flex;
    flex-flow: column nowrap;
  }
  .env_pairs .env_pair div {
    height: 2px;
    width: 100%;
    opacity: 1;
  }
  .env_pairs .env_pair td.key,
  .env_pairs .env_pair td.value {
    width: 100%;
    flex-basis: unset;
  }
}
</style>
