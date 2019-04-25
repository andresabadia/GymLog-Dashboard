<template>
  <div class="dashboard">
    <donuts></donuts>
    <graphs></graphs>
  </div>
</template>
<script>
import Donuts from './Donuts.vue'
import Graphs from './Graphs.vue'
export default {
  components: {
    Donuts,
    Graphs
  }
}
</script>
