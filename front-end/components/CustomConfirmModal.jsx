import { Modal, Portal } from "react-native-paper"
import CustomButton from "./CustomButton"
import { Text } from "react-native"
import { View } from "react-native"

const CostumConfirmModal = ({ action, visible, onConfirm, onClose }) => {

    return (
        <Portal>
            <Modal
                accessibilityViewIsModal={true}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={onClose}>
                <View className="p-8 justify-center rounded-2xl items-center min-h-[20vh] w-[85vw] bg-primary">
                    <Text className="text-base text-center">{action ?? 'Deseja realmente prosseguir?'}</Text>
                    <View className="mt-8 items-center flex-row">
                        <CustomButton
                            title='Confirmar'
                            handlePress={onConfirm}
                            constainerStyles={`px-8 mr-2`} />
                        <CustomButton
                            title='Cancelar'
                            color={'bg-zinc-600'}
                            handlePress={onClose}
                            constainerStyles={`px-8`} />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default CostumConfirmModal