<template>
  <div class="donut-component">
    <div class="card bg-light">
      <div class="card-header">
          <h3>Análisis del mes</h3>
      </div>
      <div class="card-body">
        <form>
        <div class="radio-buttons-container">
          <span @click="donutChart('age_group')"><RadioButtons :checked="true">Edades</RadioButtons></span>
          <span @click="donutChart('gender')"><RadioButtons>Sexo</RadioButtons></span>
          <span @click="donutChart('occupation')"><RadioButtons>Ocupación</RadioButtons></span>
        </div>
        </form>
        <div class="donuts-container-parent">
          <div class="donuts-container-around">
            <div class="donuts-container">
              <div class="donuts-kpi-main">{{roundUp(currentMonth1)}}</div>
              <div class="donuts-kpi-last">
                <div>
                  {{roundUp(lastMonth1)}}
                </div>
                <div class="donuts-kpi-last-child">
                  mes <br> anterior
                </div>
              </div>
              <DonutChart :chartData="datacollection1" :options="options" :change="change"></DonutChart>
            </div>
            <div class="donuts-title">Visitas</div>
          </div>
          <div class="donuts-container-around">
            <div class="donuts-container">
              <div class="donuts-kpi-main">{{roundUp(currentMonth2)}}</div>
              <div class="donuts-kpi-last">
                <div>
                  {{roundUp(lastMonth2)}}
                </div>
                <div class="donuts-kpi-last-child">
                  mes <br> anterior
                </div>
              </div>
              <DonutChart :chartData="datacollection2" :options="options" :change="change"></DonutChart>
            </div>
            <div class="donuts-title">Pagos USD</div>       
          </div>  
          <div class="donuts-container-around">
            <div class="donuts-container">
              <div class="donuts-kpi-main">{{roundUp(currentMonth3)}}</div>
              <div class="donuts-kpi-last">
                <div>
                  {{roundUp(lastMonth3)}}
                </div>
                <div class="donuts-kpi-last-child">
                  mes <br> anterior
                </div>
              </div>
              <DonutChart :chartData="datacollection3" :options="options" :change="change"></DonutChart>
            </div>
            <div class="donuts-title">Accesos vigentes</div>       
          </div>    
        </div>
        <div class="donuts-legend">
          <div>{{filterName}}: </div>
          <div v-for="(color, index) in datacollection1.labels" :key="color" class="donuts-legend-child"><div :style="'margin:0 5px; height:13px; width:13px; background:'+datacollection1.datasets[0].backgroundColor[index]+';'"></div><div>{{color}}</div></div>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script>
