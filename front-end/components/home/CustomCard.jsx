import { Entypo } from '@expo/vector-icons';
import * as Paho from 'paho-mqtt';
import { useEffect, useState } from 'react';
import { Image, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { MQTT_BROKER } from '../../utils/config';
import { add, humidity, tank } from '../../utils/default-icons';
import CustomButton from '../CustomButton';
import CustomTextIcon from './CustomTextIcon';
import { usePlantContext } from '../../context/PlantContext';
import { router } from 'expo-router';

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
                <Text className="text-base text-center mx-6">
                    Aqui será possível acompanhar o monitoramento de água e o cuidado das suas plantinhas.
                </Text>
            </View>
        </View>
    )
}

const CustomCard = ({ apelido, item, addr, index, deletar }) => {

    const [deleting, setDeleting] = useState(false)
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

    const goToAbout = () => {
        router.navigate("about");
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={goToAbout} className="bg-secondary min-h-[50vh] min-w-[80vw] rounded-xl px-5 pt-2 pb-12 justify-center items-center" key={index}>
            <View className="justify-center items-center">
                <View className="relative self-end px-5 items-end">
                    <TouchableOpacity
                        disabled={!item}
                        accessibilityLabel="Menu de ações"
                        accessibilityState={{ expanded: showMenu }}
                        accessibilityHint={`${!showMenu ? 'Expandir' : 'Ocultar'} menu`}
                        activeOpacity={0.7}
                        onPress={() => setShowMenu(!showMenu)}
                        className="justify-center items-center">
                        <View className="mt-5">
                            <Entypo name="dots-three-horizontal" size={24} color="black" />
                        </View>
                    </TouchableOpacity>

                    {showMenu && (
                        <View className="border- absolute top-14 right-0 bg-primary rounded-none z-50">
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
                                constainerStyles="bg-primary rounded-none z-50"
                                textStyles="text-black text-sm"
                                title="Irrigar planta"
                                accessibilityLabel="Irrigar planta"
                                accessibilityHint="Inicia a irrigação da planta cadastrada"
                                accessibilityRole="button"
                            />
                            <CustomButton
                                isLoading={deleting}
                                disabled={deleting}
                                handlePress={async () => {
                                    if (item.id > 0) {
                                        setDeleting(true)
                                        await deletar();
                                        setDeleting(false);
                                    } else
                                        ToastAndroid.show("Cadastre uma planta primeiro", ToastAndroid.SHORT)
                                }}
                                constainerStyles="border-t-2 border-t-stone-400 bg-primary rounded-none z-50"
                                textStyles="text-black text-sm"
                                title="Deletar planta"
                                accessibilityLabel="Deletar planta"
                                accessibilityHint="Deleta a planta mostrada na tela"
                                accessibilityRole="button"
                            />
                        </View>
                    )}
                </View>
                <View className="w-[150px] h-[150px] overflow-hidden rounded-2xl mb-3">
                    <Image
                        source={{ uri: item.imagem }}
                        className="w-full h-[160px] absolute top-0"
                        resizeMode="cover"
                    />
                </View>
                <Text className="text-medium font-semibold text-2xl">{apelido}</Text>
                <Text className="text-medium text-base">{item.nome}</Text>
                <Text className="text-center px-10 mt-3">{item.usoComum}</Text>
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
        </TouchableOpacity>
    )
}

const PlantCard = ({ vaso, index, deletar }) => {
    return vaso ? <CustomCard deletar={deletar} apelido={vaso.apelido} item={vaso.planta} index={index} addr={vaso.arduino} />
        : <EmptyCard />
}

export default PlantCard;