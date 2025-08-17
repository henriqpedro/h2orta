#include "h2mqtt.h"

void setup() {

  Serial.begin(115200);

  configureEEPROM();
  configureBroker();
  connectToWifi();
  configureBLE();
}

void loop() {

  if (WiFi.status() == WL_CONNECTED) {
    reconnectToBroker();
    //irrigateLowMoisture();
    publishData();
  }

  delay(3000);
}
