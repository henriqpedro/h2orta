#include <Arduino.h>
#include <DHT.h>

const uint16_t DHT11_PIN = 4;
const uint16_t WATER_LEVEL_PIN = 35;
const uint16_t SOIL_MOISTURE_PIN = 34;

DHT dht11(DHT11_PIN, DHT11);

int readSoilMoisture() {

  // AR 4095
  // AGUA 2200
  // SOLO SECO 4030
  // SOLO UMIDO 2800
  int value = analogRead(SOIL_MOISTURE_PIN);
  return value;
}

int processSoil(int value) {

  value = 100 - (((float)(value - 2800) / (4095 - 2800)) * 100);
  if (value > 100) value = 100;
  else if (value < 0) value = 0;
  return value;
}

int readWaterLevel() {

  // AR 370
  // AGUA 3500 - 4095
  int value = analogRead(WATER_LEVEL_PIN);
  return value;
}

int processWater(int value) {

  value = ((float)(value - 3500) / (4095 - 3500)) * 100;
  if (value > 100) value = 100;
  else if (value < 0) value = 0;
  return value;
}

void setup() {

  Serial.begin(115200);
  dht11.begin();
}

void loop() {

  int humi = dht11.readHumidity();
  int tempC = dht11.readTemperature();
  int soil = readSoilMoisture();
  int water = readWaterLevel();
  Serial.print("Soil: ");
  Serial.print(soil);
  Serial.print(" ");
  Serial.print(processSoil(soil));
  Serial.print(" Water: ");
  Serial.print(water);
  Serial.print(" ");
  Serial.print(processWater(water));
  Serial.print(" Humidity: ");
  Serial.print(humi);
  Serial.print("%");
  Serial.print(" ");
  Serial.print("Temperature: ");
  Serial.print(tempC);
  Serial.println("°C");
  delay(1000 * 3);
}
