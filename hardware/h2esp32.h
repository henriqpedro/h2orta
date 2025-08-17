#pragma once

#include "esp_mac.h"
#include "h2prom.h"

#include <Arduino.h>

int readWaterLevel();
int readSoilMoisture();

void irrigate();
void turnOnRele();
void turnOffRele();
void irrigateLowMoisture();

String getDefaultMacAddress();
String getInterfaceMacAddress(esp_mac_type_t);