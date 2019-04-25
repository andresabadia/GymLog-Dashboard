<template>
  <div class="excel-export">
    <h1>This is an excel export page</h1>
    <div class="buttons-container">
      <div class="btn-group">
        <button type="button" class="btn btn-dropdown dropdown-toggle" @click="dropdownToggle=!dropdownToggle">{{selections[selectedIndex]}}<span class="caret"></span></button>
        <ul class="dropdown-menu scrollable-menu" :style="dropdownToggle?'display:block':''">
          <li v-for="(selection, index) in selections" :key="selection" @click="selectedIndex=index; dropdownToggle=!dropdownToggle" :class="selectedIndex==index?'selected':''">{{selection}}</li>
        </ul>
      </div>
      <form action="php/index.php" target="_blank" method="POST">
        <input type="hidden" name="gym_id" value="uf">  
        <input type="hidden" name="month" :value="selections[selectedIndex]">  
        <button class="btn btn-warning" type="submit">Exportar Excel</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return{
      selectedIndex: 0,
      dropdownToggle: false,
      selections:['2019-04','2019-03','2019-02']
    }
  },
  methods:{
    populateDropdown(){
      this.$store.commit('showLoading', true)
      axios.post('php/months_drop_down.php',{
        'gym_id': 'uf'
      })
      .then(res => {
        this.$store.commit('showLoading', false)
        this.selections = []
        res.data.forEach(item => {
          this.selections.push(item.months)
        });
        console.log(res.data)
      })
      .catch(error => {
        this.$store.commit('showLoading', false)
        console.log(error)
      })
    }
  },  
  created(){
    this.populateDropdown()
  }
}
</script>

<style scoped>
.buttons-container{
  display: flex;
  justify-content: center;
}
.btn{
  margin: 0 5px;
}
.btn-dropdown {
  color: #ffab00;
  background-color: #424242;
  border-color: #424242;
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
}
.scrollable-menu li:hover{
  background-color: #ffab0075;
  color:inherit;
}
.selected{  
  background-color: #ffab00;
}
</style>




