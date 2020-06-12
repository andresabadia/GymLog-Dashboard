import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import store from './store'

Vue.config.productionTip = false

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title != '') {
    document.title = 'GymLog - ' + to.meta.title
  } else {
    document.title = 'GymLog'
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
