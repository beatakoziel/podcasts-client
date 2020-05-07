<template>
  <div id="login-page">
    <app-header></app-header>
    <app-cart></app-cart>
  </div>
</template>
<script>
import PlainHeader from "./shared/PlainHeader.vue";
import ShoppingCartPanel from "./ShoppingCartPanel.vue";
export default {
  components: {
    appHeader: PlainHeader,
    appCart: ShoppingCartPanel
  }
};
</script>
<style scoped>
body {
  height: 100%;
}
#login-page {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: hidden;
  position: fixed;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)),
    url("./assets/microphone.jpg") no-repeat center bottom fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-blend-mode: darken;
}
.footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>