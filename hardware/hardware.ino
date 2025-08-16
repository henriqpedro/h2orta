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
    client.loop();

    //irrigateLowMoisture();
    publishData();
  }

  delay(3000);
}
