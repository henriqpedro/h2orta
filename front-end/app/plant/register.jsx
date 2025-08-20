import { View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomBleDeviceList from '../../components/CustomBleDeviceList';
import CustomInput from '../../components/CustomInput';
import CustomSelectModal from '../../components/CustomSelectModal';
import { useState } from 'react';
import { data, prototype } from '../../utils/default-plants';

const Register = () => {

    const [vasoInput, setVasoInput] = useState({
        id: 0,
        apelido: '',
        arduino: '',
        planta: {
            id: 0
        }
    })
    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="min-h-[100vh] w-full mt-10 px-6">
                <View className="items-center">
                    <CustomInput
                        labelStyles="text-gray font-semibold text-lg"
                        inputStyles="bg-secondary"
                        value={vasoInput.apelido}
                        handleChange={(apelido) => setVasoInput({ ...vasoInput, apelido })}
                        title="Apelido:"
                        placeholder="Digite o apelido da planta." />
                    <CustomSelectModal data={data} onSelect={() => {}}></CustomSelectModal>
                </View>
                <CustomBleDeviceList />
            </View>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    )
}

export default Register;