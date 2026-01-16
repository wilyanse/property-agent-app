# Property Agent Fullstack Application

This repository contains a fullstack application built as part of a take-home coding test. The app manages property agents, their rental properties, tenants, and related notes/reminders. It demonstrates a Typescript-based Node.js backend and a Vue 3 frontend with reusable components.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Data Model](#data-model)
- [Backend](#backend)
- [Frontend](#frontend)
- [Features](#features)
- [Running the App](#running-the-app)
- [Stretch Goals / Improvements](#stretch-goals--improvements)

---

## Project Overview

The application allows:

- CRUD operations for Property Agents.
- Viewing Properties handled by each Agent.
- Viewing Tenants per Property.
- Creating and viewing Notes for Agents and Properties.
- Interactive table and modals for viewing and editing data.
- Reusable components for tables and modals to reduce repetition.

---

## Data Model

The application uses an **in-memory relational model** with the following entities:

### **PropertyAgent**
- `id`: string (UUID)
- `firstName`: string
- `lastName`: string
- `email`: string
- `mobileNumber`: string
- `createdAt`: Date
- `updatedAt`: Date
- Relations:
  - `properties`: array of Properties
  - `notes`: array of Notes

### **Property**
- `id`: string (UUID)
- `agentId`: string (FK to PropertyAgent)
- `address`: string
- `createdAt`: Date
- `updatedAt`: Date
- Relations:
  - `tenants`: array of Tenants
  - `notes`: array of Notes

### **Tenant**
- `id`: string (UUID)
- `propertyId`: string (FK to Property)
- `familyId`: string
- `name`: string
- `createdAt`: Date
- `updatedAt`: Date

### **Note**
- `id`: string (UUID)
- `agentId`: string (FK to PropertyAgent)
- `propertyId?`: string (optional FK to Property)
- `content`: string
- `createdAt`: Date
- `updatedAt`: Date

---

## Backend

- **Tech stack:** Node.js + Express + Typescript
- **Structure:**
```

backend/
├─ app.ts             # Express app
├─ routes/agent.routes.ts
├─ routes/property.routes.ts
├─ routes/tenant.routes.ts
├─ routes/note.routes.ts
├─ services/agent.service.ts
├─ services/property.service.ts
├─ services/tenant.service.ts
├─ services/note.service.ts
├─ models/*.ts

```
- **Features:**
- CRUD endpoints for agents, properties, tenants, and notes
- In-memory storage using `Map` for simplicity
- Relationships between entities (agent → properties → tenants)
- REST API supports:
  - `GET /agents` – list all agents
  - `POST /agents` – create/update agent
  - `DELETE /agents/:id` – delete agent
  - `GET /agents/:id/properties` – get properties by agent
  - `GET /properties/:id/tenants` – get tenants by property
  - `GET /agents/:id/notes` – get notes by agent
  - `GET /properties/:id/notes` – get notes by property

- **CORS Enabled** for frontend requests.

---

## Frontend

- **Tech stack:** Vue 3 + Typescript + Vite
- **Structure:**
```

frontend/
├─ src/
│  ├─ api/agent.ts
│  ├─ api/property.ts
│  ├─ api/tenant.ts
│  ├─ api/note.ts
│  ├─ interface/interfaces.ts
│  ├─ components/
│  │  ├─ page_components/
│  │  │  ├─ AgentManager.vue
│  │  │  ├─ NotesManager.vue
│  │  │  ├─ PropertiesManager.vue
│  │  │  └─ TenantsManager.vue
│  └─ App.vue

````
- **API Layer:** separate `api/*.ts` files for each entity
- **Features:**
- Fetching, creating, updating, deleting agents, properties, tenants, notes
- Loading states handled for all async operations

---

## Features Implemented

- Full CRUD for agents, properties, tenants, notes
- Relationships between agents → properties → tenants
- Notes linked to agents and properties
- Reusable table
- Frontend fully typed with Typescript
- API layer separated per entity
- CORS enabled on backend

---

## Running the App

### Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:3000
````

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Stretch Goals / Improvements
* All frontend table components are reusable for different entity types
* Future improvement: **RBAC / user authentication** could be added
* Future improvement: **persistent storage** (database instead of in-memory)

---

## Notes

* This implementation is **fully in-memory**. Restarting the server resets all data.
* The project uses **Vite + Vue 3 with Composition API**.