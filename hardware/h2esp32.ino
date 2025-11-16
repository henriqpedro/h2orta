#include "h2esp32.h"

const uint16_t SOIL_MOISTURE_PIN = 34;
const uint16_t WATER_LEVEL_PIN = 35;
const uint16_t BUTTON_PIN = 0;
const uint16_t DHT11_PIN = 4;
const uint16_t RELE_PIN = 5;
const uint16_t LED_PIN = 2;

DHT dht11(DHT11_PIN, DHT11);

void configureHardware() {

  dht11.begin();
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUTTON_PIN, INPUT_PULLUP);
}

void blinkLED() {

  uint16_t count = 0;

  while (count++ < 3) {
    digitalWrite(LED_PIN, HIGH);
    delay(300);
    digitalWrite(LED_PIN, LOW);
    delay(300);
  }
}
void pressBootButton() {

  bool buttonState = digitalRead(BUTTON_PIN);

  if (buttonState == LOW) {
    blinkLED();
    Serial.println("Boot press detected: reseting EEPROM...");
    clearCredentials();
    delay(500);
    Serial.println("Reseting ESP32...");
    delay(200);
    ESP.restart();
  }
}

void irrigate() {

  turnOnRele();
  delay(1000);
  turnOffRele();
}

void irrigateLowMoisture() {

  loadMinMoisture();
  if (MIN_MOISTURE != 0 && readSoilMoisture() < MIN_MOISTURE) irrigate();
}

int readTemperature() {
  
  return dht11.readTemperature();
}

int readHumidity() {

  return dht11.readHumidity();
}

int readSoilMoisture() {

  int value = analogRead(SOIL_MOISTURE_PIN);
  value = 100 - (((float)(value - 2750) / (4095 - 2750)) * 100);
  if (value > 100) value = 100;
  else if (value < 0) value = 0;
  return value;
}

int readWaterLevel() {

  int value = analogRead(WATER_LEVEL_PIN);
  value = ((float)(value - 3500) / (4095 - 3500)) * 100;
  if (value > 100) value = 100;
  else if (value < 0) value = 0;
  return value;
}

void turnOnRele() {

  analogWrite(RELE_PIN, 255);
}

void turnOffRele() {

  analogWrite(RELE_PIN, 0);
}

String getDefaultMacAddress() {

  String mac = "";
  unsigned char mac_base[6] = { 0 };

  if (esp_efuse_mac_get_default(mac_base) == ESP_OK) {
    char buffer[18];  // 6*2 characters for hex + 5 characters for colons + 1 character for null terminator
    sprintf(buffer, "%02X:%02X:%02X:%02X:%02X:%02X", mac_base[0], mac_base[1], mac_base[2], mac_base[3], mac_base[4], mac_base[5]);
    mac = buffer;
  }

  return mac;
}

String getInterfaceMacAddress(esp_mac_type_t interface) {

  String mac = "";
  unsigned char mac_base[6] = { 0 };

  if (esp_read_mac(mac_base, interface) == ESP_OK) {
    char buffer[18];  // 6*2 characters for hex + 5 characters for colons + 1 character for null terminator
    sprintf(buffer, "%02X:%02X:%02X:%02X:%02X:%02X", mac_base[0], mac_base[1], mac_base[2], mac_base[3], mac_base[4], mac_base[5]);
    mac = buffer;
  }

  return mac;
}
