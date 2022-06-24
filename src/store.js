import { createStore } from 'vuex'

const io = require('socket.io-client');
const store = createStore({
    state() {
        return {
            board: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            currentPlayer: "",
            playerUserName: "",
            opponentUserName: "",
            roomId: "",
            myTurn: false,
            gameOver: false,
            socket: io('ws://127.0.0.1:5000', {transports: ['websocket']})
        };
    },
    mutations: {
        changeValue (state, payload) {
            if (state.board[payload.x][payload.y] == 0) {
                state.board[payload.x][payload.y] = payload.player;
            }
        },
        switchPlayer (state) {
            if (state.currentPlayer == "O") {
                state.currentPlayer = "X";
            } else {
                state.currentPlayer = "O";
            }
        },
        clearBoard (state) {
            for(var i = 0; i < state.board.length; i++) {
                for(var j = 0; j < state.board[i].length; j++) {
                    if (state.board[i][j] != 0) {
                        console.log("clear board");
                        state.board[i][j] = 0 ;
                    }
                }
            }
        },
        setUserName(state, givenName) {
            state.playerUserName = givenName;
        },
        setOppUserName(state, givenName) {
            state.opponentUserName = givenName;
        },
        setCurrentPlayer(state, player) {
            state.currentPlayer = player
        },
        setRoomId(state, room_id) {
            state.roomId = room_id;
        },
        setMyTurn(state, bool) {
            state.myTurn = bool;
        },
        setGameOver(state, bool) {
            state.gameOver = bool;
        }

    },
    getters: {
        socket: (state) => {
            return state.socket;
        },
        board: (state) => {
            return state.board;
        },
        checkIfFull: (state) => {
            for(var i = 0; i < state.board.length; i++) {
                for(var j = 0; j < state.board[i].length; j++) {
                    if (state.board[i][j] == 0) {
                        return false;
                    }
                }
            }
            return true;
        },
        playerHas3InARow: (state) => (player) => {
            // Horizontal rows
            for (let i=0; i<3; i++) {
              if (state.board[0][i] === player && state.board[1][i] === player && state.board[2][i] === player) {
                return true;
              }
            }
    
            // Vertical rows
            for (let i=0; i<3; i++) {
              if (state.board[i][0] === player && state.board[i][1] === player && state.board[i][2] === player) {
                return true;
              }
            }
    
            // Diagonals
            if (state.board[0][0] === player && state.board[1][1] === player && state.board[2][2] === player) {
                return true;
            }
            if (state.board[2][0] === player && state.board[1][1] === player && state.board[0][2] === player) {
                return true;
            }
            return false;
        },
        // omg this is lokey stupid, do i really need to do this everytime? idk man people said use getters ama use getters
        playerUserName: (state) => {
            return state.playerUserName;
        },
        opponentUserName: (state) => {
            return state.opponentUserName;
        },
        roomId: (state) => {
            return state.roomId;
        },
        myTurn: (state) => {
            return state.myTurn;
        },
        currentPlayer: (state) => {
            return state.currentPlayer;
        },
        gameOver: (state) => {
            return state.gameOver;
        }
    }
});

export default store;