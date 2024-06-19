import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';

const data = [
  {
    name: 'Pimenta',
    description: 'As pimentas do gênero Capsicum (em grego, Kapso significa picar ou arder) são procedentes do continente americano.',
    imageSource: require("../assets/images/prototype-plant.png")
  },
  {
    name: 'Violeta',
    description: 'As pimentas do gênero Capsicum (em grego, Kapso significa picar ou arder) são procedentes do continente americano.',
    imageSource: require("../assets/images/prototype-plant.png")
  }
]

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{
          height: "100%"
        }}>
          <View className="absolute w-full items-center min-h-[85vh] px-4">
            <View className="relative bottom-[10vh] w-[100vw] h-[26vh] bg-dark z-10 rounded-full items-center justify-center">
              <Image className="w-[100px] top-[5vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
            </View>
            <View className="relative bottom-[3vh] justify-center items-center">
              <CustomCard item={data[0]} index={0} />
              <CustomButton title='Cadastrar planta' constainerStyles={`w-3/5 mt-10`} />
            </View>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#F9F9F9" />
      </SafeAreaView>
    </PaperProvider>
  )
}
