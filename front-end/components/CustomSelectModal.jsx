import React, { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import CustomCardList from '../components/CustomCardList';
import CustomButton from './CustomButton';

const data = [
    {
        id: 1,
        name: 'Pimenta',
        description: 'As pimentas do gênero Capsicum (em grego, Kapso significa picar ou arder) são procedentes do continente americano.',
        imageSource: require("../assets/images/pimenta.png")
    },
    {
        id: 1,
        name: 'Violeta',
        description: 'Herbácea perene de até 20 cm de altura. Existem diversos híbridos com flores, de cores, tamanhos e formas variadas que despontam quase o ano inteiro.',
        imageSource: require("../assets/images/violet.png")
    },
    {
        id: 1,
        name: 'Samambaia',
        description: ' As samambaias são em geral plantas herbáceas, rizomatosas com folhas longas, subdivididas em folíolos que podem ser lisos ou rendados.',
        imageSource: require("../assets/images/samambaia.png")
    },
    {
        id: 1,
        name: 'Lírio',
        description: 'Os lírios são flores antigas com diversas variações para surpreender todos os gostos. São conhecidos pelo forte perfume, por isso onde essas flores estão não há quem não note.',
        imageSource: require("../assets/images/lirio.png")
    },
    {
        id: 1,
        name: 'Antúrio',
        description: 'Chamada também de “planta coração”, o antúrio tem a coloração vermelha ou alaranjada e um formato que se assemelha a um coração, com uma haste amarela no centro.',
        imageSource: require("../assets/images/anturio.png")
    },
    {
        id: 1,
        name: 'Espada de são jorge',
        description: 'A espada-de-são-jorge é uma planta herbácea, cespitosa, acaule e rizomatosa, que pode atingir até 90 cm de altura.',
        imageSource: require("../assets/images/espada-de-sao-jorge.png")
    }
]

const CustomSelectModal = ({ visible, onClose, onSelect }) => {
    const [selectedItem, setSelectedItem] = useState({})
    return (
        <Portal>
            <Modal
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={() => onClose()}>
                <View className="justify-center rounded-2xl items-center h-[80vh] w-[94vw] bg-primary">
                    <CustomCardList
                        data={data}
                        onSelected={(item) => setSelectedItem(item)} />
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