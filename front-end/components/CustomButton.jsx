import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, constainerStyles, textStyles, isLoading, disabled }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`${disabled ? 'bg-light' : 'bg-medium'} rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading || disabled}>
            <Text className={`${disabled ? 'text-gray-500' : 'text-primary'} font-semibold text-lg ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton