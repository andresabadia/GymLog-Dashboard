<template>
  <div class="graphs">
    <div class="card bg-light">
      <div class="card-header">
          <h3>Análisis intertemporal</h3>
      </div>
      <div class="card-body">
        <form>
        <div class="radio-button-container">
          <span @click="serverRequestJSONdefault.x='day'; changeJSON();"><RadioButtons :checked="true">Dia</RadioButtons></span>
          <span @click="serverRequestJSONdefault.x='week'; changeJSON();"><RadioButtons>Semana</RadioButtons></span>
          <span @click="serverRequestJSONdefault.x='month'; changeJSON();"><RadioButtons>Mes</RadioButtons></span>
        </div>
        </form>
        <div class="checkbox-button-container-parent">
          <div class="checkbox-button-container">
            <div class="checkbox-title">Edad</div>
            <CheckboxButtons v-model="selection.age_null">Nulo</CheckboxButtons>
            <CheckboxButtons v-model="selection.age_0_20">0-20</CheckboxButtons>
            <CheckboxButtons v-model="selection.age_21_30">21-30</CheckboxButtons>
            <CheckboxButtons v-model="selection.age_31_40">31-40</CheckboxButtons>
            <CheckboxButtons v-model="selection.age_41_50">41-50</CheckboxButtons>
            <CheckboxButtons v-model="selection.age_50_plus">51+</CheckboxButtons>
          </div>
          <div class="checkbox-button-container">
            <div class="checkbox-title">Ocupación</div>
            <CheckboxButtons v-model="selection.occ_null">Nulo</CheckboxButtons>
            <CheckboxButtons v-model="selection.occ_self">Emprendedor</CheckboxButtons>
            <CheckboxButtons v-model="selection.occ_emplo">Empleado</CheckboxButtons>
            <CheckboxButtons v-model="selection.occ_student">Estudiante</CheckboxButtons>
            <CheckboxButtons v-model="selection.occ_othr">Otro</CheckboxButtons>
          </div>
          <div class="checkbox-button-container">
            <div class="checkbox-title">Sexo</div>
            <CheckboxButtons v-model="selection.gender_m">M</CheckboxButtons>
            <CheckboxButtons v-model="selection.gender_f">F</CheckboxButtons>
          </div>
        </div>
        <div>
          <button class="btn btn-warning" @click="changeJSON()">Aplicar filtros</button>
        </div>

        <Chart :data="datacollection3" :options="options3" :change="change"></Chart>

        <h2>Pagos</h2>
        <div class="graphs-container-parent" @scroll="getScrollPosition3($event)">
          <div class="graphs-container" :style="'width:'+displaySize+'px'">
            <BarChart :chartData="datacollection1" :options="options1" :change="change"></BarChart>
          </div>
          <div> {{ axis3 }} </div>
        </div>
        <hr>
        <h2>Ingresos en USD y Accesos vigentes</h2>
        <div class="graphs-container-parent" @scroll="getScrollPosition($event)">
          <div class="graphs-container">
            <LineChart :chartData="datacollection4" :options="options4" :change="change"></LineChart>
          </div>
          <div> {{ axis4 }} </div>
        </div>
        <hr>
        <h2>Visitas</h2>
        <div class="graphs-container-parent" style="position:relative; overflow-x:hidden">
          <div class="graphs-container-scroll" :style="'width:'+displaySizeScroll+'px'" style=" position:absolute; top:0; left:30px; z-index:10; overflow-x:auto">
            <div class="graphs-container" :style="'width:'+displaySize+'px'">
              <BarChart :chartData="datacollection1" :options="options1" :change="change"></BarChart>
            </div>
          </div>
          <div class="graphs-container" :style="'width:'+displaySize+'px'" style=" position:absolute; top:0; left:0; z-index:5">
            <BarChart :chartData="datacollectionAxis1" :options="optionsAxis1" :change="change"></BarChart>
          </div>
          <canvas id="axis-Test" height="300" width="0"></canvas>
          <div> {{ axis1 }} </div>
        </div>
        <hr>
        <h2>Visitas promedio por dia</h2>
        <div class="checkbox-button-container-horizontal">
          <CheckboxButtons v-model="selection.day_mon">Lun</CheckboxButtons>
          <CheckboxButtons v-model="selection.day_tue">Mar</CheckboxButtons>
          <CheckboxButtons v-model="selection.day_wed">Mie</CheckboxButtons>
          <CheckboxButtons v-model="selection.day_thu">Jue</CheckboxButtons>
          <CheckboxButtons v-model="selection.day_fri">Vie</CheckboxButtons>
          <CheckboxButtons v-model="selection.day_sat">Sab</CheckboxButtons>
          <CheckboxButtons v-model="selection.day_sun">Dom</CheckboxButtons>
        </div>
        <div>
          <button class="btn btn-warning" @click="changeJSON()">Aplicar filtros</button>
        </div>
        <div class="graphs-container-parent">
          <div class="graphs-container">
            <LineChart :chartData="datacollection2" :options="options2" :change="change"></LineChart>
          </div>
          <div> {{ axis2 }} </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios'
