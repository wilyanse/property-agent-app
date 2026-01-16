// services/tenant.service.ts
import { Tenant } from "../models/Tenant";
import { randomUUID } from "crypto";

const tenants = new Map<string, Tenant>();

export const createOrUpdateTenant = (data: Partial<Tenant>) => {
    const now = new Date();

    if (data.id && tenants.has(data.id)) {
        const existing = tenants.get(data.id)!;
        const updated = { ...existing, ...data, updatedAt: now };
        tenants.set(updated.id, updated);
        return updated;
    }

    const newTenant: Tenant = {
        id: randomUUID(),
        firstName: data.firstName!,
        lastName: data.lastName!,
        familyId: data.familyId || randomUUID(),
        propertyId: data.propertyId!,
        createdAt: now,
        updatedAt: now,
    };

    tenants.set(newTenant.id, newTenant);
    return newTenant;
};

export const getAllTenants = () => [...tenants.values()];

export const getTenantById = (id: string) => tenants.get(id);

export const deleteTenant = (id: string) => tenants.delete(id);

export const getTenantsByProperty = (propertyId: string) => {
    return [...tenants.values()].filter(t => t.propertyId === propertyId);
};

export const getTenantsByFamily = (familyId: string) => {
    return [...tenants.values()].filter(t => t.familyId === familyId);
}