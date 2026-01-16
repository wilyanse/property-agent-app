<template>
    <div class="page">
        <header class="page-header">
        <h2>Notes</h2>
        </header>

        <section class="card">
        <form class="note-form" @submit.prevent="submitNote">
            <textarea
            v-model="form.content"
            placeholder="Content"
            required
            ></textarea>
            <input
            v-model="form.agentId"
            placeholder="Agent ID"
            required
            />
            <input
            v-model="form.propertyId"
            placeholder="Property ID (optional)"
            />
            <button type="submit" class="primary-btn">Save Note</button>
        </form>
        </section>

        <section class="table-section">
        <BaseTable
            :data="notes"
            :columns="noteColumns"
            show-actions
            @edit="editNote"
            @delete="handleDelete"
            @row-click="viewNote"
        />
        </section>

        <EditModal
        title="Edit Note"
        :fields="noteColumns"
        v-model:visible="editModalVisible"
        :modelValue="form"
        :onSubmit="submitEditModal"
        />

        <ViewModal
        title="Note Details"
        v-model:visible="viewModalVisible"
        :loading="viewLoading"
        :fields="noteColumns"
        :data="selectedNote"
        />
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Note } from "../../interface/interfaces";
import { getNotes, upsertNote, deleteNote, getNoteById } from "../../api/note";

import BaseTable from "../base/BaseTable.vue";
import EditModal from "../base/EditModal.vue";
import ViewModal from "../base/ViewModal.vue";

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
const viewModalVisible = ref(false)
const viewLoading = ref(false)
const selectedNote = ref<Note | null>(null)


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


const viewNote = async (note: Note) => {
  try {
    viewModalVisible.value = true
    viewLoading.value = true

    // Fetch full details
    selectedNote.value = await getNoteById(note.id)
  } catch (err) {
    alert(getErrorMessage(err))
    viewModalVisible.value = false
  } finally {
    viewLoading.value = false
  }
}


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
    .note-form {
    display: grid;
    grid-template-columns: 1fr 1fr; /* two columns for inputs, textarea spans 2 */
    gap: 14px;
    }

    .note-form textarea {
    grid-column: span 2;
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    resize: vertical;
    min-height: 60px;
    }

    .note-form textarea:focus,
    .note-form input:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb33;
    }

    .note-form input {
    padding: 10px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: 1px solid #d1d5db;
    background: #ffffff;
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