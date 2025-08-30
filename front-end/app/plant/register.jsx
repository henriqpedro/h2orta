import { View, SafeAreaView, ScrollView, ToastAndroid } from 'react-native';
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

const Register = () => {

    const { get, getAll, data, prototype, setMacAddr, setViewingPlant } = usePlantContext();

    const [step, setStep] = useState(1);
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


    const [vasoInput, setVasoInput] = useState({
        id: 0,
        apelido: '',
        arduino: '',
        planta: {
            id: 0
        }
    });

    const validate = () => {
        if (step == 1) {
            if (!vasoInput.apelido || vasoInput.apelido == "") {
                ToastAndroid.show("Informe um apelido para plantinha.", ToastAndroid.SHORT);
                return false;
            }
            else if (!plant || plant.id <= 0) {
                ToastAndroid.show("Selecione uma planta para continuar.", ToastAndroid.SHORT);
                return false;
            }
            return true;
        }

        if (step == 2) {
            if (!connectedDevice) {
                ToastAndroid.show("Conecte com um vaso H2orta por bluetooth para prosseguir.", ToastAndroid.SHORT);
                return false;
            }
            return true;
        }

        if (step == 3) {
            if (!isESPConnectedToWifi) {
                ToastAndroid.show("Conecte um vaso a uma rede wifi para prosseguir.", ToastAndroid.SHORT);
                return false;
            }
            return true;
        }

        return true;
    }

    const save = () => {
        if (!validate()) return;
        setViewingPlant(plant);
        setMacAddr(connectedDevice.id);
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
                            apelido={vasoInput.apelido}
                            setApelido={(apelido) => setVasoInput({ ...vasoInput, apelido })} />
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
                    handlePress={step == 3 ? save : nextStep}
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
        </SafeAreaView>
    )
}

export default Register;