import axios from 'axios'
import DonutChart from '../components/charts/Donut.vue'
import RadioButtons from '../components/RadioButtons.vue'
export default {
  data(){
    return{
      datacollection1: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#424242","#ff8f00","#757575","#ffb300","#bdbdbd", "#ffca28","#eeeeee","#ffe082","#212121","#ff6f00","#616161","#ffa000","#9e9e9e","#ffc107","#e0e0e0","#ffd54f","#f5f5f5","#ffecb3"],
            data: []
          }
        ]
      },
      currentMonth1: 0,
      lastMonth1: 0,
      datacollection2: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#424242","#ff8f00","#757575","#ffb300","#bdbdbd", "#ffca28","#eeeeee","#ffe082","#212121","#ff6f00","#616161","#ffa000","#9e9e9e","#ffc107","#e0e0e0","#ffd54f","#f5f5f5","#ffecb3"],
            data: []
          }
        ]
      },
      currentMonth2: 0,
      lastMonth2: 0,
      datacollection3: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#424242","#ff8f00","#757575","#ffb300","#bdbdbd", "#ffca28","#eeeeee","#ffe082","#212121","#ff6f00","#616161","#ffa000","#9e9e9e","#ffc107","#e0e0e0","#ffd54f","#f5f5f5","#ffecb3"],
            data: []
          }
        ]
      },
      currentMonth3: 0,
      lastMonth3: 0,
      options: {
        legend:{
          display: false
        },
        responsive: true,
        maintainAspectRatio: true,
        cutoutPercentage:50
      },
      change: 0,
      filterName:''
    }
  },
  created(){
    this.donutChart('age_group')
  },
  methods:{
    roundUp(value){
      return Math.round(value)
    },
    replaceEmpty(value){
      if(value==""){
        return "Nulo"
      } else {
        return value
      }
    },
    filterNameMethod(color){
      if(color=='age_group'){
        this.filterName='Edades'
      } else if(color=='gender'){
        this.filterName='Sexo'
      } else if(color=='occupation'){
        this.filterName='Ocupación'
      }      
    },
    donutChart(colors){
      this.filterNameMethod(colors)
      this.$store.commit('showLoading', true)
      axios.post('php/donut.php',{
        'colors': colors
      })
      .then(res => {
        this.$store.commit('showLoading', false)
        // console.log(res)
        //graph1
        this.datacollection1.labels = []
        this.datacollection1.datasets[0].data=[]
        this.currentMonth1 = 0

        res.data.graph1.donut.forEach(item => {
          this.datacollection1.labels.push(this.replaceEmpty(item.color))
          this.datacollection1.datasets[0].data.push(this.roundUp(item.count))
          this.currentMonth1 += parseFloat(item.count)
        });
        this.lastMonth1 = res.data.graph1.last_month.count
        //graph2
        this.datacollection2.labels = []
        this.datacollection2.datasets[0].data=[]
        this.currentMonth2 = 0

        res.data.graph2.donut.forEach(item => {
          this.datacollection2.labels.push(this.replaceEmpty(item.color))
          this.datacollection2.datasets[0].data.push(this.roundUp(item.count))
          // console.log(parseFloat(item.count))
          this.currentMonth2 += parseFloat(item.count)
          // console.log(this.currentMonth2)
        });
        this.lastMonth2 = res.data.graph2.last_month.count
        //graph3
        this.datacollection3.labels = []
        this.datacollection3.datasets[0].data=[]
        this.currentMonth3 = 0

        res.data.graph3.donut.forEach(item => {
          this.datacollection3.labels.push(this.replaceEmpty(item.color))
          this.datacollection3.datasets[0].data.push(this.roundUp(item.count))
          this.currentMonth3 += parseFloat(item.count)
        });
        this.lastMonth3 = res.data.graph3.last_month.count
        this.change++
      })
      .catch(error => {
        this.$store.commit('showLoading', false)
        console.log(error)
      })
    }
  },
  components: {
    DonutChart,
    RadioButtons
  },
  filters:{
    roundUpFilter: value => {
      return Math.round(value)
    }
  }
}
</script>
<style scoped>
.card{
  margin:10px;
  /* background-color: rgba(0,0,0,0.2);
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem; */
}
button{
  margin: 0 5px;
}
.donut-component{
  width: 100%;
}
.donuts-container-parent{
  margin:auto;
  max-width: 1000px;;
  display:flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.donuts-legend{  
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.donuts-legend-child{
  display: flex;
  align-items: center;
  margin: 0 10px;
}
.donuts-container-around{
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  border-bottom: solid 2px #eaeaea;
}
.donuts-container{
  position: relative;
  width: 100%;
  font-size:100%;
  z-index: 2;
}
.donuts-kpi-main, .donuts-kpi-last{
  position: absolute;
  z-index: -1;
}
.donuts-kpi-main{  
  top:45%;
  left:50%;
  transform: translate(-50%, -50%);
  font-size: 10vw;
  font-weight: bold;
}
.donuts-kpi-last{
  top: 60%;
  left: 30%;
  transform: translateY(-50%);
  font-size: 5vw;
  display: flex;
}
.donuts-kpi-last-child{
  font-size: 2.5vw;
  text-align: left;
  display: flex;
  align-items: center;
  line-height: 1;
  padding-left: 5px;
}
.donuts-title{
  font-weight: bold;
  padding-top: 10px;
}
@media only screen and (min-width: 576px) {  
  .donut-component{
    padding: 0px 10px;
  }
  .donuts-container-around{
    width: 30%;
  }
  .donuts-container{
    width: 100%;
  }
  .donuts-kpi-main{  
    font-size: 4vw;
  }
  .donuts-kpi-last{
    font-size: 2vw;
  }
  .donuts-kpi-last-child{
    font-size: 1vw;
  }
}
@media only screen and (min-width: 768px) {  
  .donuts-container{
    width: 249px;
    height: 249px;
  }
  .donuts-kpi-main{  
    font-size: 2em;
  }
  .donuts-kpi-last{
    font-size: 1em;
  }
  .donuts-kpi-last-child{
    font-size: 0.5em;
  }
}
@media only screen and (min-width: 992px) {  
  .donuts-container{
    width: 300px;
    height: 300px;
  }
  .donuts-kpi-main{  
    font-size: 2.4em;
  }
  .donuts-kpi-last{
    font-size: 1.2em;
  }
  .donuts-kpi-last-child{
    font-size: 0.6em;
  }
}
@media only screen and (min-width: 1200px) {  
}
.radio-buttons-container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
