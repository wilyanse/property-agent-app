<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>

      <div v-if="loading">Loading...</div>

      <div v-else>
        <div v-for="field in fields" :key="field.key" class="row">
          <strong>{{ field.label }}:</strong>
          <span>{{ data?.[field.key] ?? "-" }}</span>
        </div>
      </div>

      <div class="modal-actions">
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Field {
  key: string
  label: string
}

defineProps<{
  title: string
  visible: boolean
  loading: boolean
  fields: Field[]
  data: Record<string, unknown> | null
}>()

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void
}>()

const close = () => emit("update:visible", false)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  width: 450px;
  border-radius: 6px;
}
.row {
  margin-bottom: 8px;
}
.modal-actions {
  margin-top: 15px;
  text-align: right;
}
</style>
