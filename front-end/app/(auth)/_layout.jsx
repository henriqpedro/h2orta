import { Stack } from 'expo-router';
import React from 'react';

const AuthLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown: false, header: undefined }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        </Stack>
    );
}

export default AuthLayout;