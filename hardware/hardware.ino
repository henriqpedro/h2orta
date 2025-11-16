#include "h2mqtt.h"

void setup() {

  Serial.begin(115200);

  configureHardware();
  configureEEPROM();
  configureBroker();
  connectToWifi();
  configureBLE();
}

void loop() {

  if (WiFi.status() == WL_CONNECTED) {
    reconnectToBroker();
    publishData();
    //irrigateLowMoisture();
    delay(1000 * 3);
    if (bleActive) turnOffBLE();
  }

  pressBootButton();
  delay(10);
}
