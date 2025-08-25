import { useMemo, useState } from "react";
import { PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import { Buffer } from "buffer";
import { BleManager } from "react-native-ble-plx";

function useBLE() {

    const bleManager = useMemo(() => new BleManager(), []);

    const [scanning, setScanning] = useState(false);
    const [connecting, setConnecting] = useState(false);

    const [allDevices, setAllDevices] = useState([]);
    const [connectedDevice, setConnectedDevice] = useState(null);

    const [isESPConnectedToWifi, setIsESPConnectedToWifi] = useState(false);

    const scanningTime = 1000 * 5;

    const SERVICE_UUID = "12345678-1234-1234-1234-1234567890ab";
    const SSID_CHAR_UUID = "12345678-1234-1234-1234-1234567890ac";
    const PASS_CHAR_UUID = "12345678-1234-1234-1234-1234567890ad";
    const CONNECT_CHAR_UUID = "12345678-1234-1234-1234-1234567890ae";

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

    const isDuplicatedDevice = (devices, nextDevice) =>
        devices.findIndex((device) => nextDevice.id === device.id) > -1;

    const stopScanning = () => {
        bleManager.stopDeviceScan();
        setScanning(false);
    }

    const addDeviceToList = (device) => {
        if (!device) return;
        setAllDevices((prevState) => {
            if (!isDuplicatedDevice(prevState, device))
                return [...prevState, device];
            return prevState;
        });
    }

    const startScanning = () => {
        if (scanning) return;
        setScanning(true);
        let errorShown = false;
        const timeoutId = setTimeout(stopScanning, scanningTime);
        addDeviceToList(connectedDevice);
        return bleManager.startDeviceScan(null, null, (error, device) => {
            if (error && !errorShown) {
                stopScanning();
                clearTimeout(timeoutId);
                ToastAndroid.show("Erro ao escanear BLE: verifique se o bluetooth está ligado.", ToastAndroid.SHORT);
                errorShown = true;
                console.log(error);
                return;
            }
            if (device?.name?.includes("H2orta")) addDeviceToList(device);
        });
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
                startStreamingData(deviceConnection);
            } catch (e) {
                ToastAndroid.show("Erro ao conectar BLE", ToastAndroid.SHORT);
                console.log("Erro ao conectar BLE: ", e);
                return;
            }
        }
    }

    const disconnectFromDevice = () => {
        if (connectedDevice) {
            bleManager.cancelDeviceConnection(connectedDevice.id);
            setConnectedDevice(null);
        }
    };

    const onStatusUpdate = (error, characteristic) => {
        if (error) {
            console.error("Erro ao receber notificação", error);
            return;
        }

        if (characteristic?.value) {
            const decoded = atob(characteristic.value);
            console.log("Notificação recebida:", decoded);

            setIsESPConnectedToWifi(decoded == "CONNECTED");
        }
    }

    const sendWifiCredentials = async (ssid, password) => {
        if (connectedDevice) {
            try {

                const ssidBytes = Buffer.from(ssid, "utf-8");
                const passBytes = Buffer.from(password, "utf-8");

                await connectedDevice.writeCharacteristicWithResponseForService(
                    SERVICE_UUID,
                    SSID_CHAR_UUID,
                    ssidBytes.toString("base64")
                );

                await connectedDevice.writeCharacteristicWithResponseForService(
                    SERVICE_UUID,
                    PASS_CHAR_UUID,
                    passBytes.toString("base64")
                );

                console.log("Credenciais enviadas!");
            } catch (error) {
                console.error("Erro ao enviar credenciais:", error);
            }
        } else
            console.log("Nenhum dispositivo BLE conectado para enviar credenciais WIFI");
    }

    const startStreamingData = async (device) => {
        if (device) {
            device.monitorCharacteristicForService(
                SERVICE_UUID,
                CONNECT_CHAR_UUID,
                onStatusUpdate
            );
        } else
            console.log("Nenhum dispositivo BLE conectado para receber notificação");
    };

    return {
        scanning,
        scanForDevices,
        connecting,
        connectToDevice,
        allDevices,
        connectedDevice,
        disconnectFromDevice,
        sendWifiCredentials,
        isESPConnectedToWifi
    };
}

export default useBLE;