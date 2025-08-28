#pragma once

#include "h2wifi.h"

bool bleActive = true;

void turnOffBLE();
void configureBLE();
void notifyConnectionStatus(bool status);