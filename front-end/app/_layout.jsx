import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';

export const RootStack = () => {
    return (
        <Stack
            screenOptions={
                {
                    headerStyle: {
                        backgroundColor: "#F9F9F9",
                    }
                }
            }
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="plants/newPlant" options={{ title: "Nova planta", headerTintColor:"#76974B"}} />
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