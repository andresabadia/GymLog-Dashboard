<template>
    <label class="checkbox-container"><slot></slot>
      <input type="checkbox" :value="value" :checked="value?'checked':''" @input="$emit('input', $event.target.checked)">
      <span class="checkmark"></span>
    </label>
</template>
<script>
export default {
  props: [
    'value'
  ]
}
</script>
<style scoped>
/* The checkbox-container */
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 28px;
  margin-bottom: 12px;
  margin-left: 5px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkmark {
  background-color: #424242;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 7px;
  height: 13px;
  border: solid #FFAB00;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
</style>
