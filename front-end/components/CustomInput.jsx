import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CustomInput = ({ title, hide, date, placeholder, value, handleChange, inputStyles, otherStyles }) => {

    const [showHidden, setShowHidden] = useState(false);
    const [datePickerOpened, setDatePickerOpened] = useState(false);

    const getInputValue = () => {
        return date ? value?.toLocaleDateString('pt-BR') : value;
    }

    const getAccessibilityHint = () => {
        if (hide) return !showHidden ? 'Senha oculta' : 'Senha visível';
        return undefined;
    }

    return (
        <View className={`w-[80%] my-2 ${otherStyles}`}>
            <Text className="text-primary text-base font-bold mb-2 ml-4">{title}</Text>
            <View className={`${inputStyles} rounded-3xl w-full px-4 items-center flex-row`}>
                <TextInput
                    className="flex-1 text-black h-12 text-base"
                    multiline={!hide}
                    value={getInputValue()}
                    placeholder={placeholder}
                    accessibilityHint={getAccessibilityHint()}
                    editable={!date}
                    onChangeText={handleChange}
                    secureTextEntry={hide && !showHidden}
                />
                {hide &&
                    <TouchableOpacity
                        accessible={true}
                        accessibilityLabel={!showHidden ? 'Mostrar senha' : 'Ocultar senha'}
                        className="w-12 h-12 items-end justify-center"
                        onPress={() => setShowHidden(!showHidden)}>
                        <Image className="w-6 h-6" resizeMode="contain"
                            source={!showHidden ? require("../assets/icons/lock.png") : require("../assets/icons/unlock.png")} />
                    </TouchableOpacity>
                }
                {date &&
                    <TouchableOpacity accessible={true} accessibilityLabel='Selecionar data' className="w-12 h-12 items-end justify-center" onPress={() => setDatePickerOpened(true)}>
                        <Image className="w-6 h-4" resizeMode="contain"
                            source={require("../assets/icons/calendar.png")} />
                    </TouchableOpacity>
                }
            </View>
            {datePickerOpened &&
                <RNDateTimePicker value={value ?? new Date()}
                    accentColor='#93BE5B'
                    locale='pt-BR'
                    onChange={
                        (event, date) => {
                            setDatePickerOpened(false);
                            if (event.type == "set") {
                                if (value?.valueOf() == date.valueOf())
                                    value = undefined;
                                else
                                    value = date;
                                handleChange(value);
                            }
                        }} />}
        </View>
    );
}

export default CustomInput;