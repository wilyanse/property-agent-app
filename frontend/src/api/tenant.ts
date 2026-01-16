// frontend/src/api/tenant.ts
import type { Tenant } from "../interface/interfaces";

const API = "http://localhost:3000/tenants";

export const getTenants = async (): Promise<Tenant[]> => {
    const res = await fetch(API);
    return res.json();
};

export const getTenantsByProperty = async (propertyId: string): Promise<Tenant[]> => {
    const res = await fetch(`${API}/property/${propertyId}`);
    return res.json();
};

export const upsertTenant = async (tenant: Partial<Tenant>): Promise<Tenant> => {
    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenant),
    });
    return res.json();
};

export const deleteTenant = async (id: string): Promise<void> => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
};
