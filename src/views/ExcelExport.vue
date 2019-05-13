<template>
  <div class="excel-export">
    <div class="excel-export-title">
      <div>Exportar tabla de datos</div>
      <p>Actualizado {{date($store.state.glUser.date)}} - {{formatedDate($store.state.glUser.date)}}</p>
    </div>  
    <div class="buttons-container">
      <div class="btn-group" v-if="$store.state.branches.length>1">
        <div>
          <div class="btn-group-title">Sucursal</div>
          <button type="button" class="btn btn-dropdown dropdown-toggle" style="width:150px;" @click="dropdownBranchToggle=!dropdownBranchToggle">{{$store.state.branches[selectedBranchIndex] | allBranches}}<span class="caret"></span></button>
        </div>
        <ul class="dropdown-menu scrollable-menu" :style="dropdownBranchToggle?'display:block':''">
          <li style="width:150px;" v-for="(branch, index) in $store.state.branches" :key="branch" @click="selectedBranchIndex=index; dropdownBranchToggle=!dropdownBranchToggle" :class="selectedBranchIndex==index?'selected':''">{{branch | allBranches}}</li>
        </ul>
      </div>
      <div class="btn-group">
        <div>
          <div class="btn-group-title">Mes</div>
          <button type="button" class="btn btn-dropdown dropdown-toggle" @click="dropdownToggle=!dropdownToggle">{{selections[selectedIndex]}}<span class="caret"></span></button>
        </div>
        <ul class="dropdown-menu scrollable-menu" :style="dropdownToggle?'display:block':''">
          <li v-for="(selection, index) in selections" :key="selection" @click="selectedIndex=index; dropdownToggle=!dropdownToggle" :class="selectedIndex==index?'selected':''">{{selection}}</li>
        </ul>
      </div>
      <form action="php/index.php" target="_blank" method="POST">
        <input type="hidden" name="gym_id" :value="$store.state.glUser.gym_id">  
        <input type="hidden" name="month" :value="selections[selectedIndex]">  
        <input type="hidden" name="branch" :value="branchSelection">  
        <button class="btn btn-color-primary" type="submit">Exportar Excel</button>
      </form>
    </div>
    <div class="excel-export-explain">
      Las tablas de visitas y pagos seran filtradas segun el mes que seleccionés
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Store from '../store.js'
export default {
  data(){
    return{
      selectedIndex: 0,
      dropdownToggle: false,
      selectedBranchIndex: 0,
      dropdownBranchToggle: false,
      selections:['2019-04','2019-03','2019-02']
    }
  },
  computed:{
    branchSelection(){
      if(this.$store.state.branches.length > 1){
        return "'"+this.$store.state.branches[this.selectedBranchIndex]+"'"
      } else {        
        return "'%'"
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
    },
    date(date) {
      return moment(date).fromNow();
    },
    formatedDate(date){
      return moment(date).format('dddd D [de] MMMM YYYY, h:mm a')
    }
  }, 
  watch:{
    selectedBranchIndex(){
      localStorage.setItem('glm-selectedBranchIndex', this.selectedBranchIndex)
    }
  }, 
  created(){
    this.$store.dispatch('asyncSetDate')
    this.populateDropdown()
    this.$store.dispatch('asyncSetBranches', Store.state.glUser.gym_id)    
    this.selectedBranchIndex = this.localStorageBranchIndex
  },
  beforeRouteEnter (to, from, next) {
    // if(true){
    if(Store.state.userId){
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

<style scoped>
.excel-export-title{
  margin:10px;  
  max-width: 1200px;    
  margin-top: 30px;
  margin-bottom: 30px;
}
.excel-export-title > div {
    font-size:1.75rem;
    line-height: 1;
 }
 .excel-export-title > p, .excel-export-explain {
    font-size:0.8rem;
    color: #42424275;
 }
 .excel-export-explain{
    max-width: 300px;
    padding: 20px;
    margin: auto;
 }
 @media only screen and (min-width: 1200px) {  
  .excel-export-title{
    margin: 10px auto;
  }
}
.buttons-container{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.buttons-container{
  display: flex;
  align-items: flex-end;
}
.buttons-container form{
  margin-bottom:5px;
}
.btn-group{
  margin-bottom: 5px; 
}
.btn-group-title{
  font-size: 0.75rem;
  text-align: left;
  margin: 0 5px;
}
.btn{
  margin: 0 5px;
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
  margin: .125rem 5px 0;
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
</style>




