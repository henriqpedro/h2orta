import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { Link, Redirect } from 'expo-router';
import { useAuthContext } from '../../context/AuthContext';

const SignIn = () => {
    const { authState, login } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        usuario: '',
        senha: ''
    });

    const signIn = async () => {
        setLoading(true);
        await login(formData);
        setLoading(false);
    }

    if (authState.authenticated) return <Redirect href="home" />
    return (
        <SafeAreaView className="bg-medium h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh] items-center justify-center">
                    <Image className="h-[7vh] my-3 place-self-start" source={require("../../assets/logo.png")} resizeMode="contain" />
                    <View className="my-10">
                        <CustomInput inputStyles="bg-primary"
                            value={formData.usuario}
                            handleChange={(usuario) => setFormData({ ...formData, usuario: usuario })}
                            title="Usuário:"
                            placeholder="Digite seu usuário." />
                        <CustomInput inputStyles="bg-primary"
                            value={formData.senha}
                            handleChange={(senha) => setFormData({ ...formData, senha: senha })}
                            hide={true}
                            title="Senha:"
                            placeholder="Digite sua senha." />
                    </View>
                    <CustomButton
                        isLoading={loading}
                        title='Entrar'
                        handlePress={signIn}
                        constainerStyles='w-56 mt-7 place-self-end bg-dark' />
                    <Link href="/sign-up" className="font-bold text-base underline py-5">Criar nova conta.</Link>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    );
}

export default SignIn;