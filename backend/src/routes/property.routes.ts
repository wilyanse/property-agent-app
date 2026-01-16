// routes/property.routes.ts
import { Router } from "express";
import { createOrUpdateProperty, getAllProperties, getPropertyById, deleteProperty, getPropertiesByAgent } from "../services/property.service";

const router = Router();

// Get all properties
router.get("/", (_req, res) => {
    res.json(getAllProperties());
});

// Get property by id
router.get("/:id", (req, res) => {
    const property = getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
});

// Create or update property
router.post("/", (req, res) => {
    const property = createOrUpdateProperty(req.body);
    res.json(property);
});

// Delete property
router.delete("/:id", (req, res) => {
    deleteProperty(req.params.id);
    res.status(204).send();
});

// Get properties by agent ID
router.get("/agent/:agentId", (req, res) => {
    const agentId = req.params.agentId;
    const result = getPropertiesByAgent(agentId);
    res.json(result);
});


export default router;