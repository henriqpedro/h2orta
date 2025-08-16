import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../context/AuthContext';

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
                <RootStack></RootStack>
            </AuthProvider>
        </PaperProvider>
    );
}

export default RootLayout;