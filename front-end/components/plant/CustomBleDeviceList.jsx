import { FlatList, Text, View } from 'react-native'
import CustomEmptyList from '../CustomEmptyList'
import CustomBleDevice from './CustomBleDevice'
import { useEffect } from 'react'

const CustomBleDeviceList = ({ scanning, scanForDevices, allDevices, connecting, connectToDevice, connectedDevice, disconnectFromDevice }) => {

    useEffect(() => {
        scanForDevices();
    }, []);

    const connectBLE = async (device) =>
        connectToDevice(device);

    return (
        <View className="w-full mb-4 justify-center items-center">
            <Text className="text-center text-base mt-6 mb-6 mx-10">Selecione o bluetooth de seu vasinho H2orta:</Text>
            <FlatList
                data={allDevices}
                extraData={allDevices}
                refreshing={scanning}
                onRefresh={scanForDevices}
                scrollEnabled={false}
                ListEmptyComponent={<CustomEmptyList />}
                keyExtractor={(item, index) => index}
                contentContainerStyle={{ marginTop: scanning ? 80 : 0 }}
                renderItem={({ item, index }) =>
                    <CustomBleDevice
                        disabled={connecting}
                        device={item}
                        connected={item.id == connectedDevice?.id}
                        index={index}
                        handlePress={() => connectBLE(item)} />} />
        </View>
    )
}

export default CustomBleDeviceList