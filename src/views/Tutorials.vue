<template>
  <div class="tutorials">
    <div class="tutorials-title">
      <div>Video tutoriales</div>
      <p></p>
      <YouTube question="¿Cómo agregar un cliente nuevo?"> <iframe src="https://www.youtube-nocookie.com/embed/AlD9mCWtYRs?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
      <YouTube question="¿Cómo modificar los datos de un cliente existente?"> <iframe src="https://www.youtube-nocookie.com/embed/zXRYrxNeO0s?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
      <YouTube question="¿Cómo registrar un nuevo pago?"> <iframe src="https://www.youtube-nocookie.com/embed/tHdjxYBqU18?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
      <YouTube question="¿Qué puedo hacer en la vista de ajustes?"> <iframe src="https://www.youtube-nocookie.com/embed/s1WXbadWnyg?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
      <YouTube question="¿Cómo enviar un recordatorio de pago a clientes cuyo acceso esta por expirar?"> <iframe src="https://www.youtube-nocookie.com/embed/SmRiY3hwFNE?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
      <YouTube question="¿Cómo realizar un respaldo manual de datos?"> <iframe src="https://www.youtube-nocookie.com/embed/Dlpvqe1Q8FQ?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
      <YouTube question="¿Cómo exportar todos los datos de la aplicacion desde mi dispositivo Android?"> <iframe src="https://www.youtube-nocookie.com/embed/CkgSbydrmJI?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
      <YouTube question="¿Qué me ofrece la vista de visitas recientes?"> <iframe src="https://www.youtube-nocookie.com/embed/LQRJg2cUtS4?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe> </YouTube>
    </div> 
  </div>
</template>

<script>
import Store from '../store.js'
import Tooltip from '../components/Tooltip.vue'
import YouTube from '../components/YouTube.vue'
export default {
  beforeRouteEnter (to, from, next) {
    console.log('this store: ',Store.state.userId)
    // if(Store.state.userId){
    if(true){
      next()
    } else {
      next(false)
    }
  },
  data(){
    return{
      youtube:['<iframe src="https://www.youtube-nocookie.com/embed/AlD9mCWtYRs?rel=0"  frameborder="0" allowfullscreen="allowfullscreen"></iframe>'],
    }
  },
  components:{
    Tooltip,
    YouTube
  }
}
</script>
<style scoped>
.tutorials-title{
  margin:10px;  
  max-width: 1200px;    
  margin-top: 30px;
  margin-bottom: 30px;
}
.tutorials-title > div {
    font-size:1.75rem;
    line-height: 1;
 }
 .tutorials-title > p {
    font-size:0.8rem;
    color: #42424275;
 }
 @media only screen and (min-width: 1200px) {  
  .tutorials-title{
    margin: 10px auto;
  }
}
</style>





