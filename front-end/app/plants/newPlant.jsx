import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import CustomInput from "../../components/CustomInput";
import { TextInput } from "react-native";
import { useContext, useState } from "react";
import CustomSelectModal from "../../components/CustomSelectModal";
import { PaperProvider } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import CustomListItem from "../../components/CustomListItem";
import { PlantContext } from "../../context/PlantContext";

export default function NewPlant(){

    const {plants} = useContext(PlantContext)

    const [newPlantData, setNewPlantData] = useState({
        nickname: "Apelido",
        plantSpecie: "Planta",
        vase: null
    })
    
    const [visible, setVisible] = useState(false);

    const [connectionType, setConnectionType] = useState("")

    function toggleConnectionType(connection){

        if(connection === connectionType){
            setConnectionType("")
            return
        }

        setConnectionType(connection)

    }

    function handleSelectVase(vase){
        setNewPlantData({...newPlantData, vase: vase})
    }


    return (
        <PaperProvider>
            <SafeAreaView className="flex-1 flex items-center bg-primary px-4 gap-4">
                <View className="flex items-center">
                    <View className="h-32 w-32 bg-secondary flex justify-center items-center rounded-2xl p-2">
                        {newPlantData.plantSpecie === "Planta" ? (
                            <Image 
                                resizeMode="contain" 
                                style={{width: 30, height: 30}} 
                                source={require("../../assets/icons/Imagem.png")}
                            />
                        ) :
                        (
                            <Image 
                                className="h-full w-full"
                                source={{uri: plants.filter((plant) => plant.nome === newPlantData.plantSpecie)[0].imagem}}
                            />
                        )}
                    </View>

                    <View className="space-y-1">
                        <CustomInput inputStyles={"bg-secondary font-semibold"} placeholder={"Apelido"}
                            handleChange={(nickname) => setFormData({...newPlantData, nickname: nickname})}
                        />
                        <TouchableOpacity onPress={() => setVisible(true)} className="flex flex-row justify-between w-[80%] px-4 h-10 bg-secondary rounded-3xl items-center">
                            <TextInput
                                className="flex-1 text-black"
                                placeholder={newPlantData.plantSpecie}
                                editable={false}
                            />
                            <AntDesign name="down" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="py-4 flex items-center justify-between flex-1 max-w-[80%]">
                    <View className="flex items-center w-full">
                        <Text className="text-gray-500 mb-2">Selecione o vaso:</Text>
                        <View className="flex flex-row w-full justify-between">
                            <CustomButton 
                                icon={<MaterialIcons name="bluetooth" size={30} color={"#FFF"}/>} 
                                handlePress={() => toggleConnectionType('bluetooth')} 
                                constainerStyles={connectionType === "bluetooth" ? "bg-dark mr-6 flex-1" : "bg-light flex-1 mr-6"} 
                            />
                            <CustomButton 
                                icon={<MaterialIcons name="wifi" size={30} color={"#FFF"}/>} 
                                handlePress={() => toggleConnectionType('wifi')} 
                                constainerStyles={connectionType === "wifi" ? "bg-dark flex-1" : "bg-light flex-1"} 
                            />
                        </View>
                        <ScrollView className="mt-6">
                            <CustomListItem containerStyle={"mb-4"} handlePress={() => handleSelectVase(1)} title={"Vaso 01"} subtitle={"EDD12598"} icon={<AntDesign name="right" color="#fff" size={14} />} />
                            <CustomListItem containerStyle={"mb-4"} handlePress={() => handleSelectVase(2)} title={"Vaso 02"} subtitle={"EDD12598"} icon={<AntDesign name="right" color="#fff" size={14} />} />
                            <CustomListItem handlePress={() => handleSelectVase(3)} title={"Vaso 03"} subtitle={"EDD12598"} icon={<AntDesign name="right" color="#fff" size={14} />} />
                        </ScrollView>
                    </View>


                    <View className="flex flex-row px-12">
                        <CustomButton title={"Salvar"} constainerStyles={"flex-1 h-14"} />
                    </View>
                </View>

            </SafeAreaView>

            <CustomSelectModal 
                visible={visible} 
                onClose={() => setVisible(false)}
                onSelect={(item) => setNewPlantData({...newPlantData, plantSpecie: item.nome})}
            />

        </PaperProvider>
    )
}

