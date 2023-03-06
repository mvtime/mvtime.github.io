<template>
  <header>
    <h1>MV Test Tracker</h1>
    <span class="flex-spacer"></span>
    <div class="nav-actions">
      <nav class="base-pages-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </nav>
      <button id="nav-auth-btn" class="small-action-btn auth-action">Log In</button>
    </div>
  </header>
</template>

<script>
export default {}
</script>

<style scoped>
header {
  width: 100%;
  white-space: break-spaces;
}
header * {
  white-space: inherit;
}
header,
header .nav-actions,
header .nav-actions nav {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
header nav a {
  margin: 0 var(--nav-spacing);
  text-decoration: none;
  color: inherit;
}
#nav-auth-btn {
  margin-left: var(--nav-spacing);
}
</style>
