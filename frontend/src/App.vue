<script setup lang="ts"></script>

<template>
  <div id="app">
    <AgentManager />
    <PropertyManager />
    <TenantManager />
  </div>
</template>

<script setup lang="ts">
  import AgentManager from "./components/page_components/AgentManager.vue";
  import PropertyManager from "./components/page_components/PropertyManager.vue";
  import TenantManager from "./components/page_components/TenantManager.vue";
</script>

<style scoped></style>
