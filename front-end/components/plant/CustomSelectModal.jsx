import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, findNodeHandle, Text, View } from 'react-native';
import { Modal, Portal, Searchbar } from 'react-native-paper';
import CustomCardList from '../home/CustomCardList';
import CustomButton from '../CustomButton';
import { useScreenReaderEnabled } from '../../hooks/useScreenReaderEnabled';
import CustomInput from '../CustomInput';
import { prototype } from '../../utils/default-plants';
import { usePlantContext } from '../../context/PlantContext';


const CustomModal = ({ plant, visible, onClose, onSelect }) => {

    const { getAll, data, setData } = usePlantContext();

    const screenReaderEnabled = useScreenReaderEnabled();
    const accessibleRef = useRef(null);

    const [loading, setLoading] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)

    useEffect(() => {
        loadPlantas(page, search);
    }, [page]);

    useEffect(() => {
        setPage(0);
        setData([]);
        loadPlantas(0, search);
    }, [search]);

    useEffect(() => {
        if (visible) {
            setPage(0);
            if (plant == prototype) setSelectedItem({});
            else setSelectedItem(plant);
            if (screenReaderEnabled) {
                setTimeout(() => {
                    if (accessibleRef.current) {
                        const node = findNodeHandle(accessibleRef.current);
                        if (node)
                            AccessibilityInfo.setAccessibilityFocus(node);
                    }
                }, 300);
            }
        }
    }, [visible, screenReaderEnabled]);

    const loadPlantas = async (page, search) => {
        setLoading(true);
        await getAll(page, 10, search);
        setLoading(false);
    }

    const onEndReached = () => {
        setPage(page + 1);
    }

    const onChangeSearch = (text) => {
        let innerSearch = text.toLowerCase();
        setSearch(innerSearch);
    }

    const selectPlant = (item) => {
        let selected = item.id ? item : selectedItem;
        onSelect(selected);
        onClose();
    }

    return (
        <Portal>
            <Modal
                accessibilityViewIsModal={true}
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={() => onClose()}>
                <View
                    className="py-4 justify-center rounded-2xl items-center min-h-[80vh] w-[94vw] bg-primary">
                    <Searchbar
                        accessible
                        focusable
                        className="bg-secondary mx-3 fixed"
                        cursorColor="black"
                        iconColor="black"
                        placeholderTextColor="#76A136"
                        inputStyle={{ color: "#000" }}
                        value={search}
                        onChangeText={onChangeSearch}
                        accessibilityLabel="Campo de busca"
                        accessibilityHint="Digite o nome da planta que deseja encontrar"
                        clearAccessibilityLabel="Limpar campo de busca"
                        searchAccessibilityLabel="Pesquisar" />
                    {
                        screenReaderEnabled &&
                        <Text ref={accessibleRef} className='text-center mx-10 mt-6'>Selecione uma planta: use o campo de busca ou a lista abaixo.</Text>
                    }
                    <CustomCardList
                        selectedPlant={plant}
                        loading={loading}
                        data={data}
                        onEndReached={onEndReached}
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

const CustomSelectModal = ({ getPlants, plant, data, onSelect, visible, setVisible }) => {

    const getPlaceHolder = () =>
        plant && plant.nome && plant.nome == prototype.nome ? "Selecione a planta." : plant.nome;

    return (
        <>
            <CustomInput
                select={true}
                labelStyles="text-medium font-bold text-lg"
                inputStyles="bg-secondary"
                onPress={() => setVisible(true)}
                title="Planta:"
                placeholder={getPlaceHolder()} />
            <CustomModal getPlants={getPlants} plant={plant} data={data} visible={visible} onClose={() => setVisible(false)} onSelect={onSelect} />
        </>
    );
}

export default CustomSelectModal