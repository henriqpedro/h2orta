import { Entypo } from '@expo/vector-icons';
import * as Paho from 'paho-mqtt';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { MQTT_BROKER } from '../../utils/config';
import { add, air_humidity, humidity, tank, temperature } from '../../utils/default-icons';
import CustomButton from '../CustomButton';
import CustomTextIcon from './CustomTextIcon';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import CustomConfirmModal from '../CustomConfirmModal';

const CustomIndicator = ({ value, max, min, un }) => {
    let color = value >= min && value <= max ? 'bg-light text-primary' : 'bg-danger text-primary'
    color = value < 0 ? 'bg-secondary text-black' : color
    return (
        <Text className={`${color} rounded-md px-3`}>
            {value >= 0 ? value : ''}{un}
        </Text>
    )
}

const CustomCardField = ({ iconSource, title, value, un, containerStyles, max, min }) => {
    return (
        <View className={`${containerStyles} flex-row justify-between items-center`}>
            <CustomTextIcon text={`${title}   `} iconSource={iconSource} />
            <CustomIndicator value={value} un={un} max={max} min={min} />
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

const CustomCard = ({ apelido, item, addr, index, deletar, visible, setVisible }) => {

    const [deleting, setDeleting] = useState(false)
    const [watering, setWatering] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [plantData, setPlantData] = useState({ humidity: -1, tank: -1, air_humidity: -1, temperature: -1 })

    const client = new Paho.Client(MQTT_BROKER, 9001, `client-${Math.random() * 1000}`)

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
                        Toast.show({
                            type: 'success',
                            text1: 'Sucesso',
                            text2: "Irrigando planta"
                        });
                    }
                },
                onFailure(error) {
                    errorConnecting(error)
                }
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: "Erro ao comunicar com broker"
            });
        }
    }

    const errorConnecting = (error) => {
        setTimeout(attemptConnection, 1000)
        console.log("Erro ao conectar ao MQTT: ", error)
    }

    useEffect(() => {
        if (item && item.id > 0 && !!addr) {
            setPlantData({ humidity: 0, tank: 0, air_humidity: 0, temperature: 0 })

            attemptConnection()
            client.onConnectionLost = errorConnecting
            client.onMessageArrived = (message) => {
                let data = message.payloadString.split(' ')
                setPlantData({
                    humidity: Number(data[0]),
                    tank: Number(data[1]),
                    temperature: Number(data[2]),
                    air_humidity: Number(data[3])
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
        setShowMenu(false);
        router.navigate("about");
    }

    return (
        <>
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
                                            Toast.show({
                                                type: 'success',
                                                text1: 'Sucesso',
                                                text2: "Irrigando planta"
                                            });
                                        } else
                                            Toast.show({
                                                type: 'info',
                                                text1: 'Atenção',
                                                text2: "Cadastre uma planta para irrigar"
                                            });
                                    }}
                                    constainerStyles="bg-primary rounded-none z-50"
                                    textStyles="text-black text-sm"
                                    title="Irrigar planta"
                                    accessibilityLabel="Irrigar planta"
                                    accessibilityHint="Inicia a irrigação da planta cadastrada"
                                    accessibilityRole="button"
                                />
                                <CustomButton
                                    handlePress={async () => {
                                        if (item.id > 0) {
                                            router.navigate('plant/update');
                                        } else
                                            Toast.show({
                                                type: 'info',
                                                text1: 'Atenção',
                                                text2: "Cadastre uma planta"
                                            });
                                    }}
                                    constainerStyles="border-t-2 border-t-stone-400 bg-primary rounded-none z-50"
                                    textStyles="text-black text-sm"
                                    title="Atualizar planta"
                                    accessibilityLabel="Atualizar planta"
                                    accessibilityHint="Permite atualizar a planta mostrada na tela"
                                    accessibilityRole="button"
                                />
                                <CustomButton
                                    isLoading={deleting}
                                    disabled={deleting}
                                    handlePress={async () => {
                                        if (item.id > 0) {
                                            setVisible(true)
                                            setShowMenu(false)
                                        } else
                                            Toast.show({
                                                type: 'info',
                                                text1: 'Atenção',
                                                text2: "Cadastre uma planta"
                                            });
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
                <View className="p-4 mt-3 rounded-3xl">
                    <CustomCardField
                        iconSource={temperature}
                        title="Temperatura"
                        value={plantData.temperature}
                        un='°C'
                        max={item.maxTemperatura}
                        min={item.minTemperatura} />
                    <CustomCardField
                        containerStyles="mt-2"
                        iconSource={air_humidity}
                        title="Umidade do ar"
                        value={plantData.air_humidity}
                        un='%'
                        max={item.maxUmidade}
                        min={item.minUmidade} />
                    <CustomCardField
                        containerStyles="mt-2"
                        iconSource={humidity}
                        title="Umidade do solo"
                        value={plantData.humidity}
                        un='%'
                        max={item.maxUmidade}
                        min={item.minUmidade} />
                    <CustomCardField
                        containerStyles="mt-2"
                        iconSource={tank}
                        title="Nível do reservatório"
                        value={plantData.tank}
                        max={100}
                        min={50}
                        un='%' />
                </View>
            </TouchableOpacity>
            <CustomConfirmModal
                visible={visible}
                action={`Deseja realmente deletar ${apelido} da sua estufa?`}
                onConfirm={async () => {
                    setDeleting(true)
                    await deletar()
                    setDeleting(false)
                    setVisible(false)
                }}
                onClose={() => setVisible(false)} />
        </>
    )
}

const PlantCard = ({ vaso, index, deletar, visible, setVisible }) => {
    return vaso ?
        <CustomCard visible={visible} setVisible={setVisible} deletar={deletar} apelido={vaso.apelido} item={vaso.planta} index={index} addr={vaso.arduino} />
        : <EmptyCard />
}

export default PlantCard;