// frontend/src/api/property.ts
import type { Property } from "../interface/interfaces";

const API = "http://localhost:3000/properties";

export const getProperties = async (): Promise<Property[]> => {
    const res = await fetch(API);
    return res.json();
};

export const getPropertiesByAgent = async (agentId: string): Promise<Property[]> => {
    const res = await fetch(`${API}/agent/${agentId}`);
    return res.json();
};

export const upsertProperty = async (property: Partial<Property>): Promise<Property> => {
    const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property),
    });
    return res.json();
};

export const deleteProperty = async (id: string): Promise<void> => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
};
