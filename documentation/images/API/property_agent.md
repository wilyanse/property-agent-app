# Property Agent API

API for managing property agents. Provides endpoints to create, read, update, and delete agents.

---

## Base URL

```

/agents

````

---

## Data Model

### PropertyAgent

| Field        | Type   | Description                  |
|--------------|--------|------------------------------|
| id           | string | Unique identifier (UUID)      |
| firstName    | string | Agent's first name            |
| lastName     | string | Agent's last name             |
| email        | string | Agent's email (unique)        |
| mobileNumber | string | Agent's mobile number (unique)|
| createdAt    | Date   | Timestamp when agent was created |
| updatedAt    | Date   | Timestamp when agent was last updated |

---

## Endpoints

### 1. Create or Update Agent

**POST** `/agents`

Creates a new agent or updates an existing one if `id` is provided.

**Request Body** (JSON):

```json
{
  "id": "optional-existing-id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "+1234567890"
}
````

**Response (201 Created)**:

```json
{
  "id": "generated-or-existing-id",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "+1234567890",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

---

### 2. Get All Agents

**GET** `/agents`

Returns a list of all agents.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "mobileNumber": "+1234567890",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  },
  {
    "id": "uuid-2",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "mobileNumber": "+1987654321",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

---

### 3. Get Agent by ID

**GET** `/agents/:id`

Retrieve a single agent by its ID.

**Response (200 OK)**:

```json
{
  "id": "uuid-1",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "+1234567890",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

**Response (404 Not Found)**:

```json
{
  "message": "Not found"
}
```

---

### 4. Delete Agent

**DELETE** `/agents/:id`

Deletes an agent by its ID.

**Response (204 No Content)**: Empty response on successful deletion.

**Response (404 Not Found)**:

```json
{
  "message": "Not found"
}
```

---

## Notes / TODOs

* Add RBAC (role-based access control) for sensitive operations.
* Validate required fields in `createOrUpdateAgent`.
* Enforce unique constraints for `email` and `mobileNumber`.
* Consider mobile number formatting/parsing.
