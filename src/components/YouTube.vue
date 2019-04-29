<template>
  <div id="youtube">
    <div class="youtube-question" @click="showData=!showData">&#8226; {{question}} </div>
    <div class="youtube-video-container-wrapper" v-if="showData">
      <div class="youtube-video-container">
        <slot></slot>
      </div>   
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      showData: false,
    }
  },
  props:[
    'question',
    'tag'
  ],
  // mounted(){
  //   let youtubeVideoContainer = document.
  // }
}
</script>

<style scoped>
.youtube-question{
  display: inline-block;  
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: normal;
  margin-top:20px;
  margin-bottom: 10px;
}
.youtube-question:hover{
  color:#ffab00;
  text-decoration: underline;

}
.youtube-video-container-wrapper {
  max-width: 100%;
  width: 600px;
  left: 0;
  right:0;
  margin:auto;
}
.youtube-video-container {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
}

.youtube-video-container iframe,
.youtube-video-container object,
.youtube-video-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
