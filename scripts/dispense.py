import RPi.GPIO as GPIO
import time
import sys

TIME_SCALE = 1000

def dispSet(d, i):
	if(i%8==0):
		GPIO.output(disp[d][3], GPIO.LOW)		
	if(i%8==1):
		GPIO.output(disp[d][1], GPIO.HIGH)
	if(i%8==2):
		GPIO.output(disp[d][0], GPIO.LOW)
	if(i%8==3):
		GPIO.output(disp[d][2], GPIO.HIGH)
	if(i%8==4):
		GPIO.output(disp[d][1], GPIO.LOW)
	if(i%8==5):
		GPIO.output(disp[d][3], GPIO.HIGH)
	if(i%8==6):
		GPIO.output(disp[d][2], GPIO.LOW)
	if(i%8==7):
		GPIO.output(disp[d][0], GPIO.HIGH)

GPIO.setmode(GPIO.BOARD)

GPIO.setwarnings(False)

disp =	[ [3, 5, 7, 8]
,[10, 11, 12, 13]
,[15, 16, 18, 19]
,[21, 22, 23, 24]
,[29, 31, 32, 33]]

GPIO.setup(disp[0], GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(disp[1], GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(disp[2], GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(disp[3], GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(disp[4], GPIO.OUT,initial=GPIO.LOW)

time.sleep(2)#server buffering

if(len(sys.argv))!= 6: #wrong arg count
	sys.exit(1)
	
times = [int(i) for i in sys.argv[1:]]
if(times[0]+times[1]+times[2]+times[3]+times[4]>20000/TIME_SCALE): #too much
	sys.exit(2)
	
if(times[0]<0 or times[1]<0 or times[2]<0 or times[3]<0 or times[4]<0):
	sys.exit(3)
	
i = 0
while(i<TIME_SCALE*max(times)):
	i += 1
	if(times[0]>i/TIME_SCALE):
		dispSet(0,i)
	if(times[1]>i/TIME_SCALE):
		dispSet(1,i)
	if(times[2]>i/TIME_SCALE):
		dispSet(2,i)
	if(times[3]>i/TIME_SCALE):
		dispSet(3,i)
	if(times[4]>i/TIME_SCALE):
		dispSet(4,i)
		
	time.sleep(0.001)
	
sys.exit(0)