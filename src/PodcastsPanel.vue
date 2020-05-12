<template >
  <div id="cards-panel">
    <div class="card" v-for="podcast in filterEventsByCategory()" :key="`podcast-${podcast.id}`">
      <img class="card-img-top" :src="podcast.podcast.imageUrl" alt="Card image cap" />
      <div class="card-body">
        <div class="text">
          <h5 class="card-title">{{podcast.podcast.title}}</h5>
          <p class="card-text">{{podcast.podcast.description}}</p>
          <p class="timeLength">Długość: {{podcast.podcast.length}} min</p>
          <p class="price card-text" v-if="podcast.blocked">Cena: {{podcast.podcast.price}} zł</p>
        </div>
        <form class="form-inline my-2 my-lg-0">
          <button
            id="blocked-in-cart"
            type="button"
            class="btn shadow-none user-button blocked"
            v-if="podcast.blocked && podcast.inCart"
            @click="toggleShop(podcast.podcast.id)"
          ></button>
          <button
            id="blocked-not-in-cart"
            type="button"
            class="btn shadow-none user-button blocked"
            v-if="podcast.blocked && !podcast.inCart"
            @click="toggleShop(podcast.podcast.id)"
          ></button>
        </form>
        <form v-if="podcast.favourite" class="form-inline my-2 my-lg-0">
          <button
            id="favourite"
            type="button"
            class="btn shadow-none user-button"
            @click="toggleFavourite(podcast.podcast.id)"
          ></button>
        </form>
        <form v-else class="form-inline my-2 my-lg-0">
          <button
            id="not-favourite"
            type="button"
            class="btn shadow-none user-button"
            @click="toggleFavourite(podcast.podcast.id)"
          ></button>
        </form>
        <button
          class="btn btn-outline-default shadow-none my-2 my-sm-0"
          type="button"
          v-if="!podcast.blocked"
          @click="play(podcast.podcast.audioUrl, $event)"
        >Odtwórz</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["category", "searchPhrase", "sort"],
  name: "PodcastsList",
  data() {
    return {
      podcasts: [],
      src: "",
      isInCart: false
    };
  },
  beforeMount() {
    this.getPodcasts();
  },
  methods: {
    play(audioUrl, event) {
      if (this.src == "") {
        this.src = audioUrl;
        console.log(audioUrl);
        event.currentTarget.innerHTML = "Zatrzymaj";
        this.$emit("play", true);
        this.$emit("srcChanged", audioUrl);
      } else if (this.src == audioUrl) {
        this.playing = false;
        event.currentTarget.innerHTML = "Odtwórz";
        this.src = "";
        this.$emit("play", false);
        this.$emit("srcChanged", "");
      }
    },
    getPodcasts() {
      this.$http
        .get("http://localhost:8081/users/podcasts", {
          headers: {
            Authorization: this.$cookie.get("jwt")
          }
        })
        .then(
          response => {
            return response.json();
          },
          error => {
            document.getElementById("error-span").innerHTML =
              "Aby zobaczyć listę podcastów należy się zalogować.";
            console.log(error);
          }
        )
        .then(data => {
          const resultArray = [];
          for (let key in data) {
            resultArray.push(data[key]);
          }
          this.podcasts = resultArray;
          console.log(this.podcasts);
        });
    },
    toggleFavourite(id) {
      var request = this.$http
        .put("http://localhost:8081/users/favourites/" + id, this.user, {
          headers: {
            Authorization: this.$cookie.get("jwt")
          }
        })
        .then(
          response => {
            this.getPodcasts();
          },
          error => {}
        );
    },
    toggleShop(id) {
      var request = this.$http
        .put("http://localhost:8081/users/shopping-cart/" + id, this.user, {
          headers: {
            Authorization: this.$cookie.get("jwt")
          }
        })
        .then(
          response => {
            this.getPodcasts();
          },
          error => {
            console.log(error);
          }
        );
    },
    sortByTitleIncr(a, b) {
      if (this.sort == undefined || this.sort == "title-incr") {
        if (a.podcast.title < b.podcast.title) return -1;
        if (a.podcast.title > b.podcast.title) return 1;
        return 0;
      } else if (this.sort == "title-decr") {
        if (a.podcast.title > b.podcast.title) return -1;
        if (a.podcast.title < b.podcast.title) return 1;
        return 0;
      } else if (this.sort == "length-inc") {
        if (a.podcast.length < b.podcast.length) return -1;
        if (a.podcast.length > b.podcast.length) return 1;
      } else if (this.sort == "length-decr") {
        if (a.podcast.length > b.podcast.length) return -1;
        if (a.podcast.length < b.podcast.length) return 1;
      }
    },

    filterEventsByCategory() {
      console.log(this.searchPhrase);
      console.log(this.category);
      console.log(this.sort);
      if (
        this.category == "all" ||
        this.category == undefined ||
        this.category == null
      )
        return this.podcasts
          .filter(
            podcast =>
              podcast.podcast.title
                .toUpperCase()
                .includes(this.searchPhrase.toUpperCase()) ||
              podcast.podcast.description
                .toUpperCase()
                .includes(this.searchPhrase.toUpperCase())
          )
          .sort(this.sortByTitleIncr);
      else if (this.category == "favourite")
        return this.podcasts
          .filter(podcast => podcast.favourite == true)
          .sort(this.sortByTitleIncr);
      else if (this.category == "bought")
        return this.podcasts
          .filter(podcast => podcast.blocked == false)
          .sort(this.sortByTitleIncr);
      else if (this.category == "unbought")
        return this.podcasts
          .filter(podcast => podcast.blocked == true)
          .sort(this.sortByTitleIncr);
      else
        return this.podcasts
          .filter(podcast => podcast.podcast.category === this.category)
          .filter(
            podcast =>
              podcast.podcast.title
                .toUpperCase()
                .includes(this.searchPhrase.toUpperCase()) ||
              podcast.podcast.description
                .toUpperCase()
                .includes(this.searchPhrase.toUpperCase())
          )
          .sort(this.sortByTitleIncr);
    }
  }
};
</script>
<style scoped>
.btn,
.card {
  font-family: "Francois One", sans-serif;
  border-radius: 0px;
  display: block;
}

