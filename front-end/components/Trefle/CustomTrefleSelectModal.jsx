import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastAndroid, View } from 'react-native';
import { Modal, Portal } from 'react-native-paper';
import CustomButton from '../CustomButton';
import CustomTrefleCardList from './CustomTrefleCardList';

const CustomSelectTrefle = ({ visible, onClose, onSelect }) => {

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('')
    const [refreshing, setRefreshing] = useState(true)

    const baseUrl = 'http://trefle.io/api/v1'
    const token = 'eNiq4MLgqoXBpdIiGb73SopX1nAvpf9FTVw2KNArutI'

    const getTrefleUrl = () => {
        let filters = "filter_not[common_name]=null"
        let searchParam = search == '' ? "''" : search
        let params = `token=${token}&q=${searchParam}&page=${page}&${filters}`
        return `${baseUrl}/plants/search?${params}`
    }

    const fetchData = () => {
        try {
            setRefreshing(true)
            axios.get(getTrefleUrl())
                .finally(() => setRefreshing(false))
                .then((result) => {
                    if (result.data.error || !result.data.data || !result.data.meta)
                        setData([]);
                    else if (page == 1 || data.length > 30)
                        setData(result.data.data)
                    else
                        setData(data.concat(result.data.data))
                    setTotal(result.data.meta.total)
                }).catch((error) => {
                    ToastAndroid.show(error, ToastAndroid.SHORT)
                })
        } catch (error) {
            ToastAndroid.show(error, ToastAndroid.SHORT)
        }
    }

    const fetchMore = (mode) => {
        if (mode == 'restart')
            setPage(1)
        else if (mode == 'end') {
            if (data.length < total)
                setPage(page + 1)
        } else if (mode == 'start') {
            if (page > 1)
                setPage(page - 1)
        }
    }

    const onSelectPress = () => {
        onSelect(selectedItem)
        onClose()
    }

    useEffect(() => {
        setPage(1)
    }, [search])

    useEffect(() => {
        fetchData()
    }, [page, search])

    const [selectedItem, setSelectedItem] = useState({})
    return (
        <Portal>
            <Modal
                style={{ justifyContent: 'center', alignItems: 'center' }}
                visible={visible}
                onDismiss={onClose}>
                <View className="justify-center rounded-xl items-center h-[80vh] w-[94vw] bg-primary pb-5">
                    <CustomTrefleCardList
                        data={data}
                        refreshing={refreshing}
                        search={search}
                        fetchMore={fetchMore}
                        onSelected={setSelectedItem}
                        onChangeSearch={setSearch} />
                    <View className="self-end flex-row justify-end mt-5">
                        <CustomButton
                            handlePress={onClose}
                            title='Cancelar'
                            constainerStyles='bg-secondary mr-2'
                            textStyles='text-black text-sm' />
                        <CustomButton
                            handlePress={onSelectPress}
                            title='Selecionar'
                            constainerStyles={`mr-5`}
                            textStyles='text-sm' />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default CustomSelectTrefle