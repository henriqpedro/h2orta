import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";

import * as ExpoDevice from 'expo-device';

function useBle() {
    const bleManager = useMemo(() => new BleManager(), []);

    const [allDevices, setAllDevices] = useState([]);
    /**
     * @type {[Device, React.Dispatch<React.SetStateAction<Device>>]}
     */
    const [connectedDevice, setConnectedDevice] = useState(undefined);

    // A partir do Android 31, precisa-se pedir permissão para: Bluetooth, Buscar dispositivos e Localização precisa
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
        // IOS não precisa de permissões
        if(Platform.OS === 'android'){
            // Verificando a versão do android, caso seja abaixo da 31, precisamos apenas da Localização precisa
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
     * @param {Device} device 
     */
    const connectToDevice = async (device) => {
        try{
            const deviceConnection = await bleManager.connectToDevice(device.id)
            await deviceConnection.discoverAllServicesAndCharacteristics();
            setConnectedDevice(device)
        }catch (error) {
            console.error(error)
        }
    }
    
    const scanForPeripherals = () => {
        // Usando um Set para verificar duplicatas de forma eficiente, evitando mostrar dispositivos duplicados ao usuário
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


      /**
     * 
     * @param {string} message 
     * @param {string} serviceUiid 
     * @param {Device} device
     */
    function sendMessageToEsp(message, serviceUiid, device, characteristicUuid){

        const base64WifiInformation = btoa(message);
        
        device.writeCharacteristicWithResponseForService(
            serviceUiid,
            characteristicUuid,
            base64WifiInformation
        )

    }

    /**
     * 
     * @param {string} message 
     * @param {Device} device 
     */

    function partitionMessage(message){
        //Transformamos a string em um array de bytes e adquirimos o seu tamanho
        const messageInBytes = new TextEncoder().encode(message);
        const messageLengthInBytes = messageInBytes.length;
        let positionInMessage = 0;
        // Array para guardar as partições de mensagens (No formato de string)
        const partitionArray = [];

        // Percorremos toda a mensagem, iterando de 20 em 20 bytes (Valor limite do MTU)
        for(let i = 0; i < messageLengthInBytes; i += 20){
            // Retiramos uma chunk (pedaço) de 20 Bytes da mensagem
            const chunk = messageInBytes.slice(i, i + 20);
            
            // console.log(String.fromCharCode(...chunk))
            //Colocamos o array de Bytes no array de partições transformando-o em string
            partitionArray.push(String.fromCharCode(...chunk));

            positionInMessage++;
        }

        return partitionArray;

    }
      

    return {
        scanForPeripherals,
        requestPermissions,
        allDevices,
        connectToDevice,
        connectedDevice,
        sendMessageToEsp,
        partitionMessage
    }
}

export default useBle;