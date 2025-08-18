import { Image, Text, View } from 'react-native'

const CustomEmptyList = () => {
    return (
        <View className="justify-center items-center">
            <Image className="w-48 h-48 mb-4 mt-10" resizeMode="contain"
                source={require("../assets/icons/not-found.png")} />
            <Text className='text-base'>Nenhum resultado exibido</Text>
        </View>
    )
}

export default CustomEmptyList