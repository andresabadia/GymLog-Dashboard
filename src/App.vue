<template>
  <div id="app">
    <Navigation></Navigation>    
    <router-view/>
    <loading v-if="$store.state.loading"></loading>
  </div>
</template>
<script>
import Loading from './components/Loading.vue'
import Navigation from './components/Navigation.vue'
export default {
  components:{
    Loading,
    Navigation
  },
  created(){      
    console.log('App created check user id')  
    this.$store.commit('checkUserId')
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #424242;
}
</style>
