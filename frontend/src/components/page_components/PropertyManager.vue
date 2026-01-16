<template>
    <div>
        <h2>Properties</h2>

        <form @submit.prevent="submitProperty">
        <input v-model="form.name" placeholder="Property Name" required />
        <input v-model="form.address" placeholder="Address" required />
        <input v-model="form.agentId" placeholder="Agent ID" required />
        <button type="submit">Save</button>
        </form>

        <BaseTable
            :data="properties"
            :columns="propertyColumns"
            show-actions
            @edit="editProperty"
            @delete="handleDelete"
        />

        <EditModal
            :title="'Edit Property'"
            :fields="propertyColumns"
            v-model:visible="editModalVisible"
            :modelValue="form"
            :onSubmit="submitEditModal"
        />
        
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Property } from "../../interface/interfaces";
import { getProperties, upsertProperty, deleteProperty } from "../../api/property";

import BaseTable from "../base/BaseTable.vue";
import EditModal from "../base/EditModal.vue";

const form = ref<Partial<Property>>({});
const properties = ref<Property[]>([]);
const loading = ref(false);
const editModalVisible = ref(false);

// ----- Utilities -----
const getErrorMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    try {
        return JSON.stringify(err);
    } catch {
        return String(err);
    }
};

// ----- Table Columns -----
const propertyColumns = [
    { key: "name", label: "Property Name" },
    { key: "address", label: "Address" },
    { key: "agentId", label: "Agent ID" },
];

const fetchProperties = async () => {
    loading.value = true;
    try {
        properties.value = await getProperties();
    } finally {
        loading.value = false;
    }
};

const submitProperty = async () => {
    if (!form.value.name || !form.value.address || !form.value.agentId) {
        alert("All fields are required");
        return;
    }
    loading.value = true;
    try {
        await upsertProperty(form.value);
        form.value = {};
        await fetchProperties();
    } finally {
        loading.value = false;
    }
};

const handleDelete = async (id: string) => {
    await deleteProperty(id);
    await fetchProperties();
};

const editProperty = (prop: Property) => {
    form.value = { ...prop };
    editModalVisible.value = true;
};

const submitEditModal = async (updatedData: Partial<Property>) => {
  try {
    loading.value = true;
    await upsertProperty(updatedData);
    form.value = {}; // reset form
    editModalVisible.value = false; // close modal
    await fetchProperties(); // refresh table
  } catch (err: unknown) {
    alert(getErrorMessage(err));
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchProperties());
</script>

// bypass Vetur lint error
<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({});
</script>