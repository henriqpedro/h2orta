import { useState } from 'react';
import { View } from 'react-native';
import { Modal, Portal, Searchbar } from 'react-native-paper';
import CustomCardList from '../components/CustomCardList';
import CustomButton from './CustomButton';


const CustomSelectModal = ({ data, visible, onClose, onSelect }) => {
    const [selectedItem, setSelectedItem] = useState({})
    const [innerData, setInnerData] = useState(data)
    const [search, setSearch] = useState('')

    const onChangeSearch = (text) => {
        let innerSearch = text.toLowerCase()
        let filteredData = data.filter(plant => plant.name.toLowerCase().includes(innerSearch))
        setInnerData(filteredData)
        setSearch(innerSearch)
    }

    return (
        <Portal>
            <Modal
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={() => onClose()}>
                <View className="py-4 justify-center rounded-2xl items-center min-h-[80vh] w-[94vw] bg-primary">
                    <Searchbar
                        className="bg-secondary text-dark mx-3 fixed"
                        cursorColor='green'
                        value={search}
                        onChangeText={onChangeSearch} />
                    <CustomCardList
                        data={innerData}
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