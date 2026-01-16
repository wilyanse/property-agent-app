# Note API

API for managing notes. Provides endpoints to create, read, update, delete, and fetch notes by agent or property.

---

## Base URL

```

/notes

````

---

## Data Model

### Note

| Field       | Type   | Description                          |
|-------------|--------|--------------------------------------|
| id          | string | Unique identifier (UUID)             |
| agentId     | string | ID of the agent who created the note |
| propertyId  | string | ID of the property (optional)        |
| content     | string | Note content                         |
| createdAt   | Date   | Timestamp when note was created      |
| updatedAt   | Date   | Timestamp when note was last updated |

---

## Endpoints

### 1. Create or Update Note

**POST** `/notes`

Creates a new note or updates an existing one if `id` is provided.

**Request Body** (JSON):

```json
{
  "id": "optional-existing-id",
  "agentId": "agent-uuid",
  "propertyId": "optional-property-uuid",
  "content": "This is a note content."
}
````

**Response (200 OK)**:

```json
{
  "id": "generated-or-existing-id",
  "agentId": "agent-uuid",
  "propertyId": "optional-property-uuid",
  "content": "This is a note content.",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

---

### 2. Get All Notes

**GET** `/notes`

Returns a list of all notes.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "agentId": "agent-uuid",
    "propertyId": "property-uuid",
    "content": "Maintenance scheduled.",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  },
  {
    "id": "uuid-2",
    "agentId": "agent-uuid",
    "propertyId": "property-uuid-2",
    "content": "Pest control completed.",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

---

### 3. Get Note by ID

**GET** `/notes/:id`

Retrieve a single note by its ID.

**Response (200 OK)**:

```json
{
  "id": "uuid-1",
  "agentId": "agent-uuid",
  "propertyId": "property-uuid",
  "content": "Maintenance scheduled.",
  "createdAt": "2026-01-16T00:00:00.000Z",
  "updatedAt": "2026-01-16T00:00:00.000Z"
}
```

**Response (404 Not Found)**:

```json
{
  "message": "Note not found"
}
```

---

### 4. Delete Note

**DELETE** `/notes/:id`

Deletes a note by its ID.

**Response (204 No Content)**: Empty response on successful deletion.

**Response (404 Not Found)**:

```json
{
  "message": "Note not found"
}
```

---

### 5. Get Notes by Agent ID

**GET** `/notes/agent/:agentId`

Returns all notes created by a specific agent.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "agentId": "agent-uuid",
    "propertyId": "property-uuid",
    "content": "Maintenance scheduled.",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

---

### 6. Get Notes by Property ID

**GET** `/notes/property/:propertyId`

Returns all notes associated with a specific property.

**Response (200 OK)**:

```json
[
  {
    "id": "uuid-1",
    "agentId": "agent-uuid",
    "propertyId": "property-uuid",
    "content": "Maintenance scheduled.",
    "createdAt": "2026-01-16T00:00:00.000Z",
    "updatedAt": "2026-01-16T00:00:00.000Z"
  }
]
```

---

## Notes / TODOs

* Validate required fields in `createOrUpdateNote`.
* `propertyId` is optional.
* Consider adding RBAC for note creation, update, and deletion.