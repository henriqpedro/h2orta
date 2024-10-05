import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import CustomSelectModal from '../components/CustomSelectModal';

const prototype = {
    id: 0,
    name: 'Nome da planta',
    description: 'Texto descrevendo a planta, indicando a rega correta para espécie e outras informações relevantes.',
    imageSource: require("../assets/images/prototype-plant.png")
}

const Home = () => {

    const [visible, setVisible] = useState(false);
    const [viewingPlant, setViewingPlant] = useState(prototype);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh]">
                    <View className="w-[100vw] h-[15vh] rounded-b-[50px] bg-dark items-center justify-center">
                        <Image className="w-[13vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
                    </View>
                    <View className="w-full items-center justify-center mt-10 px-6">
                        <View className="justify-center items-center">
                            <CustomCard item={viewingPlant} index={0} />
                            <CustomButton
                                handlePress={() => setVisible(true)}
                                title='Cadastrar planta'
                                constainerStyles='w-56 mt-10' />
                        </View>
                        <CustomSelectModal visible={visible} onClose={() => setVisible(false)} onSelect={(item) => setViewingPlant(item)} />
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    );
}

export default Home;
