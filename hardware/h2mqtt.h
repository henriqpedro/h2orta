#pragma once

#include "h2ble.h"

#include <PubSubClient.h>
#include <string.h>

PubSubClient client(espClient);

const char* MQTT_USERNAME = "h2orta";
const char* MQTT_SERVER = "h2orta.agr.br";
const char* MQTT_PASSWORD = "h2orta-client";

const char* TOPIC_IRRIGATION = "/irrigar";
const char* TOPIC_MIN_MOISTURE = "/umidade";
const char* TOPIC_SENSORS = "/planta";

String getTopic(const char*);

void publishData();
void configureBroker();
void reconnectToBroker();
void recieveFromBroker(char*, byte*, unsigned int);