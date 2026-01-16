// services/note.service.ts
import { Note } from "../models/Note";
import { randomUUID } from "crypto";

const notes = new Map<string, Note>();

export const createOrUpdateNote = (data: Partial<Note>) => {
    const now = new Date();

    if (data.id && notes.has(data.id)) {
        const existing = notes.get(data.id)!;
        const updated = { ...existing, ...data, updatedAt: now };
        notes.set(updated.id, updated);
        return updated;
    }

    const newNote: Note = {
        id: randomUUID(),
        agentId: data.agentId!,
        propertyId: data.propertyId,
        content: data.content || "",
        createdAt: now,
        updatedAt: now,
    };

    notes.set(newNote.id, newNote);
    return newNote;
};

export const getAllNotes = () => [...notes.values()];

export const getNoteById = (id: string) => notes.get(id);

export const deleteNote = (id: string) => notes.delete(id);

// Get notes by agent
export const getNotesByAgent = (agentId: string) => {
    return [...notes.values()].filter(n => n.agentId === agentId);
};

// Get notes by property
export const getNotesByProperty = (propertyId: string) => {
    return [...notes.values()].filter(n => n.propertyId === propertyId);
};
