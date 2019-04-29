<template>
  <div id="youtube">
    <div class="youtube-question" :class="showData?'youtube-question-selected':''" @click="showData=!showData">{{question}} <i class="fas fa-chevron-down" v-show="!showData"></i><i class="fas fa-chevron-up" v-show="showData"></i></div>
      <transition name="accordion"
      v-on:before-enter="beforeEnter" v-on:enter="enter"
      v-on:before-leave="beforeLeave" v-on:leave="leave">
      <div class="youtube-video-container-wrapper" v-if="showData">
        <div class="youtube-video-container">
          <iframe :src='"https://www.youtube-nocookie.com/embed/"+linkId+"?rel=0"'  frameborder="0" allowfullscreen="allowfullscreen"></iframe>
        </div>   
      </div>
    </transition>
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
    'linkId'
  ],
  methods:{
    beforeEnter: function(el) {
      el.style.height = '0';
    },
    enter: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    beforeLeave: function(el) {
      el.style.height = el.scrollHeight + 'px';
    },
    leave: function(el) {
      el.style.height = '0';
    }
  }
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
  margin-top: 20px;
  margin-bottom: 10px;
}
.youtube-question:hover{
  color:#ffab00;
  text-decoration: underline;
}
.youtube-question-selected{
  color:#ffab00;
}
.youtube-video-container-wrapper {
  max-width: 100%;
  width: 600px;
  left: 0;
  right:0;
  margin:auto;
  overflow:hidden;
  transition: 150ms ease-out;
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
