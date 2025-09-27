import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Import your components
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: TodoList
  },
  {
    path: '/todos/:id',
    name: 'TodoDetail',
    component: TodoDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router