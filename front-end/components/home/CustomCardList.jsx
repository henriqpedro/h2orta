import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomEmptyList from '../CustomEmptyList';
import { prototype } from '../../utils/default-plants';

const CustomCardShort = ({ item, index, selected, onSelected }) => {
    return (
        <View key={index}>
            <TouchableOpacity
                onPress={() => {
                    selected = true;
                    if (onSelected)
                        onSelected(item)
                }}
                activeOpacity={0.7}
                className={`rounded-xl py-10 min-w-[40vw] max-h-[24vh] justify-center items-center m-2
                ${selected ? 'bg-light' : 'bg-secondary'}`}>
                <Image className="w-[100px] h-[90px] rounded-2xl mb-1" source={{ uri: item.imagem }} resizeMode='cover' />
                <Text numberOfLines={1} ellipsizeMode='tail' className={`text-base font-semibold max-w-[37vw] ${selected ? 'text-primary' : 'text-black'}`}>{item.nome}</Text>
            </TouchableOpacity>
        </View>
    )
}

const CustomCardList = ({ selectedPlant, data, onSelected, onEndReached }) => {

    const [selectedItem, setSelectedItem] = useState({})

    useEffect(() => {
        if (selectedPlant != prototype)
            setSelectedItem(selectedPlant);
    }, [selectedPlant])

    return (
        <SafeAreaView className="justify-center items-center max-h-[62vh]">
            <FlatList
                numColumns={2}
                extraData={data}
                data={data}
                ListEmptyComponent={<CustomEmptyList />}
                onEndReached={onEndReached}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) =>
                    <CustomCardShort
                        item={item}
                        index={index}
                        selected={item == selectedItem}
                        onSelected={(element) => {
                            console.log(element.imagem)
                            setSelectedItem(element)
                            onSelected(element)
                        }} />} />
        </SafeAreaView>
    )
}

export default CustomCardList