import { createRouter, createWebHistory } from 'vue-router'

import AdminApp from './views/AdminApp.vue';
import UserApp from './views/UserApp.vue';


export default createRouter({
  history: createWebHistory(),


  routes: [
    {
      path: '/',
      name: 'user',
      component: UserApp
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminApp
    }
  ]
})

// kovboj-oru-na-oblako.mp3