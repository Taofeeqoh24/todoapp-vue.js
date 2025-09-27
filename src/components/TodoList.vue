```vue
<script setup lang="ts">
import { ref, computed } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { fetchTodos, toggleTodoStatus } from "../api/fetchapi.ts";
import { RouterLink } from "vue-router";

import SearchBar from "./Search.vue";
import FilterControls from "./Filter.vue";
import EditTodoModal from "./modals/EditTodo.vue";
import DeleteTodoModal from "./modals/DeleteTodo.vue";

interface Todo {
  id: number;
  title: string;
  completed?: boolean;
  user_id?: string;
  created_at?: string;
}

interface TodosResponse {
  data: Todo[];
  total: number;
}

const page = ref(1);
const searchTerm = ref("");
import type { Ref } from "vue";
const filterStatus: Ref<"all" | "completed" | "pending"> = ref("all");

const selectedTodo = ref<Todo | null>(null);
const showEdit = ref(false);
const showDelete = ref(false);

const queryClient = useQueryClient();

const { data } = useQuery<TodosResponse, Error>({
  queryKey: ["todos", page],
  queryFn: () => fetchTodos(page.value),
  placeholderData: () => ({ data: [], total: 0 }),
});

const toggleMutation = useMutation({
  mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
    toggleTodoStatus(id, completed),
  onSuccess: () => {
    queryClient.invalidateQueries({ 
      predicate: (query) => query.queryKey[0] === "todos" 
    });
  },
});

const totalPages = computed(() =>
  data.value ? Math.ceil(data.value.total / 10) : 1
);

const filteredTodos = computed(() => {
  if (!data.value) return [];
  return data.value.data.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesFilter =
      filterStatus.value === "all"
        ? true
        : filterStatus.value === "completed"
        ? todo.completed
        : !todo.completed;
    return matchesSearch && matchesFilter;
  });
});

function handleOpenEdit(todo: Todo) {
  selectedTodo.value = todo;
  showEdit.value = true;
}

function handleOpenDelete(todo: Todo) {
  selectedTodo.value = todo;
  showDelete.value = true;
}
</script>

<template>
  <div class="rounded-4xl p-4 lg:p-10 min-h-screen bg-slate-200 mt-[10px]">
    <!-- Search + Filter Controls -->
    <div class="flex justify-between mt-[-10px] max-lg:flex-col">
      <SearchBar v-model="searchTerm" />
      <FilterControls v-model="filterStatus" />
    </div>

    <p class="font-bold text-2xl ml-4">My Tasks</p>

    <!-- Todo List -->
    <ul class="space-y-2">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="m-4 p-2 rounded-lg flex justify-between items-center bg-purple-300 hover:bg-[#F3F0CA] hover:text-purple-800 hover:shadow-md hover:border"
      >
        <!-- Move RouterLink to wrap only the content, not the checkbox -->
        <div class="flex items-center space-x-3 flex-1">
          <!-- Checkbox - OUTSIDE RouterLink -->
          <input
            type="checkbox"
            :checked="todo.completed"
            @change.stop="toggleMutation.mutate({ id: todo.id, completed: !todo.completed })"
            :disabled="toggleMutation.isPending.value"
            class="cursor-pointer"
          />
          
          <!-- Todo Content - INSIDE RouterLink -->
          <RouterLink :to="`/todos/${todo.id}`" class="flex-1">
            <div class="flex items-center space-x-2">
              <span
                class="text-[10px] lg:text-[12px] font-bold p-1 lg:p-2"
                :class="todo.completed ? 'text-purple-800' : 'text-yellow-600'"
              >
                <button class="bg-[#F3F0CA] shadow-md rounded-lg p-1.5" type="button">
                  {{ todo.completed ? "Completed" : "Pending" }}
                </button>
              </span>
              <span class="text-[12px] lg:text-[16px]">{{ todo.title }}</span>
            </div>
          </RouterLink>
        </div>

        <!-- Action Buttons -->
        <div class="border-gray-50 rounded-sm shadow-xl text-nowrap">
          <button
            @click.prevent.stop="handleOpenEdit(todo)"
            class="text-[10px] lg:text-sm border hover:shadow-md rounded-lg m-2 p-1 lg:w-14 w-8"
            type="button"
          >
            Edit
          </button>
          <button
            @click.prevent.stop="handleOpenDelete(todo)"
            class="text-[10px] lg:text-sm border hover:shadow-md rounded-lg m-2 p-1 lg:w-14 w-9 text-red-600"
            type="button"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- Modals -->
    <EditTodoModal
      v-if="showEdit"
      :is-open="showEdit"
      :todo="selectedTodo"
      @close="showEdit = false"
    />

    <DeleteTodoModal
      v-if="showDelete"
      :id="selectedTodo?.id || 0"
      :is-open="showDelete"
      :on-close="() => (showDelete = false)"
    />

    <!-- Pagination Controls -->
    <div class="flex justify-between m-4 mt-8 space-x-2">
      <button
        class="text-sm px-3 py-1 bg-purple-800 shadow-md text-white rounded disabled:opacity-50"
        @click="page = Math.max(page - 1, 1)"
        :disabled="page === 1"
        type="button"
      >
        Previous
      </button>
      <span class="bg-purple-800 shadow-md text-white px-3 py-1">
        {{ page }} of {{ totalPages }}
      </span>
      <button
        class="px-3 text-sm py-1 bg-purple-800 shadow-md text-white rounded disabled:opacity-50"
        @click="page = Math.min(page + 1, totalPages)"
        :disabled="page === totalPages"
        type="button"
      >
        Next
      </button>
    </div>
  </div>
</template>
```
