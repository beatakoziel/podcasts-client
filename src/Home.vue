<template>
  <div id="home">
    <div id="header-banner-box">
      <app-header :searchPhrase="searchPhrase" @searchWasApproved="searchPhrase = $event"></app-header>
      <app-banner></app-banner>
    </div>
    <app-toolbar
      :category.sync="category"
      @categoryWasEdited="category = $event"
      :sort.sync="sort"
      @sortWasEdited="sort = $event"
    ></app-toolbar>
    <span id="error-span"></span>
    <app-podcast-panel
      :category.sync="category"
      :sort.sync="sort"
      :searchPhrase="searchPhrase"
      @srcChanged="src=$event"
      @play="play=$event"
    ></app-podcast-panel>
    <audio controls id="audio">
      <source type="audio/mpeg" />
    </audio>
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
    return {
      category: "all",
      searchPhrase: "",
      src: "",
      play: "false",
      sort: "title-incr"
    };
  },
  watch: {
    src: function() {
      console.log(this.src);
      document.getElementById("audio").src =
        "http://localhost:8081/podcasts/play/" + this.src;
    },
    play: function() {
      if (this.play == true) document.getElementById("audio").play();
      else document.getElementById("audio").stop();
    }
  }
};
</script>
<style scoped>
body {
  height: 100%;
}

#home {
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  position: absolute;
}

span {
  margin-left: 110px;
  position: flex;
  font-family: "Francois One", sans-serif;
  color: #62546a;
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

audio {
  bottom: 0;
  margin-left: 6%;
}
</style>