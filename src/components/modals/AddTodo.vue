```vue
<script setup lang="ts">
import { ref } from "vue"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { supabase } from "../../lib/supabase"

interface Props {
  isOpen: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: "close"): void
}>()

const titleText = ref("")
const queryClient = useQueryClient()

const mutation = useMutation({
  mutationFn: async (title: string) => {
    const userId = localStorage.getItem("todo-user-id") || "guest"
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title, completed: false, user_id: userId }])
      .select()

    if (error) throw error
    return data?.[0]
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ 
      predicate: (query) => query.queryKey[0] === "todos" 
    })
    
    titleText.value = ""
    emit("close")
  },
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  if (!titleText.value.trim()) return
  mutation.mutate(titleText.value)
}
</script>

<template>
  <div
    v-if="props.isOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
  >
    <div class="bg-white text-black rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-xl font-bold mb-4">Add New Todo</h2>
      <form @submit="handleSubmit">
        <input
          type="text"
          v-model="titleText"
          placeholder="Enter your task"
          class="w-full p-2 border rounded mb-4"
        />
        <div class="flex justify-end gap-2">
          <button
            type="submit"
            class="px-4 py-2 bg-purple-800 text-white rounded shadow-md hover:bg-white hover:text-purple-800"
          >
            Add
          </button>
          <button
            type="button"
            @click="emit('close')"
            class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
```
