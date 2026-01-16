# Property API

API for managing properties. Provides endpoints to create, read, update, delete, and fetch properties by agent.

---

## Base URL

```

/properties

````

---

## Data Model

### Property

| Field     | Type   | Description                     |
|-----------|--------|---------------------------------|
| id        | string | Unique identifier (UUID)        |
| name      | string | Property name                   |
| address   | string | Property address                |
| agentId   | string | ID of the agent managing it     |
| createdAt | Date   | Timestamp when property was created |
| updatedAt | Date   | Timestamp when property was last updated |

---

## Endpoints

### 1. Create or Update Property

**POST** `/properties`

Creates a new property or updates an existing one if `id` is provided.

**Request Body** (JSON):

```json
{
  "id": "optional-existing-id",
  "name": "Sunset Villas",
  "address": "123 Main Street, City",
  "agentId": "agent-uuid"
}
````

**Response (200 OK)**:

```json
{
  "id": "generated-or-existing-id",
  "name": "Sunset Villas",
  "address": "123 Main Street, City",
  "agentId": "agent-uuid",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

---

### 2. Get All Properties

**GET** `/properties`

Returns a list of all properties.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "name": "Sunset Villas",
    "address": "123 Main Street, City",
    "agentId": "agent-uuid",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  },
  {
    "id": "uuid-2",
    "name": "Oceanview Apartments",
    "address": "456 Beach Road, City",
    "agentId": "agent-uuid-2",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

---

### 3. Get Property by ID

**GET** `/properties/:id`

Retrieve a single property by its ID.

**Response (200 OK)**:

```json
{
  "id": "uuid-1",
  "name": "Sunset Villas",
  "address": "123 Main Street, City",
  "agentId": "agent-uuid",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

**Response (404 Not Found)**:

```json
{
  "message": "Property not found"
}
```

---

### 4. Delete Property

**DELETE** `/properties/:id`

Deletes a property by its ID.

**Response (204 No Content)**: Empty response on successful deletion.

---

### 5. Get Properties by Agent ID

**GET** `/properties/agent/:agentId`

Returns all properties managed by a specific agent.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "name": "Sunset Villas",
    "address": "123 Main Street, City",
    "agentId": "agent-uuid",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  },
  {
    "id": "uuid-3",
    "name": "Mountainview Condos",
    "address": "789 Hill Street, City",
    "agentId": "agent-uuid",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

---

## Notes / TODOs

* Add RBAC (role-based access control) for sensitive operations.
* Validate required fields in `createOrUpdateProperty`.
* Ensure `agentId` refers to an existing `PropertyAgent`.