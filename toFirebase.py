import serial
import time
import requests
import json
import random

firebase_url = 'https://tree3.firebaseio.com'
#Connect to Serial Port for communication
try:
    ser = serial.Serial('/dev/ttyACM0', 9600, timeout=0)
except:
    ser = serial.Serial('/dev/ttyACM1', 9600, timeout=0)


fixed_interval = 5
check = True
while 1:
  try:
    
    status = ser.readline()
    # the current time and date
    time_hhmmss = time.strftime('%H:%M:%S')
    date_mmddyyyy = time.strftime('%d/%m/%Y')
    
    trash_location = 'ARC';
    if(not check and status == "Empty\r\n"):
        check = True
    
    if((status == "" or status == "Empty\r\n")) and check:
        lat = 38.544907
        lon = -121.740517
        status = 'Empty.'
        print status + ',' + str(lat) + str(lon) + time_hhmmss + ',' + date_mmddyyyy + ',' + trash_location
    elif((status == "" or status == "Full!\r\n"))  :
        check = False 
        status = 'Full!'
        stay = 1
        lat = 38.544907
        lon = -121.740517
        print status + ',' + str(lat) + str(lon) + time_hhmmss + ',' + date_mmddyyyy + ',' + trash_location
    
    
    #push record into firebase
    data = {'Status':status, 'Latitude': lat, 'Longitude': lon, 'Date':date_mmddyyyy,'Time':time_hhmmss}
    result = requests.put(firebase_url + '/' + trash_location + '/Ballroom.json' + '?auth=TDNPshwR7KYwLo9OkdKug3cNKUkJOLVShXrgVCK8',data=json.dumps(data))
    
    print 'Record inserted. Result Code = ' + str(result.status_code) + ',' + result.text
    time.sleep(fixed_interval)
  except IOError:
    print('Error! Something went wrong.')
  time.sleep(fixed_interval)