// Path: LoadingCover.vue

<template>
  <div class="loading_cover" :title="'Loading ' + covering">
    <div class="loading_cover__overlay"></div>
    <div class="loading_cover__content">
      <div class="loading_cover__content__icon">
        <img class="loading_icon" />
        <!-- svg with max width 400px, min of 100, otherwise 33%, height auto -->
        <!-- <svg
          viewBox="0 0 100 20"
          :style="{
            width: 'calc(33% + 100px)',
            minWidth: '100px',
            maxWidth: '400px',
          }"
        >
          <defs>
            <circle id="dot" r="3" />
          </defs>
          <g fill="var(--color-loading-dot, #000)">
            <circle cx="33%" cy="50%" r="3">
              <animate
                attributeName="r"
                values="3;7;3"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              />
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
              />
            </circle>
            <circle cx="50%" cy="50%" r="3">
              <animate
                attributeName="r"
                values="3;7;3"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                begin="0.2s"
              />
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                begin="0.2s"
              />
            </circle>
            <circle cx="67%" cy="50%" r="3">
              <animate
                attributeName="r"
                values="3;7;3"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                begin="0.4s"
              />
              <animate
                attributeName="opacity"
                values="0.2;1;0.2"
                dur="1s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                begin="0.4s"
              />
            </circle>
          </g>
        </svg> -->
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
