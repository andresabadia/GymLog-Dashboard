<template>
    <label class="radio-container"><slot></slot>
        <input type="radio" :value="radioValue" name="radio" v-model="radioButtonValue">
        <span class="checkmark"></span>
    </label>
</template>
<script>
export default {
  props: [
    'value',
    'radioValue'
  ],
  computed: {
    radioButtonValue: {
      get () {
        return this.value
      },
      set () {
        this.$emit('change', this.radioValue)
      }
    }
  }
}
</script>
<style scoped>
/* The container */
.radio-container {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 12px;
  margin-right: 18px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.radio-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.radio-container input:checked ~ .checkmark {
  background-color: #FFAB00;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.radio-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.radio-container .checkmark:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #424242;
}
@media only screen and (min-width: 576px) {
.radio-container {
  padding-left: 35px;
  margin-right: 24px;
}
}
</style>
