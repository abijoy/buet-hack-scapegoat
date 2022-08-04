import json
from googlemaps import Client
import re
# clear html tags
def cleanhtml(raw_html):
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext
# Add you API key here
mapService = Client(key='AIzaSyBQ1ybhHxfFvZBPetoA6SSFfbPNwZaZFk4')

def getDirection(source,destination):
    directions = mapService.directions(source, destination)
    directions = directions[0]

    i=1
    directionResponse={
        "startAddress":'',
        "endAddress":'',
        "steps":[]
    }
    for leg in directions['legs']:
        startAddress = leg['start_address']
        print ("Start Address:", startAddress)
        endAddress = leg['end_address']
        print ("End Address:", endAddress)
        directionResponse["startAddress"]=startAddress;
        directionResponse["endAddress"]=endAddress;
        
        for step in leg['steps']:
            html_instructions = step['html_instructions']
            freshText=cleanhtml(html_instructions)
            directionResponse["steps"].append(freshText)
            print ("STEP {} {}".format(i ,freshText))
            i = i+1
            directionResponse["steps"].append(freshText)
    json_object = json.dumps(directionResponse, indent = 4) 
    print(json_object)

if __name__ == "__main__":
    sourceAddress="Dhanmondi"
    destinationAddress="Jigatola"
    getDirection(sourceAddress,destinationAddress)