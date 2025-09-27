<template>
  <div class="app">
    <Header />
    <RouterView />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: { Header, TodoList }
}
</script>