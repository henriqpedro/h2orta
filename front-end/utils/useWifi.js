import { useEffect, useState } from "react"
import WifiManager from 'react-native-wifi-reborn'

export const useWifi = async () => {

    const [wifiList, setWifiList] = useState([]);

    const searchForWifiNetworks = async () => {

        const wifiNetworks = await WifiManager.loadWifiList();

        setWifiList(wifiNetworks);

    }

    useEffect(() => {

        searchForWifiNetworks();

    }, [])

    return {
        wifiList
    }

} 