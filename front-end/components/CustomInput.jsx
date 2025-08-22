import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CustomInput = ({ title, hide, date, select, placeholder, value, handleChange, onPress, inputStyles, labelStyles }) => {

    const [showHidden, setShowHidden] = useState(false);
    const [datePickerOpened, setDatePickerOpened] = useState(false);

    const getInputValue = () => {
        return date ? value?.toLocaleDateString('pt-BR') : value;
    }

    const getAccessibilityHint = () => {
        if (hide) return !showHidden ? 'Senha oculta' : 'Senha visível';
        return undefined;
    }

    const onPressInput = () => {
        if (!select) return;
        onPress();
    }

    return (
        <View className={`min-w-[80%] my-2`}>
            {title && <Text className={`${labelStyles ?? 'text-primary text-base font-bold'} mb-2 ml-4`}>{title}</Text>}
            <TouchableOpacity
                accessible={select}
                onPress={onPressInput}
                className={`${inputStyles} rounded-full w-full px-4 items-center flex-row`}>
                <TextInput
                    onPress={onPressInput}
                    className={`${inputStyles} flex-1 rounded-full text-black h-12 text-base`}
                    multiline={!hide}
                    value={getInputValue()}
                    placeholder={placeholder}
                    accessibilityHint={getAccessibilityHint()}
                    editable={!date && !select}
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
                {select &&
                    <TouchableOpacity accessible={true} accessibilityLabel='Abrir modal de plantas' className="w-12 h-12 items-end justify-center" onPress={onPressInput}>
                        <Feather name="chevron-down" size={24} color="#555" />
                    </TouchableOpacity>
                }
            </TouchableOpacity>
            {
                datePickerOpened &&
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
                        }} />
            }
        </View >
    );
}

export default CustomInput;