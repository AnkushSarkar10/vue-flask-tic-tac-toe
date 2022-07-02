<template>
  <div class="container">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              {{ resultStr }}
              <hr>
              <button class="btn" @click="newGame">New Game</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["resultStr"],
  methods: {
    newGame() {
      this.$store.state.gameOver = false;
      this.$store.commit("clearBoard");
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
button {
  /* background: #673AB7; */
  position: relative;
  bottom: 2vh;
  color: white;
  background-image: linear-gradient(to right, #673AB7, #1AB6C3, #673AB7);
  background-size: 300% 100%;

  moz-transition: all .2s ease-in-out;
  -o-transition: all .2s ease-in-out;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}

button:hover {
    color: white;
    background-position: 100% 0;
    moz-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    -webkit-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

button:disabled {
  background-color:#673AB7;
}


button:focus,
button:active {
  outline:0 !important;
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}

/* modal shit */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.5s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 10px 30px 0px 30px;
  background-color: #1F1F1F;
  border-radius: 3px;
  transition: all 0.3s ease;
  /* make modal bigger */
  transform: scale(1.2);
}

.modal-body {
  margin: 20px 0px 0px 0px;
  padding-bottom: 0px;
  padding-top: 0px;
  font-size: 5em;
  row-gap: 0px !important;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>