<template>
  <div class="excel-export">
    <div class="excel-export-title">
      <div>Exportar tabla de datos</div>
      <p>Actualizado {{date($store.state.glUser.date)}} - {{formatedDate($store.state.glUser.date)}}</p>
    </div>  
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
    <div class="excel-export-explain">
      Las tablas de visitas y pagos seran filtradas segun el mes que seleccionés
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
    },
    date(date) {
      return moment(date).fromNow();
    },
    formatedDate(date){
      return moment(date).format('dddd D [de] MMMM YYYY, h:mm a')
    }
  },  
  created(){
    this.populateDropdown()
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




