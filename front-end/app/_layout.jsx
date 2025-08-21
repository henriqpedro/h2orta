import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../context/AuthContext';
import { PlantProvider } from '../context/PlantContext';

export const RootStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="plant" options={{ headerShown: false }} />
        </Stack>
    );
}

const RootLayout = () => {
    return (
        <PaperProvider>
            <AuthProvider>
                <PlantProvider>
                    <RootStack></RootStack>
                </PlantProvider>
            </AuthProvider>
        </PaperProvider>
    );
}

export default RootLayout;