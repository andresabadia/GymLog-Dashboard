<template>
  <div id="app">
    <Navigation v-if="$store.state.userId"></Navigation>    
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
.btn-color-primary{
  color: #424242;  
  background-color: #ffab00;
}
.btn-color-primary:hover{
  color: #424242;  
  background-color: #ffab0075;
}
.btn-color-negative{
  color: #ffab00;  
  background-color: #424242;
}
.btn-color-negative:hover{
  color: #ffab00;  
  background-color: #212121;
}
</style>
