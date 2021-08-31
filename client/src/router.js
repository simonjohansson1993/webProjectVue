import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import Shop from './views/Shop.vue'
import Task from './views/Task.vue'
import Battlefield from './views/Battlefield.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/task',
      name: 'task',
      component: Task
    },
    {
      path: '/battlefield',
      name: 'battlefield',
      component: Battlefield
    }

  ]
})
