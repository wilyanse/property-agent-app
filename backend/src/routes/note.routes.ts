// routes/note.routes.ts
import { Router } from "express";
import { createOrUpdateNote, getAllNotes, getNoteById, deleteNote, getNotesByAgent, getNotesByProperty } from "../services/note.service";

const router = Router();

// Get all notes
router.get("/", (_req, res) => {
    res.json(getAllNotes());
});

// Get note by id
router.get("/:id", (req, res) => {
    const note = getNoteById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
});

// Get notes by agent
router.get("/agent/:agentId", (req, res) => {
    const agentId = req.params.agentId;
    const result = getNotesByAgent(agentId);
    res.json(result);
});

// Get notes by property
router.get("/property/:propertyId", (req, res) => {
    const propertyId = req.params.propertyId;
    const result = getNotesByProperty(propertyId);
    res.json(result);
});

// Create or update note
router.post("/", (req, res) => {
    const note = createOrUpdateNote(req.body);
    res.json(note);
});

// Delete note
router.delete("/:id", (req, res) => {
    deleteNote(req.params.id);
    res.status(204).send();
});

export default router;