import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CustomInput = ({ title, hideText, placeholder, value, handleChangeText, inputStyles, otherStyles }) => {

    const [showHidden, setShowHidden] = useState(false);

    return (
        <View className={`w-[80%] my-2 ${otherStyles}`}>
            <Text className="text-primary font-bold mb-2 ml-4">{title}</Text>
            <View className={`${inputStyles} rounded-3xl w-full h-10 px-4 items-center flex-row`}>
                <TextInput
                    className="flex-1 text-black"
                    multiline={!hideText}
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                    secureTextEntry={hideText && !showHidden}
                />
                {hideText &&
                    <TouchableOpacity onPress={() => setShowHidden(!showHidden)}>
                        <Image className="w-5 h-5" resizeMode="contain"
                            source={!showHidden ? require("../assets/icons/lock.png") : require("../assets/icons/unlock.png")} />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
}

export default CustomInput;