#include "h2wifi.h"

void connectToWifi() {

  loadCredentials();

  if (strlen(SSID) > 0 && strlen(PASSWORD) > 0) {

    Serial.print("Connecting to wifi ");
    Serial.print(SSID);
    Serial.println("...");

    WiFi.mode(WIFI_MODE_STA);
    WiFi.begin(SSID, PASSWORD);

    while (WiFi.status() != WL_CONNECTED) {
      delay(1000);
      Serial.println("Trying to connect to wifi...");
    }

    Serial.println("Conected to wifi!");
  }
}