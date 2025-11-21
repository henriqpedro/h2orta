import { View, SafeAreaView, ScrollView, findNodeHandle, AccessibilityInfo } from 'react-native'
import { usePlantContext } from '../../context/PlantContext';
import RegisterPlant from '../../components/plant/RegisterPlant';
import { useEffect, useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/CustomButton';
import CustomToast from '../../components/CustomToast';
import { router } from 'expo-router';
import { useScreenReaderEnabled } from '../../hooks/useScreenReaderEnabled';

const Update = () => {
    const { vase, update } = usePlantContext();

    const [visible, setVisible] = useState(false);
    const [apelido, setApelido] = useState(vase.apelido);
    const [plant, setPlant] = useState(vase.planta);

    const screenReaderEnabled = useScreenReaderEnabled();
    const salvarRef = useRef(null);

    const focus = (ref) => {
        if (screenReaderEnabled)
            setTimeout(() => {
                if (ref.current) {
                    const node = findNodeHandle(ref.current);
                    if (node)
                        AccessibilityInfo.setAccessibilityFocus(node);
                }
            }, 300);
    }

    useEffect(() => {
        if (!visible) focus(salvarRef);
    }, [visible]);

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
        <SafeAreaView
            importantForAccessibility={visible ? 'no-hide-descendants' : 'auto'}
            className="flex-1 bg-primary">
            <ScrollView>
                <View className="min-h-[56vh] w-full mt-10 px-6 justify-center items-center">
                    <RegisterPlant
                        visible={visible}
                        setVisible={setVisible}
                        plant={plant}
                        setPlant={setPlant}
                        apelido={apelido}
                        setApelido={setApelido} />
                </View>
            </ScrollView>
            <View className="justify-center items-center pt-4">
                <CustomButton
                    ref={salvarRef}
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