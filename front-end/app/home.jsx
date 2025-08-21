import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import { router } from 'expo-router';
import { usePlantContext } from '../context/PlantContext';

const Home = () => {

    const { viewingPlant } = usePlantContext();
    return (
        <SafeAreaView className="bg-primary flex-1">
            <View className="w-full h-[15vh] rounded-b-[50px] bg-medium items-center justify-center">
                <Image className="w-[13vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
            </View>
            <ScrollView>
                <View className="w-full min-h-[70vh] px-7 justify-center items-center">
                    <CustomCard item={viewingPlant} index={0} />
                </View>
            </ScrollView>
            <View className="justify-center items-center pt-4">
                <CustomButton
                    handlePress={() => router.navigate('plant')}
                    title='Cadastrar planta'
                    constainerStyles='w-56 mb-8' />
            </View>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    );
}

export default Home;
