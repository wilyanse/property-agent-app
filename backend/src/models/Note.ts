// models/Note.ts
export interface Note {
    id: string;
    agentId: string;
    propertyId?: string; // optional
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
