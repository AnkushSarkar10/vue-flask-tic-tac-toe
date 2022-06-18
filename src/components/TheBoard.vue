
<template>
  <div class="container">
    <div class="tictactoe-board">
      <div v-for="(n, i) in 3" :key="i">
        <div v-for="(n, j) in 3" :key="j">
          <the-cell :vals="[j,i]"></the-cell>
        </div>
      </div>
    </div>
  </div>

  <button class="btn btn-dark" @click=clearBoard()>Clear board</button>
  <h3>{{ $store.getters.playerUserName }}</h3>
</template>
<script>
  export default {
      methods: {
        clearBoard() {
          this.$store.commit('clearBoard');
        }
      }
  }
</script>
<style scoped>

  .tictactoe-board {
    display: flex;
    flex-wrap: wrap;
    width: 204px;
    height: 204px;
  }

  .btn {
    margin-top: 100px;
  }
  
  .container {
    margin-top: 100px; 
    transform: scale(1.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>