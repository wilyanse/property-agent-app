<template>
    <div v-if="visible" class="modal-overlay">
        <div class="modal-content">
        <h2>{{ title }}</h2>

        <div v-if="loading" class="loading">Loading...</div>

        <div v-else>
            <div v-for="field in fields" :key="field.key" class="row">
            <span class="field-label">{{ field.label }}:</span>
            <span class="field-value">{{ data?.[field.key] ?? "-" }}</span>
            </div>
        </div>

        <div class="modal-actions">
            <button class="action-btn close-btn" @click="close">Close</button>
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
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    }

    .modal-content {
    background: #f3f4f6; /* light gray instead of pure white */
    padding: 24px;
    width: 90%;
    max-width: 450px;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }

    h2 {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    }

    .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 14px;
    color: #374151;
    }

    .field-label {
    flex: 0 0 120px;
    text-align: right;
    font-weight: 500;
    margin-right: 12px;
    }

    .field-value {
    flex: 1;
    text-align: left;
    color: #111827;
    }

    .loading {
    text-align: center;
    font-style: italic;
    color: #6b7280;
    }

    .modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
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

    .close-btn {
    background: #ef4444;
    color: white;
    border-color: #ef4444;
    }

    .close-btn:hover {
    background: #dc2626;
    border-color: #dc2626;
    }
</style>
