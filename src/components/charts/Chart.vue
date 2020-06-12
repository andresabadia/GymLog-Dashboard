<template>
    <div class="chart-overall-container" @dbclick="resizeChart()">
        <div class="chart-title"><slot></slot></div>
        <div class="chart-elements-container">
            <div class="chart-y1-axis" :style="'width:'+y1Width+'px; height:'+height+'px'">
                <div :class="classId" class="chart-container" :style="'width:' + widthDefault + 'px; height:'+height+'px'">
                    <BarChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-if="chartType"></BarChart>
                    <LineChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-else></LineChart>
                </div>
            </div>
            <div :id="id" class="chart-scroll-container">
                <div :class="classId" class="chart-container" :style="'width:' + widthDefault + 'px; height:'+height+'px'">
                    <BarChart :chartData="chartData()" :options="chartOptions()" :change="change" v-if="chartType"></BarChart>
                    <LineChart :chartData="chartData()" :options="chartOptions()" :change="change" v-else></LineChart>
                </div>
            </div>
            <div class="chart-y2-axis" :style="'width:'+y2Width+'px; height:'+height+'px'" v-if="y2Axis">
                <div :class="classId" class="chart-container" :style="'width:' + widthDefault + 'px; height:'+height+'px'">
                    <BarChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-if="chartType"></BarChart>
                    <LineChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-else></LineChart>
                </div>
            </div>
        </div>
        <div class="chart-legend">
            <div v-for="(dataset) in chartData().datasets" :key="dataset.label" class="chart-legend-child"><div :style="'margin:0 5px; height:13px; width:13px; background:'+dataset.backgroundColor+';'"></div><div>{{dataset.label}}</div></div>
        </div>
    </div>
</template>

<script>
import BarChart from './Bar.vue'
import LineChart from './Line.vue'
export default {
  data () {
    return {
      y1Width: 40,
      y2Width: 40,
      datacollectionDefault: {
        labels: [],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#ffab00',
            data: []
          }
        ]
      },
      optionsDefault: {
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            id: 'y1',
            gridLines: {
              display: true
            },
            ticks: {
              min: 0
            }
          },
          {
            id: 'y2',
            position: 'right',
            gridLines: {
              display: true
            },
            ticks: {
              min: 0
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              display: true
            }
          }]
        }
      },
      y2Axis: false,
      id: '',
      classId: '',
      widthDefault: 2500
    }
  },
  props: [
    'change',
    'data',
    'options',
    'type',
    'width',
    'height',
    'displayQuantity'
  ],
  components: {
    BarChart,
    LineChart
  },
  watch: {
    change () {
      // this.id = this.makeUniqueID()
      this.setSizes()
    },
    width () {
      this.widthDefault = this.width
      this.setSizes()
    }
  },
  created () {
    this.id = this.makeUniqueID()
    this.classId = this.makeUniqueID()
  },
  mounted () {
    this.setSizes()
  },
  computed: {
    chartType () {
      if (this.type == undefined || this.type == 'bar') {
        return true
      } else if (this.type == 'line') {
        return false
      }
    }
  },
  methods: {
    setSizes () {
      let displayQuantity = this.chartQuantity()
      let scrollContainer = document.getElementById(this.id)
      let dataSize = this.chartData().labels.length
      if (dataSize > displayQuantity) {
        this.widthDefault = scrollContainer.offsetWidth * dataSize / displayQuantity
      } else {
        this.widthDefault = scrollContainer.offsetWidth
      }
      this.responsiveChart()
    },
    responsiveChart () {
      let chartContainers = document.getElementsByClassName(this.classId)
      for (let i = 0; i < chartContainers.length; i++) {
        chartContainers[i].firstElementChild.style.position = 'relative'
        chartContainers[i].firstElementChild.style.width = this.widthDefault + 'px'
        chartContainers[i].firstElementChild.style.height = this.height + 'px'
      }
      document.getElementById(this.id).scrollLeft = document.getElementById(this.id).scrollWidth
    },
    chartQuantity () {
      if (this.displayQuantity == undefined) {
        return 30
      } else {
        return this.displayQuantity
      }
    },
    chartData (axis) {
      let jsonString
      let json
      if (this.data == undefined) {
        jsonString = JSON.stringify(this.datacollectionDefault)
        // json = this.datacollectionDefault
      } else {
        jsonString = JSON.stringify(this.data)
        // json = this.data
      }
      json = JSON.parse(jsonString)
      if (json.datasets.length > 1) {
        this.y2Axis = true
      } else {
        this.optionsDefault.scales.yAxes[1].gridLines.display = false
      }
      if (axis) { // axis set to true set backgroundColor transparent
        json.datasets.forEach(element => {
          element.backgroundColor = '#ffab0000'
          element.borderColor = '#ffab0000'
        })
      }
      return json
    },
    chartOptions (axis) {
      let jsonString
      let json
      if (this.options == undefined) {
        jsonString = JSON.stringify(this.optionsDefault)
        // json = this.optionsDefault
      } else {
        jsonString = JSON.stringify(this.options)
        // json = this.options
      }
      json = JSON.parse(jsonString)
      if (axis) {
        json.scales.yAxes.forEach(element => {
          element.gridLines.color = '#00000000'
          element.gridLines.zeroLineColor = '#00000000'
        })
        json.scales.xAxes.forEach(element => {
          element.gridLines.color = '#00000000'
          element.gridLines.zeroLineColor = '#00000000'
          element.ticks.fontColor = '#00000000'
        })
      } else {
        json.scales.yAxes[0].ticks.fontColor = '#00000000'
        json.scales.yAxes[1].ticks.fontColor = '#00000000'
      }
      return json
    },
    makeUniqueID () {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 8; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

      return text + new Date().getTime().toString(36)
    }
  }
}
</script>

<style scoped>
.chart-overall-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
}
.chart-title{
    font-weight: bold;
    font-size:110%;
    margin: 10px 0;
}
.chart-elements-container{
    display:flex;
    position: relative;
}
.chart-container{

}
.chart-y1-axis, .chart-y2-axis{
    position: absolute;
    overflow: hidden;
    flex-grow: 0;
    flex-shrink: 0;
    z-index:2;
}
.chart-y1-axis{
    left: -5px;
}
.chart-y2-axis{
    right: 0;
}
.chart-y2-axis > div{
    position: absolute;
    right: 0;
}
.chart-scroll-container{
    flex-grow: 1;
    overflow-x: auto;
}
.chart-legend{
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.chart-legend-child{
  display: flex;
  align-items: center;
  margin: 0 10px;
}
</style>
