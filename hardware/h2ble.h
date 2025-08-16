#pragma once

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

#include "h2wifi.h"

const char* SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const char* SSID_CHAR_UUID = "12345678-1234-1234-1234-1234567890ac";
const char* PASS_CHAR_UUID = "12345678-1234-1234-1234-1234567890ad";

BLECharacteristic *ssidChar;
BLECharacteristic *passChar;

void configureBLE();