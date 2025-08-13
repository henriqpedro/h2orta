#include "WiFi.h"
#include <PubSubClient.h>
#include <string.h>
#include "ctimer.h"
const char* mqttServer = "3.89.85.19";
const char* mqttUserName = "h2orta";
const char* mqttPassword = "h2orta-client";
WiFiClient espClient;
PubSubClient client(espClient);

//const char* ssid = "VICTOR & WILLIAN (2G)";
//const char* password = "luciana123";

const char* ssid = "S24+ de Pedro";
const char* password = "Cherumim011";

const int sensorAgua = 34;
const int sensorTerra = 35;
const int rele = 5;

int contador = 0;
int valorAgua = 0;
int valorTerra = 0;
int umidadeDesejada = 0;
char stringAgua[4];
char stringTerra[4];

char buff[20] = "";

cTimer  g_Timer0(true);

#define   TEMPO_0   30000

void setup() {
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.print("Conectando-se a ");
  Serial.println(ssid);
  WiFi.mode(WIFI_MODE_STA); 
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Configurando MQTT Broker..."); 
  client.setServer(mqttServer,1883);
  reconnect();
  client.setCallback(callback);
  client.subscribe("h2orta/irrigar");
  Serial.println("MQTT Broker configurado...");

  g_Timer0.SetTimeOut(TEMPO_0);

}

void loop() {

  if(!client.connected()){
    client.setCallback(callback);
    client.subscribe("h2orta/irrigar");
    reconnect();
  }

  client.loop();

  if(g_Timer0.IsTimeOut(true)){
    valorAgua = analogRead(sensorAgua);
    valorAgua = (valorAgua/2500.00) * 100;
    Serial.println(valorAgua);
    Serial.println("sensorAgua");
    delay(500);

    valorTerra = analogRead(sensorTerra);
    valorTerra = 100 - ((valorTerra/4095.00) * 100);
    Serial.println(valorTerra);
    Serial.println("sensorTerra");
    delay(500);

    if(valorTerra < umidadeDesejada)
      irrigar();
    
    itoa(valorAgua, stringAgua, 10);
    itoa(valorTerra, stringTerra, 10);
    strcpy(buff, stringTerra);
    strncat(buff, " ", 1);
    strncat(buff, stringAgua, 3);
    Serial.println("Publicando no MQTT...");
    client.publish("h2orta/planta", buff);

  }
  

}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Estabelecendo conexão com servidor MQTT...");
    if (client.connect("ESP32H2orta", mqttUserName, mqttPassword)) {
      Serial.println("Conectado ao servidor MQTT");
    } else {
      Serial.print("Falha: ");
      Serial.print(client.state());
      delay(3000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int legth){

  char mensagem = (char)payload[0];

  Serial.print("Message:");
  Serial.println(mensagem);
  if(mensagem == '1')
    irrigar();

}

void irrigar(){
  analogWrite(rele, 255);
  delay(1000);
  analogWrite(rele, 0);
}