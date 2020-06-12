<template>
  <div class="graphs">
    <div class="card bg-light">
      <div class="card-header">
          <h3>Análisis intertemporal</h3>
      </div>
      <div class="card-body">
        <form>
        <div class="radio-button-container">
          <RadioButtons radioValue="day" @change="changeSelection" :value="selection.x">Dia</RadioButtons>
          <RadioButtons radioValue="week" @change="changeSelection" :value="selection.x">Semana</RadioButtons>
          <RadioButtons radioValue="month" @change="changeSelection" :value="selection.x">Mes</RadioButtons>
        </div>
        </form>
        <button class="btn btn-color-negative" @click="showFilters=!showFilters"><i class="fas fa-filter"></i> Filtrar <i class="fas fa-chevron-down" v-show="!showFilters"></i><i class="fas fa-chevron-up" v-show="showFilters"></i></button>
        <transition name="accordion"
          v-on:before-enter="beforeEnter" v-on:enter="enter"
          v-on:before-leave="beforeLeave" v-on:leave="leave">
          <div class="graphs-filters" v-show="showFilters">
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
              <button class="btn btn-color-primary" @click="changeJSON()">Aplicar filtros</button>
            </div>
          </div>
        </transition>

        <div class="graphs-chart-container">
          <Chart :data="datacollection3" :change="change" :width="width" :height="height" :displayQuantity="displayQuantity">Pagos <Tooltip direction="down">Muestra los ingresos en moneda (barras amarillas) así como la cantidad te pagos recibidos (línea gris) por unidad de tiempo.</Tooltip></Chart>
        </div>
        <hr>
        <div class="graphs-chart-container">
          <Chart :data="datacollection4" :change="change" :width="width" :height="height" :displayQuantity="displayQuantity" :type="'line'">Ingresos en {{currency}}<br>y Accesos vigentes <Tooltip direction="down">Muestra los accesos vigentes y los ingresos correspondientes a un periodo dado (día, semana o mes). Accesos vigentes se refiere al conteo de los clientes que en tuvieron acceso pagado al gimnasio en un cierto día (o durante algún día de esa semana o mes). Ingresos se refiere a la suma de los ingresos distribuidos por el periodo de pago. <i>Por Ejemplo: imaginemos que tu negocio solo tiene 2 clientes, Juan y Pedro. Hoy es el primer día del mes y Juan viene y te paga 30 USD por un mes de acceso y Pedro viene y te paga 14 USD por una semana de acceso. Entonces Juan te está pagando 1 USD por día (dado que tiene 30 días de acceso) y Pedro te esta pagando 2 USD por día de acceso dado que 14/7=2. En este ejemplo durante la primera semana del mes tu conteo de accesos seria de 2 dado que en esta semana 2 clientes tienen derecho a visitar tus instalaciones y tus ingresos serian de 3 USD por cada día de la semana (1 USD de Juan + 2 USD de Pedro). Pasada la primera semana del mes, tu conteo de accesos bajaría a 1 dado que el acceso de Pedro caducó y tus ingresos bajarían a 1 USD por día por el resto del mes.</i></Tooltip></Chart>
        </div>
        <hr>
        <div class="graphs-chart-container">
          <Chart :data="datacollection1" :change="change" :width="width" :height="height" :displayQuantity="displayQuantity">Visitas <Tooltip direction="down">Muestra el conteo de las visitas a las instalaciones por unidad de tiempo. Una visita se cuenta como un usuario visitando las instalaciones en un día dado. <i>Por ejemplo: Si Juan visita el gimnasio hoy y luego vuelve a venir mañana, eso se cuenta como dos visitas; pero si Juan visita el gimnasio hoy por la mañana y hoy por la tarde eso se cuenta como una sola visita.</i></Tooltip></Chart>
        </div>
        <hr>
        <div class="graphs-chart-container">
          <Chart :data="datacollection2" :change="change" :width="width" :height="height" :displayQuantity="30" :type="'line'">Visitas promedio por hora <Tooltip direction="down">Muestra el conteo de las visitas promedio a las instalaciones por hora del día. Cada punto indica a las personas llegadas de las XX:00 a las XX:59. Los filtros adicionales permiten restringir el grafico a días específicos de la semana.</Tooltip></Chart>
        </div>
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
          <button class="btn btn-color-primary" @click="changeJSON()">Aplicar filtros</button>
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
import Tooltip from '../components/Tooltip.vue'
import Store from '../store.js'

