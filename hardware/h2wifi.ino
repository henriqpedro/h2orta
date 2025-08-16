#include "h2wifi.h"

void connectToWifi() {

  loadCredentials();

  if (SSID[0] != '\0' && PASSWORD[0] != '\0') {

    Serial.print("Connecting to wifi ");
    Serial.print(SSID);
    Serial.println("...");

    WiFi.mode(WIFI_MODE_STA);
    WiFi.begin(SSID, PASSWORD);

    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.println("Trying to connect to wifi...");
    }

    Serial.println("Successfully conected!");
  }
}