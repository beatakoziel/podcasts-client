<template>
  <div id="home">
    <div id="header-banner-box">
      <app-header :searchPhrase="searchPhrase" @searchWasApproved="searchPhrase = $event"></app-header>
      <app-banner></app-banner>
    </div>
    <app-toolbar :category.sync="category" @categoryWasEdited="category = $event"></app-toolbar>
    <app-podcast-panel :category.sync="category" :searchPhrase="searchPhrase"></app-podcast-panel>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./shared/Header.vue";
import Footer from "./shared/Footer.vue";
import Banner from "./Banner.vue";
import PodcastPanel from "./PodcastsPanel.vue";
import Toolbar from "./Toolbar.vue";
export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    appBanner: Banner,
    appPodcastPanel: PodcastPanel,
    appToolbar: Toolbar
  },
  data: function() {
    return { category: "all", searchPhrase: "" };
  }
};
</script>
<style scoped>
body {
  height: 100%;
}
#header-banner-box {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0)),
    url("./assets/microphone.jpg") no-repeat center bottom fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-blend-mode: darken;
  color: white;
  box-shadow: 0px 0px 100px black;
}
</style>