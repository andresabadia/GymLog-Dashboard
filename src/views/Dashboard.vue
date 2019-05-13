<template>
  <div class="dashboard">
    <div class="dashboard-title">
      <div>Tablero de Administración - {{$store.state.glUser.gym_name}}</div>
      <p>Actualizado {{date($store.state.glUser.date)}} - {{formatedDate($store.state.glUser.date)}}</p>
    </div>  
    <div class="btn-container">
      <div class="btn-group btn-group-dashboard" v-if="$store.state.branches.length>1">
        <div>
          <div class="btn-group-title">Sucursal</div>
          <button type="button" class="btn btn-dropdown dropdown-toggle" style="width:150px;" @click="dropdownBranchToggle=!dropdownBranchToggle">{{$store.state.branches[selectedBranchIndex] | allBranches}}<span class="caret"></span></button>
        </div>
        <ul class="dropdown-menu scrollable-menu" :style="dropdownBranchToggle?'display:block':''">
          <li style="width:150px;" v-for="(branch, index) in $store.state.branches" :key="branch" @click="selectedBranchIndex=index; dropdownBranchToggle=!dropdownBranchToggle" :class="selectedBranchIndex==index?'selected':''">{{branch | allBranches}}</li>
        </ul>
      </div>
      <div class="btn-group btn-group-dashboard">
        <div>
          <div class="btn-group-title">Divisa</div>
          <button type="button" class="btn btn-dropdown dropdown-toggle" @click="dropdownToggle=!dropdownToggle">{{currencies[selectedIndex]}}<span class="caret"></span></button>
        </div>
        <ul class="dropdown-menu scrollable-menu" :style="dropdownToggle?'display:block':''">
          <li v-for="(currency, index) in currencies" :key="currency" @click="selectedIndex=index; dropdownToggle=!dropdownToggle" :class="selectedIndex==index?'selected':''">{{currency}}</li>
        </ul>
      </div>
    </div>
    <donuts :currency="currencies[selectedIndex]" :branch="branchSelection"></donuts>
    <graphs :currency="currencies[selectedIndex]" :branch="branchSelection"></graphs>
  </div>
</template>
<script>
import axios from 'axios'
import Donuts from './Donuts.vue'
import Graphs from './Graphs.vue'
import Store from '../store.js'
export default {
  data(){
    return{
      dropdownToggle: false,
      dropdownBranchToggle: false,
      currencies:[
        'USD',
        'C$'
      ],
      selectedIndex:0,
      selectedBranchIndex:0
    }
  },
  components: {
    Donuts,
    Graphs
  },
  computed:{
    branchSelection(){
      if(this.$store.state.branches.length > 1){
        return "'"+this.$store.state.branches[this.selectedBranchIndex]+"'"
      } else {        
        return "'%'"
      }
    },
    localStorageIndex(){
      let index = parseInt(localStorage.getItem('glm-selectedIndex'))
      if(localStorage.getItem('glm-selectedIndex') != null){
        return index
      } else {
        return 0
      }
    },
    localStorageBranchIndex(){
      let index = parseInt(localStorage.getItem('glm-selectedBranchIndex'))
      if(localStorage.getItem('glm-selectedBranchIndex') != null || Store.state.branches.length >= index+1){
        return index
      } else {
        return 0
      }
    }
  },
  methods:{
    date(date) {
      return moment(date).fromNow();
    },
    formatedDate(date){
      return moment(date).format('dddd D [de] MMMM YYYY, h:mm a')
    },
    populateDropdown(){
      this.$store.commit('showLoading', true)
      axios.post('php/months_drop_down.php',{
        'gym_id': Store.state.glUser.gym_id
      })
      .then(res => {
        this.$store.commit('showLoading', false)
        this.selections = []
        res.data.forEach(item => {
          this.selections.push(item.months)
        });
      })
      .catch(error => {
        this.$store.commit('showLoading', false)
        console.log(error)
      })
    }
  },
  watch:{
    selectedIndex(){
      localStorage.setItem('glm-selectedIndex', this.selectedIndex)
    },
    selectedBranchIndex(){
      localStorage.setItem('glm-selectedBranchIndex', this.selectedBranchIndex)
    }
  },
  created(){
    this.$store.dispatch('asyncSetDate')
    this.$store.dispatch('asyncSetBranches', Store.state.glUser.gym_id)
    this.selectedIndex = this.localStorageIndex
    this.selectedBranchIndex = this.localStorageBranchIndex
  },
  beforeRouteEnter (to, from, next) {
    if(Store.state.userId){
    // if(true){
      next()
    } else {
      next(false)
    }
  },
  filters:{
    allBranches: value => {
      if(value=="%"){
        return "todas"
      } else {
        return value
      }
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
    flex-wrap:wrap;
 }
 .btn-group-dashboard{
   margin: 0 5px 5px;
 }
 .btn-group-title{
  font-size: 0.75rem;
  text-align: left;
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

