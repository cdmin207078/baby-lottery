import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueLuckyCanvas from '@lucky-canvas/vue'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueLuckyCanvas)

app.mount('#app')
