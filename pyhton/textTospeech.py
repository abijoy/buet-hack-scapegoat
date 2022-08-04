import pyttsx3
engine = pyttsx3.init()
engine.setProperty("rate", 128)
voices = engine.getProperty('voices')
engine.setProperty('voice', voices[1].id)
def speak(text):
    engine.say(text)
    engine.runAndWait()

speak("i am zahin and doing hackathon")