<template>
  <button class="sidebar_toggle">
    <div class="arrow-icon"></div>
  </button>
</template>

<script>
export default {
  name: "SidebarToggle",
};
</script>

<style scoped>
.sidebar_toggle {
  display: none;
  position: absolute;
  bottom: calc(var(--padding-sidebar) / 1.5);
  left: calc(var(--padding-sidebar) / 1.5);
  height: var(--size-sidebar-toggle);
  width: var(--size-sidebar-toggle);
  cursor: pointer;
  z-index: 1;
  border-radius: calc(var(--radius-sidebar) - var(--padding-sidebar) / 3);
  border: none;
  background-color: var(--color-on-bg);
  padding: 0;
}
.sidebar_toggle.right {
  left: unset;
  right: calc(var(--padding-sidebar) / 2);
}
.sidebar_toggle .arrow-icon {
  filter: var(--filter-icon);
}
.arrow-icon {
  height: 100%;
  width: 100%;
  background-image: url(@/assets/img/general/portal/arrow-right.png);
  background-image: url(@/assets/img/general/portal/arrow-right.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  user-select: none;
  pointer-events: none;
}
.sidebar_toggle.right .arrow-icon {
  background-image: url(@/assets/img/general/portal/arrow-left.png);
  background-image: url(@/assets/img/general/portal/arrow-left.svg);
}
@media (max-width: 1200px) {
  .sidebar_toggle {
    display: block;
  }
}
</style>
