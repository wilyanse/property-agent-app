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

        <ul>
        <li v-for="agent in agents" :key="agent.id">
            {{ agent.firstName }} {{ agent.lastName }} ({{ agent.email }})
            <button @click="editAgent(agent)">Edit</button>
            <button @click="handleDelete(agent.id)">Delete</button>
        </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Agent } from "../../interface/interfaces";
import { getAgents, upsertAgent, deleteAgent } from "../../api/agent";

// ----- State -----
const form = ref<Partial<Agent>>({});
const agents = ref<Agent[]>([]);
const loading = ref(false);

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
        alert("Agent saved successfully!");
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
    const confirmDelete = confirm("Are you sure you want to delete this agent?");
    if (!confirmDelete) return;

    try {
        loading.value = true;
        await deleteAgent(id);
        alert("Deleted successfully!");
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