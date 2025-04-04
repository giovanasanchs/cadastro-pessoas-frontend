import VueTheMask from 'vue-the-mask'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.use(VueTheMask)

app.mount('#app')
