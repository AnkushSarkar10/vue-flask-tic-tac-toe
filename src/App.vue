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
      resultStr: ""
    }
  },
  methods: {
    
  },
  created() {
    window.addEventListener('beforeunload', this.$router.replace("/"));
  },
  mounted() {
    // listening for server events
    let store = this.$store;
    document.title = 'Tic Tac Toe';
    
    store.getters.socket.on('on_connect', (msg) => {
      store.commit('setConnStr', msg);
    });
    store.getters.socket.on('on_disconnect', (msg) => {
      store.commit('setConnStr', msg);
      this.$router.replace("/");
    });

    // print any message event
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
      // let board = store.getters.board;
      // if (board[data["x"]][data["y"]] != data["player"]){
        store.commit('changeValue', {x: data["x"], y: data["y"], player: data["player"]});
        //winning logic 
        // logic for checking if someone won, and telling the server the same
        if (store.getters.playerHas3InARow("X")) {
          let data = {roomId: store.getters.roomId , player: "X"};
          store.getters.socket.emit("someone_won", data);
          console.log("X won!");
        } else if (store.getters.playerHas3InARow("O")) {
          let data = {roomId: store.getters.roomId , player: "O"};
          store.getters.socket.emit("someone_won", data);
          console.log("O won!");
        }

        // if no one won and board full === game ended in a draw
        if (store.getters.checkIfFull) {
          console.log("Draw!");
          store.getters.socket.emit("draw", {roomId: store.getters.roomId});
        }
      // }
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
