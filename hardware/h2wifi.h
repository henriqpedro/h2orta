#pragma once

#include <WiFi.h>

const char* SSID = "S24+ de Pedro";
const char* PASSWORD = "Cherumim011";

WiFiClient espClient;

void connectToWifi();