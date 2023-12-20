from flask import Flask, request
from get_chargers_list import get_nearest_chargers
import requests
import os
from dotenv import load_dotenv

load_dotenv()
def get_distances(distance_lookup):
   
    key = os.getenv("CHARGEHERE_OPENROUTESERVICE_KEY")
    headers = {'User-Agent': 'ChargeHere/1.0'}
    
    if key is None:
        print("Error: OPENROUTESERVICE KEY is missing.")
        return
    
    start_lat = distance_lookup['start']['lat']
    start_lon = distance_lookup['start']['lon']
    destination = distance_lookup['destination']
    
    url = f"https://api.openrouteservice.org/v2/directions/driving-car?api_key={key}&start={start_lon},{start_lat}&end={destination['lon']},{destination['lat']}"

    try:
        # Make the API request
        res = requests.get(url)

        # Check if the request was successful (status code 200)
        if res.status_code == 200:
            route = res.json()
            return(float(route['features'][0]['properties']['segments'][0]['distance'])/1000)
        else:
            print(f"Error: Request failed with status code {res.status_code}")
            return 

    except requests.RequestException as e:
            # Handle requests-related exceptions
        print(f"Error: OpenRouteService API request failed: {e}")
        return
        
def get_chargers_list(lat, lon, distance_km):
    key = os.getenv("CHARGEHERE_OPENCHARGEMAP_KEY")
    
    if key is None:
        print("Error: OPENCHARGEMAP KEY is missing.")
        return
    
    url = f"https://api.openchargemap.io/v3/poi/?output=json&latitude={lat}&longitude={lon}&distance={distance_km}&distanceunit=KM&CurrentTypeID=30&sort=distance&key={key}"
    headers = {'User-Agent': 'ChargeHere/1.0'}

    try:
        # Make the API request
        res = requests.get(url, headers=headers)

        # Check if the request was successful (status code 200)
        if res.status_code == 200:
            # Process the response data as needed
            charging_stations = res.json()
            return charging_stations
        else:
            print(f"Error: Request failed with status code {res.status_code}")
            return

    except requests.RequestException as e:
            # Handle requests-related exceptions
        print(f"Error: Open Charge Map API request failed: {e}")
        return

def filter_only_fast(chargers):
    #TODO: Move to a separate File
    #TODO: Loop through all chargers, return only chargers that have one connection with 'PowerKM' <= 50
    #TODO: Ideally, also include a count of how many connections with 'PowerKM' <= 50
    return chargers

def get_nearest_chargers(start_lat, start_lon, distance_miles):

    max_chargers = 3
    
    chargers = get_chargers_list(start_lat, start_lon, distance_miles)
    fast_chargers=filter_only_fast(chargers)
    
    start = {'lat': str(start_lat), 'lon': str(start_lon)}
    destinations = []
    print(f"Returning chargers for {start}")

    for i, c in enumerate(chargers):
        dest_lat = c['AddressInfo']['Latitude']
        dest_lon = c['AddressInfo']['Longitude']

        dest = {'lat': str(dest_lat), 'lon': str(dest_lon)}
        driving_distance = get_distances({'start': start, 'destination': dest})
      
        charging_station_info = {
                'Operator': c['OperatorInfo']['Title'],
                'Title': c['AddressInfo']['Title'],
                'AddressLine1': c['AddressInfo']['AddressLine1'],
                'Town': c['AddressInfo']['Town'],
                'Postcode': c['AddressInfo']['Postcode'],
                'Distance': f"{c['AddressInfo']['Distance']}",
                'Driving Distance': f"{driving_distance}",
                'NumberOfChargePoints': c['NumberOfPoints'],
                'UsageType': c['UsageType']['Title'],
                'AccessComments': c['AddressInfo']['AccessComments'],
                'DateLastVerified': c['DateLastVerified'],
                'Credit': c['DataProvider']['Title'],
                'Latitude': c['AddressInfo']['Latitude'],
                'Longitude': c['AddressInfo']['Longitude'],

            }
    
        destinations.append(charging_station_info)

        # Check if max_chargers have already been added
        if i + 1 == max_chargers:
            break

    return destinations
    


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