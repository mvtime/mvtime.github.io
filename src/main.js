import { placeholderToast } from '@/util/util'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// import jquery
import $ from 'jquery'
//! placeholder
$(document.body).on('click', '.auth-action', (e) => {
  placeholderToast()
})
