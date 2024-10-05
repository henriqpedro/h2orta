import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export const RootStack = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
    );
}

const RootLayout = () => {
    return (
        <AuthProvider>
            <RootStack></RootStack>
        </AuthProvider>
    );
}

export default RootLayout;