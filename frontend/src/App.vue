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
      <div class="sidebar-header">
        Property Management App
      </div>

      <ul class="menu">
        <li
          class="menu-item"
          :class="{ active: activeView === 'agents' }"
          @click="activeView = 'agents'"
        >
          Agents
        </li>

        <li
          class="menu-item"
          :class="{ active: activeView === 'properties' }"
          @click="activeView = 'properties'"
        >
          Properties
        </li>

        <li
          class="menu-item"
          :class="{ active: activeView === 'tenants' }"
          @click="activeView = 'tenants'"
        >
          Tenants
        </li>

        <li
          class="menu-item"
          :class="{ active: activeView === 'notes' }"
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
/* Layout */
.layout {
  display: flex;
  min-height: 100vh;
  background: #f9fafb;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
}

/* Header */
.sidebar-header {
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
}

/* Menu */
.menu {
  list-style: none;
  padding: 8px 0;
  margin: 0;
}

/* Menu items */
.menu-item {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background 0.15s ease, color 0.15s ease;
}

/* Hover */
.menu-item:hover {
  background: #f3f4f6;
}

/* Active */
.menu-item.active {
  background: #e5e7eb;
  color: #111827;
  font-weight: 500;
}

</style>
