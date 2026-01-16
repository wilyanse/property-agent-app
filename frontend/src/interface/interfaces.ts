export interface Agent {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface Property {
    id: string;
    name: string;
    address: string;
    agentId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Tenant {
    id: string;
    firstName: string;
    lastName: string;
    familyId: string;
    propertyId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Note {
    id: string;
    agentId: string;
    propertyId?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}