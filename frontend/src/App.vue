<script setup lang="ts">
import { ref } from "vue"

import AgentManager from "./components/page_components/AgentManager.vue"
import PropertyManager from "./components/page_components/PropertyManager.vue"
import TenantManager from "./components/page_components/TenantManager.vue"
import NoteManager from "./components/page_components/NoteManager.vue"

type View = "agents" | "properties" | "tenants" | "notes"

const activeView = ref<View>("agents")
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
        <h3 @click="activeView = 'agents'">Agents</h3>
        <h3 @click="activeView = 'properties'">Properties</h3>
        <h3 @click="activeView = 'tenants'">Tenants</h3>
        <h3 @click="activeView = 'notes'">Notes</h3>
    </aside>

    <main class="content">
      <AgentManager v-if="activeView === 'agents'" />
      <PropertyManager v-if="activeView === 'properties'" />
      <TenantManager v-if="activeView === 'tenants'" />
      <NoteManager v-if="activeView === 'notes'" />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 220px;
  background: #1f2937;
  color: white;
  padding: 16px;
}

.sidebar li {
  cursor: pointer;
  padding: 8px;
  margin-bottom: 4px;
}

.sidebar li:hover {
  background: #374151;
}

.content {
  flex: 1;
  padding: 16px;
}
</style>
