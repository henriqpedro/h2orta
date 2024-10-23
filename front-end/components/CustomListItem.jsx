import { View, Text, TouchableOpacity } from "react-native";


export default function CustomListItem({title, subtitle, icon, handlePress, containerStyle}){
    return (
        <TouchableOpacity onPress={handlePress} className={` ${containerStyle} flex flex-row items-center justify-between w-full px-6 py-3 bg-secondary rounded-full`}>
            <View>
                <Text className="font-bold">{title}</Text>
                {
                    subtitle && 
                    (
                        <Text className="text-xs text-gray-500">{subtitle}</Text>
                    )
                }
            </View>
            <View className="h-6 w-6 mr-2 flex items-center justify-center bg-gray-400/60 rounded-full">
                {
                    icon
                }
            </View>
        </TouchableOpacity>
    )
}