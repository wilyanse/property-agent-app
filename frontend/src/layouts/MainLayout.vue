<template>
  <div class="layout">
    <aside class="sidebar">
      <Sidebar />
    </aside>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/base/Sidebar.vue"
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background: #1f2937;
  color: white;
}

.content {
  flex: 1;
  padding: 16px;
}
</style>
