import { StatusBar } from 'expo-status-bar';
import * as Paho from 'paho-mqtt';
import { useEffect, useState } from 'react';
import { Image, ScrollView, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';

const data = [
  {
    name: 'Pimenta',
    description: 'As pimentas do gênero Capsicum (em grego, Kapso significa picar ou arder) são procedentes do continente americano.',
    imageSource: require("../assets/images/prototype-plant.png")
  }
]

export default function App() {

  const [plantData, setPlantData] = useState({ humidity: 0, tank: 0 });
  const [watering, setWatering] = useState(true);

  const client = new Paho.Client('h2orta.zapto.org', 8083, `client-${Math.random() * 1000}`)

  const attemptConnection = (mensagem) => {
    try {
      client.connect({
        onSuccess() {
          client.subscribe('h2orta/planta')
          if (mensagem)
            client.send(mensagem)
        },
        onFailure(error) {
          errorConnecting(error)
        },
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
  }, [])

  sendMessage = (message) => {
    let mensagem = new Paho.Message(message)
    mensagem.qos = 2
    mensagem.destinationName = 'h2orta/irrigar'
    attemptConnection(mensagem)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{
        height: "100%"
      }}>
        <View className="absolute w-full items-center min-h-[85vh] px-4">
          <View className="relative bottom-20 w-[100vw] h-[26vh] bg-dark z-10 rounded-full items-center justify-center">
            <Image className="w-[100px] top-12" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
          </View>
          <View className="relative bottom-5 justify-center items-center">
            <CustomCard
              imageSource={data[0].imageSource}
              name={data[0].name}
              description={data[0].description}
              humidity={plantData.humidity}
              tank={plantData.tank}
              index={0}
            />
            <CustomButton
              title='Cadastrar planta'
              constainerStyles={`w-3/5 mt-10`} />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#F9F9F9" />
    </SafeAreaView>
  )
}
