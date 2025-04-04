import { createApp } from 'vue'
import App from './App.vue'
import { vMaska } from 'maska'

const app = createApp(App)
app.directive('maska', vMaska) 

app.mount('#app')