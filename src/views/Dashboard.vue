<template>
  <div class="dashboard">
    <div class="dashboard-title">
      <div>Tablero de Administración - {{$store.state.glUser.gym_name}}</div>
      <p>Actualizado {{date($store.state.glUser.date)}} - {{formatedDate($store.state.glUser.date)}}</p>
    </div>
    <div class="btn-container">
      <div class="btn-group">
        <button type="button" class="btn btn-dropdown dropdown-toggle" @click="dropdownToggle=!dropdownToggle">{{currencies[selectedIndex]}}<span class="caret"></span></button>
        <ul class="dropdown-menu scrollable-menu" :style="dropdownToggle?'display:block':''">
          <li v-for="(currency, index) in currencies" :key="currency" @click="selectedIndex=index; dropdownToggle=!dropdownToggle" :class="selectedIndex==index?'selected':''">{{currency}}</li>
        </ul>
      </div>
    </div>
    <donuts :currency="currencies[selectedIndex]"></donuts>
    <graphs :currency="currencies[selectedIndex]"></graphs>
  </div>
</template>
<script>
import Donuts from './Donuts.vue'
import Graphs from './Graphs.vue'
import Store from '../store.js'
export default {
  data () {
    return {
      dropdownToggle: false,
      currencies: [
        'USD',
        'C$'
      ],
      selectedIndex: 0
    }
  },
  components: {
    Donuts,
    Graphs
  },
  computed: {
    localStorageIndex () {
      let index = parseInt(localStorage.getItem('gl-selectedIndex'))
      if (localStorage.getItem('gl-selectedIndex') != null) {
        return index
      } else {
        return 0
      }
    }
  },
  methods: {
    date (date) {
      return moment(date).fromNow()
    },
    formatedDate (date) {
      return moment(date).format('dddd D [de] MMMM YYYY, h:mm a')
    }
  },
  watch: {
    selectedIndex () {
      localStorage.setItem('gl-selectedIndex', this.selectedIndex)
    }
  },
  created () {
    this.$store.dispatch('asyncSetDate')
    this.selectedIndex = this.localStorageIndex
  },
  beforeRouteEnter (to, from, next) {
    // console.log('this store: ',Store.state.userId)
    if (Store.state.userId) {
    // if(true){
      next()
    } else {
      next(false)
    }
  }
}
</script>
<style>
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
 .btn-container{
    display: flex;
    flex-direction: row-reverse;
    margin: 0 10px;
    max-width: 1200px;
 }
.btn-dropdown {
  color: #ffab00;
  background-color: #424242;
  border-color: #424242;
  width: 100px;
}
.dropdown-menu{
  min-width: 6.2rem;
}
.scrollable-menu {
  height: auto;
  max-height: 200px;
  overflow-x: hidden;
}
.scrollable-menu li{
  cursor: pointer;
  padding: 0 10px;
  width: 100px;
}
.scrollable-menu li:hover{
  background-color: #ffab0075;
  color:inherit;
}
.selected{
  background-color: #ffab00;
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
  .btn-container{
    margin: 0 20px;
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
  .btn-container{
    margin: auto;
 }
}
</style>
