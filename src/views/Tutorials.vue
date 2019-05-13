<template>
  <div class="tutorials">
    <div class="tutorials-title">
      <div>Video tutoriales</div>
      <p></p>
      <you-tube v-for="yTube in youtube" :question="yTube.question" :linkId="yTube.linkId" :key="yTube.linkId"></you-tube>      
    </div> 
  </div>
</template>

<script>
import Store from '../store.js'
import YouTube from '../components/YouTube.vue'
export default {
  created(){
    this.$store.dispatch('asyncSetDate')
  },
  beforeRouteEnter (to, from, next) {
    // console.log('this store: ',Store.state.userId)
    if(Store.state.userId){
    // if(true){
      next()
    } else {
      next(false)
    }
  },
  data(){
    return{
      youtube:[
        {
          question:'¿Cómo agregar un cliente nuevo?',
          linkId:'AlD9mCWtYRs',
        },
        {
          question:'¿Cómo modificar los datos de un cliente existente?',
          linkId:'zXRYrxNeO0s',
        },
        {
          question:'¿Cómo registrar un nuevo pago?',
          linkId:'tHdjxYBqU18',
        },
        {
          question:'¿Qué puedo hacer en la vista de ajustes?',
          linkId:'s1WXbadWnyg',
        },
        {
          question:'¿Cómo enviar un recordatorio de pago a clientes cuyo acceso esta por expirar?',
          linkId:'SmRiY3hwFNE',
        },
        {
          question:'¿Cómo realizar un respaldo manual de datos?',
          linkId:'Dlpvqe1Q8FQ',
        },
        {
          question:'¿Cómo exportar todos los datos de la aplicacion desde mi dispositivo Android?',
          linkId:'CkgSbydrmJI',
        },
        {
          question:'¿Qué me ofrece la vista de visitas recientes?',
          linkId:'LQRJg2cUtS4'
        }
      ]
    }
  },
  components:{
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





