<template>
  <div id="register-page">
    <app-header></app-header>
    <app-register></app-register>
    <app-footer></app-footer>
  </div>
</template>
<script>
import PlainHeader from "./shared/PlainHeader.vue";
import Footer from "./shared/Footer.vue";
import RegisterPanel from "./RegisterPanel.vue";
export default {
  components: {
    appHeader: PlainHeader,
    appFooter: Footer,
    appRegister: RegisterPanel
  }
};
</script>
<style scoped>
body {
  height: 100%;
}
#register-page {
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