// models/Property.ts
export interface Property {
  id: string;
  name: string;
  address: string;
  agentId: string;
  createdAt: Date;
  updatedAt: Date;
}
