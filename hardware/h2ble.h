#pragma once

#include "h2wifi.h"

bool bleActive = true;
bool newAttempt = false;

void turnOffBLE();
void configureBLE();
void notifyConnectionStatus(bool status);