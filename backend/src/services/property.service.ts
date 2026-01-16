// services/property.service.ts
import { Property } from "../models/Property";
import { randomUUID } from "crypto";

const properties = new Map<string, Property>();

export const createOrUpdateProperty = (data: Partial<Property>) => {
    const now = new Date();

    if (data.id && properties.has(data.id)) {
        const existing = properties.get(data.id)!;
        const updated = { ...existing, ...data, updatedAt: now };
        properties.set(updated.id, updated);
        return updated;
    }

    const newProperty: Property = {
        id: randomUUID(),
        name: data.name!,
        address: data.address!,
        agentId: data.agentId!,
        createdAt: now,
        updatedAt: now,
    };

    properties.set(newProperty.id, newProperty);
    return newProperty;
};

export const getAllProperties = () => [...properties.values()];

export const getPropertyById = (id: string) => properties.get(id);

export const deleteProperty = (id: string) => properties.delete(id);

export const getPropertiesByAgent = (agentId: string) => {
    return [...properties.values()].filter(p => p.agentId === agentId);
};
