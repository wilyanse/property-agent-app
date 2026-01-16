<template>
  <div>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
          <th v-if="showActions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in data"
          :key="row.id"
          @click="$emit('row-click', row)"
          style="cursor: pointer"
        >
          <td v-for="col in columns" :key="col.key">
            {{ getValue(row, col.key) }}
          </td>
          <td v-if="showActions" @click.stop>
            <button @click="$emit('edit', row)">Edit</button>
            <button @click="$emit('delete', row.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!data.length" style="margin-top: 10px;">
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
