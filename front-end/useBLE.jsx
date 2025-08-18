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
    const [allDevices, setAllDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);

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
            bluetoothScanPermission === "granted" &&
            bluetoothConnectPermission === "granted" &&
            bluetoothFineLocationPermission == "granted"
        );
    };

    const requestPermissions = async () => {
        if (Platform.OS === "android")
            return await requestAndroid31Permissions();
        return true;
    };

    const scanForDevices = async () => {
        const isPermissionsEnabled = await requestPermissions();
        if (isPermissionsEnabled)
            await scanForPeripherals();
    };

    const isDuplicteDevice = (devices, nextDevice) =>
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    const scanForPeripherals = () =>
        bleManager.startDeviceScan(null, null, (error, device) => {
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

    const connectToDevice = async (device) => {
        try {
            const deviceConnection = await bleManager.connectToDevice(device.id);
            setConnectedDevice(deviceConnection);
            await deviceConnection.discoverAllServicesAndCharacteristics();
            bleManager.stopDeviceScan();
            //startStreamingData(deviceConnection);
        } catch (e) {
            ToastAndroid.show("Erro ao conectar BLE", ToastAndroid.SHORT);
            console.log("Erro ao conectar BLE: ", e);
        }
    };

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
        scanForDevices,
        connectToDevice,
        allDevices,
        connectedDevice,
        disconnectFromDevice
    };
}

export default useBLE;