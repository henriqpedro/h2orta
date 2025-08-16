#include "h2ble.h"

class H2ortaProvisioningCallbacks : public BLECharacteristicCallbacks {

  void onWrite(BLECharacteristic *pCharacteristic) {

    std::string value = pCharacteristic->getValue();

    if (pCharacteristic == ssidChar) {

      SSID = value.c_str();
      Serial.println("Recieved SSID from BLE: %s", SSID);

    } else if (pCharacteristic == passChar) {

      PASSWORD = value.c_str();
      Serial.println("Recieved password from BLE: %s", PASSWORD);

      // When receiving password, ssid was already received
      saveCredentials();
    }
  };

  void configureBLE() {

    BLEDevice::init("H2orta (smart vase)");

    BLEServer *pServer = BLEDevice::createServer();
    BLEService *pService = pServer->createService(SERVICE_UUID);

    ssidChar = pService->createCharacteristic(
      SSID_CHAR_UUID,
      BLECharacteristic::PROPERTY_WRITE);
    passChar = pService->createCharacteristic(
      PASS_CHAR_UUID,
      BLECharacteristic::PROPERTY_WRITE);

    ssidChar->setCallbacks(new H2ortaProvisioningCallbacks());
    passChar->setCallbacks(new H2ortaProvisioningCallbacks());

    pService->start();

    BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
    pAdvertising->addServiceUUID(SERVICE_UUID);
    BLEDevice::startAdvertising();

    Serial.println("BLE successfully started...");
  }