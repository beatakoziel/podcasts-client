<template>
  <nav class="navbar navbar-inverse">
    <a class="navbar-brand" id="logo" href="#">PURPLECAST</a>
    <div class="inline">
      <input
        class="form-control btn-light"
        type="search"
        placeholder="Szukaj"
        aria-label="Search"
        v-model="phrase"
        v-on:keyup.enter="submit"
      />
      <form class="form-inline my-2 my-lg-0">
        <button type="submit" class="btn shadow-none cart-button" @click="goToCart"></button>
      </form>
      <form class="form-inline my-2 my-lg-0">
        <button class="btn shadow-none logout-button" @click="logout"></button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["searchPhrase"],
  data() {
    return { phrase: "" };
  },
  methods: {
    goToCart() {
      setTimeout(function() {
        window.location.href = "/cart";
      }, 1);
    },
    logout() {
      this.$cookie.set("jwt", "", 1);
      setTimeout(function() {
        window.location.href = "/login";
      }, 1);
    },
    submit() {
      this.$emit("searchWasApproved", this.phrase);
      document
        .getElementById("cards-panel")
        .scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>
<style scoped>
#logo {
  margin-right: 25px;
  padding: 15px;
  font-family: "Francois One", sans-serif;
  font-size: 20px;
  letter-spacing: 4px;
}

.form-control {
  position: relative;
  float: left;
}
.btn,
.form-control {
  border-radius: 0px;
  color: black;
  border: 1px solid white;
  font-family: "Francois One", sans-serif;
}

.navbar-brand {
  color: white;
}

.navbar-inverse {
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  overflow: auto;
  color: white;
  padding-left: 25px;
  padding-right: 25px;
}

.logout-button,
.cart-button {
  padding: 0;
  background-size: contain;
  border: none;
  position: relative;
  float: right;
  margin-left: 20px;
  background-color: transparent;
}

.logout-button {
  background-image: url("../assets/logout.png");
  width: 30px;
  height: 30px;
}

.cart-button {
  background-image: url("../assets/cart.png");
  width: 40px;
  height: 40px;
}

.logout-button:active,
.cart-button {
  transform: scale(0.9);
}

.inline {
  display: flex;
}
</style>