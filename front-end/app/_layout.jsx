import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { Provider } from 'react-native-paper';

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
        <Provider>
            <AuthProvider>
                <RootStack></RootStack>
            </AuthProvider>
        </Provider>
    );
}

export default RootLayout;