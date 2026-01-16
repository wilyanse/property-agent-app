// models/Tenant.ts
export interface Tenant {
    id: string;
    firstName: string;
    lastName: string;
    familyId: string; // group tenants by family
    propertyId: string; // belongs to a property
    createdAt: Date;
    updatedAt: Date;
}
