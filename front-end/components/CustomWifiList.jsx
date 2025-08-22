import { FlatList } from 'react-native'
import CustomEmptyList from './CustomEmptyList'
import { useEffect } from 'react'
import CustomWifiConnection from './CustomWifiConnection'

const CustomWifiList = ({ scanning, scanForWifi, allNetworks, currentSSID, sendCredentials }) => {

    useEffect(() => {
        scanForWifi();
    }, []);

    return (
        <FlatList
            data={allNetworks}
            extraData={allNetworks}
            refreshing={scanning}
            onRefresh={scanForWifi}
            scrollEnabled={false}
            ListEmptyComponent={<CustomEmptyList />}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{ marginTop: scanning ? 80 : 0 }}
            renderItem={({ item, index }) =>
                <CustomWifiConnection
                    connected={item.SSID == currentSSID}
                    sendCredentials={sendCredentials}
                    disabled={false}
                    wifi={item}
                    index={index} />} />
    )
}

export default CustomWifiList