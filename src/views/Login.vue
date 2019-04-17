<template>
  <div class="login">
    <h1>This is an login page</h1>
    <div class="login-form">
      <div class="form-group">
        <label>Username</label>
        <input type="email" class="form-control" placeholder="Username" v-model="username">
      </div>
      <div class="form-group">
        <label>Pin</label>
        <input type="password" class="form-control" placeholder="Pin" v-model="pin">
      </div>
      <button class="btn btn-primary" @click="login(username, pin)">Login</button>
      <br><br>
      <span>{{serverResponse}}</span>
    </div>
   
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      username:'',
      pin:'',
      serverResponse: ''
    }
  },
  methods: {
    login(username, pin){
      axios.post('php/login.php', {
        'user': username,
				'pin': pin
      })
        .then(res => {
            console.log(res.data)
            if (res.data.response == "OK"){
              sessionStorage.setItem('gl-user', JSON.stringify(res.data.content))
            } else if (res.data.response == "FAILED") {
              this.serverResponse = res.data.content
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
  }
}
</script>

<style>
  .login-form{
    text-align: start;
    margin: 0 10px;
    padding-top: 20px;
  }
  @media only screen and (min-width: 600px) {
    .login-form{
      width: 400px;
      margin: auto;
      padding-top: 50px;
    }
  }
</style>
