// frontend/src/api/agent.ts
import type { Agent } from "../interface/interfaces";

const API_URL = "http://localhost:3000/agents";

/**
 * Fetch all agents
 */
export const getAgents = async (): Promise<Agent[]> => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch agents");
  return res.json();
};

/**
 * Create or update agent
 */
export const upsertAgent = async (agent: Partial<Agent>): Promise<Agent> => {
  const res = await fetch(API_URL, {
    method: "POST", // in your backend, POST works as upsert
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(agent),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to save agent");
  }

  return res.json();
};

/**
 * Delete agent by ID
 */
export const deleteAgent = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete agent");
  }
};

/**
 * Get agent by ID
 */
export const getAgentById = async (id: string): Promise<Agent> => {
  const res = await fetch(`${API_URL}/${id}`)
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to delete agent");
  }
  return res.json();
};
