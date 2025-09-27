<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="m-4">
    <input
      class="max-lg:w-80 p-3 w-150 rounded-xl bg-purple-300"
      type="text"
      placeholder="Search for tasks..."
      :value="props.modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
