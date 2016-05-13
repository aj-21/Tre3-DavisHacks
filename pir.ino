
/////////////////////////////
//VARS
//the time we give the sensor to calibrate (10-60 secs according to the datasheet)
int calibrationTime = 20;        

//the time when the sensor outputs a low impulse
long unsigned int lowIn;         

//the amount of milliseconds the sensor has to be low 
//before we assume all motion has stopped
long unsigned int pause = 2000;  

boolean lockLow = true;
boolean takeLowTime;  
bool flag = true;

int pirPin = 7;    //the digital pin connected to the PIR sensor's output
int ledPin = 8;
int StateB = 2;
int StateM = 3;
boolean Bu = false;
boolean Mo = false;
boolean Le = false;
int button = 4;
int buttonSwitch = 0;

/////////////////////////////
//SETUP
void setup(){
  Serial.begin(9600);
  pinMode(pirPin, INPUT);
  pinMode(button, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(StateB, OUTPUT);
  pinMode(StateM, OUTPUT);
  digitalWrite(pirPin, LOW);

  //give the sensor some time to calibrate
//  Serial.print("calibrating sensor... ");
//    for(int i = 0; i < calibrationTime; i++){
//      Serial.print(".");
//      delay(1000);
//      }
//    Serial.println(" done");
//    Serial.println("SENSOR ACTIVE");
    delay(50);
  }

////////////////////////////
//LOOP
void loop(){

     digitalWrite(StateB, digitalRead(button));
     digitalWrite(StateM, digitalRead(pirPin));
     Bu = digitalRead(StateB);
     Mo = digitalRead(StateM);
     
    // Serial.println(Mo);
//     buttonSwitch = digitalRead(button);
     if(Mo && !Le && !Bu){
      if(flag){
       digitalWrite(ledPin, HIGH);   //the led visualizes the sensors output pin state
      }
       Le = true;
       
//       digitalWrite(pirPin, HIGH);
       //Serial.println("Full!");
//       if(buttonSwitch == HIGH){
//        digitalWrite(pirPin, LOW);
//        digitalWrite(ledPin, LOW);
//       }
//       if(lockLow){  
//         //makes sure we wait for a transition to LOW before any further output is made:
//         lockLow = false;            
//         //Serial.println("---");

          Serial.println("Full!");
          flag = false;

//        // flag = false;
//         delay(50);
       //}         
         takeLowTime = true;
         
     }
     
     if(Bu && Le){       
       digitalWrite(ledPin, LOW);  //the led visualizes the sensors output pin state
       Le = false;
       Serial.println("Empty");
       Bu = false;
//       if(takeLowTime){
//        lowIn = millis();          //save the time of the transition from high to LOW
//        takeLowTime = false;       //make sure this is only done at the start of a LOW phase
//        }
//       //if the sensor is low for more than the given pause, 
//       //we assume that no more motion is going to happen
//       if(!lockLow && millis() - lowIn > pause){  
//           //makes sure this block of code is only executed again after 
//           //a new motion sequence has been detected
//           lockLow = true;
//           
//           Serial.println("Empty");      //output                      
//         
//           
//           delay(50);
//           }
        flag = true;
       }
  }

