import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:false,
    userId:false
  },
  mutations: {
    showLoading:(state, payload)=>{
      state.loading = payload
    },
    checkUserId: (state, payload)=>{
      console.log(localStorage.getItem('gl-user'),sessionStorage.getItem('gl-user'))
      if (localStorage.getItem('gl-user')!=null || sessionStorage.getItem('gl-user')!=null){
        state.userId = true
        console.log('user id set to true')
      } else {
        state.userId = false
        console.log('user id set to false')
      }
    }
  },
  actions: {

  }
})
