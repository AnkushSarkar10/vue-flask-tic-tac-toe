
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
  <!-- show opponet name -->
  <h3>We are playing -> {{ $store.getters.opponentUserName }}</h3>
  <!-- showing who's move it is -->
  <div class="yourTurn" v-if="$store.getters.myTurn">Its your turn</div>
  <div class="oppTurn" v-else>Waiting for opponent to move</div>
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