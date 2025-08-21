import { View, SafeAreaView, Image, TouchableOpacity, ToastAndroid, ScrollView, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomBleDeviceList from '../../components/CustomBleDeviceList';
import CustomInput from '../../components/CustomInput';
import CustomSelectModal from '../../components/CustomSelectModal';
import { useState } from 'react';
import { usePlantContext } from '../../context/PlantContext';
import CustomButton from '../../components/CustomButton';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import CameraIcon from '../../components/CameraIcon';
import { router } from 'expo-router';

const Register = () => {

    const { data, prototype, viewingPlant, setViewingPlant } = usePlantContext();

    const [plant, setPlant] = useState(prototype);

    const [vasoInput, setVasoInput] = useState({
        id: 0,
        apelido: '',
        arduino: '',
        planta: {
            id: 0
        }
    });

    const save = () => {
        setViewingPlant(plant);
        router.navigate("home");
    }

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView>
                <View className="min-h-[100vh] w-full mt-4 px-6 justify-center items-center">
                    <View className="w-[90%] mb-4 justify-center items-center">
                        {
                            plant.imageSource == prototype.imageSource ?
                                <CameraIcon /> :
                                <Image className="w-[150px] h-[150px] mb-2 rounded-xl" source={plant.imageSource} resizeMode='contain' />
                        }
                        <CustomInput
                            labelStyles="text-gray font-semibold text-lg"
                            inputStyles="bg-secondary"
                            value={vasoInput.apelido}
                            handleChange={(apelido) => setVasoInput({ ...vasoInput, apelido })}
                            title="Apelido:"
                            placeholder="Digite o apelido da planta." />
                        <CustomSelectModal plant={plant} data={data} onSelect={setPlant} />
                    </View>
                    <Text className="text-base text-black mb-6">Configure o vaso: </Text>
                    <View className="w-full flex-row justify-around mb-2">
                        <CustomButton constainerStyles="w-[150px]">
                            <Ionicons name="bluetooth-outline" size={32} color="white" />
                        </CustomButton>
                        <CustomButton constainerStyles="w-[150px]">
                            <Ionicons name="wifi-outline" size={32} color="white" />
                        </CustomButton>
                    </View>
                    <CustomBleDeviceList />
                </View>
                <StatusBar backgroundColor="#F9F9F9" />
            </ScrollView>
            <View className="justify-center items-center pt-4">
                <CustomButton
                    handlePress={save}
                    title='Salvar'
                    constainerStyles='w-56 mb-8' />
            </View>
        </SafeAreaView>
    )
}

export default Register;