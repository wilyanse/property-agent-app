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
      <ul class="menu">
        <li
          class="menu-item"
          @click="activeView = 'agents'"
        >
          Agents
        </li>
        <li
          class="menu-item"
          @click="activeView = 'properties'"
        >
          Properties
        </li>
        <li
          class="menu-item"
          @click="activeView = 'tenants'"
        >
          Tenants
        </li>
        <li
          class="menu-item"
          @click="activeView = 'notes'"
        >
          Notes
        </li>
      </ul>
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
  padding: 0;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  width: 100%;
  padding: 12px 16px;
  cursor: pointer;
  box-sizing: border-box;
}

.menu-item:hover {
  background: #374151;
}

</style>
