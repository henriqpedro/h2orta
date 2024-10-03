import React from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, View } from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';

const SignIn = () => {
    return (
        <SafeAreaView className="bg-dark h-full">
            <ScrollView contentContainerStyle={{
                height: "100%"
            }}>
                <View className="w-[100vw] h-[100vh] items-center justify-center">
                    <Image className="w-[50vw] h-[8vh] mb-8" source={require("../../assets/logo.png")} />
                    <CustomInput title="E-mail:" placeholder="Digite seu e-mail" />
                    <CustomInput title="Senha:" placeholder="Digite sua senha" />
                    <CustomButton
                        title='Entrar'
                        constainerStyles='w-56 mt-10' />
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    );
}

export default SignIn;