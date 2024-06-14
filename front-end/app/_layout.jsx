import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

    const { loaded, error } = useFonts({
        "Nunito-Bold": require("../assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Regular": require("../assets/fonts/Nunito-Regular.ttf")
    });

    useEffect(() => {
        if (error)
            throw error;
        if (loaded)
            SplashScreen.hideAsync();
    }, [loaded, error]);

    if (!loaded && !error)
        return null;

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    );
}

export default RootLayout;