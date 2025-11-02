#!/usr/bin/env python
#turn Power Off
import sys
import serial


port = serial.Serial('/dev/ttyUSB1', baudrate=9600, bytesize=8, parity=serial.PARITY_NONE, stopbits=1, timeout=5)
port.open
#this is the code sent to the projector.  Replace it for your model
port.write(("PWR OFF\r").encode('utf-8'))
received = port.readline()
print(received) # newline is printed
port.close
