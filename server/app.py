from flask import Flask, redirect, render_template, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send, join_room, leave_room
from numpy import broadcast
from models import Game
import requests

app = Flask(__name__, 
        static_folder="./dist/static",
        template_folder="./dist")
app.config['SECRET_KEY'] = 'ballsdickballs'
app.config['DEBUG'] = True

cors  = CORS(app, resources={r"/api/*": {"origin": "*"}})

socketio = SocketIO(app, cors_allowed_origins="*")

# socketio functions

@socketio.on('connect')
def client_connect():
    emit('on_connect', 'Connected') 

@socketio.on('get_username')
def get_username(userName):
    print(userName + ' : ' + request.sid)

@socketio.on('disconnect')
def client_disconect():
    pass

# room stuff 
Rooms = {}

def printRooms():
    print("--------- Rooms ---------")
    for i in Rooms:
        print(f'{i} - {Rooms[i]}')
    print("------------------------")

@socketio.on('user_join_room')
def user_join_room(data):
    username = data['username']
    room_id = ''
    # join room if it already has 1 member in it
    for i in Rooms:
        if Rooms[i] == 1:
            room_id = i
            join_room(i)
            Rooms[i] += 1
            # set player value to O and roomid in client
            room_id_and_player = {"room_id": i, "player": "O"}
            emit("set_current_player_and_room_id", room_id_and_player)
            send("match found", to=room_id)
            break
    # if no room with one member, create one with the given room id
    else:
        room_id = data['room_id']
        join_room(room_id)
        # set player value to X and roomid in client
        room_id_and_player = {"room_id": room_id, "player": "X"}
        emit("set_current_player_and_room_id", room_id_and_player)
        Rooms[room_id] = 1

    print(username + ' has entered the room - ' + room_id)
    send(username + ' has entered the room - ' + room_id, to=room_id)
    printRooms()

# game logic

# get the board once it is changed
@socketio.on('board_changed')
def board_changed(data):
    data_to_send = {"x":data["x"], "y":data["y"], "player":data["player"]}
    emit("board_changed_in_server", data_to_send , to=data['roomId'])

# switch the turn to the other person
@socketio.on('switch_users')
def switch_users(room_id):
    emit('make_user_switch', to=room_id)

# when one user wins
@socketio.on('someone_won')
def someone_won(data):
    # data -> roomid, who won
    pass


if __name__ == "__main__":
    socketio.run(app, port=5000)