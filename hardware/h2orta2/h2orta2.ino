#include "h2mqtt.h"

void setup() {

  Serial.begin(115200);

  connectToWifi();
  configureBroker();
}

void loop() {

  reconnectToBroker();
  client.loop();

  irrigateLowMoisture();
  publishData();

  delay(3000);
}

