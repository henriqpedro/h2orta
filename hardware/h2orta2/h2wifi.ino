#include "h2wifi.h"

void connectToWifi() {

  Serial.print("Connecting to wifi ");
  Serial.print(SSID);
  Serial.println("...");

  WiFi.mode(WIFI_MODE_STA); 
  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Trying to connect...");
  }
}