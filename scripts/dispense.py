import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BOARD)

disp1 = [3, 4, 5, 8]
GPIO.setup(disp1, GPIO.OUT,initial=GPIO.LOW)

i = 0
while(i<1000):
	i++;
	if(i%8==0):
		GPIO.output(disp1[3], GPIO.LOW)		
	if(i%8==1):
		GPIO.output(disp1[1], GPIO.HIGH)
	if(i%8==2):
		GPIO.output(disp1[0], GPIO.LOW)
	if(i%8==3):
		GPIO.output(disp1[2], GPIO.HIGH)
	if(i%8==4):
		GPIO.output(disp1[1], GPIO.LOW)
	if(i%8==5):
		GPIO.output(disp1[3], GPIO.HIGH)
	if(i%8==6):
		GPIO.output(disp1[2], GPIO.LOW)
	if(i%8==7):
		GPIO.output(disp1[0], GPIO.HIGH)
}