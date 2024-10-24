import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomTrefleCard from '../components/Trefle/CustomTrefleCard';
import CustomTrefleSelectModal from '../components/Trefle/CustomTrefleSelectModal';

export default function App() {
  const [visible, setVisible] = useState(false)
  const [viewingPlant, setViewingPlant] = useState()

  return (
    <PaperProvider>
      <SafeAreaView className="bg-primary h-full">
        <ScrollView contentContainerStyle={{
          height: "100%"
        }}>
          <View className="w-[100vw] h-[15vh] rounded-b-[50px] bg-dark items-center justify-center">
            <Image className="w-[13vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
          </View>
          <View className="w-full items-center justify-center min-h-[80vh] px-6">
            <View className="justify-center items-center">
              <CustomTrefleCard item={viewingPlant} index={0} />
              <CustomButton
                handlePress={() => setVisible(true)}
                title='Cadastrar planta'
                constainerStyles='w-56 mt-10' />
            </View>
            <CustomTrefleSelectModal
              visible={visible}
              onClose={() => setVisible(false)}
              onSelect={(item) => setViewingPlant(item)} />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#F9F9F9" />
      </SafeAreaView>
    </PaperProvider>
  )
}
