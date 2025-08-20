import { FlatList } from 'react-native'
import CustomEmptyList from './CustomEmptyList'
import CustomBleDevice from './CustomBleDevice'
import useBLE from './../useBLE'
import { useEffect } from 'react'

const CustomBleDeviceList = () => {

    const {
        scanning,
        scanForDevices,
        allDevices,
        connecting,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice
    } = useBLE();

    useEffect(() => {
        scanForDevices();
    }, []);

    const connectBLE = async (device) =>
        connectToDevice(device);

    return (
        <FlatList
            data={allDevices}
            extraData={allDevices}
            refreshing={scanning}
            onRefresh={scanForDevices}
            ListEmptyComponent={<CustomEmptyList />}
            keyExtractor={(item, index) => index}
            contentContainerStyle={{ marginTop: scanning ? 80 : 0 }}
            renderItem={({ item, index }) =>
                <CustomBleDevice
                    disabled={connecting}
                    device={item}
                    index={index}
                    handlePress={() => connectBLE(item)} />} />
    )
}

export default CustomBleDeviceList