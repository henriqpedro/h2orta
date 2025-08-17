#pragma once

#include "h2ble.h"

String getTopic(const char*);

void publishData();
void configureBroker();
void reconnectToBroker();
void recieveFromBroker(char*, byte*, unsigned int);