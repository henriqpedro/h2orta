#include "h2prom.h"

void configureEEPROM() {

  EEPROM.begin(EEPROM_SIZE);

  loadNotAlreadyExecuted();

  //if (!NOT_ALREADY_EXECUTED) {
  clearCredentials();
  setNotAlreadyExecuted();
  //}
}

void clearCredentials() {
  memset(SSID, 0, SSID_SIZE);
  memset(PASSWORD, 0, PASSWORD_SIZE);
  saveCredentials();
}

void saveCredentials() {

  EEPROM.begin(EEPROM_SIZE);

  EEPROM.put(SSID_ADDR, SSID);
  EEPROM.put(PASSWORD_ADDR, PASSWORD);

  EEPROM.commit();
  Serial.println("Wifi credentials saved to EEPROM!");
}

void saveMinMoisture() {

  EEPROM.begin(EEPROM_SIZE);

  EEPROM.put(MIN_MOISTURE_ADDR, MIN_MOISTURE);
  Serial.println("Min moisture saved to EEPROM!");
}

void loadNotAlreadyExecuted() {

  EEPROM.begin(EEPROM_SIZE);
  NOT_ALREADY_EXECUTED = EEPROM.read(NOT_ALREADY_EXECUTED_ADDR);
  Serial.print("Not already executed: ");
  Serial.println(NOT_ALREADY_EXECUTED);
}

void setNotAlreadyExecuted() {

  EEPROM.begin(EEPROM_SIZE);
  EEPROM.write(NOT_ALREADY_EXECUTED_ADDR, false);
  Serial.println("Not already executed set to false");
}

void loadMinMoisture() {

  EEPROM.begin(EEPROM_SIZE);
  EEPROM.get(MIN_MOISTURE_ADDR, MIN_MOISTURE);
  Serial.print("Min moisture: ");
  Serial.println(MIN_MOISTURE);
}

void loadCredentials() {

  EEPROM.begin(EEPROM_SIZE);
  EEPROM.get(SSID_ADDR, SSID);
  EEPROM.get(PASSWORD_ADDR, PASSWORD);

  Serial.print("SSID: ");
  Serial.println(SSID);
  Serial.print("Pass: ");
  Serial.println(PASSWORD);
  delay(5000);
}