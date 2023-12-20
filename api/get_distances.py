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
        

def main():
    print("Function cannot be called directly")

if __name__ == "__main__":
    main()