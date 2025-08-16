#include "h2prom.h"

void configureEEPROM() {

  EEPROM.begin(EEPROM_SIZE);

  EEPROM.put(MIN_MOISTURE_ADDR, 0);
  EEPROM.put(PASSWORD_ADDR, '\0');
  EEPROM.put(SSID_ADDR, '\0');
  EEPROM.commit();
}

void saveCredentials() {

  EEPROM.begin(EEPROM_SIZE);

  EEPROM.put(SSID_ADDR, SSID);
  EEPROM.put(PASS_ADDR, PASSWORD);

  EEPROM.commit();
  Serial.println("Wifi credentials saved to EEPROM!");
}

void saveMinMoisture() {

  EEPROM.begin(EEPROM_SIZE);

  EEPROM.put(MIN_MOISTURE_ADDR, MIN_MOISTURE);
  Serial.println("Min moisture saved to EEPROM!");
}

void loadMinMoisture() {

  EEPROM.begin(EEPROM_SIZE);
  EEPROM.get(MIN_MOISTURE_ADDR, MIN_MOISTURE);
  Serial.println("Min moisture: %s\n", MIN_MOISTURE);
}

void loadCredentials() {

  EEPROM.begin(EEPROM_SIZE);
  EEPROM.get(SSID_ADDR, SSID);
  EEPROM.get(PASSWORD_ADDR, PASSWORD);

  Serial.println("SSID: %s\n", SSID);
  Serial.println("Pass: %s\n", PASSWORD);
}