export default {
  data () {
    return {
      datacollection1: {
        labels: [],
        datasets: [
          {
            label: 'Visitas',
            backgroundColor: '#ffab00',
            data: []
          }
        ]
      },
      datacollection2: {
        labels: [],
        datasets: [
          {
            label: 'Visitas Promedio',
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
            label: 'Cantidad de Pagos',
            backgroundColor: '#616161',
            borderColor: '#616161',
            data: [],
            type: 'line',
            lineTension: 0,
            fill: false
          },
          {
            yAxisID: 'y1',
            label: 'Ingresos en USD',
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
            label: 'Accesos Vigentes',
            backgroundColor: '#ffab0070',
            borderColor: '#ffab00',
            data: [],
            lineTension: 0.1
          },
          {
            yAxisID: 'y2',
            label: 'Ingresos por Periodo',
            backgroundColor: '#61616170',
            borderColor: '#616161',
            data: [],
            lineTension: 0.1
          }
        ]
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
        'x': 'day',
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
      displaySizeScroll: 500,

      width: 2500,
      height: 350,

      windowWidth: 0,
      windowHeight: 0,

      showFilters: false
    }
  },
  props: [
    'currency'
  ],
  components: {
    Chart,
    LineChart,
    BarChart,
    CheckboxButtons,
    RadioButtons,
    Tooltip
  },
  watch: {
    displayQuantity () {
      this.change++
    },
    height () {
      this.change++
    },
    currency () {
      this.changeJSON()
    }
  },
  created () {
    this.changeJSON()
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
      window.addEventListener('resize', this.getWindowHeight)

      // Init
      this.getWindowWidth()
      this.getWindowHeight()
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth)
    window.removeEventListener('resize', this.getWindowHeight)
  },
  methods: {
    beforeEnter: function (el) {
      el.style.height = '0'
    },
    enter: function (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave: function (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave: function (el) {
      el.style.height = '0'
    },
    changeSelection (newValue) {
      this.selection.x = newValue
      this.changeJSON()
    },
    getWindowWidth (event) {
      this.windowWidth = document.documentElement.clientWidth
      this.changeDisplayQuantity()
    },
    getWindowHeight (event) {
      this.windowHeight = document.documentElement.clientHeight
      this.changeChartHeight()
    },
    changeDisplayQuantity () {
      this.width = this.windowWidth
      if (this.windowWidth < 576) {
        this.displayQuantity = 25
      } else if (this.windowWidth < 768 && this.windowWidth >= 576) {
        this.displayQuantity = 30
      } else if (this.windowWidth < 992 && this.windowWidth >= 768) {
        this.displayQuantity = 40
      } else if (this.windowWidth >= 992) {
        this.displayQuantity = 60
      }
    },
    changeChartHeight () {
      if (this.windowHeight < 500) {
        this.height = this.windowHeight - 100
      } else {
        this.height = 400
      }
    },
    changeJSON () {
      let jsonString = JSON.stringify(this.serverRequestJSONdefault)
      let serverRequestJSON = JSON.parse(jsonString)

      serverRequestJSON.x = this.selection.x
      serverRequestJSON.currency = "'" + this.currency + "'"
      serverRequestJSON.gym_id = Store.state.glUser.gym_id

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
      // console.log('request ',serverRequestJSON)
      this.serverRequest(serverRequestJSON)
    },

    serverRequest (x) {
      this.$store.commit('showLoading', true)
      axios.post('php/testeando_v6.php', x)
        .then(res => {
          // this.$store.commit('showLoading', false)
          // console.log('response ', res.data.graph1)
          // graph1
          this.axis1 = this.axis(x)
          this.datacollection1.datasets[0].label = 'Visitas'
          this.datacollection1.labels = []
          this.datacollection1.datasets[0].data = []

          res.data.graph1.forEach((item) => {
            this.datacollection1.labels.push(item.x)
            this.datacollection1.datasets[0].data.push(item.y)
          })
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
          this.datacollection3.datasets[1].label = 'Ingresos en ' + this.currency
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
          this.$store.commit('showLoading', false)
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
.graphs-filters{
  margin-top:5px;
  padding: 10px 0;
  background-color: #6161610f;
  border-radius: 5px;
  box-shadow: 0px 0px 5px;
  overflow:hidden;
  transition: 150ms ease-out;
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
.graphs-chart-container{
  margin: 0;
  margin-top: 40px;
}
.checkbox-title{
  font-weight: bold;
  margin-left: 5px;
}
@media only screen and (min-width: 576px) {
  .graphs{
    padding: 0 10px;
  }
  .graphs-filters{
    padding: 10px 5px;
  }
  .checkbox-button-container{
  margin: 3px 15px;
  }
  .graphs-chart-container{
    margin: 0 10px;
    margin-top: 50px;
  }
}
@media only screen and (min-width: 1200px) {
  /* .card{
    margin: 10px auto;
  } */
}
</style>
