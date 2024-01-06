<template>
  <main class="tutorial">
    <div class="overlay_contents nopad">
      <div class="tutorial_pages">
        <div
          class="tutorial_page"
          v-for="tab in tabs"
          :key="tab.name"
          :class="{ active: active_tab == tab.index }"
          @click="active_tab = tab.index"
        >
          <img class="tutorial_page__icon" :alt="`Tutorial ${tab.name} Tab`" :src="tab.icon" />
          <span class="tutorial_page__name">{{ tab.name }}</span>
        </div>
      </div>
      <video
        class="tutorial_player"
        autoplay
        playsinline
        nodownload
        preload="metadata"
        @ended="if (active_tab < tabs.length) active_tab++;"
        :poster="
          tabs[active_tab - 1].video.poster || require('@/assets/video/tutorial/placeholder.png')
        "
      >
        <source
          :src="tabs[active_tab - 1].video.src"
          :type="tabs[active_tab - 1].video.type || 'video/mp4'"
        />
      </video>
    </div>
    <div class="bottom_actions">
      <button class="skip_action" ref="skip_action" @click="to_onboard">
        Skip <span class="desktop_only_text">Videos</span>
      </button>
      <div class="flex_spacer"></div>
      <button
        class="continue_action click_ctrlenter"
        @click="
          if (active_tab < tabs.length) active_tab++;
          else to_onboard();
        "
      >
        {{ active_tab < tabs.length ? "Next" : "Finish" }}
      </button>
    </div>
  </main>
</template>

<script>
import "@/assets/style/overlay.css";
import { WarningToast } from "@svonk/util";
export default {
  name: "TutorialModal",
  mounted() {
    //TODO: add videos and remove
    new WarningToast("We're still working on creating the tutorial videos, sorry!", 2500);
    this.to_onboard();
    // resume
    // const tab = this.$route?.params?.tab;
    // this.active_tab = tab && tab < this.tabs.length && tab >= 1 ? tab : 1;
    // this.set_route();
  },
  data() {
    return {
      active_tab: 1,
      tabs: [
        {
          index: 1,
          name: "View",
          teaches: "calendar",
          icon: require("@/assets/img/general/portal/tutorial/calendar.svg"),
          video: {
            src: null,
            poster: require("@/assets/video/tutorial/placeholder.png"),
          },
        },
        {
          index: 2,
          name: "Complete",
          teaches: "study, todo",
          icon: require("@/assets/img/general/portal/tutorial/study.svg"),
          video: {},
        },
        {
          index: 3,
          name: "Track",
          teaches: "stats",
          icon: require("@/assets/img/general/portal/tutorial/stats.svg"),
          video: {},
        },
        {
          index: 4,
          name: "Connect",
          teaches: "linking",
          icon: require("@/assets/img/general/portal/tutorial/link.svg"),
          video: {},
        },
      ],
    };
  },
  methods: {
    to_onboard() {
      this.$router.push({ name: "onboarding", query: this.$route.query });
    },
    set_route() {
      this.$router.replace({
        name: "tutorial",
        params: { tab: this.active_tab },
        query: this.$route.query,
      });
    },
  },
  watch: {
    active_tab() {
      this.set_route();
    },
  },
};
</script>

<style scoped>
.overlay_contents {
  padding: calc(var(--padding-overlay) / 2);
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  gap: 10px;
  overflow-x: hidden;
}
.tutorial {
  max-width: 650px;
  max-height: 490px;
}
.tutorial_pages {
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: space-evenly;
  gap: 10px;
}
.tutorial_page {
  display: flex;
  flex: 1 1 auto;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 18px;
  background: var(--color-overlay-input);
  border-radius: 3px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  gap: 10px;
  opacity: 0.25;
}
.tutorial_page.active {
  opacity: 1;
}
.tutorial_page__icon {
  width: 60px;
  height: 60px;
}

.tutorial_player {
  width: 100%;
  height: 350px;
  border-radius: 3px;
  background: var(--color-overlay-input);
  flex: 1 1 auto;
  object-fit: cover;
  overflow: hidden;
}

/* mobile */
@media (max-width: 670px) {
  .overlay_contents {
    flex-flow: column-reverse nowrap;
    align-items: stretch;
  }
  .tutorial {
    max-width: 400px;
    max-height: 570px;
  }
  .tutorial_pages {
    flex-flow: row nowrap;
    align-items: stretch;
    justify-content: flex-start;
    gap: 10px;
    overflow-x: auto;
    height: 70px;
    flex: 0 1 auto;
    min-height: 50px;
  }
  .tutorial_pages .tutorial_page {
    align-items: center;
    justify-content: center;
    padding: 10px 0;
    flex: 1 1 auto;
  }
  .tutorial_page .tutorial_page__icon {
    width: 50px;
    height: 50px;
  }
  .tutorial_page .tutorial_page__name {
    display: none;
  }
  .tutorial_player {
    height: unset;
    width: 100%;
    overflow: unset;
  }
}
@media (max-height: 510px) {
  .tutorial {
    max-height: calc(100vh - 20px);
  }
}
@media (max-width: 420px) {
  .tutorial {
    max-width: calc(100vw - 20px);
  }
}
</style>
