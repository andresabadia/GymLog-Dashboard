<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    change: {
      type: Number,
      default: null
    }
  },
  watch: {
    change () {
      this.renderChart(this.chartData, this.options)   
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>