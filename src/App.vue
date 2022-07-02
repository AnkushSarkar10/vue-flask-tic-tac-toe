<template>
  <div class="d-flex justify-content-center header"><the-header></the-header></div>
  <router-view></router-view>
  <win-loose-draw id="win-loose-draw" v-if="$store.getters.gameOver" :resultStr=resultStr></win-loose-draw>
  <div class="connStat">{{ $store.state.connectionStr }}</div>
</template>

<script>

export default {
  data() {
    return {
      // connStatus: "DC'ed noob",
      resultStr: ""
    }
  },
  methods: {
    
  },
  created() {

  },
  mounted() {
    // listening for server events
    let store = this.$store;
    document.title = 'Tic Tac Toe';
    // print any message event
    store.getters.socket.on('on_connect', (msg) => {
      store.commit('setConnStr', msg);
    });
    store.getters.socket.on('on_disconnect', (msg) => {
      store.commit('setConnStr', msg);
    });
    store.getters.socket.on('message', (msg) => {
      console.log(msg);
    });
    // switch user when server says so
    store.getters.socket.on('make_user_switch', () => {
      let new_turn = store.getters.myTurn;
      store.commit('setMyTurn', !(new_turn));
      console.log("our lord and savior server said to switch the user " + (!new_turn));
    })

    // when server gets the update for change in board 
    store.getters.socket.on('board_changed_in_server', (data) => {
      let board = store.getters.board;
      if (board[data["x"]][data["y"]] != data["player"]){
        store.commit('changeValue', {x: data["x"], y: data["y"], player: data["player"]});
      }
    })

    // when game is over
    store.getters.socket.on('game_over', (msg) => {
      store.commit('setGameOver', true);
      this.resultStr = msg;
    })

    // get and store opponent username
    store.getters.socket.on('setOppName', (name) => {
      store.commit('setOppUserName', name);
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;500&display=swap');


html, body {
  height: 100%;
  background: linear-gradient(#121212 , #212121);
  color: white;
  text-align: center;
  overflow-x: hidden;
}

#app {
  font-family: 'Josefin Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
  color: white;
}

.header {
  padding-bottom: 5vh;
  margin-top: 8vh;
}

.connStat {
  position: absolute;
  bottom:0;
  right:0;
  font-size: 2vh;
}

</style>
