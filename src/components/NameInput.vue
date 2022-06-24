<template>
  <input type="text" v-model="name">
  <button class="btn btn-dark" @click="setUserName()">Enter Name</button>
</template>

<script>
export default {
    data() {
        return {
            name: ""
        }
    },
    methods: {
        setUserName() {
            let socket = this.$store.getters.socket;
            let store = this.$store;

            this.$store.commit('setUserName', this.name);
            socket.emit('get_username', this.name);
            let data = {
                room_id: this.name + '-' + socket.id, 
                username: this.name
            }
            socket.emit('user_join_room', data);

            
            // makeing a promis so that we get the room id before we move to the game page, as i would like to display the roomid in the url, omg kill me this took me way longer than i had antisipated, i started doing it at like 2:30am thinking "Oh,leme just add this tinny little feature and then go to sleep, max 15-30 mins tops". But now its 4am and my will to live is at an all time low :)
            let set_current_player_and_room_id = new Promise ((resolve, reject) => {
                if (!socket) {
                    reject('No socket connection.');
                } else {
                    // get current player from server and its roomid 
                    store.getters.socket.on('set_current_player_and_room_id', (data) => {
                        store.commit('setCurrentPlayer', data["player"]);
                        store.commit('setRoomId', data["room_id"]);
                        console.log("my room id is this -> " + store.getters.roomId);
                        if (data["player"] == "X") {
                            store.commit('setMyTurn', true);
                        }
                        resolve(store.getters.roomId);
                    });
                }
            })

            set_current_player_and_room_id.then((roomid) => {
                // go  to the waiting screen if only one in room
                socket.on("waiting_for_opponent", () => {
                    let url = '/waiting/' + roomid;
                    this.$router.push(url);
                })
                // go to the game screen if both player in room
                socket.on("match_found", () => {
                    // send the username to the server
                    socket.emit("sendUserName", {name: store.getters.playerUserName, roomid: store.getters.roomId});
                    let url = '/game/' + roomid;
                    this.$router.push(url);
                })
               
            }).catch((err) => {
                console.log(err);
            })
           
        }
    }
}
</script>

<style>

</style>