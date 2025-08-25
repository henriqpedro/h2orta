import { Image, Text, View } from 'react-native'
import { check } from '../utils/default-icons'

const CustomCheckIcon = () => {
    return (
        <View className="justify-center items-center my-8">
            <Image className="w-[230px] h-[230px] mb-1" resizeMode="contain"
                source={check} />
            <Text className='text-base'>Cadastro finalizado com sucesso.</Text>
        </View>
    )
}

export default CustomCheckIcon