import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

import * as ExpoDevice from 'expo-device';



function useBle() {
    const bleManager = useMemo(() => new BleManager(), []);

    const [allDevices, setAllDevices] = useState([]);


    const requestAndroid31Permissions = async () => {
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title: "Buscar por dispositivos",
                message: "Este aplicativo deseja buscar por dipositivos Bluetooth",
                buttonPositive: "Aceitar"
            }
        )
        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            {
                title: "Conectar dispositivos",
                message: "Este aplicativo deseja conectar dipositivos Bluetooth",
                buttonPositive: "Aceitar"
            }
        )
        const bluetoothFineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Acessar localização precisa",
                message: "Este aplicativo deseja acessar localização precisa",
                buttonPositive: "Aceitar"
            }
        )


        return (
            bluetoothConnectPermission === "granted" &&
            bluetoothScanPermission === 'granted' &&
            bluetoothFineLocationPermission === "granted"
        );
    }

    const requestPermissions = async () => {
        if(Platform.OS === 'android'){
            if((ExpoDevice.platformApiLevel ?? -1) < 31){
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Acessar localização precisa",
                        message: "Este aplicativo deseja acessar localização precisa",
                        buttonPositive: "Aceitar"
                    }
                );

                return granted === "granted";
            }else {
                const isAndroid31PermissionsGranted = await requestAndroid31Permissions();
                return isAndroid31PermissionsGranted;
            }
        }else{
            return true;
        }
    }

    /**
     * 
     * @param {Array<Device>} devices 
     * @param {Device} nextDevice 
     */
    function isDuplicateDevice(devices, nextDevice) {
        return devices.some(device => device.id === nextDevice.id);
    }

    /**
     * 
     * @param {Device} device 
     */
    const connectToDevice = async (device) => {
        try{
            const deviceConnection = await bleManager.connectToDevice(device.id)
            await deviceConnection.discoverAllServicesAndCharacteristics();

        }catch (error) {
            console.error(error)
        }
    }
    
    const scanForPeripherals = () => {
        // Usando um Set para verificar duplicatas de forma eficiente
        const deviceIds = new Set(allDevices.map((device) => device.id));
      
        bleManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.error(error);
          }
      
          if (device && !deviceIds.has(device.id)) {
            // Atualize o Set e o estado ao adicionar um novo dispositivo
            setAllDevices((prevState) => {
              const updatedDevices = [...prevState, device];
              // Atualiza o Set de IDs
              updatedDevices.forEach((device) => deviceIds.add(device.id));
              return updatedDevices;
            });
          }
        });
      
        // Parar o escaneamento após 3 segundos
        setTimeout(() => {
          bleManager.stopDeviceScan();
        }, 3000);
      };
      

    return {
        scanForPeripherals,
        requestPermissions,
        allDevices,
        connectToDevice
    }
}

export default useBle;