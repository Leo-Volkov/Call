// Запросы к серверу
import axios from "axios";
// axios.defaults.baseURL = 'http://call.web.op9.local/';
axios.defaults.baseURL = 'http://localhost/';

// Всё для vue
import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';

// Библеотека стили element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// Рендер в HTML
app.use(router, ElementPlus, { size: 'small', zIndex: 3000 }).mount('#app');
