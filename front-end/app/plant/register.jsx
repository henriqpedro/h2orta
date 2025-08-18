import { View, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomBleDevice from '../../components/CustomBleDevice';
import useBLE from '../../useBLE';
import { useEffect, useState } from 'react';
import CustomEmptyList from '../../components/CustomEmptyList';
import Loading from '../../components/Loading';

const Register = () => {

    const [isLoading, setIsLoading] = useState(false);

    const {
        scanForDevices,
        allDevices,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice
    } = useBLE();

    useEffect(() => {
        scanBLE();
    }, []);

    const scanBLE = async () => {
        setIsLoading(true);
        await scanForDevices();
        setIsLoading(false);
    }

    const connectToBLE = async (device) => {
        setIsLoading(true);
        await connectToBLE(device);
        setIsLoading(false);
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="w-full min-h-[100vh]">
                <View className="w-full items-center mt-10 px-6">
                    <Loading loading={isLoading}>
                        <FlatList
                            data={allDevices}
                            ListEmptyComponent={<CustomEmptyList />}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item, index }) =>
                                <CustomBleDevice
                                    title={item.name}
                                    index={index}
                                    handlePress={() => connectToBLE(item)} />} />
                    </Loading>
                </View>
            </View>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    )
}

export default Register;