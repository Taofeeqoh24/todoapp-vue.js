<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ modelValue: "all" | "completed" | "pending" }>();
const emit = defineEmits(["update:modelValue"]);

function setFilter(status: "all" | "completed" | "pending") {
  emit("update:modelValue", status);
}
</script>

<template>
  <div class="m-4 mt-[36px] flex gap-2 max-lg:mt-[-6px]">
    <button
      class="h-min px-3 py-1 rounded"
      :class="props.modelValue === 'all' ? 'bg-purple-800 text-white' : 'bg-gray-200'"
      @click="setFilter('all')"
    >
      All
    </button>
    <button
      class="h-min px-3 py-1 rounded text-white"
      :class="props.modelValue === 'completed' ? 'bg-purple-800 text-white' : 'bg-purple-800'"
      @click="setFilter('completed')"
    >
      Completed
    </button>
    <button
      class="h-min px-3 py-1 rounded text-white"
      :class="props.modelValue === 'pending' ? 'bg-purple-800 text-white' : 'bg-purple-800'"
      @click="setFilter('pending')"
    >
      Pending
    </button>
  </div>
</template>
