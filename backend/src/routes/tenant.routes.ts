// routes/tenant.routes.ts
import { Router } from "express";
import { createOrUpdateTenant, getAllTenants, getTenantById, deleteTenant, getTenantsByProperty, getTenantsByFamily } from "../services/tenant.service";

const router = Router();

// Get all tenants
router.get("/", (_req, res) => {
    res.json(getAllTenants());
});

// Get tenant by id
router.get("/:id", (req, res) => {
    const tenant = getTenantById(req.params.id);
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });
    res.json(tenant);
});

// Create or update tenant
router.post("/", (req, res) => {
    const tenant = createOrUpdateTenant(req.body);
    res.json(tenant);
});

// Delete tenant
router.delete("/:id", (req, res) => {
    deleteTenant(req.params.id);
    res.status(204).send();
});

// Get tenants by property ID
router.get("/property/:propertyId", (req, res) => {
    const propertyId = req.params.propertyId;
    const result = getTenantsByProperty(propertyId);
    if (result.length === 0) return res.status(404).json({ message: "Tenants not found" });
    res.json(result);
});

// Get tenants by family ID
router.get("/family/:familyId", (req, res) => {
    const familyId = req.params.familyId;
    const result = getTenantsByFamily(familyId);
    if (result.length === 0) return res.status(404).json({ message: "Tenants not found" });
    res.json(result);
});


export default router;