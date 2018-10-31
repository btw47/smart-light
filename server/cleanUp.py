import RPi.GPIO as GPIO

signalPin = 26

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(signalPin, GPIO.IN)

exit(0)
