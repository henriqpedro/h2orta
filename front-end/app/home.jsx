import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import PlantCard from '../components/home/CustomCard';
import { usePlantContext } from '../context/PlantContext';

const Home = () => {

    const { viewingPlant, macAddr } = usePlantContext();

    return (
        <SafeAreaView className="bg-primary flex-1">
            <View className="w-full h-[15vh] rounded-b-[50px] bg-medium items-center justify-center">
                <Image className="w-[13vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
            </View>
            <ScrollView>
                <View className="w-full min-h-[70vh] px-7 justify-center items-center">
                    <Text className={`text-2xl mb-10 ${viewingPlant && 'mt-6'} font-semibold text-gray`}>Meus vasinhos</Text>
                    <PlantCard addr={macAddr} item={viewingPlant} index={0} />
                </View>
            </ScrollView>
            <View className="justify-center items-center pt-4">
                <CustomButton
                    handlePress={() => router.navigate('plant')}
                    title='Cadastrar planta'
                    constainerStyles='w-56 mb-8' />
            </View>
            <StatusBar backgroundColor='#76A136' />
        </SafeAreaView>
    );
}

export default Home;
