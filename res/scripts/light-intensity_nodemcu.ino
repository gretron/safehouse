#include "ESP8266WiFi.h"
#include "PubSubClient.h"

const char* ssid = "safehouse"; //Enter SSID
const char* password = "thisisasafespace"; //Enter Password

const char* mqtt_server = "172.20.10.4";

WiFiClient vanieriot;
PubSubClient client(vanieriot);

const int photoresistorPin = A0;
int value;

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

void setup(void)
{
  /*
 Serial.begin(115200);
 // Connect to WiFi
 WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED)
 {
 delay(500);
 Serial.print("*");
 }

 Serial.println("");
 Serial.println("WiFi connection Successful");
 Serial.print("The IP Address of ESP8266 Module is: ");
 Serial.print(WiFi.localIP());// Print the IP address
 */

 Serial.begin(115200);
 setup_wifi();
 client.setServer(mqtt_server, 1883);
 client.setCallback(callback);
 pinMode(photoresistorPin, INPUT);
}

void loop() {
 if (!client.connected()) {
  reconnect();
 }
 
 if(!client.loop())
  client.connect("vanieriot");

  value = analogRead(photoresistorPin);
  char cstr[16];
  itoa(value, cstr, 10);
  client.publish("safehouse/light-intensity", cstr);
  Serial.println(cstr);

  delay(1000);
 }