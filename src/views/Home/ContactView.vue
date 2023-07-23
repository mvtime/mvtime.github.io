<template>
  <main class="contact">
    <!-- <router-link to="/contact/play">Play Minigame</router-link> -->
    <contact-game id="contact_game"></contact-game>
  </main>
</template>

<script>
import ContactGame from "@/components/Home/ContactGame.vue";
export default { components: { ContactGame } };
</script>

<style scoped>
.contact {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#contact_game {
  width: 100%;
  height: 100%;
  flex-grow: 1;
}
</style>
