import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { Link } from 'expo-router';

const SignIn = () => {
    return (
        <SafeAreaView className="bg-dark h-full">
            <ScrollView contentContainerStyle={{
                height: "100%",
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View className="items-center justify-center">
                    <Image className="w-[50vw] h-[7vh] mb-8" source={require("../../assets/logo.png")} resizeMode="contain" />
                    <CustomInput inputStyles="bg-primary" title="E-mail:" placeholder="Digite seu e-mail" />
                    <CustomInput inputStyles="bg-primary" hideText={true} title="Senha:" placeholder="Digite sua senha" />
                    <CustomButton
                        title='Entrar'
                        constainerStyles='w-56 mt-10 mb-5' />
                    <Link href="/sign-up" className="font-bold underline">Criar nova conta</Link>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    );
}

export default SignIn;