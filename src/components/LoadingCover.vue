<template>
  <div class="loading_cover" :title="'Loading ' + covering">
    <div class="loading_cover__overlay"></div>
    <div class="loading_cover__content">
      <div class="loading_cover__content__icon">
        <img class="loading_icon" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingCover",
  props: {
    covering: {
      type: String,
      default: "Content",
    },
  },
};
</script>

<style scoped>
.loading_cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  cursor: wait;
  z-index: 10;
  box-sizing: border-box;
}
.loading_cover__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-loading-overlay, var(--color-overlay));
  backdrop-filter: var(--bg-filter-loading);
  z-index: 2047;
}
.parent.simplified .loading_cover__overlay {
  background-color: var(--color-calendar);
}
.loading_cover__content {
  z-index: 2048;
}
.loading_cover__content__text {
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-overlay-text);
  text-align: center;
  margin-top: 1rem;
  width: 100%;
}

circle {
  fill: var(--color-loading-dot);
  r: var(--dot-size, 3px);
}

.loading_cover__content,
.loading_cover {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: stretch;
  height: 100%;
}
.loading_cover__content__icon {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}
</style>
