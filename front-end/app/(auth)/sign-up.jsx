import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { Link, Redirect } from 'expo-router';
import { useAuthContext } from '../../context/AuthContext';

const SignUp = () => {
    const { authState, register } = useAuthContext();
    const [formData, setFormData] = useState({
        dataDeNascimento: undefined,
        nome: '',
        usuario: '',
        email: '',
        senha: ''
    });

    const signUp = async () => {
        await register(formData);
    }

    if (authState.authenticated) return <Redirect href="home" />
    return (
        <SafeAreaView className="bg-medium h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh] mt-6 items-center justify-center">
                    <Image className="h-[6vh] my-3" source={require("../../assets/logo.png")} resizeMode="contain" />
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
                        title='Cadastrar'
                        handlePress={signUp}
                        constainerStyles='w-56 mt-7 bg-dark' />
                    <Link href="/sign-in" className="font-bold text-base underline py-5">Já possuo cadastro.</Link>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    );
}

export default SignUp;