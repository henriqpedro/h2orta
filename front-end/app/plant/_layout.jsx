import { Stack } from 'expo-router';

const PlantaLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="register" options={{ headerShown: true, title: "Cadastro de planta" }} />
        </Stack>
    );
}

export default PlantaLayout;