#blocked-in-cart,
#blocked-not-in-cart {
  width: 30px;
  height: 30px;
  padding: 0;
  background-size: contain;
  border: 1px solid transparent;
  background-repeat: no-repeat;
  position: absolute;
  float: left;
  margin-right: 150px;
  background-color: transparent;
}
.text {
  height: 250px;
}

#blocked-in-cart {
  background-image: url("./assets/full-cart.png");
}

#blocked-not-in-cart {
  background-image: url("./assets/empty-cart.png");
}

#favourite,
#not-favourite {
  width: 28px;
  height: 28px;
  background-size: contain;
  border: 1px solid transparent;
  position: absolute;
  background-repeat: no-repeat;
  float: left;
  margin-right: 190px;
  background-color: transparent;
}

#favourite:hover,
#not-favourite:hover {
  transform: scale(1.1);
}

#favourite {
  background-image: url("./assets/full-heart.png");
}

#not-favourite {
  background-image: url("./assets/empty-heart.png");
}

#blocked:hover {
  transform: scale(1.1);
}

.card:hover {
  transform: scale(1.02);
}

.btn {
  border: 1px solid black;
  float: right;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.btn:active {
  transform: scale(0.9);
}

.btn:hover {
  background-color: #62546a;
  color: white;
}

#cards-panel {
  margin: 0 5% 5% 5%;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.card {
  margin: 10px 10px;
  width: 15rem;
  height: 450px;
}

.in-cart,
.inCart {
  background-image: url("./assets/empty-heart.png");
  background-color: red;
}
</style>