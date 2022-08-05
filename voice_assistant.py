import speech_recognition as sr
import pyttsx3
import datetime
import wikipedia
import webbrowser
import os
import time
import subprocess
import json
import requests
import itertools

engine = pyttsx3.init('sapi5')
voices = engine.getProperty('voices')
engine.setProperty('voice', 'voices[0].id')


def speak(text):
    engine.say(text)
    engine.runAndWait()


def wishMe():
    hour = datetime.datetime.now().hour
    if hour >= 0 and hour < 12:
        speak("Hello,Good Morning")
        print("Hello,Good Morning")
    elif hour >= 12 and hour < 18:
        speak("Hello,Good Afternoon")
        print("Hello,Good Afternoon")
    else:
        speak("Hello,Good Evening")
        print("Hello,Good Evening")


def takeCommand():
    r = sr.Recognizer()
    r.pause_threshold = 0.8
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)

        try:
            statement = r.recognize_google(audio, language='en-in')
            print(f"user said:{statement}\n")

        except Exception as e:
            speak("Pardon me, please say that again")
            return "None"
        return statement


def sayGoodbye():
    speak('your personal assistant G-one is shutting down,Good bye')
    print('your personal assistant G-one is shutting down,Good bye')


def searchWikipedia(statement):
    speak('Searching Wikipedia...')
    statement = statement.replace("wikipedia", "")
    results = wikipedia.summary(statement, sentences=3)
    speak("According to Wikipedia")
    print(results)
    speak(results)

def getCity():
    try:
        freegeoip = "https://ipinfo.io/"
        geo_r = requests.get(freegeoip)
        geo_dict = geo_r.json()
        return geo_dict['city']
    except Exception as e:
        print(e)

def getCountry():
    try:
        freegeoip = "https://ipinfo.io/"
        geo_r = requests.get(freegeoip)
        geo_dict = geo_r.json()
        return geo_dict['country']
    except Exception as e:
        print(e)



# genres = ['pop', 'hip hop', 'rap', 'rock',
#           'electronic', 'latin', 'indie', 'classical', 'k pop', 'country', 'metal', 'romantic']

genres_with_hyphen = ['acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 'black-metal', 'bluegrass', 'blues',
          'bossanova', 'brazil', 'breakbeat', 'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical',
          'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house', 'detroit-techno', 'disco',
          'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 'electronic', 'emo', 'folk', 'forro', 'french',
          'funk', 'garage', 'german', 'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock',
          'hardcore', 'hardstyle', 'heavy-metal', 'hip hop', 'holidays', 'honky-tonk', 'house', 'idm', 'indian', 'indie',
          'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz', 'k-pop', 'kids', 'latin',
          'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore', 'minimal-techno', 'movies', 'mpb',
          'new-age', 'new-release', 'opera', 'pagode', 'party', 'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep',
          'power-pop', 'progressive-house', 'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton',
          'road-trip', 'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes',
          'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study', 'summer', 'swedish',
          'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music']


genres = [genre.replace('-',' ') for genre in genres_with_hyphen]

if __name__ == '__main__':

    while True:
        speak("Tell me how can I help you now?")
        statement = takeCommand().lower()
        try:
            # Constantly listen for commands
            if statement == 0:
                continue
            # Say these words for shut the assistant down
            if "goodbye" in statement or "ok bye" in statement or "stop" in statement:
                sayGoodbye()
                break
            # Search wikipedia
            if 'what is' in statement or 'wikipedia' in statement:
                searchWikipedia(statement)
            if 'artist' in statement:
                speak('Say name of the artist')
                statement = takeCommand().lower()
                print(statement)
                print('searching artist')
                speak('searching artist')
            for genre_name in genres:
                if genre_name in statement:
                    speak(f'searching {genre_name} song')
                    print(f'searching {genre_name} song')
            if 'track' in statement or 'search song' in statement:
                speak('Say name of the track')
                statement = takeCommand().lower()
                print(statement)
                print('searching track')
                speak('searching track')
            if 'top news' in statement or 'top stories' in statement:
                country = getCountry()
                if 'my location' in statement:
                    city = getCity()
                    endpoint_url = f'https://b39a-103-217-111-30.in.ngrok.io/app/news/geo-top-news?lang=en&country={country}&city={city}'
                    resp = requests.get(endpoint_url)
                else:
                    resp = requests.get(f'https://b39a-103-217-111-30.in.ngrok.io/app/news/top-news?lang=en&country={country}')
                resp_dict = json.loads(resp.text)
                for i in resp_dict['top_news']:
                    print(i)
                    speak(i)

        except Exception as e:
            print("sorry no such result..please try again..")
            speak('sorry no such result. please try again...')
            continue
