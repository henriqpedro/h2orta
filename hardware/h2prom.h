#pragma once

#include <EEPROM.h>
#include <string.h>

const int SSID_SIZE = 32;
const int EEPROM_SIZE = 128;
const int PASSWORD_SIZE = 64;

const int SSID_ADDR = 6;
const int PASSWORD_ADDR = 42;
const int MIN_MOISTURE_ADDR = 0;

int MIN_MOISTURE = 0;

char SSID[SSID_SIZE];
char PASSWORD[PASSWORD_SIZE];

void configureEEPROM();

void saveCredentials();
void saveMinMoisture();

void loadMinMoisture();
void loadCredentials();