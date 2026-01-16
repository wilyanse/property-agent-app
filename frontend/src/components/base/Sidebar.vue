<template>
  <nav class="sidebar-nav">
    <h2 class="title">My App</h2>

    <ul>
      <li>
        <RouterLink to="/agents">Agents</RouterLink>
      </li>
      <li>
        <RouterLink to="/properties">Properties</RouterLink>
      </li>
      <li>
        <RouterLink to="/tenants">Tenants</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>

<style scoped>
.sidebar-nav {
  padding: 16px;
}

.title {
  margin-bottom: 16px;
}

a {
  color: white;
  text-decoration: none;
}

li {
  margin-bottom: 8px;
}

a.router-link-active {
  font-weight: bold;
}
</style>
