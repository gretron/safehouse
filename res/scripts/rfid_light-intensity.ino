#include <SPI.h>
#include <MFRC522.h>
#include "ESP8266WiFi.h"
#include "PubSubClient.h"
#define SS_PIN D8
#define RST_PIN D0

const char* ssid = "safehouse"; //Enter SSID
const char* password = "thisisasafespace"; //Enter Password

const char* mqtt_server = "172.20.10.4";

WiFiClient vanieriot;
PubSubClient client(vanieriot);

const int photoresistorPin = A0;
int value;

MFRC522 rfid(SS_PIN, RST_PIN); // Instance of the class
MFRC522::MIFARE_Key key;

// Init array that will store new NUID
byte nuidPICC[4];

void setup_wifi() {
 delay(10);
 // We start by connecting to a WiFi network
 Serial.println();
 Serial.print("Connecting to ");
 Serial.println(ssid);
 
 WiFi.begin(ssid, password);
 
 while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
 }
 
 Serial.println("");
 Serial.print("WiFi connected - ESP-8266 IP address: ");
 Serial.println(WiFi.localIP());
}

void callback(String topic, byte* message, unsigned int length) {
 Serial.print("Message arrived on topic: ");
 Serial.print(topic);
 Serial.print(". Message: ");
 String messagein;

 for (int i = 0; i < length; i++) {
   Serial.print((char)message[i]);
   messagein += (char)message[i];
 }

  Serial.println();
}

void reconnect() {
 while (!client.connected()) {
   Serial.print("Attempting MQTT connection...");
   
   if (client.connect("vanieriot")) {
     Serial.println("connected");
     client.subscribe("IoTlab/ESP");
   } else {
     Serial.print("failed, rc=");
     Serial.print(client.state());
     Serial.println(" try again in 3 seconds");
     // Wait 5 seconds before retrying
     delay(3000);
   }
 }
}

void setup() {
  Serial.begin(115200);

  setup_wifi();
 client.setServer(mqtt_server, 1883);
 client.setCallback(callback);
 pinMode(photoresistorPin, INPUT);
  
  SPI.begin(); // Init SPI bus
  rfid.PCD_Init(); // Init MFRC522
  Serial.println();
  Serial.print(F("Reader :"));
  rfid.PCD_DumpVersionToSerial();
  
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
}

unsigned long previousMillis = 0;
unsigned long interval = 1000;

void loop() {
  if (!client.connected()) {
  reconnect();
 }
 
 if(!client.loop())
  client.connect("vanieriot");
  
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis > interval) {
    previousMillis = currentMillis;

    value = analogRead(photoresistorPin);
    char cstr[16];
    itoa(value, cstr, 10);
    client.publish("safehouse/light-intensity", cstr);
    Serial.println(cstr);
  }
  
  // Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
  if (!rfid.PICC_IsNewCardPresent())
   return;
   
  // Verify if the NUID has been read
  if (!rfid.PICC_ReadCardSerial())
   return;
   
  Serial.print(F("PICC type: "));
  MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
  Serial.println(rfid.PICC_GetTypeName(piccType));
  
  // Check is the PICC of Classic MIFARE type
  if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
   piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
   piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
   Serial.println(F("Your tag is not of type MIFARE Classic."));
   return;
  }

    Serial.println(F("A new card has been detected."));
    // Store NUID into nuidPICC array
    for (byte i = 0; i < 4; i++) {
      nuidPICC[i] = rfid.uid.uidByte[i];
    }
  
   Serial.println(F("The NUID tag is:"));
   Serial.print(F("In dec: "));
   String code = getDec(rfid.uid.uidByte, rfid.uid.size);
   int codeLength = code.length() + 1;
   char codeArray[codeLength];
   code.toCharArray(codeArray, codeLength);
   client.publish("safehouse/rfid", codeArray);
   client.publish("safehouse/register", codeArray);
   Serial.println();

    // Halt PICC
    rfid.PICC_HaltA();
    // Stop encryption on PCD
    rfid.PCD_StopCrypto1();

  
}

/**
 Helper routine to dump a byte array as dec values to Serial.
 */
String getDec(byte *buffer, byte bufferSize) {
  String code = "";
  
  for (byte i = 0; i < bufferSize; i++) {
   Serial.print(buffer[i] < 0x10 ? " 0" : " ");
   Serial.print(buffer[i], DEC);

   code += buffer[i] < 0x10 ? " 0" : " ";
   code += buffer[i];
  }

  return code;
}
