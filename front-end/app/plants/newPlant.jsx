import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import CustomInput from "../../components/CustomInput";
import { TextInput } from "react-native";
import { useContext, useEffect, useState } from "react";
import CustomSelectModal from "../../components/CustomSelectModal";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import CustomButton from "../../components/CustomButton";
import { PlantContext } from "../../context/PlantContext";
import useBle from "../../utils/useBLE";
import BluetoothDeviceList from "../../components/BluetoothDeviceList";
import WifiManager from 'react-native-wifi-reborn'
import { Device } from "react-native-ble-plx";

const WIFI_CHARACTERISTIC_UUID = "a81f2457-e76f-4a06-9f83-1949773d5a4c"

export default function NewPlant(){

    const {plants, fetchPlantsData} = useContext(PlantContext)
    const [wifiList, setWifiList] = useState([]); 
    const {
        requestPermissions,
        scanForPeripherals,
        allDevices,
        connectToDevice,
        connectedDevice,
        partitionMessage,
        sendMessageToEsp
    } = useBle();

    const [newPlantData, setNewPlantData] = useState({
        nickname: "Apelido",
        plantSpecie: "Planta",
        vase: null
    })
    
    const [visible, setVisible] = useState(false);
    const [wifiModal, setWifiModal] = useState({
        visibility: false,
        ssid: null,
        password: null
    })

    const [connectionType, setConnectionType] = useState("")

    const [pagination, setPagination] = useState({
        page: 0,
        items: 10,
        nextPage: incrementPagination
    })

    const scanForDevices = async () => {
        const isPermissionsEnabled = await requestPermissions();
        if(isPermissionsEnabled){
            scanForPeripherals();
        }
    }

    const scanForWifiNetworks = async () => {
        const wifiList = await WifiManager.loadWifiList();
        setWifiList(wifiList);
    }

    const selectWifiNetwork = async (ssid) => {
        setWifiModal({
            ...wifiModal,
            visibility: true,
            ssid: ssid
        })
    }

    useEffect(() => {
        scanForDevices();
        scanForWifiNetworks();
    }, [])

    function toggleConnectionType(connection){

        if(connection === connectionType){
            setConnectionType("")
            return
        }

        setConnectionType(connection)

    }

    async function incrementPagination (){
        
        const {page, items} = pagination;

        setPagination({...pagination, page: page+1, items: items});

        fetchPlantsData(pagination.page + 1, pagination.items)

    
    }

    /**
     * 
     * @param {Device} device 
     */
    async function sendWifiInformationToVase(device){


        try {

            if(connectedDevice){
                const services = await device.services();
        
                if(services.length === 1){
                    const SERVICE_UUID = services[0].uuid;
                    const encoder = new TextEncoder();

                    const {password, ssid} = wifiModal;

                    console.log("Enviando senha do wifi")
                    if(encoder.encode(password).length > 20) {
                        const partitionedMessage = partitionMessage(password);

                        partitionedMessage.map(partition => sendMessageToEsp(partition, SERVICE_UUID, device, WIFI_CHARACTERISTIC_UUID))
                    }else{
                        sendMessageToEsp(password, SERVICE_UUID, device, WIFI_CHARACTERISTIC_UUID);
                    }

                    console.log("Enviando SSID do wifi")
                    if(encoder.encode(ssid) > 20){
                        const partitionedMessage = partitionMessage(ssid);

                        partitionedMessage.map(partition => sendMessageToEsp(partition, SERVICE_UUID, device, WIFI_CHARACTERISTIC_UUID))
                    }else{
                        sendMessageToEsp(ssid, SERVICE_UUID, device, WIFI_CHARACTERISTIC_UUID);
                    }
                }else{
                    throw new Error("Existem mais de um Serviço neste dispositivo")
                }
            }else{
                throw new Error("Nenhum dispositivo Bluetooth conectado")
            }


        }catch(error){
            console.error(`Não foi possível obter o UUID do serviço: ${error}`)
        } 

    }

    


    return (
        <PaperProvider>
            <SafeAreaView className="flex-1 flex items-center bg-primary px-4 gap-4">
                    <View className="flex items-center">
                        <View className="h-32 w-32 bg-secondary flex justify-center items-center rounded-2xl p-2">
                            {newPlantData.plantSpecie === "Planta" ? (
                                <Image
                                    resizeMode="contain"
                                    style={{width: 30, height: 30}}
                                    source={require("../../assets/icons/Imagem.png")}
                                />
                            ) :
                            (
                                <Image
                                    className="h-full w-full"
                                    source={{uri: plants.filter((plant) => plant.nome === newPlantData.plantSpecie)[0].imagem}}
                                />
                            )}
                        </View>
                        <View className="space-y-1">
                            <CustomInput inputStyles={"bg-secondary font-semibold"} placeholder={"Apelido"}
                                handleChange={(nickname) => setFormData({...newPlantData, nickname: nickname})}
                            />
                            <TouchableOpacity onPress={() => setVisible(true)} className="flex flex-row justify-between w-[80%] px-4 h-10 bg-secondary rounded-3xl items-center">
                                <TextInput
                                    className="flex-1 text-black"
                                    placeholder={newPlantData.plantSpecie}
                                    editable={false}
                                />
                                <AntDesign name="down" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="py-4 flex items-center justify-between flex-1 max-w-[80%]">
                        <View className="flex items-center w-full">
                            <Text className="text-gray-500 mb-2">Selecione o vaso:</Text>
                            <View className="flex flex-row w-full justify-between">
                                <CustomButton
                                    icon={<MaterialIcons name="bluetooth" size={30} color={"#FFF"}/>}
                                    handlePress={() => toggleConnectionType('bluetooth')}
                                    constainerStyles={connectionType === "bluetooth" ? "bg-dark mr-6 flex-1" : "bg-light flex-1 mr-6"}
                                />
                                <CustomButton
                                    icon={<MaterialIcons name="wifi" size={30} color={"#FFF"}/>}
                                    handlePress={() => toggleConnectionType('wifi')}
                                    constainerStyles={connectionType === "wifi" ? "bg-dark flex-1" : "bg-light flex-1"}
                                />
                            </View>
                            {
                                 connectionType === "bluetooth" &&
                                 (
                                    <BluetoothDeviceList connectionList={allDevices} handlePress={connectToDevice} connectionType={"bluetooth"} />
                                 )
                            }
                            {
                                connectionType === "wifi" &&
                                (
                                    <BluetoothDeviceList connectionList={wifiList} connectionType={"wifi"} handlePress={selectWifiNetwork} />
                                )
                            }
                           
                        </View>
                        <View className="flex flex-row px-12">
                            <CustomButton title={"Salvar"} constainerStyles={"flex-1 h-14"} />
                        </View>
                    </View>

            </SafeAreaView>

            <CustomSelectModal 
                visible={visible} 
                onClose={() => setVisible(false)}
                onSelect={(item) => setNewPlantData({...newPlantData, plantSpecie: item.nome})}
                incrementPagination={incrementPagination}
            />

            <Portal>
                <Modal
                    visible={wifiModal.visibility}
                    onDismiss={() => setWifiModal({...wifiModal, visibility: false})}
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                >   
                    <View className="bg-primary w-[85vw] rounded-2xl px-3 py-2" >
                        <View className="flex flex-row items-center justify-between">
                            <Text className="font-bold">Informações do Wifi</Text>
                            <AntDesign
                                name="close" 
                                size={16} 
                                onPress={() => setWifiModal({...wifiModal, visibility: false})}
                            />
                        </View>
                        <View className="w-full flex items-center">
                            <CustomInput 
                                inputStyles={"bg-secondary font-semibold"} 
                                placeholder={"SSID"} 
                                value={wifiModal.ssid}
                                disabled={true}
                                otherStyles={"my-0"}
                                
                            />
                            <CustomInput  
                                inputStyles={"bg-secondary font-semibold"} 
                                placeholder={"Senha"} 
                                hide={true}
                                handleChange={(password) => setWifiModal({...wifiModal, password: password})}
                                otherStyles={"my-0"}
                            />
                        </View>
                            <CustomButton
                                handlePress={() => {
                                    sendWifiInformationToVase(connectedDevice)
                                }}
                                title='Confirmar'
                                textStyles='text-sm'
                                constainerStyles={"mt-6"}
                            />
                    </View>
                </Modal>
            </Portal>

        </PaperProvider>
    )
}

