<template>
  <div>
    <h2>Properties</h2>

    <form @submit.prevent="submitProperty">
      <input v-model="form.name" placeholder="Property Name" required />
      <input v-model="form.address" placeholder="Address" required />
      <input v-model="form.agentId" placeholder="Agent ID" required />
      <button type="submit">Save</button>
    </form>

    <ul>
      <li v-for="prop in properties" :key="prop.id">
        {{ prop.name }} - {{ prop.address }} - Agent: {{ prop.agentId }}
        <button @click="editProperty(prop)">Edit</button>
        <button @click="handleDelete(prop.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Property } from "../../interface/interfaces";
import { getProperties, upsertProperty, deleteProperty } from "../../api/property";

const form = ref<Partial<Property>>({});
const properties = ref<Property[]>([]);
const loading = ref(false);

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
    if (!confirm("Are you sure?")) return;
    await deleteProperty(id);
    await fetchProperties();
};

const editProperty = (prop: Property) => {
    form.value = { ...prop };
};

onMounted(() => fetchProperties());
</script>
