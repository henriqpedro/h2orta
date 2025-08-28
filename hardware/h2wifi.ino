#include "h2wifi.h"

bool connectToWifi() {

  loadCredentials();

  if (strlen(SSID) > 0 && strlen(PASSWORD) > 0) {

    Serial.print("Connecting to wifi ");
    Serial.print(SSID);
    Serial.println("...");

    WiFi.mode(WIFI_MODE_STA);
    WiFi.begin(SSID, PASSWORD);

    int numTries = 10;
    while (WiFi.status() != WL_CONNECTED && numTries > 0) {
      Serial.println("Trying to connect to wifi...");
      if (numTries == 1) {
        clearCredentials();
        WiFi.disconnect(true);
      }
      delay(800);
      numTries--;
    }
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("Conected to wifi!");
      return true;
    }
    Serial.println("Could not connect to wifi!");
    return false;
  }
}