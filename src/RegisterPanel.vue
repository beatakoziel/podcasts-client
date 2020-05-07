<template>
  <div class="card">
    <div class="card-body">
      <form id="register-form">
        <div class="form-group">
          <label>
            Nazwa użytkownika
            <input
              type="text"
              class="form-control"
              name="username"
              placeholder="Wprowadź login"
              v-model="user.username"
              required
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
              required
            />
          </label>
        </div>
        <div class="form-group">
          <label>
            Powtórz hasło
            <input
              type="password"
              class="form-control"
              name="password-repeat"
              placeholder="Wprowadź hasło ponownie"
              v-model="user.repeatPassword"
              required
            />
          </label>
        </div>
        <button
          type="button"
          class="btn btn-outline-default shadow-none btn-margin"
          style="float: right;"
          @click="submit"
        >Zarejestruj</button>
        <span id="register-error-span"></span>
      </form>
      <p>______________________________</p>
      <p id="question">Masz już konto?</p>
      <a>
        <router-link to="/login">Zaloguj</router-link>
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
        password: "",
        repeatPassword: ""
      }
    };
  },
  methods: {
    submit() {
      console.log(this.user);
      if (
        this.user.username == "" ||
        this.user.password == "" ||
        this.user.repeatPassword == ""
      ) {
        document.getElementById("register-error-span").innerHTML =
          "Uzupełnij puste pola";
        document.getElementById("register-error-span").style =
          "color: lightcoral;";
      } else {
        this.$http.post("http://localhost:8081/register", this.user).then(
          response => {
            document.getElementById("register-error-span").innerHTML =
              "Zarejestrowano prawidłowo";
            document.getElementById("register-error-span").style =
              "color: lightgreen;";
            setTimeout(function() {
              window.location.href = "/login";
            }, 100);
          },
          error => {
            document.getElementById("register-error-span").innerHTML =
              "Nieprawidłowe dane";
            document.getElementById("register-error-span").style =
              "color: lightcoral;";
            console.log(error);
          }
        );
      }
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
  color: #440044;
  font-size: 90%;
}

p,
a:hover {
  color: white;
}
</style>