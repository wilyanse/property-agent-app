<template>
  <div class="table-wrapper">
    <table class="base-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">
            {{ col.label }}
          </th>
          <th v-if="showActions" class="actions-col">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="row in data"
          :key="row.id"
          class="table-row"
          @click="$emit('row-click', row)"
        >
          <td v-for="col in columns" :key="col.key">
            {{ getValue(row, col.key) }}
          </td>

          <td v-if="showActions" class="actions-cell" @click.stop>
            <button class="btn btn-edit" @click="$emit('edit', row)">
              Edit
            </button>
            <button class="btn btn-delete" @click="$emit('delete', row.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="data.length === 0" class="empty-state">
      No data to display
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent } from "vue";

interface Column {
  key: string;
  label: string;
}

export default defineComponent({
  name: "BaseTable",
  props: {
    data: {
      type: Array as () => Array<Record<string, unknown>>,
      required: true
    },
    columns: {
      type: Array as () => Column[],
      required: true
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getValue(row: Record<string, unknown>, key: string) {
      return row[key] ?? "";
    }
  }
});
</script>

<style scoped>
.table-wrapper {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

/* Table */
.base-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/* Header */
.base-table thead {
  background: #f9fafb;
}

.base-table th {
  text-align: left;
  padding: 10px 12px;
  font-weight: 500;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

/* Rows */
.table-row {
  cursor: pointer;
  transition: background 0.15s ease;
}

.table-row:hover {
  background: #f3f4f6;
}

.base-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #f1f5f9;
  color: #374151;
}

/* Actions */
.actions-col {
  width: 140px;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

/* Buttons */
.btn {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  background: transparent;
}

.btn-edit {
  color: #2563eb;
}

.btn-edit:hover {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.btn-delete {
  color: #dc2626;
}

.btn-delete:hover {
  background: #fef2f2;
  border-color: #fecaca;
}

/* Empty state */
.empty-state {
  padding: 16px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
}

</style>
