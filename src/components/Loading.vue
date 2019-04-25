<template>
    <div class="loading">        
        <Spinner></Spinner>
    </div>
</template>
<script>
import Spinner from './Spinner.vue'
export default {
    components:{
        Spinner
    }
    
}
</script>
<style scoped>
.loading{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    background: #000000c2;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
}
</style>
