<template>
  <div class="card">
    <div class="card-body">
      <form>
        <div class="form-group">
          <label>
            Nazwa użytkownika
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Wprowadź login"
              v-model="user.username"
            />
          </label>
        </div>
        <div class="form-group">
          <label>
            Hasło
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Wprowadź hasło"
              v-model="user.password"
            />
          </label>
        </div>
        <button
          type="button"
          class="btn btn-outline-default shadow-none btn-margin"
          style="float: right;"
          @click="submit"
        >Zaloguj</button>
        <span id="login-error-span"></span>
      </form>
      <p>______________________________</p>
      <p id="question">Nie posiadasz jeszcze konta?</p>
      <a>
        <router-link to="/register">Zarejestruj</router-link>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      console.log(this.user);
      this.$http.post("http://localhost:8081/login", this.user).then(
        response => {
          this.$cookie.set("jwt", "Bearer " + response.body.jwt, 1);
          this.$cookie.set("role", response.body.userRole, 1);
          console.log("COOKIE");
          console.log(this.$cookie.get("jwt"));
          document.getElementById("login-error-span").innerHTML =
            "Zalogowano prawidłowo";
          document.getElementById("login-error-span").style =
            "color: lightgreen;";
          setTimeout(function() {
            window.location.href = "/home";
          }, 100);
        },
        error => {
          document.getElementById("login-error-span").innerHTML =
            "Nieprawidłowe dane";
          document.getElementById("login-error-span").style =
            "color: lightcoral;";
          console.log(error);
        }
      );
    }
  }
};
</script>

<style scoped>
span {
  text-decoration: none;
  font-weight: normal;
  font-size: 90%;
  float: left;
}

.card,
.btn,
.form-control {
  border-radius: 0;
}
form {
  margin-bottom: 60px;
}

.card {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0 4%;
  margin-left: 10%;
  margin-top: 8%;
  margin-bottom: 15%;
  width: 450px;
  font-family: "Francois One", sans-serif;
}

label {
  color: white;
}

.btn {
  border: 1px solid white;
  color: white;
  background-color: transparent;
}

.btn:active {
  transform: scale(0.9);
}

.btn:hover {
  background-color: #62546a;
  border: none;
  color: white;
}

#question {
  color: white;
  font-size: 80%;
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
</style>