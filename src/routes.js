import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/excel-export',
    name: 'excel-export',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/ExcelExport.vue'),
    meta: {
      title: 'Excel Export'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./views/Dashboard.vue'),
    meta: {
      title: 'Dashboard'
    }
  },
  // {
  //   path: '/tables',
  //   name: 'tables',
  //   component: () => import('./views/Tables.vue')
  // },
  // {
  //   path: '/graphs',
  //   name: 'graphs',
  //   component: () => import('./views/Graphs.vue')
  // },
  // {
  //   path: '/donuts',
  //   name: 'donuts',
  //   component: () => import('./views/Donuts.vue')
  // },
  {
    path: '/tutorials',
    name: 'tutorials',
    component: () => import('./views/Tutorials.vue'),
    meta: {
      title: 'Tutorials'
    }
  }
]
