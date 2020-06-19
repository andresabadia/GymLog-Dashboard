<template>
  <div class="payment">
    <div class="container">
      <div class="d-flex justify-content-center h-100">
        <div class="card">
          <div class="card-header">
            <h3>Pagos en linea</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label for="clientId">Client ID</label>
              <input
                type="text"
                class="form-control"
                id="clientId"
                placeholder="1000"
                v-model="paymentData.clientid"
              />
            </div>
            <!-- <div class="form-group">
              <label for="product">Producto</label>
              <input
                type="text"
                class="form-control"
                id="product"
                placeholder="Online"
                v-model="paymentData.product"
              />
            </div>-->
            <div class="form-group">
              <label for="amountusd">Monto (USD)</label>
              <input
                type="text"
                class="form-control"
                id="amountusd"
                placeholder="10.99"
                v-model="paymentData.amountusd"
                @input="decimalControl()"
              />
            </div>

            <div class="form-group">
              <label for="paidfrom">Pago desde</label>
              <input
                type="text"
                class="form-control"
                id="paidfrom"
                placeholder="2020-05-15"
                v-model="paymentData.paidfrom"
              />
            </div>
            <div class="form-group">
              <label for="paiduntil">Pago hasta</label>
              <input
                type="text"
                class="form-control"
                id="paiduntil"
                placeholder="2020-06-15"
                v-model="paymentData.paiduntil"
              />
            </div>
            <div class="form-group">
              <label for="exchangerate">Tasa de cambio</label>
              <input
                type="text"
                class="form-control"
                id="exchangerate"
                placeholder="34.5"
                v-model="paymentData.exchangerate"
                @input="decimalControl()"
              />
            </div>
            <div class="form-group">
              <label for="comment">Comentarios</label>
              <textarea
                type="text"
                class="form-control"
                id="comment"
                placeholder
                v-model="paymentData.comment"
              />
            </div>
            <div class="form-group">
              <button class="btn float-right btn-warning" @click="payment()">Relizar pago</button>
            </div>
            <p class="card-text">{{ serverResponse }}</p>
          </div>
          <div class="card-footer">
            <div class="d-flex justify-content-center links">
              <span>
                Tenés problemas con los pagos? Contactá al
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
import Store from '../store.js'
import datepicker from 'js-datepicker'
import toastr from 'toastr'
export default {
  created () {
    this.$store.dispatch('asyncSetDate')
  },
  mounted () {
    const paidFromPicker = datepicker('#paidfrom', {
      onSelect: (instance, date) => {
        this.paymentData.paidfrom = this.formatDate(date)
      },
      formatter: (input, date, instance) => {
        input.value = this.formatDate(date) // => '2020-06-15'
      }
    })
    const paidUntilPicker = datepicker('#paiduntil', {
      onSelect: (instance, date) => {
        this.paymentData.paiduntil = this.formatDate(date)
      },
      formatter: (input, date, instance) => {
        input.value = this.formatDate(date) // => '2020-06-15'
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    // console.log('this store: ',Store.state.userId)
    if (Store.state.userId) {
      // if (true) {
      next()
    } else {
      next(false)
    }
  },
  data () {
    return {
      paymentData: {
        gym_id: 'uf',
        clientid: '',
        product: '',
        amountusd: '',
        paidfrom: '',
        paiduntil: '',
        timestamp: '',
        exchangerate: '34.5',
        currency: '',
        comment: '',
        extra: '',
        branch: '',
        dayofweek: ''
      },
      paymentUrl: 'https://www.id-ex.de/GymLog/php/online_payment.php',
      serverResponse: ''
    }
  },
  methods: {
    payment () {
      this.$store.commit('showLoading', true)
      const paymentJSON = {
        gym_id: 'uf',
        clientid: this.paymentData.clientid,
        amountusd: this.paymentData.amountusd,
        paidfrom: this.paymentData.paidfrom + ' 00:00:00.000',
        paiduntil: this.paymentData.paiduntil + ' 00:00:00.000',
        timestamp: this.formatDate(new Date()) + ' 00:00:00.000',
        exchangerate: this.paymentData.exchangerate,
        comment: this.paymentData.comment
      }
      axios
        .post(this.paymentUrl, paymentJSON)
        .then(res => {
          this.$store.commit('showLoading', false)
          toastr.success(
            'Pago realizado: ' +
              res.data.data.firstName +
              ' ' +
              res.data.data.lastName
          )
          this.resetForm()
          console.log(res)
        })
        .catch(err => {
          this.$store.commit('showLoading', false)
          toastr.error(JSON.stringify(err))
          console.log(err)
        })
    },
    resetForm () {
      this.paymentData.clientid = ''
      this.paymentData.amountusd = ''
      this.paymentData.paidfrom = ''
      this.paymentData.paiduntil = ''
      this.paymentData.comment = ''
    },
    decimalControl () {
      this.paymentData.amountusd = this.paymentData.amountusd.replace(',', '.')
      this.paymentData.exchangerate = this.paymentData.exchangerate.replace(
        ',',
        '.'
      )
    },
    formatDate (date) {
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      )
    }
  }
}
</script>
<style scoped lang="scss">
.payment {
  padding: 30px 0;
}
.container {
  height: 100%;
  align-content: center;
  text-align: start;
}
.card {
  margin-top: auto;
  margin-bottom: auto;
  width: 400px;
  background-color: #00000080 !important;
}

.form-group label,
.card-text {
  color: white;
}

.card-header h3 {
  color: white;
}

input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
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
