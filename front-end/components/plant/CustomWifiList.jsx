import { FlatList, Text, View } from 'react-native'
import CustomEmptyList from '../CustomEmptyList'
import { useEffect } from 'react'
import CustomWifiConnection from './CustomWifiConnection'
import Loading from '../Loading'

const CustomWifiList = ({ scanning, sending, scanForWifi, allNetworks, currentSSID, sendCredentials }) => {

    useEffect(() => {
        scanForWifi();
    }, []);

    return (
        <View className="w-full mb-4 justify-center items-center">
            <Loading color='black' loading={sending}>
                <Text className="text-center text-base mt-6 mb-6 mx-10">Informe as credenciais WI-FI para seu vasinho se conectar a Internet:</Text>
                <FlatList
                    data={allNetworks}
                    extraData={allNetworks}
                    refreshing={scanning}
                    onRefresh={scanForWifi}
                    scrollEnabled={false}
                    ListEmptyComponent={<CustomEmptyList />}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{ marginTop: scanning ? 60 : 0 }}
                    renderItem={({ item, index }) =>
                        <CustomWifiConnection
                            connected={item.SSID == currentSSID}
                            sendCredentials={sendCredentials}
                            disabled={false}
                            wifi={item}
                            index={index} />} />
            </Loading>
            { sending && <Text className="text-base mt-2">Conectando...</Text> }
        </View>
    )
}

export default CustomWifiList