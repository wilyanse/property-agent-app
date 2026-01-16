// services/agent.service.ts
import { PropertyAgent } from "../models/PropertyAgent";
import { randomUUID } from "crypto";

const agents = new Map<string, PropertyAgent>();

export const createOrUpdateAgent = (data: Partial<PropertyAgent>) => {
  const now = new Date();

  if (data.id && agents.has(data.id)) {
    const existing = agents.get(data.id)!;
    const updated = { ...existing, ...data, updatedAt: now };
    agents.set(updated.id, updated);
    return updated;
  }

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

export const deleteAgent = (id: string) => agents.delete(id);
