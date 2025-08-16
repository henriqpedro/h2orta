#pragma once

const int EEPROM_SIZE = 128;

const int SSID_ADDR = 6;
const int PASSWORD_ADDR = 42;
const int MIN_MOISTURE_ADDR = 0;

char* SSID = "";
char* PASSWORD = "";
int MIN_MOISTURE = 0;

void configureEEPROM();

void saveCredentials();
void saveMinMoisture();

void loadMinMoisture();
void loadCredentials();