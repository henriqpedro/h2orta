import { Link, Redirect } from 'expo-router';
import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { useAuthContext } from '../../context/AuthContext';

const SignUp = () => {
    const { authState, register } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        dataDeNascimento: undefined,
        nome: '',
        usuario: '',
        email: '',
        senha: ''
    });

    const signUp = async () => {
        setLoading(true);
        await register(formData);
        setLoading(false);
    }

    if (authState.authenticated) return <Redirect href="home" />
    return (
        <SafeAreaView className="bg-medium h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh] my-6 items-center justify-center">
                    <Image className="h-[6vh] mt-12" source={require("../../assets/logo.png")} resizeMode="contain" />
                    <View className="my-6">
                        <CustomInput inputStyles="bg-primary"
                            value={formData.nome}
                            handleChange={(nome) => setFormData({ ...formData, nome: nome })}
                            title="Nome:"
                            placeholder="Digite seu nome." />
                        <CustomInput inputStyles="bg-primary"
                            value={formData.usuario}
                            handleChange={(usuario) => setFormData({ ...formData, usuario: usuario })}
                            title="Usuário:"
                            placeholder="Digite seu usuário." />
                        <CustomInput inputStyles="bg-primary"
                            value={formData.dataDeNascimento}
                            handleChange={(dataDeNascimento) => setFormData({ ...formData, dataDeNascimento: dataDeNascimento })}
                            date={true}
                            title="Data de nascimento:"
                            placeholder="Selecione uma data." />
                        <CustomInput inputStyles="bg-primary"
                            value={formData.email}
                            handleChange={(email) => setFormData({ ...formData, email: email })}
                            title="E-mail:"
                            placeholder="Digite seu e-mail." />
                        <CustomInput inputStyles="bg-primary"
                            value={formData.senha}
                            handleChange={(senha) => setFormData({ ...formData, senha: senha })}
                            hide={true}
                            title="Senha:"
                            placeholder="Digite sua senha." />
                    </View>
                    <CustomButton
                        isLoading={loading}
                        title='Cadastrar'
                        handlePress={signUp}
                        constainerStyles='w-56 mt-7 bg-dark'/>
                    <Link href="/sign-in" className="font-bold text-base underline py-5">Já possuo cadastro.</Link>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SignUp;