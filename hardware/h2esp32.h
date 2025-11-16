#pragma once

#include "esp_mac.h"
#include "h2prom.h"

#include <DHT.h>
#include <Arduino.h>

void configureHardware();

int readHumidity();
int readWaterLevel();
int readTemperature();
int readSoilMoisture();

void irrigate();
void turnOnRele();
void turnOffRele();
void irrigateLowMoisture();

String getDefaultMacAddress();
String getInterfaceMacAddress(esp_mac_type_t);