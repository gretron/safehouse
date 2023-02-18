# Imports
import sys
import RPi.GPIO as GPIO

# Pins
led=21

# Setup
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(led, GPIO.OUT)

GPIO.output(led, GPIO.HIGH if sys.argv[1] == "on" else GPIO.LOW)

print("Light: " + str(GPIO.input(led)))