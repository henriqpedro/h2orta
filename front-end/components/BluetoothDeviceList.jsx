import { ScrollView, Text } from "react-native"
import CustomListItem from "./CustomListItem"
import { AntDesign } from '@expo/vector-icons'
import WifiManager from 'react-native-wifi-reborn'

const BluetoothDevices = ({allDevices, connectToDevice}) => {
    return (
        <>
            {
                allDevices.length > 0
                ? 
                allDevices.map(device => {
                    return (
                        <CustomListItem
                            key={device.id}
                            containerStyle={"mb-4"}
                            handlePress={() => connectToDevice(device)}
                            title={device.name !== null ? device.name : "Dispositivo sem nome"}
                            subtitle={device.id}
                            icon={
                                <AntDesign name="right" color="#fff" size={14}
                            />}
                        />
                    )
                })
                :
                (
                    <Text className="mb-4 ">
                        Nenhum dispositivo bluetooth encontrado.
                    </Text>
                )
            }
        </>
    )
}

const WifiList = ({wifiList, selectWifi}) => {
    return (
        <>
            {
                wifiList.map(wifi => {
                    return (
                        <CustomListItem
                            key={wifi.BSSID}
                            containerStyle={"mb-4"}
                            handlePress={() => selectWifi(wifi.SSID)}
                            title={wifi.SSID !== null ? wifi.SSID : "Dispositivo sem nome"}
                            subtitle={wifi.BSSID}
                            icon={
                                <AntDesign name="right" color="#fff" size={14}
                            />}
                        />
                    )
                })
            }
        </>
    )
}

export default function BluetoothDeviceList ({connectionList, handlePress, connectionType}) {
    return (
        <ScrollView className="mt-6">
            {
                connectionType === "bluetooth" ?
                (
                    <BluetoothDevices allDevices={connectionList} connectToDevice={handlePress} />
                )
                :
                (
                    <WifiList wifiList={connectionList} selectWifi={handlePress} />
                )
            }
        </ScrollView>
    )
}