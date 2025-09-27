<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white text-black rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-xl font-bold mb-4">Edit Todo</h2>
      <form @submit.prevent="handleSubmit">
        <input
          type="text"
          v-model="titleText"
          placeholder="Enter updated task"
          class="w-full p-2 border rounded mb-4"
        />
        <div class="flex justify-end gap-2">
          <button
            type="submit"
            class="px-4 py-2 bg-purple-800 text-white rounded shadow hover:bg-purple-600"
          >
            Save
          </button>
          <button
            type="button"
            @click="onClose"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { updateTodo, type Todo } from "../../api/fetchapi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  todo: Todo | null;
}

const props = defineProps<Props>();
const queryClient = useQueryClient();

const titleText = ref(props.todo?.title || "");

// Watch for when a new todo is passed in
watch(
  () => props.todo,
  (newTodo) => {
    if (newTodo) titleText.value = newTodo.title;
  },
  { immediate: true }
);

const mutation = useMutation({
  mutationFn: (updates: Partial<Todo>) =>
    updateTodo(props.todo!.id, updates),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    props.onClose();
  },
});

const handleSubmit = () => {
  if (!titleText.value.trim()) return;
  mutation.mutate({ title: titleText.value });
};
</script>
