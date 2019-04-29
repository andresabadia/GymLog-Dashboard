<template>
  <div id="tooltip">
    <div class="tooltip-container">
      <button class="tooltip-icon" @focus="showTooltip=true" @blur="showTooltip=false"><i class="fas fa-info-circle"></i></button>      
      <div :class="'tooltip-content-'+direction" v-if="showTooltip"><slot></slot></div>
    </div>
  </div>
    
</template>
<script>
export default {
  data(){
    return{
      showTooltip: false
    }
  },
  props:['direction']
}
</script>
<style scoped>
#tooltip{
  display: inline-block;
}
.tooltip-container{
  position:relative;
  display: inline-block;
}
.tooltip-icon{
  font-size: 110%;
  background: unset;
  border: unset;
  padding: unset;
  color:inherit;
  /* color:#ffab00; */
}
.tooltip-icon:focus{
  outline: unset;
}
.tooltip-content-down{
  width: 220px;
  background-color: #424242e0;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 3;
  top: 110%;
  left: 50%;
  margin-left: -165px;
  font-size: 0.75rem;
  font-weight: normal;
}
.tooltip-content-down::after{
  content: "";
  position: absolute;
  bottom: 100%;
  left: 75%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #424242e0 transparent;
}
.tooltip-content-up {
  width: 220px;
  background-color: #424242e0;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 3;
  bottom: 110%;
  left: 50%;
  margin-left: -165px;
  font-size: 0.75rem;
  font-weight: normal;
}
.tooltip-content-up::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 75%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #424242e0 transparent transparent transparent;
}
</style>


