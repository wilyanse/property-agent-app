<template>
    <div class="page">
        <header class="page-header">
        <h2>Property Agents</h2>
        </header>

        <section class="card">
        <form class="agent-form" @submit.prevent="submitAgent">
            <input
            v-model="form.firstName"
            placeholder="First Name"
            required
            />
            <input
            v-model="form.lastName"
            placeholder="Last Name"
            required
            />
            <input
            v-model="form.email"
            placeholder="Email"
            required
            />
            <input
            v-model="form.mobileNumber"
            placeholder="Mobile Number"
            required
            />

            <button type="submit" class="primary-btn">
            Save Agent
            </button>
        </form>
        </section>

        <section class="table-section">
        <BaseTable
            :data="agents"
            :columns="agentColumns"
            show-actions
            @edit="editAgent"
            @delete="handleDelete"
            @row-click="viewAgent"
        />
        </section>

        <EditModal
        title="Edit Agent"
        :fields="agentColumns"
        v-model:visible="editModalVisible"
        :modelValue="form"
        :onSubmit="submitEditModal"
        />

        <ViewModal
        title="Agent Details"
        v-model:visible="viewModalVisible"
        :loading="viewLoading"
        :fields="agentColumns"
        :data="selectedAgent"
        />
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Agent } from "../../interface/interfaces";
import { getAgents, upsertAgent, deleteAgent, getAgentById } from "../../api/agent";

import BaseTable from "../base/BaseTable.vue";
import EditModal from "../base/EditModal.vue";
import ViewModal from "../base/ViewModal.vue";

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
const viewModalVisible = ref(false)
const viewLoading = ref(false)
const selectedAgent = ref<Agent | null>(null)


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

const viewAgent = async (agent: Agent) => {
    try {
        viewModalVisible.value = true
        viewLoading.value = true

        // Fetch full details
        selectedAgent.value = await getAgentById(agent.id)
    } catch (err) {
        alert(getErrorMessage(err))
        viewModalVisible.value = false
    } finally {
        viewLoading.value = false
    }
}


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

    /* Card container */
    .card {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 28px;
    }

    /* Form layout */
    .agent-form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
    }

    .agent-form input {
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    background: #ffffff;
    }

    .agent-form input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb33;
    }

    /* Primary action button */
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