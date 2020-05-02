<template>
  <div id="toolbar">
    <div class="btn-group dropright">
      <h3>Podcasty</h3>
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
        <a class="dropdown-item" id="parent" @click="editCategory">Rodzicielstwo</a>
        <a class="dropdown-item" id="politics" @click="editCategory">Polityka</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["category"],
  methods: {
    editCategory(item) {
      this.$emit("categoryWasEdited", event.target.id);
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
  margin: 30% 50%;
  font-family: "Francois One", sans-serif;
  color: #62546a;
}

.btn {
  font-family: "Francois One", sans-serif;
  border-radius: 0px;
  display: block;
  background-color: #62546a;
  color: white;
  border: 1px solid white;
  margin: 30% 100%;
}

.btn:active {
  transform: scale(0.9);
}

.dropdown-toggle:focus {
  border: 1px solid white;
  box-shadow: none;
  background-color: #62546a;
}

.dropdown-toggle:active {
  border: 1px solid white;
  box-shadow: none;
  background-color: #62546a;
}

.dropdown-menu {
  border-radius: 0px;
}

.dropdown-item:hover {
  background-color: rgb(75, 0, 130, 0.1);
}

.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none;
}

.show > .btn-secondary.dropdown-toggle:active {
  box-shadow: none;
}

.btn-secondary:not(:disabled):not(.disabled):active:focus {
  box-shadow: none;
}
</style>