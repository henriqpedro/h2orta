import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import useBLE from '../../useBLE';
import { useEffect } from 'react';

const register = () => {
    const {
        scanForDevices,
        allDevices,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice
    } = useBLE();

    useEffect(() => {
        scanForDevices();
    }, []);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh]">
                    <View className="w-full items-center justify-center mt-10 px-6">
                        <View className="justify-center items-center">
                            <CustomButton
                                handlePress={scanForDevices}
                                title='Cadastrar planta'
                                constainerStyles='w-56 mt-10' />
                            <Link href="plant">register</Link>
                            {
                                allDevices.map(device => {
                                    return <Text key={device.name}>{device.name}</Text>;
                                })
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    )
}

export default register;