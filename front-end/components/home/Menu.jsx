import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Redirect } from 'expo-router';
import { MotiView } from 'moti';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';
import { user } from '../../utils/default-icons';
import { useEffect } from 'react';

const Menu = ({ setOpen }) => {

    const { authState, logout, setUser } = useAuthContext();

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => { setAuth() }, []);

    const openWeb = () => {
        Linking.openURL('https://h2orta.agr.br/')
    }

    const setAuth = async () => {
        if (!authState.user)
            await setUser();
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
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0, // ocupa toda a tela
                backgroundColor: '#76A136'
            }}>
            <View className="flex-row h-1/6 mt-6 items-center justify-around">
                <View>
                    <TouchableOpacity className="py-2 px-1" onPress={handleClose}>
                        <MaterialCommunityIcons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex-row items-center mr-1">
                    <View className="mr-3">
                        <Image className="rounded-full w-[70px] h-[70px]" source={user} resizeMode='cover' />
                    </View>
                    {
                        authState.user &&
                        <View>
                            <Text className="text-white text-2xl font-semibold">{authState.user.usuario}</Text>
                            <Text className="text-white text-base">{authState.user.nome}</Text>
                        </View>
                    }
                </View>
                <View>
                    <TouchableOpacity onPress={logout} className="rounded-xl border-white border-2 px-5 py-2">
                        <Text className="text-white text-base font-semibold">Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View className="flex items-center h-5/6 pb-14 justify-end">
                <Text className="text-lg text-white font-medium">VISITE-NOS EM</Text>
                <TouchableOpacity className="pb-2 px-1" onPress={openWeb}>
                    <Text className="text-3xl text-white font-semibold">h2orta.agr.br</Text>
                </TouchableOpacity>
            </View>
        </MotiView>
    );
}

export default Menu;