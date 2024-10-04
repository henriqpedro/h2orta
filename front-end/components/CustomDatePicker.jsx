import React from 'react'
import { View } from 'react-native';
import DatePicker from 'react-native-date-picker'

const CustomDatePicker = ({ date, maximumDate, minimumDate, handleChange, otherStyles }) => {
    return (
        <View className={`w-[80%] my-2 ${otherStyles}`}>
            <DatePicker date={new Date()}
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                onDateChange={handleChange}
            />
        </View>
    );
}

export default CustomDatePicker;