import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { Modal, PaperProvider, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import CustomCardList from '../components/CustomCardList';

const prototype = {
  id: 0,
  name: 'Nome da planta',
  description: 'Texto descrevendo a planta, indicando a rega correta para espécie e outras informações relevantes.',
  imageSource: require("../assets/images/prototype-plant.png")
}

const data = [
  {
    id: 1,
    name: 'Pimenta',
    description: 'As pimentas do gênero Capsicum (em grego, Kapso significa picar ou arder) são procedentes do continente americano.',
    imageSource: require("../assets/images/pimenta.png")
  },
  {
    id: 1,
    name: 'Violeta',
    description: 'Herbácea perene de até 20 cm de altura. Existem diversos híbridos com flores, de cores, tamanhos e formas variadas que despontam quase o ano inteiro.',
    imageSource: require("../assets/images/violet.png")
  },
  {
    id: 1,
    name: 'Samambaia',
    description: ' As samambaias são em geral plantas herbáceas, rizomatosas com folhas longas, subdivididas em folíolos que podem ser lisos ou rendados.',
    imageSource: require("../assets/images/samambaia.png")
  },
  {
    id: 1,
    name: 'Lírio',
    description: 'Os lírios são flores antigas com diversas variações para surpreender todos os gostos. São conhecidos pelo forte perfume, por isso onde essas flores estão não há quem não note.',
    imageSource: require("../assets/images/lirio.png")
  },
  {
    id: 1,
    name: 'Antúrio',
    description: 'Chamada também de “planta coração”, o antúrio tem a coloração vermelha ou alaranjada e um formato que se assemelha a um coração, com uma haste amarela no centro.',
    imageSource: require("../assets/images/anturio.png")
  },
  {
    id: 1,
    name: 'Espada de são jorge',
    description: 'A espada-de-são-jorge é uma planta herbácea, cespitosa, acaule e rizomatosa, que pode atingir até 90 cm de altura.',
    imageSource: require("../assets/images/espada-de-sao-jorge.png")
  }
]

export default function App() {

  const [visible, setVisible] = useState(false)
  const [viewingPlant, setViewingPlant] = useState(prototype)

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
              <CustomCard item={viewingPlant} index={0} />
              <CustomButton handlePress={() => setVisible(true)} title='Cadastrar planta' constainerStyles={`w-56 mt-10`} />
            </View>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}>
                <View className="py-10 justify-center items-center h-[70vh] w-[100vw] bg-primary">
                  <CustomCardList
                    data={data}
                    onSelected={(item) => setViewingPlant(item)} />
                  <View className="self-end flex-row justify-end">
                    <CustomButton
                      handlePress={() => setVisible(false)}
                      title='Cancelar'
                      constainerStyles='bg-secondary mr-2 mt-10'
                      textStyles='text-black text-sm' />
                    <CustomButton
                      handlePress={() => setVisible(false)}
                      title='Selecionar'
                      constainerStyles={`mt-10 mr-5`}
                      textStyles='text-sm' />
                  </View>
                </View>
              </Modal>
            </Portal>
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#F9F9F9" />
      </SafeAreaView>
    </PaperProvider>
  )
}
