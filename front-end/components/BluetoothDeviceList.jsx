import { ScrollView, Text } from "react-native"
import CustomListItem from "./CustomListItem"
import { AntDesign } from '@expo/vector-icons'


export default function BluetoothDeviceList ({allDevices, connectToDevice}) {
    return (
        <ScrollView className="mt-6">
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
        </ScrollView>
    )
}