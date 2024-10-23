import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, constainerStyles, textStyles, isLoading, icon }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-light rounded-3xl min-h-[48px] px-5
                justify-center items-center ${constainerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}>
                {
                    icon ? 
                    (
                        icon
                    ) :
                    (
                        <Text className={`text-primary font-semibold text-lg ${textStyles}`}>{ title }</Text>
                    )
                }
        </TouchableOpacity>
    )
}

export default CustomButton