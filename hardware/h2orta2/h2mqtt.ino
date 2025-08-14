#include "h2mqtt.h"

void configureBroker() {

  EEPROM.put(MIN_MOISTURE_ADDR, 0);
  EEPROM.commit();

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
      Serial.println("Connected successfully!");
      client.subscribe(getTopic(TOPIC_MIN_MOISTURE).c_str());
      client.subscribe(getTopic(TOPIC_IRRIGATION).c_str());
    } else {
      Serial.print("Failed to connect: ");
      Serial.println(client.state());
      delay(3000);
    }
  }
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
    Serial.println("Recieved message from irrigation topic...");
    bool doIrrigate = payload[0];
    if (doIrrigate) irrigate();
  } else if (strcmp(topic, getTopic(TOPIC_MIN_MOISTURE).c_str()) == 0) {
    Serial.println("Recieved message from moisture topic...");
    Serial.println(length);
    int minMoisture = byteStringToInt(payload, length);
    EEPROM.put(MIN_MOISTURE_ADDR, minMoisture);
    EEPROM.commit();

    EEPROM.get(MIN_MOISTURE_ADDR, minMoisture);
    Serial.print("Message saved to EEPROM: ");
    Serial.println(minMoisture);
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