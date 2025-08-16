#pragma once

#include "h2wifi.h"

const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab"
const SSID_CHAR_UUID = "12345678-1234-1234-1234-1234567890ac"
const PASS_CHAR_UUID = "12345678-1234-1234-1234-1234567890ad"

BLECharacteristic *ssidChar;
BLECharacteristic *passChar;

void configureBLE();