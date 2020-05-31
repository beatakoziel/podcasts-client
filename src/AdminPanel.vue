<template>
  <div id="admin-panel">
    <app-header></app-header>
    <b-modal id="modal-audio">
      <template v-slot:modal-header>
        <h5>Dodaj audio</h5>
      </template>
      <form>
        <div class="form-group">
          <label for="audioFile">Plik audio</label>
          <input
            type="file"
            class="form-control-file"
            id="audioFile"
            accept=".mp3"
            v-on:change="onFileChange"
          />
          <small id="fileHelp" class="form-text text-muted">Plik powinien być w formacie mp3</small>
        </div>
      </form>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="sm" @click="cancel()">Wyjdź</b-button>
        <b-button size="sm" @click="addAudio">Dodaj</b-button>
      </template>
    </b-modal>
    <b-modal id="modal-scoped">
      <template v-slot:modal-header>
        <h5>Dodaj podcast</h5>
      </template>
      <form>
        <div class="form-group">
          <label for="title">Tytuł</label>
          <input
            type="text"
            class="form-control"
            id="title"
            placeholder="Wprowadź tytuł podcastu"
            v-model="podcastToAdd.title"
          />
        </div>
        <div class="form-group">
          <label for="description">Opis</label>
          <input
            type="text"
            class="form-control"
            id="description"
            placeholder="Wprowadź opis podcastu"
            v-model="podcastToAdd.description"
          />
        </div>
        <div class="form-group">
          <label for="price">Cena</label>
          <input
            type="number"
            class="form-control"
            id="price"
            placeholder="Wprowadź cenę podcastu"
            v-model="podcastToAdd.price"
          />
        </div>
        <div class="form-group">
          <label for="length">Długość</label>
          <input
            type="number"
            class="form-control"
            id="length"
            placeholder="Wprowadź długość podcastu"
            v-model="podcastToAdd.length"
          />
        </div>
        <div class="form-group">
          <label for="imageUrl">Url do zdjęcia</label>
          <input
            type="text"
            class="form-control"
            id="imageUrl"
            placeholder="Wprowadź url do zdjęcia okładkowego"
            v-model="podcastToAdd.imageUrl"
          />
        </div>
        <label>Kategoria</label>
        <select class="form-control form-control-sm" v-model="podcastToAdd.category">
          <option disabled value>Wybierz kategorię</option>
          <option value="mindset">Rozwój osobisty</option>
          <option value="money">Pieniądze</option>
          <option value="ecology">Ekologia</option>
          <option value="politics">Polityka</option>
        </select>

        <label>Nazwa pliku</label>
        <select class="form-control form-control-sm" v-model="podcastToAdd.fileName">
          <option disabled value>Wybierz nazwę pliku</option>
          <option v-for="fileName in filesNames" :key="fileName">{{fileName}}</option>
        </select>
      </form>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="sm" @click="cancel()">Wyjdź</b-button>
        <b-button size="sm" @click="addPodcast">Dodaj</b-button>
      </template>
    </b-modal>
    <div class="card">
      <div class="card-body">
        <a class="add" @click="showModal">Dodaj podcast</a>
        <a class="add" @click="showAudioModal">Dodaj audio</a>
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
                <a class="edit" @click="showModal">Edytuj</a>
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
      filesNames: [],
      file: null,
      podcastToAdd: {
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        price: null,
        length: null,
        fileName: ""
      }
    };
  },
  beforeMount() {
    this.getPodcasts();
    this.getFileNames();
  },
  methods: {
    getFileNames() {
      this.$http
        .get("http://localhost:8081/podcasts/names", {
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
          this.filesNames = resultArray;
          console.log(this.filesNames);
        });
    },
    addPodcast() {
      console.log(this.podcastToAdd);
      this.$http
        .post("http://localhost:8081/podcasts", this.podcastToAdd, {
          headers: {
            Authorization: this.$cookie.get("jwt")
          }
        })
        .then(
          response => {
            this.getPodcasts();
            return response.json();
          },
          error => {
            document.getElementById("error-span").innerHTML =
              "Aby zobaczyć listę podcastów należy się zalogować jako admin.";
            console.log(error);
          }
        );
    },
    addAudio() {
      let formData = new FormData();
      formData.append("audioFile", this.file);
      this.$http
        .post("http://localhost:8081/podcasts/audio", formData, {
          headers: {
            Authorization: this.$cookie.get("jwt"),
            "Content-Type": "multipart/form-data"
          }
        })
        .then(
          response => {
            this.getFileNames();
            return response.json();
          },
          error => {
            document.getElementById("error-span").innerHTML =
              "Aby zobaczyć listę podcastów należy się zalogować jako admin.";
            console.log(error);
          }
        );
    },
    getPodcasts() {
      this.$http
        .get("http://localhost:8081/podcasts", {
          headers: {
            Authorization: this.$cookie.get("jwt")
          }
        })
        .then(
          response => {
            this.getFileNames();
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
    onFileChange($event) {
      this.file = $event.target.files[0];
    },
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-scoped", "#btnShow");
    },

    showAudioModal() {
      this.$root.$emit("bv::show::modal", "modal-audio", "#btnShow");
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