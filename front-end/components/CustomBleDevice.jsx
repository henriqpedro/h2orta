import { Text, TouchableOpacity } from 'react-native'
import Loading from './Loading'

const CustomBleDevice = ({ title, index, handlePress, constainerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            key={index}
            accessibilityState={{ busy: isLoading }}
            onPress={handlePress}
            activeOpacity={0.7}
            className={`min-h-[48px] px-5 items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}>
            <Loading loading={isLoading} color='black'>
                <Text className={`'text-black font-semibold text-lg ${textStyles}`}>{title}</Text>
            </Loading>
        </TouchableOpacity>
    )
}

export default CustomBleDevice