<script setup lang="ts"></script>

<template>
  <div id="app">
    <AgentManager />
    <PropertyManager />
    <TenantManager />
    <NoteManager />
  </div>
</template>

<script setup lang="ts">
  import AgentManager from "./components/page_components/AgentManager.vue";
  import PropertyManager from "./components/page_components/PropertyManager.vue";
  import TenantManager from "./components/page_components/TenantManager.vue";
  import NoteManager from "./components/page_components/NoteManager.vue";
</script>

<style scoped></style>
