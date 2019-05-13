import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import axios from 'axios'
export default new Vuex.Store({
  state: {
    loading:false,
    userId:false,
    glUser:{
      gym_name:'Gym Name',
      gym_owner: 'Owner',
      date: '2019-04-25 21:59:12.718',
      gym_id: ''
    },
    branches:[]
  },
  mutations: {
    showLoading:(state, payload)=>{
      state.loading = payload
    },
    checkUserId: (state, payload)=>{
      if (localStorage.getItem('glm-user')!=null || sessionStorage.getItem('glm-user')!=null){
        state.userId = true
        if (localStorage.getItem('glm-user')!=null){
          state.glUser = JSON.parse(localStorage.getItem('glm-user'))
        } else {
          state.glUser = JSON.parse(sessionStorage.getItem('glm-user'))
        }        
      } else {
        state.userId = false
      }
    },
    resetUser: (state, payload)=>{
      state.glUser={
        gym_name:'Gym Name',
        gym_owner: 'Owner',
        date: '2018-06-14 21:59:12.718',
        gym_id: ''
      }
    },
    setDate: (state, payload) => {
      state.glUser.date = payload
    },
    setBranches: (state, payload) => {
      if(payload.length>1){        
        state.branches.push("%")
      }
      payload.forEach(element => {
        state.branches.push(element.branch)
      });
    }
  },
  actions: {
    asyncSetDate: ({commit, state}, payload) => {
      axios.post('php/last_update.php',{
        'gym_id':state.glUser.gym_id
      })
      .then(res => {
        commit('setDate', res.data[0].date)
      })
      .catch(error => {
        console.log(error)
      })
    },
    asyncSetBranches: ({commit, state}, payload) => {
      if (state.branches.length == 0){
        axios.post('php/branch_drop_down.php',{
          'gym_id':payload
        })
        .then(res => {
          commit('setBranches', res.data)
        })
        .catch(error => {
          console.log(error)
        })
      }
    }
  }
})
