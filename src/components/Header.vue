```vue
<script setup>
import { ref } from "vue"
import AddTodoModal from "./modals/AddTodo.vue"

const showModal = ref(false)
</script>

<template>
  <div class="m-2 flex justify-between items-center text-white">
    <div class="p-5 lg:p-10">
      <h1 class="md:text-[1.5em] text-[1rem] lg:text-[2rem] text-white font-bold">
        Welcome Back Taofeeqoh!
      </h1>
      <p class="lg:text-sm text-[10px] text-white">
        You can add a new task or view your tasks below.
      </p>
    </div>

    <div class="heading-buttons">
      <AddTodoModal
        :is-open="showModal"
        @close="showModal = false"
      />
      <button
        class="font-bold bg-white lg:text-sm text-[12px] text-purple-800 items-center p-2 rounded-md lg:w-24 mr-8"
        @click="showModal = true"
      >
        Add todos
      </button>
    </div>
  </div>
</template>
```
