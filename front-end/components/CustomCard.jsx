import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomTextIcon from './CustomTextIcon';

const CustomIndicator = ({ value }) => {
    let color = value < 50 ? 'bg-danger' : 'bg-light';
    return (
        <Text className={`${color} text-primary rounded-md px-3`}>{value}%</Text>
    )
}

const CustomCardField = ({ iconSource, title, value, containerStyles }) => {
    return (
        <View className={`${containerStyles} flex-row justify-between items-center`}>
            <CustomTextIcon text={`${title}  `} iconSource={iconSource} />
            <CustomIndicator value={value} />
        </View>
    )
}

const CustomCard = ({ imageSource, name, description, humidity, tank, index }) => {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <View className="bg-secondary min-h-[50vh] min-w-[80vw] rounded-xl px-5 pt-8 pb-16 justify-center items-center" key={index}>
            <View className="justify-center items-center">
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => setShowMenu(!showMenu)}
                    className='self-end min-h-[48px] px-5 justify-center items-end'>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                    {
                        showMenu ?
                            <View className="absolute top-10 z-2">
                                <CustomButton constainerStyles='bg-primary rounded-none' textStyles='text-black text-sm' title='Irrigar planta' />
                            </View>
                            : <></>
                    }
                </TouchableOpacity>
                <Image className="w-[150px] h-[150px]" source={imageSource} resizeMode='contain' />
                <Text className="text-dark text-xl">{name}</Text>
                <Text className="text-center px-10 mt-2">{description}</Text>
            </View>
            <View>
                <CustomCardField
                    containerStyles="mt-5"
                    iconSource={require('../assets/icons/tank.png')}
                    title="Nível do reservatório"
                    value={tank} />
                <CustomCardField
                    containerStyles="mt-2"
                    iconSource={require('../assets/icons/humidity.png')}
                    title="Umidade"
                    value={humidity} />
            </View>
        </View>
    )
}

export default CustomCard