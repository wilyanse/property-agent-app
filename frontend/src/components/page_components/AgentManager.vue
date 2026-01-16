<template>
    <div>
        <h1>Property Agents</h1>
        <form @submit.prevent="submitAgent">
        <input v-model="form.firstName" placeholder="First Name" required />
        <input v-model="form.lastName" placeholder="Last Name" required />
        <input v-model="form.email" placeholder="Email" required />
        <input v-model="form.mobileNumber" placeholder="Mobile Number" required />
        <button type="submit">Save</button>
        </form>

        <BaseTable
            :data="agents"
            :columns="agentColumns"
            show-actions
            @edit="editAgent"
            @delete="handleDelete"
        />

        <EditModal
            :title="'Edit Agent'"
            :fields="agentColumns"
            v-model:visible="editModalVisible"
            :modelValue="form"
            :onSubmit="submitEditModal"
        />

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Agent } from "../../interface/interfaces";
import { getAgents, upsertAgent, deleteAgent } from "../../api/agent";

import BaseTable from "../base/BaseTable.vue";
import EditModal from "../base/EditModal.vue";

// ----- Table Columns -----
const agentColumns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "mobileNumber", label: "Mobile Number" },
];

// ----- State -----
const form = ref<Partial<Agent>>({});
const agents = ref<Agent[]>([]);
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

// ----- Fetch all agents -----
const fetchAgents = async () => {
    try {
        loading.value = true;
        agents.value = await getAgents();
    } catch (err: unknown) {
        alert(getErrorMessage(err));
    } finally {
        loading.value = false;
    }
};

// ----- Create / Update agent -----
const submitAgent = async () => {
    try {
        if (!form.value.firstName || !form.value.lastName) {
        alert("First Name and Last Name are required.");
        return;
        }

        loading.value = true;
        await upsertAgent(form.value);
        form.value = {};
        await fetchAgents(); // refresh list after save
    } catch (err: unknown) {
        alert(getErrorMessage(err));
    } finally {
        loading.value = false;
    }
};

// ----- Delete agent -----
const handleDelete = async (id: string) => {
    try {
        loading.value = true;
        await deleteAgent(id);
        await fetchAgents();
    } catch (err: unknown) {
        alert(getErrorMessage(err));
    } finally {
        loading.value = false;
    }
};

// ----- Edit agent -----
const editAgent = (agent: Agent) => {
    form.value = { ...agent };
    editModalVisible.value = true;
};

const submitEditModal = async (updatedData: Partial<Agent>) => {
  try {
    if (!updatedData.firstName || !updatedData.lastName) {
      return;
    }

    loading.value = true;
    await upsertAgent(updatedData);
    form.value = {}; // reset form
    editModalVisible.value = false; // close modal
    await fetchAgents(); // refresh table
  } catch (err: unknown) {
    alert(getErrorMessage(err));
  } finally {
    loading.value = false;
  }
};

// ----- On mount -----
onMounted(() => {
    fetchAgents();
});
</script>

// bypass Vetur lint error
<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({});
</script>