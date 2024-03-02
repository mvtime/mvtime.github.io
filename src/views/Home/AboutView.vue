<template>
  <main class="about center-1000">
    <div class="about_header">
      <h2 class="header_style">Our Mission;</h2>
      <br />
      <h3 class="secondary_home_text">
        A better way to organize our cluttered lives. By students, for the wellbeing of students.
      </h3>
    </div>
    <hr />
    <p class="about_body">
      At {{ $env.VUE_APP_BRAND_SHORT_NAME }}, we're working to lighten the load on both students and
      teachers. Far too many times have students realized that they had 2, 3, or even 4 major tests
      <i>on the same day</i>! Students should never have to sacrifice their ability to demonstrate
      what they've learned, and teachers should never have to see their students stressed, simply
      because of scheduling issues. <br /><br />
      {{ $env.VUE_APP_BRAND_LONG_NAME }} exists to help everyone involved in the testing process to
      make better use of their time, and to remove as much the stress and uncertainty around it as
      possible. Our tool is made for <i>you</i>, and your feedback and ideas are an essencial part
      of our mission. We'd love for you to be involved in the development process, you can see what
      we're working on <router-link to="/roadmap">here</router-link>! If you're feeling adventurous,
      you can even <router-link to="/download">try the beta companion software</router-link>!
      <br /><br />
      Thank you for your support,
      <br />
      <b class="team-signature"
        ><router-link to="/contact">The {{ $env.VUE_APP_BRAND_LONG_NAME }} Team</router-link></b
      >
    </p>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
main.about {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
}
main.about .about_header {
  max-width: 600px;
}
main.about > hr {
  width: 100%;
  margin: 20px 0;
  border: 0;
  height: 3px;
  border-radius: 4px;
  opacity: 0.8;
  background-image: linear-gradient(to right, var(--color-theme) 50px, rgba(0, 0, 0, 0) 75%);
}
.about_body {
  opacity: 0.8;
  line-height: 1.7em;
  font-family: Lato, Inter, sans-serif;
  width: 100%;
  max-width: 1000px;
}
.team-signature a {
  /* color: var(--color-text); */
  text-decoration: none;
}
</style>
