import { Stack } from 'expo-router';

const PlantaLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}

export default PlantaLayout;