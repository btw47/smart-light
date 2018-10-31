import sys, getopt
import RPi.GPIO as GPIO

# Constants
ON = 'ON'

# Set the GPIO pin that will trigger the relay
signalPin = 26

# Set up the Raspberry Pi for signal output
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(signalPin, GPIO.OUT, initial=GPIO.HIGH)

try:
        # if there is no argument to declare ON / OFF status ==> throw error
        if len(sys.argv) == 1:
            raise Exception('Sorry, not enough arguments. Please append ON or OFF to your command.')
	    GPIO.output(signalPin, GPIO.LOW)

        # determine whether the status of the light is ON or OFF
        lightIsOn = sys.argv[1] == ON
	
        # if the light is being triggered ==> open relay
	if (lightIsOn):
		print 'TURN LIGHT ON'
		
		signalOutput = GPIO.HIGH
		GPIO.output(signalPin, GPIO.LOW)
        # else ==> close relay
	else:
		print 'TURN LIGHT OFF'
		signalOutput = GPIO.LOW
		GPIO.output(signalPin, GPIO.HIGH)

except KeyboardInterrupt:
    exit('Process interrupted. Exiting now.')

# exit script
sys.exit(0)
