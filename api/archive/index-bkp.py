from flask import Flask, request
from get_chargers_list import get_nearest_chargers

app = Flask(__name__)

@app.route('/api/getchargershere', methods=['GET'])
def get_chargers_here():
    # Get latitude, longitude, and distance from query parameters or use defaults
    latitude = request.args.get('lat', "51.0955")
    longitude = request.args.get('lon', "1.1235")
    distance = request.args.get('distance', "60")

    return get_nearest_chargers(latitude, longitude, distance)

if __name__ == '__main__':
    app.run(port=5328)