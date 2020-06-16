<template>
  <div class="login">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
            <div class="d-flex justify-content-end social_icon">
              <span>
                <img class="gymlog-logo" alt="GymLog logo" src="../assets/logo.png" />
              </span>
            </div>
          </div>
          <div class="card-body">
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-user"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                placeholder="nombre de usuario"
                v-model="username"
              />
            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fas fa-key"></i>
                </span>
              </div>
              <input
                type="password"
                class="form-control"
                placeholder="pin"
                v-model="pin"
                @keyup.enter="login(username, pin)"
              />
            </div>
            <div class="row align-items-center remember">
              <CheckboxButtons
                style="font-size:inherit;
                    margin-left: 15px;"
                v-model="rememberMe"
              >Recordame</CheckboxButtons>
              <!-- <input type="checkbox">Remember Me -->
            </div>
            <div class="form-group">
              <button class="btn float-right btn-warning" @click="login(username, pin)">Login</button>
            </div>
            <p class="card-text">{{ serverResponse }}</p>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              <span>
                Tenés problemas conectándote? Contactá al
                <nobr>
                  <i class="fab fa-whatsapp"></i> 8778 6917
                </nobr>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CheckboxButtons from '../components/CheckboxButtons.vue'
import Store from '../store.js'
export default {
  data () {
    return {
      username: '',
      pin: '',
      serverResponse: '',
      rememberMe: false
    }
  },
  methods: {
    login (username, pin) {
      axios
        .post('php/login.php', {
          user: username,
          pin: pin
        })
        .then(res => {
          // console.log(res.data)
          if (res.data.response === 'OK') {
            if (this.rememberMe) {
              localStorage.setItem('gl-user', JSON.stringify(res.data.content))
              this.$router.push('home')
            } else {
              sessionStorage.setItem(
                'gl-user',
                JSON.stringify(res.data.content)
              )
              this.$router.push('home')
            }
          } else if (res.data.response === 'FAILED') {
            this.serverResponse = res.data.content
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  components: {
    CheckboxButtons
  },
  beforeRouteEnter (to, from, next) {
    // console.log('this store: ',Store.state.userId)
    if (!Store.state.userId) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("./../assets/login_background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.container {
  height: 100%;
  align-content: center;
  text-align: start;
}
.card {
  height: 370px;
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: #00000080 !important;
}

.card-text {
  color: white;
}
.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #ffab00;
}

.social_icon span:hover {
  color: white;
  /* cursor: pointer; */
}

.gymlog-logo {
  height: 60px;
  background-color: #424242;
  padding: 8px;
  border-radius: 10px;
}

.card-header h3 {
  color: white;
}

.social_icon {
  position: absolute;
  right: 20px;
  top: -45px;
}

.input-group-prepend span {
  width: 50px;
  background-color: #ffab00;
  color: black;
  border: 0 !important;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}

.remember {
  color: white;
}

.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}

.login_btn {
  color: #424242;
  background-color: #ffab00;
  width: 100px;
}

.login_btn:hover {
  color: 424242;
  background-color: white;
}

.links {
  color: white;
}

.links a {
  margin-left: 4px;
}
</style>
