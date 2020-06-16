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
            <div class="form-group">
              <label for="product">Producto</label>
              <input
                type="text"
                class="form-control"
                id="product"
                placeholder="Online"
                v-model="paymentData.product"
              />
            </div>
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
                placeholder="10"
                v-model="paymentData.paidfrom"
              />
            </div>
            <div class="form-group">
              <label for="paiduntil">Pago hasta</label>
              <input
                type="text"
                class="form-control"
                id="paiduntil"
                placeholder="1000"
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
import Store from "../store.js";
export default {
  created() {
    this.$store.dispatch("asyncSetDate");
  },
  beforeRouteEnter(to, from, next) {
    // console.log('this store: ',Store.state.userId)
    // if (Store.state.userId) {
    if (true) {
      next();
    } else {
      next(false);
    }
  },
  data() {
    return {
      paymentData: {
        clientid: "",
        product: "",
        amountusd: "",
        paidfrom: "",
        paiduntil: "",
        timestamp: "",
        isvalid: "",
        exchangerate: "34.5",
        currency: "",
        comment: "",
        extra: "",
        branch: "",
        dayofweek: ""
      },
      serverResponse: ""
    };
  },
  methods: {
    payment() {
      console.log(this.paymentData);
    },
    decimalControl() {
      this.paymentData.amountusd = this.paymentData.amountusd.replace(",", ".");
      this.paymentData.exchangerate = this.paymentData.exchangerate.replace(
        ",",
        "."
      );
    }
  }
};
</script>
<style scoped>
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
