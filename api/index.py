from flask import Flask, request
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
    
    url = f"https://api.openchargemap.io/v3/poi/?output=json&latitude={lat}&longitude={lon}&distance={distance_km}&distanceunit=KM&maxresults=300&sort=distance&key={key}"
    print(url)
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

def get_nearest_chargers(start_lat, start_lon, distance_miles):

    chargers = get_chargers_list(start_lat, start_lon, distance_miles)
    
    start = {'lat': str(start_lat), 'lon': str(start_lon)}
    destinations = []

    #max_chargers = 40 if len(chargers) > 40 else len(chargers)

    charger_id = 0
    for i, c in enumerate(chargers):
        
        # Check if this charger has Fast Chargers and skip if not
        has_fast_chargers = False
        for j, connection in enumerate(c['Connections']):
            try:
                power_kw = connection.get('PowerKW')
                if power_kw is not None and int(power_kw) > 49:
                    has_fast_chargers = True
            except (ValueError, TypeError):
                # Handle the case where 'PowerKW' value is not a valid integer or is None
                print(f"Warning: 'PowerKW' is not a valid integer in connection {j + 1}. Skipping...")

        if has_fast_chargers:
            
            dest_lat = c['AddressInfo']['Latitude']
            dest_lon = c['AddressInfo']['Longitude']

            dest = {'lat': str(dest_lat), 'lon': str(dest_lon)}
            #driving_distance = get_distances({'start': start, 'destination': dest})
            driving_distance = "Not available"

            charging_station_info = {
                'ChargerID': charger_id,
                'Operator': c['OperatorInfo'].get('Title') if c.get('OperatorInfo') else None,
                'Title': c['AddressInfo'].get('Title') if c.get('AddressInfo') else None,
                'AddressLine1': c['AddressInfo'].get('AddressLine1') if c.get('AddressInfo') else None,
                'Town': c['AddressInfo'].get('Town') if c.get('AddressInfo') else None,
                'Postcode': c['AddressInfo'].get('Postcode') if c.get('AddressInfo') else None,
                'Distance': f"{c['AddressInfo'].get('Distance')}" if c.get('AddressInfo') else None,
                'Driving Distance': f"{driving_distance}",
                'NumberOfChargePoints': c.get('NumberOfPoints'),
                'UsageType': c.get('UsageType', {}).get('Title') if c.get('UsageType') else None,
                'AccessComments': c['AddressInfo'].get('AccessComments') if c.get('AddressInfo') else None,
                'DateLastVerified': c.get('DateLastVerified'),
                'Credit': c['DataProvider'].get('Title') if c.get('DataProvider') else None,
                'Latitude': c['AddressInfo'].get('Latitude') if c.get('AddressInfo') else None,
                'Longitude': c['AddressInfo'].get('Longitude') if c.get('AddressInfo') else None,
            }

            destinations.append(charging_station_info)
            charger_id = charger_id +1

            # Check if max_chargers have already been added
            # if i + 1 == max_chargers:
            #     break

    return destinations
    


app = Flask(__name__)

@app.route('/api/getchargershere', methods=['GET'])
def get_chargers_here():
    # Get latitude, longitude, and distance from query parameters or use defaults
    latitude = request.args.get('lat', "51.0955")
    longitude = request.args.get('lon', "1.1235")
    distance = request.args.get('distance', "150")

    return get_nearest_chargers(latitude, longitude, distance)

if __name__ == '__main__':
    app.run(port=5328)