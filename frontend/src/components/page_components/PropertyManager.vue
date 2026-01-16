<template>
    <div class="page">
        <header class="page-header">
        <h2>Properties</h2>
        </header>

        <section class="card">
        <form class="property-form" @submit.prevent="submitProperty">
            <input
            v-model="form.name"
            placeholder="Property Name"
            required
            />
            <input
            v-model="form.address"
            placeholder="Address"
            required
            />
            <input
            v-model="form.agentId"
            placeholder="Agent ID"
            required
            />
            <button type="submit" class="primary-btn">Save Property</button>
        </form>
        </section>

        <section class="table-section">
        <BaseTable
            :data="properties"
            :columns="propertyColumns"
            show-actions
            @edit="editProperty"
            @delete="handleDelete"
            @row-click="viewProperty"
        />
        </section>

        <EditModal
        title="Edit Property"
        :fields="propertyColumns"
        v-model:visible="editModalVisible"
        :modelValue="form"
        :onSubmit="submitEditModal"
        />

        <ViewModal
        title="Property Details"
        v-model:visible="viewModalVisible"
        :loading="viewLoading"
        :fields="propertyColumns"
        :data="selectedProperty"
        />
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Property } from "../../interface/interfaces";
import { getProperties, upsertProperty, deleteProperty, getPropertyById } from "../../api/property";

import BaseTable from "../base/BaseTable.vue";
import EditModal from "../base/EditModal.vue";
import ViewModal from "../base/ViewModal.vue";

const form = ref<Partial<Property>>({});
const properties = ref<Property[]>([]);
const loading = ref(false);
const editModalVisible = ref(false);
const viewModalVisible = ref(false)
const viewLoading = ref(false)
const selectedProperty = ref<Property | null>(null)

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

const viewProperty = async (property: Property) => {
  try {
    viewModalVisible.value = true
    viewLoading.value = true

    // Fetch full details
    selectedProperty.value = await getPropertyById(property.id)
  } catch (err) {
    alert(getErrorMessage(err))
    viewModalVisible.value = false
  } finally {
    viewLoading.value = false
  }
}

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

<style scoped>
    /* Page wrapper */
    .page {
    margin: 0 auto;
    padding: 24px;
    background: #e6e6e6; /* soft light gray */
    min-height: 100vh;
    }

    /* Header */
    .page-header {
    margin-bottom: 20px;
    }

    .page-header h2 {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    }

    /* Card form */
    .card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 28px;
    }

    /* Form layout */
    .property-form {
    display: grid;
    grid-template-columns: 1fr 1fr; /* two columns for inputs */
    gap: 14px;
    }

    .property-form input {
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    background: #ffffff;
    }

    .property-form input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb33;
    }

    /* Primary button */
    .primary-btn {
    grid-column: span 2;
    margin-top: 6px;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 6px;
    border: none;
    background: #2563eb;
    color: #ffffff;
    cursor: pointer;
    }

    .primary-btn:hover {
    background: #1d4ed8;
    }

    /* Table section spacing */
    .table-section {
    margin-top: 12px;
    }

</style>