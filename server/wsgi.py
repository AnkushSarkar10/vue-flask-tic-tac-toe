from app import socketio, app

if __name__ == "__main__":
    socketio.run(app, port=5000)

# gunicorn -b :5000 --worker-class eventlet -w 1 app:app