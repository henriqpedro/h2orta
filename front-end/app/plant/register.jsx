import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomCard from '../../components/CustomCard';
import CustomButton from '../../components/CustomButton';
import { Link } from 'expo-router';
import useBLE from '../../useBLE';

const register = () => {
    const {
        scanForDevices,
        allDevices,
        connectToDevice,
        connectedDevice,
        disconnectFromDevice
    } = useBLE();

    // useEffect(() => {
    //     //scanForDevices();
    // }, []);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh]">
                    <View className="w-full items-center justify-center mt-10 px-6">
                        <View className="justify-center items-center">
                            <CustomButton
                                title='Cadastrar planta'
                                constainerStyles='w-56 mt-10' />
                            <Link href="plant">register</Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    )
}

export default register;