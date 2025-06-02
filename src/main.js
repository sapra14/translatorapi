import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// ✅ Disable Vue Devtools inside app (optional)
app.config.devtools = false

// ✅ Mount
app.mount('#app')
