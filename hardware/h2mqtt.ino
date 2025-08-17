#include "h2mqtt.h"

#include <PubSubClient.h>

PubSubClient client(espClient);

const char* MQTT_USERNAME = "h2orta";
const char* MQTT_SERVER = "h2orta.agr.br";
const char* MQTT_PASSWORD = "h2orta-client";

const char* TOPIC_IRRIGATION = "/irrigar";
const char* TOPIC_MIN_MOISTURE = "/umidade";
const char* TOPIC_SENSORS = "/planta";

void configureBroker() {

  client.setServer(MQTT_SERVER, 1883);
  client.setCallback(recieveFromBroker);
  Serial.println("Broker configured...");
}

void reconnectToBroker() {

  while (!client.connected()) {

    Serial.print("Connecting client ");
    Serial.print(getDefaultMacAddress());
    Serial.println(" to MQTT broker...");

    if (client.connect(getDefaultMacAddress().c_str(), MQTT_USERNAME, MQTT_PASSWORD)) {
      Serial.println("Connected to broker!");
      client.subscribe(getTopic(TOPIC_MIN_MOISTURE).c_str());
      client.subscribe(getTopic(TOPIC_IRRIGATION).c_str());
    } else {
      Serial.print("Failed to connect: ");
      Serial.println(client.state());
      delay(3000);
    }
  }

  client.loop();
}

int byteStringToInt(byte* byteValue, int length) {

  char buffer[16]; // tamanho suficiente
  for (int i = 0; i < length; i++)
    buffer[i] = byteValue[i];
  buffer[length] = '\0';
  return atoi(buffer);
}

void recieveFromBroker(char* topic, byte* payload, unsigned int length) {

  if (strcmp(topic, getTopic(TOPIC_IRRIGATION).c_str()) == 0) {
    Serial.println("Recieved from irrigation topic...");
    bool doIrrigate = (payload[0] - '0');
    if (doIrrigate) irrigate();
  } else if (strcmp(topic, getTopic(TOPIC_MIN_MOISTURE).c_str()) == 0) {
    Serial.println("Recieved from moisture topic...");
    MIN_MOISTURE = byteStringToInt(payload, length);
    saveMinMoisture();
  }
}

void publishData() {

  char buffer[20];
  String topic = getTopic(TOPIC_SENSORS);

  snprintf(buffer, sizeof(buffer), "%d %d", readSoilMoisture(), readWaterLevel());

  Serial.print("Publishing ");
  Serial.print(buffer);
  Serial.print(" on ");
  Serial.println(topic);

  client.publish(topic.c_str(), buffer);
}

String getTopic(const char* sufix) {

  String topic = "h2orta/";
  topic.concat(getDefaultMacAddress());
  topic.concat(sufix);

  return topic;
}