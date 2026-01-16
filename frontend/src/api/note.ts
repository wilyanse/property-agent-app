// frontend/src/api/note.ts
import type { Note } from "../interface/interfaces";

const API = "http://localhost:3000/notes";

export const getNotes = async (): Promise<Note[]> => {
    const res = await fetch(API);
    return res.json();
};

export const getNotesByAgent = async (agentId: string): Promise<Note[]> => {
    const res = await fetch(`${API}/agent/${agentId}`);
    return res.json();
};

export const getNotesByProperty = async (propertyId: string): Promise<Note[]> => {
    const res = await fetch(`${API}/property/${propertyId}`);
    return res.json();
};

export const upsertNote = async (note: Partial<Note>): Promise<Note> => {
    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return res.json();
};

export const deleteNote = async (id: string): Promise<void> => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
};
