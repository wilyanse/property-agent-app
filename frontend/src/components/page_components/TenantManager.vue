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

        <ul>
        <li v-for="tenant in tenants" :key="tenant.id">
            {{ tenant.firstName }} {{ tenant.lastName }} - Property: {{ tenant.propertyId }}
            <button @click="editTenant(tenant)">Edit</button>
            <button @click="handleDelete(tenant.id)">Delete</button>
        </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Tenant } from "../../interface/interfaces";
import { getTenants, upsertTenant, deleteTenant } from "../../api/tenant";

const form = ref<Partial<Tenant>>({});
const tenants = ref<Tenant[]>([]);
const loading = ref(false);

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
    if (!confirm("Are you sure?")) return;
    await deleteTenant(id);
    await fetchTenants();
};

const editTenant = (tenant: Tenant) => {
    form.value = { ...tenant };
};

onMounted(() => fetchTenants());
</script>

// bypass Vetur lint error
<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({});
</script>