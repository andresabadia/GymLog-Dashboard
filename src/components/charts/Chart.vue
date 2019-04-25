<template>
    <div class="chart-overall-container">
        <div class="chart-title">Title</div>
        <div class="chart-elements-container">
            <div class="chart-y1-axis" :style="'width:'+y1Width+'px'">
                <div class="chart-container" :style="'width:' + width + 'px'">
                    <BarChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-if="chartType"></BarChart>
                    <LineChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-else></LineChart>
                </div>
            </div>
            <div class="chart-scroll-container">
                <div class="chart-container" :style="'width:' + width + 'px'">
                    <BarChart :chartData="chartData()" :options="chartOptions()" :change="change" v-if="chartType"></BarChart>
                    <LineChart :chartData="chartData()" :options="chartOptions()" :change="change" v-else></LineChart>
                </div>
            </div>
            <div class="chart-y2-axis" :style="'width:'+y2Width+'px'" v-if="y2Axis">
                <div class="chart-container" :style="'width:' + width + 'px'">
                    <BarChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-if="chartType"></BarChart>
                    <LineChart :chartData="chartData(true)" :options="chartOptions(true)" :change="change" v-else></LineChart>
                </div>
            </div>
        </div>
        <div class="chart-legend">legend</div>
    </div>
</template>

<script>
import BarChart from './Bar.vue'
import LineChart from './Line.vue'
export default {
    data(){
        return{
            y1Width:200,
            y2Width:200,
            // datacollectionDefault: {
            //     labels: [10,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,8],
            //     datasets: [
            //     {
            //         label: 'Data One',
            //         backgroundColor: '#ffab00',
            //         data: [10,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,8]
            //     }
            //     ]
            // },
            datacollectionDefault: {
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
            optionsDefault:{        
                legend:{
                    display:false
                },
                responsive: true,
                maintainAspectRatio: false,
                scales:{
                    yAxes: [{                        
                        id: 'y1',
                        gridLines:{
                            display:true,
                        },
                        ticks:{
                            min: 0,    
                        }
                    },
                    {
                        id: 'y2',
                        position: 'right',
                        gridLines:{
                            display:true,
                        },
                        ticks:{
                            min: 0,        
                        }
                    }] ,
                    xAxes:[{
                        gridLines:{
                            display:true
                        },
                        ticks:{
                            display:true,
                        }
                    }]        
                }
            },
            y2Axis:false
        }
    },
    props:[
        'id',
        'change',
        'data',
        'options',
        'type'
    ],
    components:{
        BarChart,
        LineChart
    },
    computed:{
        width(){
            return 2500
        },
        chartType(){
            if(this.type==undefined || this.type=='bar'){
                return true
            } else if(this.type=='line'){
                return false
            }
        }
    },
    methods:{
        chartData(axis){
            let jsonString
            let json
            if(this.data == undefined){
                jsonString = JSON.stringify(this.datacollectionDefault)
            } else {
                jsonString = JSON.stringify(this.data)                
            }
            json = JSON.parse(jsonString)            
            if(json.datasets.length>1){
                this.y2Axis = true
            }
            if(axis){ //axis set to true set backgroundColor transparent
                for(let i=0; i<json.datasets.length; i++){
                    json.datasets[i].backgroundColor = '#ffab0000'
                    json.datasets[i].borderColor = '#ffab0000'
                }
            }           
            return json
        },
        chartOptions(axis){
            let jsonString
            let json
            if(this.options == undefined){
                jsonString = JSON.stringify(this.optionsDefault)
            } else {
                jsonString = JSON.stringify(this.options)                
            }
            json = JSON.parse(jsonString)
            if(axis){ 
                for(let i=0; i<json.scales.yAxes.length; i++){
                    json.scales.yAxes[i].gridLines.color='#00000000'   
                    json.scales.yAxes[i].gridLines.zeroLineColor='#00000000'
                }
                for(let i=0; i<json.scales.xAxes.length; i++){
                    json.scales.xAxes[i].gridLines.color='#00000000'  
                    json.scales.xAxes[i].ticks.fontColor='#00000000' 
                }      
            } else {
                json.scales.yAxes[0].ticks.fontColor='#00000000' 
                json.scales.yAxes[1].ticks.fontColor='#00000000' 
            }
            return json
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
    
}
.chart-elements-container{
    display:flex;
}
.chart-container{

}
.chart-y1-axis, .chart-y2-axis{
    position: relative;
    overflow: hidden;
    flex-grow: 0;
    flex-shrink: 0;
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

}
</style>
