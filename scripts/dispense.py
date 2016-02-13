import RPi.GPIO as GPIO
import time
import sys

GPIO.setmode(GPIO.BOARD)

disp[0] = [3, 5, 7, 8]
disp[1] = [10, 11, 12, 13]
disp[2] = [15, 16, 18, 19]
disp[3] = [21, 22, 23, 24]
disp[4] = [29, 31, 32, 33]
GPIO.setup(disp1, GPIO.OUT,initial=GPIO.LOW)

i = 0
if(len(sys.argv))!= 4: #wrong arg count
	return 1
	
times = sys.argv
if(times[0]+times[1]+times[2]+times[3]>20): #too much
	return 2

while(i<1000*max(times)):
	i += 1
	if(times[0]<=i/1000):
		dispSet(0,i)
	if(times[1]<=i/1000):
		dispSet(1,i)
	if(times[2]<=i/1000):
		dispSet(2,i)
	if(times[3]<=i/1000):
		dispSet(3,i)
		
	time.sleep(0.001)
	
return

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