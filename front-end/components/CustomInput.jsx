import React from 'react';
import { Text, TextInput, View } from 'react-native';

const CustomInput = ({ title, placeholder, value, handleChangeText, otherStyles }) => {
    return (
        <View className={`w-[80%] my-2 ${otherStyles}`}>
            <Text className="text-primary font-bold mb-2 ml-4">{title}</Text>
            <View className="bg-primary rounded-3xl w-full h-10 px-4">
                <TextInput
                    className="flex-1 text-black"
                    multiline={true}
                    value={value}
                    placeholder={placeholder}
                    onChangeText={handleChangeText}
                />
            </View>
        </View>
    );
}

export default CustomInput;