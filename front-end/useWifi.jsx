import { useState } from "react";
import { PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import WifiManager from "react-native-wifi-reborn";

function useWifi() {

    const [scanning, setScanning] = useState(false);
    const [currentSSID, setCurrentSSID] = useState(null);
    const [allNetworks, setAllNetworks] = useState([]);

    const requestAndroid31Permissions = async () => {

        const bluetoothFineLocationPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        return (
            bluetoothFineLocationPermission == PermissionsAndroid.RESULTS.GRANTED
        );
    };

    const requestPermissions = async () => {
        if (Platform.OS === "android")
            return await requestAndroid31Permissions();
        return false;
    };

    const scanForWifi = async () => {
        const isPermissionsEnabled = await requestPermissions();
        if (isPermissionsEnabled) startScanning();
        else ToastAndroid.show("É necessário conceder permissão WIFI para continuar.", ToastAndroid.SHORT);
    };

    const isDuplicatedDevice = (networks, nextNetwork) =>
        networks.findIndex((network) => nextNetwork.SSID === network.SSID) > -1;

    const startScanning = async () => {
        if (!scanning) {
            try {
                setScanning(true);
                const networks = await WifiManager.loadWifiList();
                networks.filter(net => {
                    if (!net.SSID) return false;
                    const ssid = net.SSID.trim();
                    if (ssid.length < 2) return false;
                    if (!/^[\x20-\x7E]+$/.test(ssid)) return false;
                    if (ssid.toLowerCase().includes("hidden")) return false;
                    return true;
                })
                    .forEach(wifi =>
                        setAllNetworks((prevState) => {
                            if (!isDuplicatedDevice(prevState, wifi))
                                return [...prevState, wifi];
                            return prevState;
                        })
                    )
                setAllNetworks(networks);
                setScanning(false);
                checkWifi();
            } catch (error) {
                console.log("Erro ao escanear redes:", error);
                ToastAndroid.show("Erro ao escanear redes WIFI", ToastAndroid.SHORT);
            }
        }
    }

    const checkWifi = async () => {
        const connected = await WifiManager.connectionStatus();
        if (connected) {
            const currentSSID = await WifiManager.getCurrentWifiSSID().catch(() => null);
            setCurrentSSID(currentSSID);
        } else setCurrentSSID(null);
    };

    return {
        scanning,
        currentSSID,
        scanForWifi,
        allNetworks
    };
}

export default useWifi;