import { AccessibilityInfo, findNodeHandle, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from 'react';
import { Modal, Portal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import { useScreenReaderEnabled } from '../../hooks/useScreenReaderEnabled';

const CustomWifiModal = ({ SSID, onClose, visible, onSend }) => {

    const [password, setPassword] = useState("");

    const screenReaderEnabled = useScreenReaderEnabled();
    const accessibleRef = useRef(null);

    useEffect(() => {
        if (screenReaderEnabled) {
            setTimeout(() => {
                if (accessibleRef.current) {
                    const node = findNodeHandle(accessibleRef.current);
                    if (node)
                        AccessibilityInfo.setAccessibilityFocus(node);
                }
            }, 300);
        }
    }, [visible]);

    const send = () => {
        onSend(SSID, password);
        onClose();
    }
    return (
        <Portal>
            <Modal
                accessibilityViewIsModal={true}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={() => onClose()}>
                <View className="p-4 rounded-2xl pt-8 w-[90vw] bg-primary">
                    <Text ref={accessibleRef} className="text-base mb-2 ml-4">Digite a senha para "{SSID}".</Text>
                    <View className="justify-center items-center">
                        <CustomInput
                            labelStyles="text-gray font-semibold text-lg"
                            inputStyles="bg-secondary"
                            value={password}
                            handleChange={setPassword}
                            hide={true}
                            placeholder="Senha" />
                        <View className="self-end flex-row justify-end">
                            <CustomButton
                                handlePress={onClose}
                                title='Cancelar'
                                constainerStyles='bg-secondary mr-2 mt-5'
                                textStyles='text-black text-sm' />
                            <CustomButton
                                handlePress={send}
                                title='Confirmar'
                                constainerStyles='mr-1 mt-5'
                                textStyles='text-sm' />
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

const CustomWifiConnection = ({ wifi, index, disabled, connected, sendCredentials, setVisible }) => {

    const [wifiVisible, setWifiVisible] = useState(false);

    const handlePress = () => {
        setVisible(true);
        setWifiVisible(true);
    }

    const onClose = () => {
        setVisible(false);
        setWifiVisible(false);
    }
    return (
        <TouchableOpacity
            key={index}
            onPress={handlePress}
            disabled={disabled}
            activeOpacity={0.7}
            className={`w-full bg-secondary justify-between items-center flex-row rounded-3xl min-h-[48px] p-5 mt-4`}>
            <View>
                <Text className={`font-semibold text-gray text-lg`}>{wifi.SSID}</Text>
                <Text
                    accessible={false}
                    importantForAccessibility='no'
                    className={`text-black`}>
                    {wifi.BSSID}
                </Text>
            </View>
            {connected ? <Text className="italic text-xs">Conectado</Text> :
                <Ionicons name="chevron-forward" size={20} color="#555" />}
            <CustomWifiModal onSend={sendCredentials} SSID={wifi.SSID} visible={wifiVisible} onClose={onClose} />
        </TouchableOpacity>
    )
}

export default CustomWifiConnection