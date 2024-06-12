<template>
  <div class="districtenv">
    <div class="env_pairs_wrappers">
      <table class="env_pairs">
        <tr
          v-for="[key, value, start, end] in pairs"
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
              <pre v-if="value">{{ value }}</pre>
              <span v-else>No value currently set</span>
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
          // .sort(([key1], [key2]) => {
          //   return key1.localeCompare(key2);
          // })
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
.districtenv div {
  padding: 10px;
  --inner-radius: calc(var(--radius-sidebar) - 10px);
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
  margin-top: 7px;
}
tr.blank {
  margin-top: 2px;
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
.env_pairs .env_pair td.value pre {
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow-x: hidden;
  flex: 1 1 20em;
  width: 20em;
}
.env_pairs .env_pair td.value span {
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
  }
  .env_pairs .env_pair td.key,
  .env_pairs .env_pair td.value {
    width: 100%;
    flex-basis: unset;
  }
}
</style>
