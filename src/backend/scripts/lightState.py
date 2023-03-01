# Imports
import RPi.GPIO as GPIO

# Pins
led=26

# Setup
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(led, GPIO.OUT)

print(GPIO.input(led))