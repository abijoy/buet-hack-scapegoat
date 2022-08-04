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


genres = ['pop', 'hip hop', 'rap', 'rock',
          'electronic', 'latin', 'indie', 'classical', 'k pop', 'country', 'metal', 'romantic']

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

        except Exception as e:
            print("sorry no such result..please try again..")
            speak('sorry no such result. please try again...')
            continue
