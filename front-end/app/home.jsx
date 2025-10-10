import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AnimatePresence } from 'moti';
import { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import PlantCard from '../components/home/CustomCard';
import { usePlantContext } from '../context/PlantContext';
import Menu from '../components/home/Menu';
import { prototype } from '../utils/default-plants';
import { useAuthContext } from '../context/AuthContext';

const Home = () => {

    const { vase, setVase, deletar } = usePlantContext();
    const { authState, setUser } = useAuthContext();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (authState) {
            if (authState.user) {
                if (!vase || vase == prototype)
                    if (authState.user.vasos && authState.user.vasos.length > 0) {
                        setVase(authState.user.vasos[0]);
                        return;
                    }
            }
        }
    }, [authState]);

    useEffect(() => {
        if (authState)
            if (!authState.user) setAuth();
    }, []);

    const setAuth = async () => {
        await setUser();
    }

    const onPressTop = () => {
        setOpen(true);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="bg-primary flex-1">
                <TouchableOpacity activeOpacity={1} onPress={onPressTop} className="w-full h-[15vh] rounded-b-[50px] bg-medium items-center justify-center">
                    <Image className="w-[13vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
                </TouchableOpacity>
                <ScrollView>
                    <View className="w-full min-h-[70vh] px-7 justify-center items-center">
                        {/* <Text className={`text-2xl mb-10 ${viewingPlant && 'mt-6'} font-semibold text-gray`}>Meus vasinhos</Text> */}
                        <PlantCard vaso={vase} index={0} deletar={deletar} />
                    </View>
                </ScrollView>
                <View className="justify-center items-center pt-4">
                    <CustomButton
                        handlePress={() => router.navigate('plant')}
                        title='Cadastrar planta'
                        constainerStyles='w-56 mb-8' />
                </View>
                <AnimatePresence>
                    {open && <Menu key="menu" setOpen={setOpen} />}
                </AnimatePresence>
                <StatusBar backgroundColor='#76A136' />
            </SafeAreaView>
        </GestureHandlerRootView >
    );
}

export default Home;
