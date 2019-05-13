import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
// import router from './router'
import {routes} from './routes'
import store from './store'

Vue.config.productionTip = false

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.title!=""){
    document.title = 'GymLogMulti - ' + to.meta.title
  } else{
    document.title = 'GymLogMulti'
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
