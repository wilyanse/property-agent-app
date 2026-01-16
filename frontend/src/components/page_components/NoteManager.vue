<template>
    <div>
        <h2>Notes</h2>

        <form @submit.prevent="submitNote">
        <textarea v-model="form.content" placeholder="Content" required></textarea>
        <input v-model="form.agentId" placeholder="Agent ID" required />
        <input v-model="form.propertyId" placeholder="Property ID (optional)" />
        <button type="submit">Save</button>
        </form>

        <BaseTable
            :data="notes"
            :columns="noteColumns"
            show-actions
            @edit="editNote"
            @delete="handleDelete"
        />

        <EditModal
            :title="'Edit Note'"
            :fields="noteColumns"
            v-model:visible="editModalVisible"
            :modelValue="form"
            :onSubmit="submitEditModal"
        />
        
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Note } from "../../interface/interfaces";
import { getNotes, upsertNote, deleteNote } from "../../api/note";

import BaseTable from "../base/BaseTable.vue";
import EditModal from "../base/EditModal.vue";

// ----- Table Columns -----
const noteColumns = [
    { key: "content", label: "Content" },
    { key: "agentId", label: "Agent ID" },
    { key: "propertyId", label: "Property ID" },
];


const form = ref<Partial<Note>>({});
const notes = ref<Note[]>([]);
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

const fetchNotes = async () => {
    loading.value = true;
    try {
        notes.value = await getNotes();
    } finally {
        loading.value = false;
    }
};

const submitNote = async () => {
    if (!form.value.content || !form.value.agentId) {
        alert("Content and Agent ID are required");
        return;
    }
    loading.value = true;
    try {
        await upsertNote(form.value);
        form.value = {};
        await fetchNotes();
    } finally {
        loading.value = false;
    }
};

const handleDelete = async (id: string) => {
    await deleteNote(id);
    await fetchNotes();
};

const editNote = (note: Note) => {
    form.value = { ...note };
    editModalVisible.value = true;
};

const submitEditModal = async (updatedData: Partial<Note>) => {
  try {
    loading.value = true;
    await upsertNote(updatedData);
    form.value = {}; // reset form
    editModalVisible.value = false; // close modal
    await fetchNotes(); // refresh table
  } catch (err: unknown) {
    alert(getErrorMessage(err));
  } finally {
    loading.value = false;
  }
};

onMounted(() => fetchNotes());
</script>

// bypass Vetur lint error
<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({});
</script>