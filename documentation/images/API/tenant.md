# Tenant API

API for managing tenants. Provides endpoints to create, read, update, delete, and fetch tenants by property or family.

---

## Base URL

```

/tenants

````

---

## Data Model

### Tenant

| Field      | Type   | Description                          |
|------------|--------|--------------------------------------|
| id         | string | Unique identifier (UUID)             |
| firstName  | string | Tenant's first name                  |
| lastName   | string | Tenant's last name                   |
| familyId   | string | ID of the tenant's family group      |
| propertyId | string | ID of the property the tenant belongs to |
| createdAt  | Date   | Timestamp when tenant was created    |
| updatedAt  | Date   | Timestamp when tenant was last updated |

---

## Endpoints

### 1. Create or Update Tenant

**POST** `/tenants`

Creates a new tenant or updates an existing one if `id` is provided.

**Request Body** (JSON):

```json
{
  "id": "optional-existing-id",
  "firstName": "Alice",
  "lastName": "Johnson",
  "familyId": "optional-family-id",
  "propertyId": "property-uuid"
}
````

**Response (200 OK)**:

```json
{
  "id": "generated-or-existing-id",
  "firstName": "Alice",
  "lastName": "Johnson",
  "familyId": "family-uuid",
  "propertyId": "property-uuid",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

---

### 2. Get All Tenants

**GET** `/tenants`

Returns a list of all tenants.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "firstName": "Alice",
    "lastName": "Johnson",
    "familyId": "family-uuid",
    "propertyId": "property-uuid",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  },
  {
    "id": "uuid-2",
    "firstName": "Bob",
    "lastName": "Smith",
    "familyId": "family-uuid-2",
    "propertyId": "property-uuid-2",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

---

### 3. Get Tenant by ID

**GET** `/tenants/:id`

Retrieve a single tenant by its ID.

**Response (200 OK)**:

```json
{
  "id": "uuid-1",
  "firstName": "Alice",
  "lastName": "Johnson",
  "familyId": "family-uuid",
  "propertyId": "property-uuid",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

**Response (404 Not Found)**:

```json
{
  "message": "Tenant not found"
}
```

---

### 4. Delete Tenant

**DELETE** `/tenants/:id`

Deletes a tenant by its ID.

**Response (204 No Content)**: Empty response on successful deletion.

**Response (404 Not Found)**:

```json
{
  "message": "Tenant not found"
}
```

---

### 5. Get Tenants by Property ID

**GET** `/tenants/property/:propertyId`

Returns all tenants that belong to a specific property.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "firstName": "Alice",
    "lastName": "Johnson",
    "familyId": "family-uuid",
    "propertyId": "property-uuid",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

**Response (404 Not Found)**:

```json
{
  "message": "Tenants not found"
}
```

---

### 6. Get Tenants by Family ID

**GET** `/tenants/family/:familyId`

Returns all tenants that belong to a specific family.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "firstName": "Alice",
    "lastName": "Johnson",
    "familyId": "family-uuid",
    "propertyId": "property-uuid",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

**Response (404 Not Found)**:

```json
{
  "message": "Tenants not found"
}
```

---

## Notes / TODOs

* Validate required fields in `createOrUpdateTenant`.
* Ensure `propertyId` refers to an existing property.
* `familyId` is auto-generated if not provided.