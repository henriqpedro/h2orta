import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import CustomCardList from '../components/CustomCardList';
import CustomButton from './CustomButton';
import { PlantContext } from '../context/PlantContext';


const CustomSelectModal = ({ visible, onClose, onSelect, incrementPagination }) => {
    const [selectedItem, setSelectedItem] = useState({})

    const {plants} = useContext(PlantContext);

    return (
        <Portal>
            <Modal
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={() => onClose()}>
                <View className="justify-center rounded-2xl items-center h-[80vh] w-[94vw] bg-primary">
                    <CustomCardList
                        data={plants}
                        onSelected={(item) => setSelectedItem(item)}
                        onEndReached={() => {
                            incrementPagination();
                        }}
                    />
                    <View className="self-end flex-row justify-end">
                        <CustomButton
                            handlePress={() => onClose()}
                            title='Cancelar'
                            constainerStyles='bg-secondary mr-2 mt-10'
                            textStyles='text-black text-sm' />
                        <CustomButton
                            handlePress={() => {
                                onSelect(selectedItem)
                                onClose()
                            }}
                            title='Selecionar'
                            constainerStyles={`mt-10 mr-5`}
                            textStyles='text-sm' />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default CustomSelectModal