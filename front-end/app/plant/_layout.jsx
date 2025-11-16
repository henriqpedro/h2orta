import { Stack } from 'expo-router';

const PlantaLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="register" options={{ headerShown: true, title: "Cadastro de planta", headerTintColor: "#76A136" }} />
            <Stack.Screen name="update" options={{ headerShown: true, title: "Atualizando planta", headerTintColor: "#76A136" }} />
        </Stack>
    );
}

export default PlantaLayout;