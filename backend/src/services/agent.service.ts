// services/agent.service.ts
import { PropertyAgent } from "../models/PropertyAgent";
import { randomUUID } from "crypto";

const agents = new Map<string, PropertyAgent>();

export const createOrUpdateAgent = (data: Partial<PropertyAgent>) => {

    // TODO: Add RBAC

    const now = new Date();

    // TODO: Add validation for required fields

    // TODO: Add unique mobile number constraint
    // TODO: Add unique email constraint

    if (data.id && agents.has(data.id)) {
    const existing = agents.get(data.id)!;
    const updated = { ...existing, ...data, updatedAt: now };
    agents.set(updated.id, updated);
    return updated;
    }

    // TODO: Add mobileNumber parsing

    const newAgent: PropertyAgent = {
    id: randomUUID(),
    firstName: data.firstName!,
    lastName: data.lastName!,
    email: data.email!,
    mobileNumber: data.mobileNumber!,
    createdAt: now,
    updatedAt: now,
    };

    agents.set(newAgent.id, newAgent);
    return newAgent;
    };

export const getAllAgents = () => [...agents.values()];

export const getAgentById = (id: string) => agents.get(id);

// TODO: Add RBAC
export const deleteAgent = (id: string) => agents.delete(id);
