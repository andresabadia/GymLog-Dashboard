<template>
  <div class="about">
    <h1>This is an tables page</h1>
    <p>{{date('2019-04-25 21:59:12.718')}} - {{formatedDate('2019-04-25 21:59:12.718')}}</p>
    <Chart></Chart>
  </div>
</template>
<script>
// var moment = require('moment');
// var x = moment().format()
import EmmaLouise from '../components/charts/EmmaLouise.vue'
import Chart from '../components/charts/Chart.vue'
export default {
  data(){
    return{
      // chartDataProp,
      // chartLabelsProp
    }
  },
  components:{
    EmmaLouise,
    Chart
  },
  methods:{
    date(date) {
      return moment(date).fromNow();
    },
    formatedDate(date){
      return moment(date).format('dddd D [de] MMMM YYYY, h:mm a')
    }
  }
}
</script>
