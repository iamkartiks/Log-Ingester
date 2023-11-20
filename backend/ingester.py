from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_socketio import SocketIO, emit
from flask_cors import CORS

from configs import config_data

app = Flask(__name__)
socketio = SocketIO(app)
CORS(app)
# MongoDB configuration
user = config_data['user']
password = config_data['password']
database = config_data['database']
app.config['MONGO_URI'] = f'mongodb+srv://{user}:{password}@loggerinstance.o4rqneo.mongodb.net/{database}?retryWrites=true&w=majority'
mongo = PyMongo(app)

logs_collection = mongo.db.logs

# Route for log ingestion
@app.route('/ingest', methods=['POST'])
def ingest_log():
    try:
        log_data = request.get_json()
        # Insert log data into MongoDB
        logs_collection.insert_one(log_data)
        return jsonify({"status": "success", "message": "Log ingested successfully"}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@app.route('/logs', methods=['GET'])
def get_all_logs(): #
    try:
        logs = list(logs_collection.find({}, {'_id': 0}))
        # search_results = []
        # for log in logs:
        #     match = True
        #     for key, value in search_params.items():
        #         if key in log and log[key] != value:
        #             match = False
        #             break
        #     if match:
        #         search_results.append(log)

        socketio.emit('search_results', {'logs': logs})
        return jsonify({"status": "success", "logs": logs}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    socketio.run(app, port=3000)

