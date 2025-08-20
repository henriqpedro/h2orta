import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import {
    BleError,
    BleManager,
    Characteristic,
    Device
} from "react-native-ble-plx";

function useBLE() {
    const bleManager = useMemo(() => new BleManager(), []);

    const [scanning, setScanning] = useState(false);
    const [connecting, setConnecting] = useState(false);

    const [allDevices, setAllDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);

    const scanningTime = 1000 * 10;

    const requestAndroid31Permissions = async () => {
        const bluetoothScanPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN
        );
        const bluetoothConnectPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT
        );
        const bluetoothFineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        return (
            bluetoothScanPermission === PermissionsAndroid.RESULTS.GRANTED &&
            bluetoothConnectPermission === PermissionsAndroid.RESULTS.GRANTED &&
            bluetoothFineLocationPermission == PermissionsAndroid.RESULTS.GRANTED
        );
    };

    const requestPermissions = async () => {
        if (Platform.OS === "android")
            return await requestAndroid31Permissions();
        return false;
    };

    const scanForDevices = async () => {
        const isPermissionsEnabled = await requestPermissions();
        if (isPermissionsEnabled) startScanning();
        else ToastAndroid.show("É necessário conceder permissão bluetooth para continuar.", ToastAndroid.SHORT);
    };

    const isDuplicteDevice = (devices, nextDevice) =>
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    const stopScanning = () => {
        bleManager.stopDeviceScan();
        setScanning(false);
    }

    const startScanning = () => {
        if (!scanning) {
            setScanning(true);
            setTimeout(stopScanning, scanningTime);
            return bleManager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    ToastAndroid.show("Erro ao escanear BLE", ToastAndroid.SHORT);
                    console.log(error);
                }
                if (device?.name) {
                    setAllDevices((prevState) => {
                        if (!isDuplicteDevice(prevState, device))
                            return [...prevState, device];
                        return prevState;
                    });
                }
            });
        }
    }

    const connectToDevice = async (device) => {
        if (!connecting) {
            if (connectedDevice && connectedDevice.id === device.id) {
                ToastAndroid.show("Já conectado a " + device.name, ToastAndroid.SHORT);
                return;
            }
            try {
                setConnecting(true);
                const deviceConnection = await bleManager.connectToDevice(device.id);
                setConnectedDevice(deviceConnection);
                await deviceConnection.discoverAllServicesAndCharacteristics();
                setConnecting(false);
                stopScanning();
                //startStreamingData(deviceConnection);
            } catch (e) {
                ToastAndroid.show("Erro ao conectar BLE", ToastAndroid.SHORT);
                console.log("Erro ao conectar BLE: ", e);
            }
        }
    }

    const disconnectFromDevice = () => {
        if (connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
            setHeartRate(0);
        }
    };

    // const startStreamingData = async (device: Device) => {
    //     if (device) {
    //         device.monitorCharacteristicForService(
    //             HEART_RATE_UUID,
    //             HEART_RATE_CHARACTERISTIC,
    //             onHeartRateUpdate
    //         );
    //     } else {
    //         console.log("No Device Connected");
    //     }
    // };

    return {
        scanning,
        scanForDevices,
        connecting,
        connectToDevice,
        allDevices,
        connectedDevice,
        disconnectFromDevice
    };
}

export default useBLE;