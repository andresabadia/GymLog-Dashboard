<template>
  <div class="about">
    <h1>This is an tables page</h1>
    <p>{{date('2019-04-25 21:59:12.718')}} - {{formatedDate('2019-04-25 21:59:12.718')}}</p>
    <Chart :type="'line'"></Chart>
    <Chart></Chart>    
    <Chart :data="datacollection3" :change="change"></Chart>
  </div>
</template>
<script>
import Chart from '../components/charts/Chart.vue'
export default {
  data(){
    return{
      datacollection3: {
                labels: [10,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,8],
                datasets: [
                {
                    yAxisID: 'y2',
                    label: 'Data Two',
                    backgroundColor: '#616161',
                    borderColor: '#616161',
                    data: [10,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,8],
                    type: 'line',
                    lineTension: 0,
                    fill: false
                },
                {
                    yAxisID: 'y1',
                    label: 'Data One',
                    backgroundColor: '#ffab00',
                    data: [10,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,8]
                }
                ]
            },
            change:0
    }
  },
  components:{
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
