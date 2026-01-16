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
            <button type="submit" class="action-btn save-btn">Save</button>
            <button type="button" class="action-btn cancel-btn" @click="closeModal">Cancel</button>
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
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    }

    .modal-content {
    background: #f3f4f6; /* soft gray */
    padding: 24px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    h2 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    }

    .form-group {
    display: flex;
    margin-bottom: 12px;
    align-items: center;
    }

    .form-group label {
    flex: 0 0 100px;
    text-align: right;
    margin-right: 12px;
    font-weight: 500;
    color: #374151;
    }

    .form-group input {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    outline: none;
    transition: border 0.2s;
    }

    .form-group input:focus {
    border-color: #2563eb;
    }

    .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 16px;
    }

    .action-btn {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    }

    .save-btn {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
    }

    .save-btn:hover {
    background: #1d4ed8;
    border-color: #1d4ed8;
    }

    .cancel-btn {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
    }

    .cancel-btn:hover {
    background: #dc2626;
    border-color: #dc2626;
    }
</style>
