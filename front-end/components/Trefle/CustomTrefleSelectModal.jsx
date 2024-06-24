import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import CustomCardTrefle from './CustomTrefleCardList';

const CustomSelectTrefle = ({ visible, onClose, onSelect }) => {

    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const baseUrl = 'http://trefle.io/api/v1'
    const token = 'eNiq4MLgqoXBpdIiGb73SopX1nAvpf9FTVw2KNArutI'

    const getTrefleUrl = () => {
        let filters = "filter_not[common_name]=null"
        let params = `token=${token}&q=${'cactus'}&page=${page}&${filters}`
        return `${baseUrl}/plants/search?${params}`
    }

    const fetchData = () => {
        try {
            axios.get(getTrefleUrl())
                .then((result) => {
                    if (!result.data.data || !result.data.meta)
                        return;
                    setData(data.concat(result.data.data))
                    setTotal(result.data.meta.total)
                }).catch((error) => {
                    ToastAndroid.show(error, ToastAndroid.SHORT)
                })
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.SHORT)
        }
    }

    useEffect(() => {
        fetchData();
    }, [page])

    const [selectedItem, setSelectedItem] = useState({})
    return (
        <Portal>
            <Modal
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={() => onClose()}>
                <View className="justify-center rounded-2xl items-center h-[80vh] w-[94vw] bg-primary">
                    <CustomCardTrefle
                        data={data}
                        fetchMore={() => {
                            if (data.length < total)
                                setPage(page + 1)
                        }}
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

export default CustomSelectTrefle