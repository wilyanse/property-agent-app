<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <form @submit.prevent="handleSubmit">
        <div v-for="field in fields" :key="field.key" class="form-group">
          <label :for="field.key">{{ field.label }}</label>
          <input
            v-model="localData[field.key]"
            :id="field.key"
            :type="field.type || 'text'"
            :placeholder="field.label"
            required
          />
        </div>
        <div class="modal-actions">
          <button type="submit">Save</button>
          <button type="button" @click="closeModal">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, defineProps, defineEmits } from "vue";

interface Field {
  key: string;
  label: string;
  type?: string;
}

const props = defineProps<{
  title: string;
  fields: Field[];
  modelValue: Record<string, unknown>;
  visible: boolean;
  onSubmit: (data: Record<string, unknown>) => Promise<void> | void;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
}>();

const localData = reactive({ ...props.modelValue });

watch(
  () => props.modelValue,
  (newVal) => {
    Object.assign(localData, newVal);
  },
  { deep: true, immediate: true }
);

const handleSubmit = async () => {
  await props.onSubmit({ ...localData });
  closeModal();
};

const closeModal = () => {
  emit("update:visible", false);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 6px;
  width: 400px;
}
.form-group {
  margin-bottom: 10px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>
