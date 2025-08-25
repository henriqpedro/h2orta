import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Searchbar } from 'react-native-paper';
import CustomCardList from '../home/CustomCardList';
import CustomButton from '../CustomButton';
import { useScreenReaderEnabled } from '../../hooks/useScreenReaderEnabled';
import CustomInput from '../CustomInput';
import { prototype } from '../../utils/default-plants';


const CustomModal = ({ data, plant, visible, onClose, onSelect }) => {

    const screenReaderEnabled = useScreenReaderEnabled();

    const [selectedItem, setSelectedItem] = useState({})
    const [innerData, setInnerData] = useState(data)
    const [search, setSearch] = useState('')

    useEffect(() => {
        if (visible) {
            if (plant == prototype) setSelectedItem({});
            else setSelectedItem(plant);
        }
    }, [visible])

    const onChangeSearch = (text) => {
        let innerSearch = text.toLowerCase()
        let filteredData = data.filter(plant => plant.name.toLowerCase().includes(innerSearch))
        setInnerData(filteredData)
        setSearch(innerSearch)
    }

    const selectPlant = (item) => {
        let selected = item.id ? item : selectedItem
        onSelect(selected)
        onClose()
    }

    return (
        <Portal>
            <Modal
                accessibilityViewIsModal={true}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={() => onClose()}>
                <View className="py-4 justify-center rounded-2xl items-center min-h-[80vh] w-[94vw] bg-primary">
                    <Searchbar
                        className="bg-secondary text-dark mx-3 fixed"
                        cursorColor='green'
                        value={search}
                        onChangeText={onChangeSearch}
                        accessibilityLabel="Campo de busca"
                        accessibilityHint="Digite o nome da planta que deseja encontrar"
                        clearAccessibilityLabel="Limpar campo de busca"
                        searchAccessibilityLabel="Pesquisar" />
                    <CustomCardList
                        selectedPlant={plant}
                        data={innerData}
                        onSelected={(item) => {
                            if (!screenReaderEnabled) setSelectedItem(item)
                            else selectPlant(item)
                        }} />
                    <View className="self-end flex-row justify-end">
                        <CustomButton
                            handlePress={() => onClose()}
                            title='Cancelar'
                            constainerStyles='bg-secondary mr-2 mt-10'
                            textStyles='text-black text-sm' />
                        <CustomButton
                            handlePress={selectPlant}
                            disabled={!selectedItem.id}
                            title='Selecionar'
                            constainerStyles={`mt-10 mr-5`}
                            textStyles='text-sm' />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

const CustomSelectModal = ({ plant, data, onSelect }) => {

    const [visible, setVisible] = useState(false);

    const getPlaceHolder = () =>
        plant && plant.name && plant.name == prototype.name ? "Selecione a planta." : plant.name;

    return (
        <>
            <CustomInput
                select={true}
                labelStyles="text-gray font-semibold text-lg"
                inputStyles="bg-secondary"
                onPress={() => setVisible(true)}
                title="Planta:"
                placeholder={getPlaceHolder()} />
            <CustomModal plant={plant} data={data} visible={visible} onClose={() => setVisible(false)} onSelect={onSelect} />
        </>
    );
}

export default CustomSelectModal