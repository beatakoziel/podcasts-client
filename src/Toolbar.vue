<template>
  <div id="toolbar">
    <h3>Podcasty</h3>
    <div class="btn-group dropright">
      <button
        type="button"
        class="btn btn-secondary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >Kategoria</button>
      <div class="dropdown-menu">
        <a class="dropdown-item" id="all" @click="editCategory">Wszystkie</a>
        <a class="dropdown-item" id="mindset" @click="editCategory">Rozwój osobisty</a>
        <a class="dropdown-item" id="money" @click="editCategory">Pieniądze</a>
        <a class="dropdown-item" id="ecology" @click="editCategory">Ekologia</a>
        <a class="dropdown-item" id="politics" @click="editCategory">Polityka</a>
        <a class="dropdown-item" id="favourite" @click="editCategory">Ulubione</a>
        <a class="dropdown-item" id="bought" @click="editCategory">Zakupione</a>
        <a class="dropdown-item" id="unbought" @click="editCategory">Niezakupione</a>
      </div>
    </div>
    <div class="btn-group dropright">
      <button
        type="button"
        class="btn btn-secondary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >Sortowanie</button>
      <div class="dropdown-menu">
        <a class="dropdown-item" id="title-incr" @click="editSort">Tytuł rosnąco</a>
        <a class="dropdown-item" id="title-decr" @click="editSort">Tytuł malejąco</a>
        <a class="dropdown-item" id="length-inc" @click="editSort">Długość rosnąco</a>
        <a class="dropdown-item" id="length-decr" @click="editSort">Długość malejąco</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category", "sort"],
  methods: {
    editCategory() {
      this.$emit("categoryWasEdited", event.target.id);
    },
    editSort() {
      this.$emit("sortWasEdited", event.target.id);
    }
  },
  created() {
    $(document).ready(function() {
      $(".dropdown").each(function(key, dropdown) {
        var $dropdown = $(dropdown);
        $dropdown.find(".dropdown-menu a").on("click", function() {
          $dropdown
            .find("button")
            .text($(this).text())
            .append(' <span class="caret"></span>');
        });
      });
    });
  }
};
</script>
<style scoped>
h3 {
  font-family: "Francois One", sans-serif;
  color: #62546a;
  padding: 5px 5px;
}

#toolbar {
  margin: 4% 0 2% 7%;
}

.btn {
  font-family: "Francois One", sans-serif;
  border-radius: 0px;
  height: fit-content;
  background-color: #62546a;
  color: white;
  border: 1px solid white;
}

.btn:active {
  transform: scale(0.9);
}

.dropdown-toggle:focus,
.dropdown-toggle:active {
  border: 1px solid white;
  box-shadow: none;
  background-color: #62546a;
}

.dropdown-menu {
  border-radius: 0px;
}

.dropdown-item {
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: rgb(75, 0, 130, 0.1);
}

.show > .btn-secondary.dropdown-toggle:focus,
.show > .btn-secondary.dropdown-toggle:active,
.btn-secondary:not(:disabled):not(.disabled):active:focus {
  box-shadow: none;
}
</style>