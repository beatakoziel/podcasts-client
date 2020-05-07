<template>
  <div class="card">
    <div class="card-body">
      <span id="error-span"></span>
      <template v-if="error===false">
        <table>
          <tr>
            <th>Id</th>
            <th>Tytuł podcastu</th>
            <th>Cena</th>
          </tr>
          <tr v-for="shoppingItem in cart" :key="`shoppingItem-${shoppingItem.id}`">
            <td>{{shoppingItem.id}}</td>
            <td>{{shoppingItem.title}}</td>
            <td>{{shoppingItem.price}} zł</td>
            <td style="text-align:center;">
              <a class="delete" @click="deleteItem(shoppingItem.id)">Usuń</a>
            </td>
          </tr>
          <tr v-if="cart.length!=0">
            <td colspan="2">Suma:</td>
            <td style="text-align:left;">{{sum}} zł</td>
          </tr>
          <tr v-else>
            <td colspan="3" style="text-align:center;">Koszyk pusty</td>
          </tr>
        </table>
      </template>
      <form class="form-inline my-2 my-lg-0">
        <button
          type="button"
          class="btn shadow-none"
          style="float: right; position: absolute;"
          @click="back"
        >Powróć</button>
      </form>
      <form class="form-inline my-2 my-lg-0">
        <button
          valid-v-else
          type="button"
          class="btn shadow-none btn-margin"
          style="float: right; position: absolute; right: 60px;"
          @click="pay"
        >Zapłać</button>
      </form>
    </div>
    <span id="payment-span"></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      error: true,
      sum: 0
    };
  },
  beforeMount() {
    this.getCart();
  },
  methods: {
    back() {
      setTimeout(function() {
        window.location.href = "/home";
      }, 100);
    },
    getSum(cart) {
      Object.entries(cart).forEach(([key, val]) => {
        this.sum = this.sum + val.price;
      });
      console.log(this.sum);
    },
    getCart() {
      this.$http
        .get("http://localhost:8081/users/shopping-cart", {
          headers: {
            Authorization: this.$cookie.get("jwt")
          }
        })
        .then(
          response => {
            return response.json();
          },
          error => {
            this.error = true;
            console.log("error" + this.error);
            document.getElementById("error-span").innerHTML =
              "Aby zobaczyć koszyk należy się zalogować.";
            document.getElementById("error-span").style = "color: white;";
          }
        )
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.cart = resultArray;
          this.getSum(resultArray);
          this.error = false;
          console.log(this.cart);
        });
    },
    pay() {
      if (this.cart.length == 0) {
        document.getElementById("payment-span").innerHTML = "Koszyk jest pusty";
        document.getElementById("payment-span").style = "color: lightcoral;";
      } else {
        var request = this.$http
          .put("http://localhost:8081/users/shopping-cart/approve", this.user, {
            headers: {
              Authorization: this.$cookie.get("jwt")
            }
          })
          .then(
            response => {
              document.getElementById("payment-span").innerHTML =
                "Płatność przebiegła pomyślnie";
              document.getElementById("payment-span").style =
                "color: lightgreen;";
              this.getCart();
            },
            error => {
              document.getElementById("payment-span").innerHTML =
                "Błąd płatności";
              document.getElementById("payment-span").style =
                "color: lightcoral;";
            }
          );
      }
    },
    deleteItem(id) {
      var request = this.$http
        .put("http://localhost:8081/users/shopping-cart/" + id, this.user, {
          headers: {
            Authorization: this.$cookie.get("jwt")
          }
        })
        .then(
          response => {
            this.getCart();
          },
          error => {
            console.log(id);
            console.log(this.$cookie.get("jwt"));
            console.log(request);
            console.log(error);
          }
        );
    }
  }
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid white;
  color: white;
  font-family: "Francois One", sans-serif;
}

table {
  margin-bottom: 30px;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

th {
  padding: 5px 5px;
}
td {
  padding: 5px 5px;
}

span {
  text-decoration: none;
  font-weight: normal;
  font-size: 90%;
  float: left;
  padding-bottom: 10px;
  color: white;
  width: 100%;
  margin-bottom: 30px;
}

.card,
.btn,
.form-control {
  border-radius: 0;
}

button {
  margin-bottom: 10px;
}

.card {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0 4%;
  margin-left: 10%;
  margin-top: 8%;
  margin-bottom: 15%;
  height: 500px;
  width: 600px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: "Francois One", sans-serif;
}

label {
  color: white;
}

.btn {
  border: 1px solid white;
  color: white;
  background-color: transparent;
  bottom: 0;
}

.btn:active {
  transform: scale(0.9);
}

.btn:hover {
  background-color: #62546a;
  border: none;
  color: white;
}

#payment-span {
  margin-bottom: 60px;
}

a {
  text-decoration: none;
  color: #62546a;
  font-size: 90%;
}

p,
a:hover {
  color: white;
}

.delete {
  color: white;
}
.delete:hover {
  color: lightcoral;
}
</style>