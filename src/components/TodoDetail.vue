<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { fetchTodoById } from "../api/fetchapi";


const route = useRoute();
const router = useRouter();
const todoId = Number(route.params.id);

const { data, isLoading, isError } = useQuery({
  queryKey: ["todo", todoId],
  queryFn: () => fetchTodoById(todoId),
});
</script>

<template>

  <div v-if="isLoading" class="p-4">Loading...</div>
  <div v-else-if="isError" class="p-4 text-red-500">Error loading todo</div>
  <div v-else-if="!data" class="p-4 text-red-500">Todo not found</div>
  <div
    v-else
    class="max-w-2xl mx-auto mt-6 bg-white p-6 shadow rounded-lg"
  >
    <h2 class="text-2xl font-bold mb-4">{{ data.title }}</h2>
    <p><strong>ID:</strong> {{ data.id }}</p>
    <p><strong>Task:</strong> {{ data.title }}</p>
    <p>
      <strong>Status:</strong>
      <span :class="data.completed ? 'text-green-600' : 'text-yellow-600'">
        {{ data.completed ? "Completed" : "Pending" }}
      </span>
    </p>
    <p><strong>User ID:</strong> {{ data.user_id }}</p>

    <button
      @click="router.push('/')"
      class="mt-6 bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-600"
    >
      ← Back
    </button>
  </div>
</template>
