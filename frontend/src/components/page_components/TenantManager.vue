<template>
    <div>
        <h2>Tenants</h2>

        <form @submit.prevent="submitTenant">
        <input v-model="form.firstName" placeholder="First Name" required />
        <input v-model="form.lastName" placeholder="Last Name" required />
        <input v-model="form.propertyId" placeholder="Property ID" required />
        <input v-model="form.familyId" placeholder="Family ID (optional)" />
        <button type="submit">Save</button>
        </form>

        <BaseTable
            :data="tenants"
            :columns="tenantColumns"
            show-actions
            @edit="editTenant"
            @delete="handleDelete"
        />

        <EditModal
            :title="'Edit Tenant'"
            :fields="tenantColumns"
            v-model:visible="editModalVisible"
            :modelValue="form"
            :onSubmit="submitEditModal"
        />

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Tenant } from "../../interface/interfaces";
import { getTenants, upsertTenant, deleteTenant } from "../../api/tenant";

import BaseTable from "../base/BaseTable.vue";
import EditModal from "../base/EditModal.vue";


// ----- Table Columns -----
const tenantColumns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "propertyId", label: "Property ID" },
    { key: "familyId", label: "Family ID" },
];

const form = ref<Partial<Tenant>>({});
const tenants = ref<Tenant[]>([]);
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

const fetchTenants = async () => {
    loading.value = true;
    try {
        tenants.value = await getTenants();
    } finally {
        loading.value = false;
    }
};

const submitTenant = async () => {
    if (!form.value.firstName || !form.value.lastName || !form.value.propertyId) {
        alert("First Name, Last Name, and Property ID are required");
        return;
    }
    loading.value = true;
    try {
        await upsertTenant(form.value);
        form.value = {};
        await fetchTenants();
    } finally {
        loading.value = false;
    }
};

const handleDelete = async (id: string) => {
    await deleteTenant(id);
    await fetchTenants();
};

const editTenant = (tenant: Tenant) => {
    form.value = { ...tenant };
    editModalVisible.value = true;
};

const submitEditModal = async (updatedData: Partial<Tenant>) => {
  try {
    loading.value = true;
    await upsertTenant(updatedData);
    form.value = {}; // reset form
    editModalVisible.value = false; // close modal
    await fetchTenants(); // refresh table
  } catch (err: unknown) {
    alert(getErrorMessage(err));
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchTenants());
</script>

// bypass Vetur lint error
<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({});
</script>