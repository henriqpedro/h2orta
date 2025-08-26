#include "h2ble.h"

#include <NimBLEDevice.h>

const char* SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
const char* SSID_CHAR_UUID = "12345678-1234-1234-1234-1234567890ac";
const char* PASS_CHAR_UUID = "12345678-1234-1234-1234-1234567890ad";
const char* CONNECT_CHAR_UUID = "12345678-1234-1234-1234-1234567890ae";

NimBLECharacteristic* ssidChar;
NimBLECharacteristic* passChar;
NimBLECharacteristic* connectChar;

class H2ortaServerCallbacks : public NimBLEServerCallbacks {
  void onConnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo) override {
    Serial.printf("Client address: %s\n", connInfo.getAddress().toString().c_str());

    /**
         *  We can use the connection handle here to ask for different connection parameters.
         *  Args: connection handle, min connection interval, max connection interval
         *  latency, supervision timeout.
         *  Units; Min/Max Intervals: 1.25 millisecond increments.
         *  Latency: number of intervals allowed to skip.
         *  Timeout: 10 millisecond increments.
    */
    pServer->updateConnParams(connInfo.getConnHandle(), 24, 48, 0, 180);
  }

  void onDisconnect(NimBLEServer* pServer, NimBLEConnInfo& connInfo, int reason) override {
    Serial.printf("Client disconnected: starting advertising\n");
    NimBLEDevice::startAdvertising();
  }
} serverCallbacks;

class H2ortaProvisioningCallbacks : public NimBLECharacteristicCallbacks {

  void onRead(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo& connInfo) override {
    Serial.printf("%s : onRead(), value: %s\n",
                  pCharacteristic->getUUID().toString().c_str(),
                  pCharacteristic->getValue().c_str());
  }

  void onWrite(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo& connInfo) override {

    Serial.println("Message recieved via BLE");

    if (pCharacteristic == ssidChar) {

      memset(SSID, 0, SSID_SIZE);
      strncpy(SSID, pCharacteristic->getValue().c_str(), SSID_SIZE - 1);
      Serial.print("Recieved SSID from BLE: ");
      Serial.println(SSID);

    } else if (pCharacteristic == passChar) {

      memset(PASSWORD, 0, PASSWORD_SIZE);
      strncpy(PASSWORD, pCharacteristic->getValue().c_str(), PASSWORD_SIZE - 1);
      Serial.print("Recieved password from BLE: ");
      Serial.println(PASSWORD);

      // When receiving password, ssid was already received
      newAttempt = true;
      saveCredentials();
      connectToWifi();
    }
  }

  void onSubscribe(NimBLECharacteristic* pCharacteristic, NimBLEConnInfo& connInfo, uint16_t subValue) override {
    std::string str = "Client ID: ";
    str += connInfo.getConnHandle();
    str += " Address: ";
    str += connInfo.getAddress().toString();
    if (subValue == 0) {
      str += " Unsubscribed to ";
    } else if (subValue == 1) {
      str += " Subscribed to notifications for ";
    } else if (subValue == 2) {
      str += " Subscribed to indications for ";
    } else if (subValue == 3) {
      str += " Subscribed to notifications and indications for ";
    }
    str += std::string(pCharacteristic->getUUID());

    Serial.printf("%s\n", str.c_str());
  }
} bleCallbacks;

void configureBLE() {

  NimBLEDevice::init("H2orta (smart vase)");
  bleActive = true;

  NimBLEServer* pServer = NimBLEDevice::createServer();
  pServer->setCallbacks(&serverCallbacks);

  NimBLEService* pService = pServer->createService(SERVICE_UUID);

  ssidChar = pService->createCharacteristic(
    SSID_CHAR_UUID,
    NIMBLE_PROPERTY::WRITE | NIMBLE_PROPERTY::WRITE_ENC);
  passChar = pService->createCharacteristic(
    PASS_CHAR_UUID,
    NIMBLE_PROPERTY::WRITE | NIMBLE_PROPERTY::WRITE_ENC);
  connectChar = pService->createCharacteristic(
    CONNECT_CHAR_UUID,
    NIMBLE_PROPERTY::READ | NIMBLE_PROPERTY::NOTIFY);

  ssidChar->setCallbacks(&bleCallbacks);
  passChar->setCallbacks(&bleCallbacks);

  connectChar->setCallbacks(&bleCallbacks);
  connectChar->setValue("DISCONNECTED");

  pService->start();

  NimBLEAdvertising* pAdvertising = NimBLEDevice::getAdvertising();
  pAdvertising->setName("H2orta ESP32");
  pAdvertising->addServiceUUID(pService->getUUID());
  pAdvertising->start();

  Serial.println("BLE started...");
}

void turnOffBLE() {
  
  NimBLEDevice::getAdvertising()->stop();

  // Desliga servidor e libera conexões
  NimBLEDevice::deinit();

  bleActive = false;
  Serial.println("BLE stopped!");
}

void notifyConnectionStatus(bool status) {

  String value = status ? "CONNECTED" : "DISCONNECTED";
  connectChar->setValue(value.c_str());
  connectChar->notify();
}