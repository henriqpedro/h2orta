import { Stack } from 'expo-router';
import { AuthProvider, useAuthContext } from '../context/AuthContext';

const RootLayout = () => {
    return (
        <AuthProvider>
            <RootStack></RootStack>
        </AuthProvider>
    );
}

export const RootStack = () => {
    const { authState } = useAuthContext();
    return (
        <Stack>
            {authState.authenticated ?
                <Stack.Screen name="index" options={{ headerShown: false }} />
                : <Stack.Screen name="(auth)" options={{ headerShown: false }} />}
        </Stack>
    );
}

export default RootLayout;