<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  created(){
    this.$store.commit('checkUserId')
    if(this.$store.state.userId){
      this.$router.push('dashboard')
    } else {
      this.$router.push('login')
    }
  }
}
</script>
<style scoped>
img{height: 150px;}
</style>



