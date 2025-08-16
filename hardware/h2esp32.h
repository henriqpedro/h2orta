#pragma once

#include "esp_mac.h"
#include "h2prom.h"

#include <Arduino.h>

const uint16_t WATER_LEVEL_PIN = 34;
const uint16_t SOIL_MOISTURE_PIN = 35;
const uint16_t RELE_PIN = 5;

int readWaterLevel();
int readSoilMoisture();

void irrigate();
void turnOnRele();
void turnOffRele();
void irrigateLowMoisture();

String getDefaultMacAddress();
String getInterfaceMacAddress(esp_mac_type_t);