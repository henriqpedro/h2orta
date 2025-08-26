#include "h2mqtt.h"

void setup() {

  Serial.begin(115200);

  configureEEPROM();
  configureBroker();
  connectToWifi();
  configureBLE();
}

void loop() {

  delay(1000);

  if (WiFi.status() == WL_CONNECTED) {
    if (bleActive) {
      notifyConnectionStatus(true);
      delay(5000);
      turnOffBLE();
    }
    reconnectToBroker();
    //irrigateLowMoisture();
    publishData();
  } else if (newAttempt && bleActive) {
    newAttempt = false;
    notifyConnectionStatus(false);
  }

  delay(2000);
}
