<template>
  <div class="dashboard">
    <div class="dashboard-title">
      <div>Tablero de Administración - {{$store.state.glUser.gym_name}}</div>
      <p>Actualizado {{date($store.state.glUser.date)}} - {{formatedDate($store.state.glUser.date)}}</p>
    </div>    
    <donuts></donuts>
    <graphs></graphs>
  </div>
</template>
<script>
import Donuts from './Donuts.vue'
import Graphs from './Graphs.vue'
export default {
  components: {
    Donuts,
    Graphs
  },
  methods:{
    date(date) {
      return moment(date).fromNow();
    },
    formatedDate(date){
      return moment(date).format('dddd D [de] MMMM YYYY, h:mm a')
    }
  }
}
</script>
<style scoped>
  .card, .dashboard-title{
    margin:10px;  
    max-width: 1200px;
  }
  .dashboard-title{
    margin-top: 30px;
    margin-bottom: 30px;
  }
 .dashboard-title > div {
    font-size:1.75rem;
    line-height: 1;
 }
 .dashboard-title > p {
    font-size:0.8rem;
    color: #42424275;
 }
 .card-header > h3{
    font-size: 1.5rem;
    margin: 0;
 }
.card-body{
  padding:0.5rem;
}
@media only screen and (min-width: 576px) {  
  .card-body{
    padding:1.25rem;
  }
}
@media only screen and (min-width: 768px) {  

}
@media only screen and (min-width: 992px) {  

}
@media only screen and (min-width: 1200px) {  
  .card, .dashboard-title{
    margin: 10px auto;
  }
}
</style>

