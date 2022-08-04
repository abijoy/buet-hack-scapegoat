from os import access
import requests
import json 

# search url
url = ''
# artist_name ='Iron Maiden'
track_name = 'Fear of the dark'

access_token = 'BQDlXMPLsiMSaSo8korraRUvTBL9JZMaxz43jeuP50oce0YlLBroNtqz7AaGMoGyQojev2FPvG5rWAkN0rB-cr3VQLiiFCgXG1hFUpDSluQMJRXUpb_nQrVgokTc_7d-eFwZNuSHvy4Q0HZzJsbUvC4ACvQAz4jlh0zXuM7MosqORq6AFwI-KfBVwWLrd4w6i0JxaqF8'
artist_info = requests.get(
    'https://api.spotify.com/v1/search',
    headers={
        'Authorization': 'Bearer {token}'.format(token=access_token)
    },
    params={ 
        # 'q': artist_name,
        'q': track_name,
        'type': 'track',
        'limit': 20,
    })


# print(artist_info.content)
music_data = json.loads(artist_info.content)
d = dict(music_data)
artist_dict = d['tracks']

# for a in artist_dict:
#     print(artist_dict[a], "<<<<<<<<<<<<<<<< " + a)
#     print("\n\n\n\n\n")

items = artist_dict['items']
print(items[0]['uri'])


# _music_data = (music_data)
# print(_music_data)
# print(json.dumps(music_data, indent=3))