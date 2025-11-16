import { View, SafeAreaView, ScrollView } from 'react-native'
import { usePlantContext } from '../../context/PlantContext';
import RegisterPlant from '../../components/plant/RegisterPlant';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import { router } from 'expo-router';

const Update = () => {
    const { vase, update } = usePlantContext();

    const [apelido, setApelido] = useState(vase.apelido);
    const [plant, setPlant] = useState(vase.planta);

    const validate = () => {
        if (!apelido || apelido == "") {
            Toast.show({
                type: 'info',
                text1: 'Atenção',
                text2: "Informe um apelido para plantinha."
            });
            return false;
        }
        else if (!plant || plant.id <= 0) {
            Toast.show({
                type: 'info',
                text1: 'Atenção',
                text2: "Selecione uma planta para continuar."
            });
            return false;
        }
        return true;
    }

    const salvar = async () => {
        if (!validate()) return;
        await update(vase.id, plant, vase.arduino, apelido);
        router.navigate("home");
    }

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <ScrollView>
                <View className="min-h-[56vh] w-full mt-10 px-6 justify-center items-center">
                    <RegisterPlant
                        plant={plant}
                        setPlant={setPlant}
                        apelido={apelido}
                        setApelido={setApelido} />
                </View>
            </ScrollView>
            <View className="justify-center items-center pt-4">
                <CustomButton
                    handlePress={salvar}
                    title='Salvar'
                    constainerStyles={`w-56 mb-2 mb-8`} />
            </View>
            <Toast position='top' topOffset={20} config={{
                error: (props) => <CustomToast {...props} type="error" />,
                success: (props) => <CustomToast {...props} type="success" />,
                info: (props) => <CustomToast {...props} type="info" />,
            }} />
        </SafeAreaView>
    )
}

export default Update