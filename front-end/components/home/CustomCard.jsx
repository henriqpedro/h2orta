import { Entypo } from '@expo/vector-icons';
import * as Paho from 'paho-mqtt';
import { useEffect, useState } from 'react';
import { Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import CustomButton from '../CustomButton';
import CustomTextIcon from './CustomTextIcon';
import { MQTT_BROKER } from '../../utils/config';
import { add, humidity, tank } from '../../utils/default-icons';

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

const EmptyCard = ({ index }) => {

    return (
        <View className="bg-secondary min-h-[50vh] min-w-[80vw] rounded-xl px-5 pt-2 pb-12 justify-center items-center" key={index}>
            <View className="justify-center items-center">
                <Image className="w-[230px] h-[230px] my-5" source={add} resizeMode='contain' />
                <Text className="text-base text-center mx-8">
                    Aqui será possível acompanhar o monitoramento de água e o cuidado das suas plantinhas.
                </Text>
            </View>
        </View>
    )
}

const CustomCard = ({ item, addr, index }) => {

    const [watering, setWatering] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [plantData, setPlantData] = useState({ humidity: -1, tank: -1 })

    const client = new Paho.Client(MQTT_BROKER, 8083, `client-${Math.random() * 1000}`)

    const attemptConnection = (mensagem) => {
        try {
            client.connect({
                userName: "h2orta",
                password: "h2orta-client",
                keepAliveInterval: 20,
                onSuccess() {
                    client.subscribe(`h2orta/${addr}/planta`)
                    if (mensagem) {
                        client.send(mensagem)
                        ToastAndroid.show("Irrigando planta", ToastAndroid.SHORT)
                    }
                },
                onFailure(error) {
                    errorConnecting(error)
                }
            })
        } catch (error) {
            ToastAndroid.show("Erro ao comunicar com broker", ToastAndroid.SHORT)
        }
    }

    const errorConnecting = (error) => {
        setTimeout(attemptConnection, 1000)
        console.log("Erro ao conectar ao MQTT: ", error)
    }

    useEffect(() => {
        if (item && item.id > 0 && !!addr) {
            setPlantData({ humidity: 0, tank: 0 })

            console.log("vou comunicar")
            attemptConnection()
            client.onConnectionLost = errorConnecting
            client.onMessageArrived = (message) => {
                let data = message.payloadString.split(' ')
                setPlantData({
                    humidity: data[0],
                    tank: data[1]
                })
            }
            return () => client.disconnect()
        }
    }, [item, addr])

    sendMessage = (message) => {
        let mensagem = new Paho.Message(message)
        mensagem.qos = 2
        mensagem.destinationName = `h2orta/${addr}/irrigar`
        attemptConnection(mensagem)
    }

    useEffect(() => {
        if (watering) {
            setShowMenu(false)
            setTimeout(() => setWatering(false), 100)
        }
    }, [watering])

    return (
        <View className="bg-secondary min-h-[50vh] min-w-[80vw] rounded-xl px-5 pt-2 pb-12 justify-center items-center" key={index}>
            <View className="justify-center items-center">
                <View className="relative self-end px-5 items-end">
                    <TouchableOpacity
                        disabled={!item}
                        accessibilityLabel="Menu de ações"
                        accessibilityState={{ expanded: showMenu }}
                        accessibilityHint={`${!showMenu ? 'Expandir' : 'Ocultar'} menu`}
                        activeOpacity={0.7}
                        onPress={() => setShowMenu(!showMenu)}
                        className="justify-center items-center"
                    >
                        <View className="mt-5">
                            <Entypo name="dots-three-horizontal" size={24} color="black" />
                        </View>
                    </TouchableOpacity>

                    {showMenu && (
                        <CustomButton
                            isLoading={watering}
                            handlePress={() => {
                                if (item.id > 0) {
                                    sendMessage('1')
                                    setWatering(true)
                                    ToastAndroid.show("Irrigando planta", ToastAndroid.SHORT)
                                } else
                                    ToastAndroid.show("Cadastre uma planta para irrigar", ToastAndroid.SHORT)
                            }}
                            constainerStyles="absolute top-14 right-0 bg-primary rounded-none z-50"
                            textStyles="text-black text-sm"
                            title="Irrigar planta"
                            accessibilityLabel="Irrigar planta"
                            accessibilityHint="Inicia a irrigação da planta cadastrada"
                            accessibilityRole="button"
                        />
                    )}
                </View>
                <Image className="w-[150px] h-[150px]" source={item.imageSource} resizeMode='contain' />
                <Text className="text-medium font-semibold text-2xl">{item.name}</Text>
                <Text className="text-center px-10 mt-2">{item.description}</Text>
            </View>
            <View>
                <CustomCardField
                    containerStyles="mt-5"
                    iconSource={tank}
                    title="Nível do reservatório"
                    value={plantData.tank} />
                <CustomCardField
                    containerStyles="mt-2"
                    iconSource={humidity}
                    title="Umidade"
                    value={plantData.humidity} />
            </View>
        </View>
    )
}

const PlantCard = ({ item, addr, index }) => {
    return item ? <CustomCard item={item} index={index} addr={addr} />
        : <EmptyCard />
}

export default PlantCard;