import LineChart from '../components/charts/Line.vue'
import BarChart from '../components/charts/Bar.vue'
import Chart from '../components/charts/Chart.vue'
import CheckboxButtons from '../components/CheckboxButtons.vue'
import RadioButtons from '../components/RadioButtons.vue'
import { constants } from 'fs'

export default {
  data () {
    return {
      datacollection1: {
        labels: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#ffab00',
            data: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
          }
        ]
      },
      datacollectionAxis1: {
        labels: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#ffab0000',
            data: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
          }
        ]
      },
      datacollection2: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#ffab0070',
            borderColor: '#ffab00',
            data: []
          }
        ]
      },
      datacollection3: {
        labels: [],
        datasets: [
          {
            yAxisID: 'y2',
            label: 'Data Two',
            backgroundColor: '#616161',
            borderColor: '#616161',
            data: [],
            type: 'line',
            lineTension: 0,
            fill: false
          },
          {
            yAxisID: 'y1',
            label: 'Data One',
            backgroundColor: '#ffab00',
            data: []
          }
        ]
      },
      datacollection4: {
        labels: [],
        datasets: [
          {
            yAxisID: 'y1',
            label: 'Data One',
            backgroundColor: '#ffab0070',
            borderColor: '#ffab00',
            data: [],
            lineTension: 0.1
          },
          {
            yAxisID: 'y2',
            label: 'Data Two',
            backgroundColor: '#61616170',
            borderColor: '#616161',
            data: [],
            lineTension: 0.1
          }
        ]
      },
      options1: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        display: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              display: true,
              fontColor: '#00000000'
            }
          }]
        }
      },
      optionsAxis1: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        display: false,
        scales: {
          yAxes: [{
            display: true,
            gridLines: {
              display: false,
              color: '#00000000'
            },
            ticks: {
              min: 0,
              mirror: false,
              display: true
            }
          }],
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            ticks: {
              display: true,
              fontColor: '#00000000'
            }
          }]
        }
      },
      options2: {
        legend: {
          display: false
        },
        animation: true,
        responsive: true,
        maintainAspectRatio: false,
        display: true,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              mirror: true,
              padding: -10,
              display: 'top'
            }
          }]
        }
      },
      options3: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            id: 'y1',
            ticks: {
              min: 0
            }
          },
          {
            id: 'y2',
            position: 'right',
            ticks: {
              min: 0
            }
          }]
        }
      },
      options4: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            id: 'y1',
            ticks: {
              min: 0
            }
          },
          {
            id: 'y2',
            position: 'right',
            ticks: {
              min: 0
            }
          }]
        }
      },
      change: 0,
      axis1: 'Axis 1',
      axis2: 'Axis 2',
      axis3: 'Axis 3',
      axis4: 'Axis 4',
      serverRequestJSONdefault: {
        'gym_id': 'uf',
        'x': 'day',
        'currency': "'USD'",
        'gender_m': "'m'",
        'gender_f': "'f'",
        'occ_student': "'Student','Estudiante'",
        'occ_self': "'Self employed','Emprendedor'",
        'occ_emplo': "'Empleado','Employee'",
        'occ_othr': "'Otro','Other'",
        'occ_null': "'',NULL",
        'age_0_20': "'0-20'",
        'age_21_30': "'21-30'",
        'age_31_40': "'31-40'",
        'age_41_50': "'41-50'",
        'age_50_plus': "'51+'",
        'age_null': "'NULL'",
        'day_sun': '1',
        'day_mon': '2',
        'day_tue': '3',
        'day_wed': '4',
        'day_thu': '5',
        'day_fri': '6',
        'day_sat': '7'
      },
      selection: {
        'gender_m': true,
        'gender_f': true,
        'occ_student': true,
        'occ_self': true,
        'occ_emplo': true,
        'occ_othr': true,
        'occ_null': true,
        'age_0_20': true,
        'age_21_30': true,
        'age_31_40': true,
        'age_41_50': true,
        'age_50_plus': true,
        'age_null': true,
        'day_sun': true,
        'day_mon': true,
        'day_tue': true,
        'day_wed': true,
        'day_thu': true,
        'day_fri': true,
        'day_sat': true
      },
      displayQuantity: 30,
      displaySize: 500,
      displaySizeScroll: 500
    }
  },
  components: {
    Chart,
    LineChart,
    BarChart,
    CheckboxButtons,
    RadioButtons
  },
  created () {
    this.changeJSON()
  },
  mounted () {
    this.getSizes()
  },
  methods: {
    getScrollPosition1 (e) {
      console.log(e.target.scrollLeft)
      this.options1.scales.yAxes[0].ticks.padding = (e.target.scrollLeft + 10) * -1
      this.options1.animation = false
      this.change++
    },
    getSizes () {
      document.getElementsByClassName('graphs-container-parent')[0].clientWidth
      console.log(this.$refs)
    },
    changeJSON () {
      let jsonString = JSON.stringify(this.serverRequestJSONdefault)
      let serverRequestJSON = JSON.parse(jsonString)

      if (!this.selection.gender_m) {
        serverRequestJSON.gender_m = "'xxx'"
      }
      if (!this.selection.gender_f) {
        serverRequestJSON.gender_f = "'xxx'"
      }
      if (!this.selection.occ_student) {
        serverRequestJSON.occ_student = "'xxx'"
      }
      if (!this.selection.occ_self) {
        serverRequestJSON.occ_self = "'xxx'"
      }
      if (!this.selection.occ_emplo) {
        serverRequestJSON.occ_emplo = "'xxx'"
      }
      if (!this.selection.occ_othr) {
        serverRequestJSON.occ_othr = "'xxx'"
      }
      if (!this.selection.occ_null) {
        serverRequestJSON.occ_null = "'xxx'"
      }
      if (!this.selection.age_0_20) {
        serverRequestJSON.age_0_20 = "'xxx'"
      }
      if (!this.selection.age_21_30) {
        serverRequestJSON.age_21_30 = "'xxx'"
      }
      if (!this.selection.age_31_40) {
        serverRequestJSON.age_31_40 = "'xxx'"
      }
      if (!this.selection.age_41_50) {
        serverRequestJSON.age_41_50 = "'xxx'"
      }
      if (!this.selection.age_50_plus) {
        serverRequestJSON.age_50_plus = "'xxx'"
      }
      if (!this.selection.age_null) {
        serverRequestJSON.age_null = "'xxx'"
      }
      if (!this.selection.day_sun) {
        serverRequestJSON.day_sun = '8'
      }
      if (!this.selection.day_mon) {
        serverRequestJSON.day_mon = '8'
      }
      if (!this.selection.day_tue) {
        serverRequestJSON.day_tue = '8'
      }
      if (!this.selection.day_wed) {
        serverRequestJSON.day_wed = '8'
      }
      if (!this.selection.day_thu) {
        serverRequestJSON.day_thu = '8'
      }
      if (!this.selection.day_fri) {
        serverRequestJSON.day_fri = '8'
      }
      if (!this.selection.day_sat) {
        serverRequestJSON.day_sat = '8'
      }
      this.serverRequest(serverRequestJSON)
      // console.log(serverRequestJSON)
    },

    serverRequest (x) {
      this.$store.commit('showLoading', true)
      axios.post('php/testeando_v6.php', x)
        .then(res => {
          this.$store.commit('showLoading', false)
          console.log(res.data.graph1)
          // graph1
          this.axis1 = this.axis(x)
          this.datacollection1.datasets[0].label = 'Visitas'
          this.datacollection1.labels = []
          this.datacollectionAxis1.labels = []
          this.datacollection1.datasets[0].data = []
          this.datacollectionAxis1.datasets[0].data = []

          res.data.graph1.forEach((item) => {
            this.datacollection1.labels.push(item.x)
            this.datacollectionAxis1.labels.push(item.x)
            this.datacollection1.datasets[0].data.push(item.y)
            this.datacollectionAxis1.datasets[0].data.push(item.y)
          })
          this.displaySizeScroll = document.getElementsByClassName('graphs-container-parent')[1].clientWidth
          if (this.datacollection1.labels.length > this.displayQuantity) {
            this.displaySize = document.getElementsByClassName('graphs-container-parent')[1].clientWidth * this.datacollection1.labels.length / this.displayQuantity
          } else {
            this.displaySize = document.getElementsByClassName('graphs-container-parent')[1].clientWidth
          }
          // graph2
          this.axis2 = 'Horas'
          this.datacollection2.datasets[0].label = 'Visitas Promedio'
          this.datacollection2.labels = []
          this.datacollection2.datasets[0].data = []

          res.data.graph2.forEach((item) => {
            this.datacollection2.labels.push(item.x)
            this.datacollection2.datasets[0].data.push(item.y)
          })
          // graph3
          this.axis3 = this.axis(x)
          this.datacollection3.datasets[0].label = 'Cantidad de Pagos'
          this.datacollection3.datasets[1].label = 'Ingresos en USD'
          this.datacollection3.labels = []
          this.datacollection3.datasets[0].data = []
          this.datacollection3.datasets[1].data = []

          res.data.graph3.forEach((item) => {
            this.datacollection3.labels.push(item.x)
            this.datacollection3.datasets[0].data.push(item.y1)
            this.datacollection3.datasets[1].data.push(item.y2)
          })
          // graph4
          this.axis4 = this.axis(x)
          this.datacollection4.datasets[0].label = 'Accesos Vigentes'
          this.datacollection4.datasets[1].label = 'Ingresos por Periodo'
          this.datacollection4.labels = []
          this.datacollection4.datasets[0].data = []
          this.datacollection4.datasets[1].data = []

          res.data.graph4.forEach((item) => {
            this.datacollection4.labels.push(item.x)
            this.datacollection4.datasets[0].data.push(item.y1)
            this.datacollection4.datasets[1].data.push(item.y2)
          })
          this.change++
        })
        .catch(error => {
          this.$store.commit('showLoading', false)
          console.log(error)
        })
    },
    axis (x) {
      if (x == 'day') {
        return 'Dias'
      }
      if (x == 'week') {
        return 'Semanas'
      }
      if (x == 'month') {
        return 'Meses'
      }
    },
    fillData () {
      this.datacollection = {
        labels: ['January', 'February', 'March', 'April', 'May'],
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
.card{
  margin:10px;
  /* background-color: rgba(0,0,0,0.2);
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem; */
}
.radio-button-container, .checkbox-button-container-horizontal{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.checkbox-button-container-horizontal{
  margin-top:20px;
}
.checkbox-button-container-horizontal label{
  margin-left:15px;
}
.checkbox-button-container-parent{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.checkbox-button-container{
  display: flex;
  flex-direction: column;
  margin: 3px 5px;
  align-items: start;
}
h2{
  margin-top:40px;
}
.graphs-container-parent{
  overflow-x: auto;
}
.graphs-container{
  margin: 0;
}
.checkbox-title{
  font-weight: bold;
  margin-left: 5px;
}
@media only screen and (min-width: 576px) {
  .graphs{
    padding: 0 10px;
  }
  h2{
    margin-top:60px;
  }
  .graphs-container-parent{
    margin: 0 100px;
  }
  .checkbox-button-container{
  margin: 3px 15px;
  }
}
</style>
