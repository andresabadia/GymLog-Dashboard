import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/GymLog/',
      name: 'home',
      component: Home
    },
    {
      path: 'GymLog',
      name: 'login',
      component: Login
    },
    {
      path: '/GymLog/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/GymLog/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/GymLog/tables',
      name: 'tables',
      component: () => import('./views/Tables.vue')
    },
    {
      path: '/GymLog/graphs',
      name: 'graphs',
      component: () => import('./views/Graphs.vue')
    }
  ]
})
