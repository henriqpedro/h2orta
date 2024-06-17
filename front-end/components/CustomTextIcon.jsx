import { View, Text, Image } from 'react-native'
import React from 'react'

const CustomTextIcon = ({ iconSource, text }) => {
  return (
    <View className="flex-row items-center">
      <Image className="w-[26px] h-[26px]" source={iconSource} resizeMode='contain'></Image>
      <Text className="ml-2">{text}</Text>
    </View>
  )
}

export default CustomTextIcon