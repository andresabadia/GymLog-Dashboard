<template>
  <div class="graphs">
    <h1>This is an graphs page</h1>
    <button @click="$store.commit('showLoading', true)">BOTON</button>
    <div class="radio-container">
      <span @click="serverRequest('day')"><RadioButtons :checked="true">Dia</RadioButtons></span>
      <span @click="serverRequest('week')"><RadioButtons>Semana</RadioButtons></span>
      <span @click="serverRequest('month')"><RadioButtons>Mes</RadioButtons></span>
    </div>
    <div class="checkbox-container-parent">
      <div class="checkbox-container">
        <div class="checkbox-title">Edad</div>
        <CheckboxButtons :checked="true">Nulo</CheckboxButtons>
        <CheckboxButtons :checked="true">0-20</CheckboxButtons>
        <CheckboxButtons :checked="true">21-30</CheckboxButtons>
        <CheckboxButtons :checked="true">31-40</CheckboxButtons>
        <CheckboxButtons :checked="true">41-50</CheckboxButtons>
        <CheckboxButtons :checked="true">51+</CheckboxButtons>
      </div>
      <div class="checkbox-container">
        <div class="checkbox-title">Ocupación</div>
        <CheckboxButtons :checked="true">Nulo</CheckboxButtons>
        <CheckboxButtons :checked="true">Emprendedor</CheckboxButtons>
        <CheckboxButtons :checked="true">Empleado</CheckboxButtons>
        <CheckboxButtons :checked="true">Estudiante</CheckboxButtons>
        <CheckboxButtons :checked="true">Otro</CheckboxButtons>
      </div>
      <div class="checkbox-container">
        <div class="checkbox-title">Sexo</div>
        <CheckboxButtons :checked="true">M</CheckboxButtons>
        <CheckboxButtons :checked="true">F</CheckboxButtons>
      </div>
    </div>

    <br><br>
    <div class="chart-container">
      <BarChart :chartData="datacollection1" :options="options1" :change="change"></BarChart>
      <div> {{ axis1 }} </div>
    </div>
    <hr>
    <div class="radio-container">
      <CheckboxButtons :checked="true">Lun</CheckboxButtons>
      <CheckboxButtons :checked="true">Mar</CheckboxButtons>
      <CheckboxButtons :checked="true">Mie</CheckboxButtons>
      <CheckboxButtons :checked="true">Jue</CheckboxButtons>
      <CheckboxButtons :checked="true">Vie</CheckboxButtons>
      <CheckboxButtons :checked="true">Sab</CheckboxButtons>
      <CheckboxButtons :checked="true">Dom</CheckboxButtons>
    </div>
    <div class="chart-container">
      <LineChart :chartData="datacollection2" :options="options1" :change="change"></LineChart>
      <div> {{ axis2 }} </div>
    </div>
    <hr>
    <div class="chart-container">
      <BarChart :chartData="datacollection3" :options="options2" :change="change"></BarChart>
      <div> {{ axis3 }} </div>
    </div>
    <hr>
    <div class="chart-container">
      <LineChart :chartData="datacollection4" :options="options2" :change="change"></LineChart>
      <div> {{ axis4 }} </div>
    </div>
    
  </div>
</template>
<script>
import axios from 'axios'
import LineChart from '../components/charts/Line.vue'
import BarChart from '../components/charts/Bar.vue'
import CheckboxButtons from '../components/CheckboxButtons.vue'
import RadioButtons from '../components/RadioButtons.vue'
import { constants } from 'fs';

