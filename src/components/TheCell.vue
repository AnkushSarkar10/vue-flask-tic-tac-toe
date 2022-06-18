<template>
    <div class="cell" @click=makeMove()>
      <span v-if="$store.state.board[x][y] !== 0">{{ $store.state.board[x][y] }}</span>
    </div>
</template>

<script>
  export default {
    props: ["vals"],
    data() {
      return {
        x : this.vals[0],
        y : this.vals[1]
      }
    },
    methods: {
      makeMove() {
        let store = this.$store;
        // if its our turn, then we do this shit
        if (store.getters.myTurn) {
          // change the cell value locally
          store.commit('changeValue', {x: this.x, y: this.y, player: store.getters.currentPlayer});  

          // tell server to switch users in this room
          store.getters.socket.emit("switch_users", store.getters.roomId);
          
          // tell the server a change has been made to the x and y position of the board
          let data = {roomId: store.getters.roomId , player: store.getters.currentPlayer, x: this.x, y: this.y};
          store.getters.socket.emit("board_changed", data);
          
          // testing
          if (store.getters.checkIfFull) {
            console.log("full!");
          }

          if (store.getters.playerHas3InARow("X")) {
            console.log("X won!");
          } else if (store.getters.playerHas3InARow("O")) {
            console.log("O won!");
          }
        } 
      }
    }
  }
</script>
<style>
  .cell {
    width: 64px;
    height: 64px;
    border: 2px solid rgb(75,75,75);
    padding-top: 10%;
    font-size: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cell:hover {
    background: #E7E9EB;
  }
</style>