<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white text-black rounded-lg shadow-lg w-full max-w-sm p-6">
      <h2 class="text-lg font-bold mb-4">Delete Todo</h2>
      <p>Are you sure you want to delete this task?</p>
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="handleDelete"
          class="px-4 py-2 bg-red-600 text-[6px] text-white rounded shadow hover:bg-red-500"
        >
          Delete
        </button>
        <button
          @click="onClose"
          class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { deleteTodo } from "../../api/fetchapi";

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const props = defineProps<Props>();
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: () => deleteTodo(props.id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
    props.onClose();
  },
});

const handleDelete = () => {
  mutation.mutate();
};
</script>
