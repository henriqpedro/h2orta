import React, { useState } from 'react';
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomCardShort = ({ item, index, selected, onSelected }) => {
    const [imageLoading, setImageLoading] = useState(true)
    const onLoadStart = () => setImageLoading(true)
    const onLoadEnd = () => setImageLoading(false)
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
                <Image 
                className={`${!imageLoading ? 'w-[100px] h-[100px]' : 'max-w-none'} mb-2 rounded-xl`} 
                source={{ uri: item.image_url }} 
                resizeMode='cover'
                onLoadEnd={onLoadEnd}
                onLoadStart={onLoadStart} />
                {imageLoading && <ActivityIndicator className="w-[100px] h-[100px]" color='#76974B' />}
                <Text numberOfLines={1} ellipsizeMode='tail' className={`font-semibold max-w-[35vw] px-3 ${selected ? 'text-primary' : 'text-black'}`}>{item.common_name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const CustomCardTrefle = ({ data, refreshing, fetchMore, onSelected, search, onChangeSearch }) => {
    const [selectedItem, setSelectedItem] = useState()

    const onEndReached = () => fetchMore('end')
    const onRefresh = () => fetchMore('restart')
    const extractKey = (item) => item.id
    const renderItem = ({ item, index }) =>
        <CustomCardShort
            item={item}
            index={index}
            selected={item == selectedItem}
            onSelected={(element) => {
                setSelectedItem(element)
                onSelected(element)
            }} />

    return (
        <SafeAreaView className="justify-center items-center h-[68vh]">
            <Searchbar
                className="bg-secondary text-dark mx-3 mb-2 fixed"
                cursorColor='green'
                value={search}
                onChangeText={onChangeSearch} />
            <FlatList
                numColumns={2}
                extraData={data}
                data={data}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.2}
                initialNumToRender={10}
                ListEmptyComponent={
                    <View className="justify-center items-center h-[48vh]">
                        <Image className="w-[38vw] h-[32vh]" source={require('../../assets/icons/not-found.png')} resizeMode='contain' />
                        <Text>Pesquise uma planta para continuar.</Text>
                    </View>
                }
                removeClippedSubviews={true}
                refreshControl={
                    <RefreshControl
                        tintColor='green'
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                }
                keyExtractor={extractKey}
                renderItem={renderItem} />
        </SafeAreaView>
    )
}

export default CustomCardTrefle