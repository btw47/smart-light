# GPIO NOTES
# 5V DC Power ==> PIN #2
# GROUND ==> PIN #6
# 3.3V DC Power (for signal) ==> PIN #18

import sys, getopt
# import RPi.GPIO as GPIO

ON = 'ON'

signalPin = 18

# GPIO.setmode(GPIO.BCM)
# GPIO.setup(signalPin, GPIO.OUT, initial=GPIO.LOW)

try:
	lightIsOn = sys.argv[1] == ON
	
	if (lightIsOn):
		print 'TURN LIGHT ON'
		
		# signalOutput = GPIO.HIGH
		signalOutput = 'HIGH'
		# GPIO.output(signalPin, GPIO.HIGH)
	else:
		print 'TURN LIGHT OFF'
		# signalOutput = GPIO.LOW
		signalOutput = 'LOW'
		# GPIO.output(signalPin, GPIO.LOW)
	
except KeyboardInterrupt:
	GPIO.cleanup()

sys.exit(0)