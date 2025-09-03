import { Text, TouchableOpacity, View } from 'react-native'
import Loading from '../Loading'
import { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";

const CustomBleDevice = ({ device, index, connected, handlePress, disabled }) => {

    const [isLoading, setIsLoading] = useState(false);

    const connectBLE = async () => {
        setIsLoading(true);
        await handlePress();
        setIsLoading(false);
    }

    return (
        <TouchableOpacity
            key={index}
            accessibilityState={{ busy: isLoading }}
            onPress={connectBLE}
            disabled={disabled || isLoading}
            activeOpacity={0.7}
            className={`w-full bg-secondary justify-between items-center flex-row rounded-3xl min-h-[48px] p-5 mt-4 ${isLoading ? 'opacity-50' : ''}`}>
            <View>
                <Text className={`font-semibold text-gray text-lg`}>{device.name}</Text>
                <Text className={`'text-black`}>{device.id}</Text>
            </View>
            {connected ? <Text className="italic text-base">Conectado</Text> :
                <Loading loading={isLoading}>
                    <Ionicons name="chevron-forward" size={20} color="#555" />
                </Loading>
            }
        </TouchableOpacity>
    )
}

export default CustomBleDevice