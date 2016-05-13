
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

        flag = true;
       }
  }

