
<template>
  <div class="container">
    <div class="tictactoe-board">
      <div v-for="(n, i) in 3" :key="i">
        <div v-for="(n, j) in 3" :key="j">
          <the-cell :vals="[j, i]"></the-cell>
        </div>
      </div>
    </div>
  </div>
  <!--  <button class="btn btn-dark" @click=clearBoard()>Clear board</button> -->
  <div class="container-fluid gameInfo">
    <div class="myName" :class="{ active: $store.getters.myTurn }">{{ $store.getters.playerUserName }}</div>
    <div class="oppName" :class="{ active: !$store.getters.myTurn }">{{ $store.getters.opponentUserName }}</div>
    <div class="line-break"></div>
    <div class="yourTurn" v-if="$store.getters.myTurn">It's your turn!</div>
    <div class="oppTurn" v-else>Waiting for opponent to move . . .</div>
  </div>
</template>
<script>
export default {
  methods: {
    clearBoard() {
      this.$store.commit("clearBoard");
    },
  },
};
</script>
<style scoped>
.tictactoe-board {
  display: flex;
  flex-wrap: wrap;
  width: 204px;
  height: 204px;
  overflow: hidden;
}

.btn {
  margin-top: 100px;
}

.container {
  margin-top: 8vh;
  transform: scale(1.9);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.gameInfo {
  width: 404px;
  height: 120px;
  font-size: 20px;
  position: relative;
  top: 15vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.oppTurn,
.yourTurn {
  width: 100%;
  position: relative;
  top: 20px;
  font-size: 4vh;
}

.oppTurn{
  font-size: 3vh;
}

.myName, 
.oppName {
  align-self: center;
  padding: 8px 16px 5px 16px;
  background-color: #673AB7;
  border-radius: 3px;
}

@keyframes makeActive {
  0% {
    transform: scale(1, 1);
    background-color: #673AB7;
  }
  100% {
    transform: scale(1.3, 1.2);
    background-color: #1AB6C3;
  }
}

.active {
  animation: makeActive 0.3s;
  padding-top: 8px;
  animation-fill-mode: forwards;

}

.line-break {
  width: 100%;
}

@media screen and (max-device-width: 510px) {
.container{
  transform: scale(1.5);
}
.gameInfo{
  position: relative;
  transform: scale(0.9);
  width: 364px;
}
}

</style>