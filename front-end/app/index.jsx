import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, View, Text, ToastAndroid } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import * as Paho from 'paho-mqtt';
import { useEffect, useState } from 'react';

const data = [
  {
    name: 'Pimenta',
    description: 'As pimentas do gênero Capsicum (em grego, Kapso significa picar ou arder) são procedentes do continente americano.',
    imageSource: require("../assets/images/prototype-plant.png")
  }
]

export default function App() {

  const [plantData, setPlantData] = useState({ humidity: 0, tank: 0 });
  const [connected, setConnected] = useState(false);
  
  const client = new Paho.Client('h2orta.zapto.org', 8083, 'pedro')

  const attemptConnection = () => {
    client.connect({
      userName: 'pedro',
      password: 'pedro',
      onSuccess() {
        ToastAndroid.show("MQTT conectado", ToastAndroid.SHORT)
        client.subscribe('h2orta/planta')
        setConnected(true)
      },
      onFailure(error) {
        ToastAndroid.show("Erro ao conectar MQTT: " + error.errorMessage, ToastAndroid.LONG)
        setConnected(false)
        setTimeout(attemptConnection, 1000);
      }
    })
  }

  useEffect(() => {
    attemptConnection()

    client.onMessageArrived = (message) => {
      console.log('readdddddddddddddddd!!!!!!')
      let data = message.payloadString.split(' ')
      setPlantData({
        humidity: data[0],
        tank: data[1]
      })
    }

    return () => client.disconnect()
  }, [])

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
            <Text className='text-lg'>{connected ? 'Connected' : 'Not connected'}</Text>
            <CustomCard
              imageSource={data[0].imageSource}
              name={data[0].name}
              description={data[0].description}
              humidity={plantData.humidity}
              tank={plantData.tank}
              index={0}
            />
            <CustomButton
              title="Cadastrar planta"
              handlePress={() => client.send('')}
              constainerStyles="w-3/5 mt-10" />
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#F9F9F9" />
    </SafeAreaView>
  )
}
