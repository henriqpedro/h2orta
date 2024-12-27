import { Entypo } from '@expo/vector-icons';
import * as Paho from 'paho-mqtt';
import React, { useEffect, useState } from 'react';
import { Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CustomButton from './CustomButton';
import CustomTextIcon from './CustomTextIcon';

const CustomIndicator = ({ value }) => {
    let color = value < 50 ? 'bg-danger text-primary' : 'bg-light text-primary'
    color = value < 0 ? 'bg-secondary text-black' : color
    return (
        <Text className={`${color} rounded-md px-3`}>{value >= 0 ? value : ''}%</Text>
    )
}

const CustomCardField = ({ iconSource, title, value, containerStyles }) => {
    return (
        <View className={`${containerStyles} flex-row justify-between items-center`}>
            <CustomTextIcon text={`${title}  `} iconSource={iconSource} />
            <CustomIndicator value={value} />
        </View>
    )
}

const CustomCard = ({ item, index }) => {
    const [watering, setWatering] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [plantData, setPlantData] = useState({ humidity: -1, airHumidity: -1, temperature: -1 ,tank: -1 })

    const client = new Paho.Client('177.71.154.67', 8083, `client-${Math.random() * 1000}`)

    const attemptConnection = (mensagem) => {
        try {
            client.connect({
                keepAliveInterval: 20,
                onSuccess: () => {
                    client.subscribe(item.mqttTopic)
                    if(mensagem){
                        client.send(mensagem)
                        ToastAndroid.show("Irrigando planta", ToastAndroid.SHORT)
                    }
                },
                onFailure: (error) => {
                    ToastAndroid.show("Erro ao conectar MQTT: " + error.errorMessage, ToastAndroid.SHORT)
                }
            })
        } catch (error) {
            ToastAndroid.show("Erro ao comunicar com broker", ToastAndroid.SHORT)
        }
    }

    const errorConnecting = (error) => {
        ToastAndroid.show("Erro ao conectar MQTT: " + error.errorMessage, ToastAndroid.SHORT)
        setTimeout(attemptConnection, 1000)
    }

    useEffect(() => {
        if (item.id > 0) {
            setPlantData({ humidity: 0, tank: 0, airHumidity: 0, temperature: 0 })

            attemptConnection()
            client.onConnectionLost = errorConnecting
            client.onMessageArrived = (message) => {
                let data = message.payloadString.split(' ')
                setPlantData({
                    humidity: data[0],
                    airHumidity: data[1],
                    temperature: data[2],
                    tank: data[3]
                })
            }
            return () => client.disconnect()
        }            
    }, [item])

    sendMessage = (message) => {
        let mensagem = new Paho.Message(message)
        mensagem.qos = 2
        mensagem.destinationName = 'h2orta/irrigar'
        attemptConnection(mensagem)
    }

    useEffect(() => {
        if (watering) {
            setShowMenu(false)
            setTimeout(() => setWatering(false), 100)
        }
    }, [watering])


    return (
        <View className="bg-secondary min-h-[50vh] min-w-[81vw] rounded-xl px-5 pt-2 pb-12 justify-center items-center" key={index}>
            <View className="justify-center items-center">
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowMenu(!showMenu)}
                    className='self-end min-h-[48px] px-5 top-2 justify-center items-end'>
                    <Entypo name="dots-three-horizontal" size={24} color="black" />
                    {
                        showMenu ?
                            <CustomButton
                                isLoading={watering}
                                handlePress={() => {
                                    if (item.id > 0) {
                                        sendMessage('1')
                                        setWatering(true)
                                    } else
                                        ToastAndroid.show("Cadastre uma planta para irrigar", ToastAndroid.SHORT)
                                }}
                                constainerStyles='absolute top-10 bg-primary rounded-none'
                                textStyles='text-black text-sm'
                                title='Irrigar planta' />
                            : <></>
                    }
                </TouchableOpacity>
                <Image className="w-[150px] h-[150px]" source={{uri: item.imagem}} resizeMode='contain' />
                <Text className="text-dark font-semibold text-2xl">{item.nome}</Text>
                <Text className="text-center px-10 mt-2">{item.descricao}</Text>
            </View>
            <View>
                <CustomCardField
                    containerStyles="mt-5"
                    iconSource={require('../assets/icons/humidity.png')}
                    title="Umidade"
                    value={plantData.humidity} />
                <CustomCardField
                    containerStyles="mt-2"
                    iconSource={require('../assets/icons/temperature.png')}
                    title="Temperatura"
                    value={plantData.temperature} />
                <CustomCardField
                    containerStyles="mt-2"
                    iconSource={require('../assets/icons/air_humidity.png')}
                    title="Umidade do ar"
                    value={plantData.airHumidity} />
                <CustomCardField
                    containerStyles="mt-2"
                    iconSource={require('../assets/icons/tank.png')}
                    title="Nível do reservatório"
                    value={plantData.tank} />
            </View>
        </View>
    )
}

export default CustomCard