import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // Add this import

import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
import type { VueQueryPluginOptions } from '@tanstack/vue-query'

const queryClient = new QueryClient()

const vueQueryOptions: VueQueryPluginOptions = {
  queryClient,
}

const app = createApp(App)

// ✅ Add router BEFORE Vue Query
app.use(router) // Add this line
app.use(VueQueryPlugin, vueQueryOptions)

app.mount('#app')