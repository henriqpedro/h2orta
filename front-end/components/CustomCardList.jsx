import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
                <Image className="w-[100px] h-[100px]" source={item.imageSource} resizeMode='contain' />
                <Text numberOfLines={1} ellipsizeMode='tail' className={`max-w-[35vw] px-3 ${selected ? 'text-primary' : 'text-black'}`}>{item.name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const CustomCardList = ({ data, onSelected }) => {
    const [selectedItem, setSelectedItem] = useState({})
    return (
        <SafeAreaView className="justify-center items-center max-h-[62vh]">
            <FlatList
                numColumns={2}
                extraData={data}
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) =>
                    <CustomCardShort
                        item={item}
                        index={index}
                        selected={item == selectedItem}
                        onSelected={(element) => {
                            setSelectedItem(element)
                            onSelected(element)
                        }} />} />
        </SafeAreaView>
    )
}

export default CustomCardList