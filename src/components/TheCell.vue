<template>
    <div class="cell" @click=makeMove() :style="{'border-width':borderWidth}">
      <span v-if="$store.state.board[x][y] !== 0">{{ $store.state.board[x][y] }}</span>
    </div>
</template>

<script>
  export default {
    props: ["vals"],
    data() {
      return {
        x : this.vals[0],
        y : this.vals[1],
        borderWidth: ""
        // border: "2px solid rgb(255, 243, 243)"
      }
    },
    created() {
      // i know its probably the stupid way to do it , but idc its 2:35am i m tierd

      /* border-width: top | right | bottom | left */
      if (this.x == 0 && this.y == 0) {
        this.borderWidth = "0px 2px 2px 0px";
      }
      if (this.x == 0 && this.y == 1) {
        this.borderWidth = "0px 2px 2px 2px";
      }
      if (this.x == 0 && this.y == 2) {
        this.borderWidth = "0px 0px 2px 2px";
      }
      if (this.x == 1 && this.y == 0) {
        this.borderWidth = "2px 2px 2px 0px";
      }
      if (this.x == 1 && this.y == 1) {
        this.borderWidth = "2px 2px 2px 2px";
      }
      if (this.x == 1 && this.y == 2) {
        this.borderWidth = "2px 0px 2px 2px";
      }
      if (this.x == 2 && this.y == 0) {
        this.borderWidth = "2px 2px 0px 0px";
      }
      if (this.x == 2 && this.y == 1) {
        this.borderWidth = "2px 2px 0px 2px";
      }
      if (this.x == 2 && this.y == 2) {
        this.borderWidth = "2px 0px 0px 2px";
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
          
          // logic for checking if someone won,a nd telling the server the same
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
        } 
      }
    }
  }
</script>
<style>
.cell {
  width: 64px;
  height: 64px;
  padding-top: 10%;
  font-size: 42px;
  border: 2px solid #8859da;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #03DAC6;
  /* prevent selection */
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

  /* border: 2px solid rgb(255, 243, 243); */

  .cell:hover {
    background: #2F2F2F;
  }
</style>