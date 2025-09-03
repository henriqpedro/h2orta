import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const CustomProperty = ({ index, len, item }) => {
    return (
        <View key={index}>
            <View className={`rounded-xl p-6 max-h-[24vh] justify-center items-center my-4 ${index < len - 1 && 'mr-3'} bg-secondary`}>
                <Text className={`text-medium text-lg font-semibold`}>{item.title}</Text>
                <Text className={`text-base`}>{item.value}</Text>
            </View>
        </View>
    )
}

const CustomPropertyList = ({ item }) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        if (item) {
            setData([
                { title: "Habitat natural", value: item.habitat },
                { title: "Ciclo de vida", value: item.cicloDeVida },
                { title: "Temperatura ideal", value: `De ${item.minTemperatura} até ${item.maxTemperatura} °C` },
                { title: "Altura", value: `De ${item.minAltura} até ${item.maxAltura} cm` },
                { title: "Umidade ideal", value: `De ${item.minUmidade}% até ${item.maxUmidade}%` },
            ]);
        }
    }, [item]);

    return (
        <FlatList
            className="mb-5"
            horizontal
            extraData={data}
            data={data}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) =>
                <CustomProperty
                    item={item}
                    len={data.length}
                    index={index}
                />} />
    )
}

export default CustomPropertyList