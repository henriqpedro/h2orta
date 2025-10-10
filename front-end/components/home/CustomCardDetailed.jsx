import { Image, Text, View } from 'react-native';

const CustomCardDetailed = ({ item }) => {

    return (
        <View className="bg-secondary min-h-[50vh] min-w-[80vw] rounded-xl px-5 py-12 justify-center items-center">
            <View className="justify-center items-center">
                <View className="w-[150px] h-[150px] overflow-hidden rounded-2xl mb-3">
                    <Image
                        source={{ uri: item.imagem }}
                        className="w-full h-[160px] absolute top-0"
                        resizeMode="cover"
                    />
                </View>
                <Text className="text-medium font-semibold text-xl">{item.nome}</Text>
                <Text className="text-medium text-base italic">{item.familia}</Text>
                <Text className="text-center px-10 mt-3">{item.usoComum}</Text>
                <Text className="text-center px-10 mt-3">{item.caracteristicasEspeciais}</Text>
            </View>
        </View>
    )
}

export default CustomCardDetailed;