export default {
  data(){
    return{
      datacollection1: {
        labels: ['January', 'February', 'March', 'April','May'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#ffab00',
            data: [40, 20, 30, 50, 20]
          }
          // {
          //   label: 'Data Two',
          //   backgroundColor: '#79f8d070',
          //   data: [25, 30, 35, 32, 17]
          // }
        ]
      },
      datacollection2: {
        labels: ['January', 'February', 'March', 'April','May'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#ffab0070',           
            borderColor: '#ffab00',
            data: [40, 20, 30, 50, 20]
          }
        ]
      },
      datacollection3: {
        labels: ['January', 'February', 'March', 'April','May'],
        datasets: [
          {
            yAxisID: 'y2',
            label: 'Data Two',
            backgroundColor: '#616161',
            borderColor: '#616161',
            data: [25, 30, 35, 32, 17],
            type: 'line',
            lineTension: 0,
            fill: false
          },
          {
            yAxisID: 'y1',
            label: 'Data One',
            backgroundColor: '#ffab00',
            data: [40, 20, 30, 50, 20]
          }
        ]
      },
      datacollection4: {
        labels: ['January', 'February', 'March', 'April','May'],
        datasets: [
          {
            yAxisID: 'y1',
            label: 'Data One',
            backgroundColor: '#ffab0070',            
            borderColor: '#ffab00',
            data: [40, 20, 30, 50, 20],
            lineTension: 0.1,
          },
          {
            yAxisID: 'y2',
            label: 'Data Two',
            backgroundColor: '#61616170',            
            borderColor: '#616161',
            data: [25, 30, 35, 32, 17],
            lineTension: 0.1,
          }
        ]
      },
      options1: {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          yAxes: [{
            ticks:{
              min: 0
            } 
          }]          
        }
      },
      options2: {
        responsive: true,
        maintainAspectRatio: false,
        scales:{
          yAxes: [{
            id: 'y1',
            ticks:{
              min: 0
            } 
          },
          {
            id:'y2',
            position: 'right',
            ticks:{
              min: 0
            } 
          }]          
        }
      },
      change: 0,
      serverResponse: [],
      axis1: 'Months',
      axis2: 'Months',
      axis3: 'Months',
      axis4: 'Months'
    }
  },
  components: {
    LineChart,
    BarChart,
    CheckboxButtons,
    RadioButtons
  },
  methods:{
    serverRequest (x){
      $store.commit('showLoading', true)
      axios.post('php/testeando_v6.php', {
        'x': x
        })
        .then(res => {
          $store.commit('showLoading', false)
          console.log(res.data.graph1)
          //graph1
          this.axis1 = this.axis(x)
          this.datacollection1.datasets[0].label = "Visitas"
          this.datacollection1.labels=[]
          this.datacollection1.datasets[0].data=[]
          
          res.data.graph1.forEach((item)=>{
            this.datacollection1.labels.push(item.x)        
            this.datacollection1.datasets[0].data.push(item.y)
          })
          //graph2
          this.axis2 = 'Horas'
          this.datacollection2.datasets[0].label = "Visitas Promedio"
          this.datacollection2.labels=[]
          this.datacollection2.datasets[0].data=[]
          
          res.data.graph2.forEach((item)=>{
            this.datacollection2.labels.push(item.x)        
            this.datacollection2.datasets[0].data.push(item.y)
          })
          //graph3
          this.axis3 = this.axis(x)
          this.datacollection3.datasets[0].label = "Cantidad de Pagos"
          this.datacollection3.datasets[1].label = "Ingresos en USD"
          this.datacollection3.labels=[]
          this.datacollection3.datasets[0].data=[]
          this.datacollection3.datasets[1].data=[]
          
          res.data.graph3.forEach((item)=>{
            this.datacollection3.labels.push(item.x)        
            this.datacollection3.datasets[0].data.push(item.y1)
            this.datacollection3.datasets[1].data.push(item.y2)
          })
          //graph4
          this.axis4 = this.axis(x)
          this.datacollection4.datasets[0].label = "Accesos Vigentes"
          this.datacollection4.datasets[1].label = "Ingresos por Periodo"
          this.datacollection4.labels=[]
          this.datacollection4.datasets[0].data=[]
          this.datacollection4.datasets[1].data=[]
          
          res.data.graph4.forEach((item)=>{
            this.datacollection4.labels.push(item.x)        
            this.datacollection4.datasets[0].data.push(item.y1)
            this.datacollection4.datasets[1].data.push(item.y2)
          })
          this.change++
        })
        .catch(error => {
          $store.commit('showLoading', false)
          console.log(error)
        })
    },
    axis(x){
      if(x=="day"){
        return "Dias"
      }
      if(x=="week"){
        return "Semanas"
      }
      if(x=="month"){
        return "Meses"
      }
    },
    fillData () {
      this.datacollection = {
        labels: ['January', 'February', 'March', 'April','May'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f8797970',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    increase () {
      this.height += 10
    }
  }
}
</script>

<style scoped>
.radio-container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.checkbox-container-parent{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.checkbox-container{
  display: flex;
  flex-direction: column;
  margin: 3px 5px;
  align-items: start;
}
.chart-container{
  margin: 0 10px;
  padding-top: 20px;
}
.checkbox-title{
  font-weight: bold;
  margin-left: 15px;
}
@media only screen and (min-width: 600px) {
  .chart-container{
    margin: 0 100px;
    padding-top: 50px;
  }
  .checkbox-container{
  margin: 3px 15px;
}
}
</style>


