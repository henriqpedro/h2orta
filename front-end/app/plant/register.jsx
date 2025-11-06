import { View, SafeAreaView, ScrollView } from 'react-native';
import CustomBleDeviceList from '../../components/plant/CustomBleDeviceList';
import { useState } from 'react';
import { usePlantContext } from '../../context/PlantContext';
import CustomButton from '../../components/CustomButton';
import { router } from 'expo-router';
import CustomWifiList from '../../components/plant/CustomWifiList';
import useBLE from '../../useBLE';
import useWifi from '../../useWifi';
import RegisterPlant from '../../components/plant/RegisterPlant';
import { ProgressBar } from 'react-native-paper';
import CustomCheckIcon from '../../components/CustomCheckIcon';
import CustomToast from '../../components/CustomToast';
import Toast from 'react-native-toast-message';

const Register = () => {

    const { save, prototype } = usePlantContext();

    const [step, setStep] = useState(1);
    const [apelido, setApelido] = useState('');
    const [plant, setPlant] = useState(prototype);

    const {
        sending,
        scanning: scanningBLE,
        scanForDevices,
        allDevices,
        connecting,
        connectToDevice,
        connectedDevice,
        isESPConnectedToWifi,
        sendWifiCredentials
    } = useBLE();

    const {
        scanning: scanningWifi,
        currentSSID,
        scanForWifi,
        allNetworks
    } = useWifi();

    const validate = () => {
        if (step == 1) {
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

        if (step == 2) {
            if (!connectedDevice) {
                Toast.show({
                    type: 'info',
                    text1: 'Atenção',
                    text2: "Conecte-se com um vaso H2orta por bluetooth para prosseguir."
                });
                return false;
            }
            return true;
        }

        if (step == 3) {
            if (!isESPConnectedToWifi) {
                Toast.show({
                    type: 'info',
                    text1: 'Atenção',
                    text2: "Conecte o vaso a uma rede wifi para prosseguir."
                });
                return false;
            }
            return true;
        }

        return true;
    }

    const salvar = async () => {
        if (!validate()) return;
        await save(plant, connectedDevice.id, apelido);
        router.navigate("home");
    }

    const nextStep = () => {
        if (!validate()) return;
        setStep(step + 1);
    }

    const prevStep = () => {
        setStep(step - 1);
    }

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <ProgressBar progress={step / 3} color='#93BE5B' />
            <ScrollView>
                <View className="min-h-[56vh] w-full mt-10 px-6 justify-center items-center">
                    {
                        step == 1 &&
                        <RegisterPlant
                            plant={plant}
                            setPlant={setPlant}
                            apelido={apelido}
                            setApelido={setApelido} />
                    }
                    {
                        step == 2 &&
                        <CustomBleDeviceList
                            scanning={scanningBLE}
                            scanForDevices={scanForDevices}
                            connectedDevice={connectedDevice}
                            connectToDevice={connectToDevice}
                            allDevices={allDevices}
                            connecting={connecting}
                        />
                    }
                    {
                        step == 3 && !isESPConnectedToWifi ?
                            <CustomWifiList
                                sending={sending}
                                sendCredentials={sendWifiCredentials}
                                scanForWifi={scanForWifi}
                                scanning={scanningWifi}
                                currentSSID={currentSSID}
                                allNetworks={allNetworks} />
                            : step == 3 &&
                            <CustomCheckIcon />
                    }
                </View>
            </ScrollView>
            <View className="justify-center items-center pt-4">
                <CustomButton
                    handlePress={step == 3 ? salvar : nextStep}
                    title={step == 3 ? 'Salvar' : 'Prosseguir'}
                    constainerStyles={`w-56 mb-2 ${step != 2 && 'mb-8'}`} />
                {step == 2 &&
                    <>
                        <CustomButton
                            color={'bg-dark'}
                            handlePress={scanForDevices}
                            title='Procurar'
                            constainerStyles='w-56 mb-2' />
                        <CustomButton
                            color={'bg-zinc-600'}
                            handlePress={prevStep}
                            title='Voltar'
                            constainerStyles='w-56 mb-8' />
                    </>
                }
            </View>
            <Toast position='top' topOffset={20} config={{
                error: (props) => <CustomToast {...props} type="error" />,
                success: (props) => <CustomToast {...props} type="success" />,
                info: (props) => <CustomToast {...props} type="info" />,
            }} />
        </SafeAreaView>
    )
}

export default Register;