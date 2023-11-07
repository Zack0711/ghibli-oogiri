import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import vuetify from '@/plugins/vuetify'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
  .use(vuetify)
  .mount('#app')
