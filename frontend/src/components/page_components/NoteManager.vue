<template>
    <div>
        <h2>Notes</h2>

        <form @submit.prevent="submitNote">
        <textarea v-model="form.content" placeholder="Content" required></textarea>
        <input v-model="form.agentId" placeholder="Agent ID" required />
        <input v-model="form.propertyId" placeholder="Property ID (optional)" />
        <button type="submit">Save</button>
        </form>

        <ul>
        <li v-for="note in notes" :key="note.id">
            {{ note.type }} - {{ note.content }} - Agent: {{ note.agentId }} Property: {{ note.propertyId || "-" }}
            <button @click="editNote(note)">Edit</button>
            <button @click="handleDelete(note.id)">Delete</button>
        </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Note } from "../../interface/interfaces";
import { getNotes, upsertNote, deleteNote } from "../../api/note";

const form = ref<Partial<Note>>({});
const notes = ref<Note[]>([]);
const loading = ref(false);

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
    if (!confirm("Are you sure?")) return;
    await deleteNote(id);
    await fetchNotes();
};

const editNote = (note: Note) => {
    form.value = { ...note };
};

onMounted(() => fetchNotes());
</script>

// bypass Vetur lint error
<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({});
</script>