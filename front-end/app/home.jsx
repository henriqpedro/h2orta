import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import PlantCard from '../components/home/CustomCard';
import { useAuthContext } from '../context/AuthContext';
import { usePlantContext } from '../context/PlantContext';

const Menu = ({ setOpen }) => {

    const { authState, logout } = useAuthContext();

    const handleClose = () => {
        setOpen(false);
    }

    if (!authState.authenticated) return <Redirect href="sign-in" />
    return (
        <MotiView
            from={{ translateY: -600 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: -1000 }}
            transition={{
                type: 'spring',
                damping: 20,
                stiffness: 150
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0, // ocupa toda a tela
                backgroundColor: '#76A136',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <View>
                <TouchableOpacity onPress={handleClose} className="mt-10">
                    <MaterialCommunityIcons name="close" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} className="mt-10">
                    <MaterialCommunityIcons name="logout" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </MotiView>
    );
}

const Home = () => {

    const { viewingPlant, macAddr } = usePlantContext();

    const [open, setOpen] = useState(false);

    const onPressTop = () => {
        setOpen(true);
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView className="bg-primary flex-1">
                <TouchableOpacity onPress={onPressTop} className="w-full h-[15vh] rounded-b-[50px] bg-medium items-center justify-center">
                    <Image className="w-[13vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
                </TouchableOpacity>
                <ScrollView>
                    <View className="w-full min-h-[70vh] px-7 justify-center items-center">
                        {/* <Text className={`text-2xl mb-10 ${viewingPlant && 'mt-6'} font-semibold text-gray`}>Meus vasinhos</Text> */}
                        <PlantCard addr={macAddr} item={viewingPlant} index={0} />
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
