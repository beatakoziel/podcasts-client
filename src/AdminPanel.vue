<template>
  <div id="admin-panel">
    <app-header></app-header>
    <b-modal id="modal-scoped">
      <template v-slot:modal-header>
        <h5>Usuń produkt</h5>
      </template>
      <div class="d-block">Czy na pewno chcesz usunąć podcast?</div>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="sm" @click="cancel()">Wyjdź</b-button>
        <b-button size="sm" @click="deleteItem">Usuń</b-button>
      </template>
    </b-modal>
    <div class="card">
      <div class="card-body">
        <a class="add">Dodaj produkt</a>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Tytuł</th>
              <th scope="col">Opis</th>
              <th scope="col">Długość</th>
              <th scope="col">Cena</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="podcast in podcasts" :key="`podcast-${podcast.id}`">
              <td>{{podcast.title}}</td>
              <td>{{podcast.description}}</td>
              <td style="text-align:center;">{{podcast.length}} min</td>
              <td style="text-align:center;" v-if="podcast.price!=null">{{podcast.price}} zł</td>
              <td style="text-align:center;" v-else>-</td>
              <td style="text-align:center;">
                <a class="edit">Edytuj</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "./shared/Header.vue";
export default {
  components: {
    appHeader: Header
  },
  data() {
    return {
      podcasts: [],
      src: "",
      isInCart: false,
      modalShow: false,
      podcastToDelete: ""
    };
  },
  beforeMount() {
    this.getPodcasts();
  },
  methods: {
    getPodcasts() {
      this.$http
        .get("http://localhost:8081/podcasts", {
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
              "Aby zobaczyć listę podcastów należy się zalogować jako admin.";
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
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-scoped", "#btnShow");
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-scoped", "#btnShow");
    },
    toggleModal() {
      this.$root.$emit("bv::toggle::modal", "modal-scoped", "#btnToggle");
    }
  }
};
</script>
<style scoped>
body {
  height: 100%;
}
#admin-panel {
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

#modal-scoped___BV_modal_content_ {
  background-color: rgba(0, 0, 0, 0.4);
}
.card {
  background-color: rgba(0, 0, 0, 0.4);
  padding: 0 4%;
  margin-left: 15%;
  margin-top: 3%;
  margin-bottom: 15%;
  width: 70%;
  max-height: 70%;
  overflow-y: scroll;

  font-family: "Francois One", sans-serif;
}

.table {
  color: white;
}

.delete {
  color: lightcoral;
  cursor: pointer;
}

.edit {
  color: lightskyblue;
  cursor: pointer;
}

.add {
  color: plum;
  margin-bottom: 30px;
  margin-right: 20px;
  float: right;
  cursor: pointer;
}

.delete:hover,
.edit:hover,
.add:hover {
  color: white;
}
</style>