<template>
    <div>
        <form @submit.prevent="addTodo">
            <input v-model="newTodo" placeholder="Enter a todo" />
            <button type="submit">Add</button>
        </form>

        <ul>
            <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" @delete="removeTodo(index)" />
        </ul>
    </div>
</template>

<script>
import { ref } from 'vue'
import TodoItem from '../components/TodoDetail.vue'

export default {
    components: { TodoItem },
    setup() {
        const newTodo = ref('')
        const todos = ref([])

        const addTodo = () => {
            if (newTodo.value.trim()) {
                todos.value.push(newTodo.value)
                newTodo.value = ''
            }
        }

        const removeTodo = (index) => {
            todos.value.splice(index, 1)
        }

        return { newTodo, todos, addTodo, removeTodo }
    }
}
</script>
