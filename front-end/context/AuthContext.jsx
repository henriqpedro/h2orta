import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { API_URL, TOKEN_KEY } from "../utils/config";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: '',
        user: undefined,
        authenticated: false
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        }
        loadToken();
    }, []);

    const register = async (input) => {
        try {
            await axios.post(`${API_URL}/usuario`, input);
            await login(input);
        } catch (e) {
            console.log(e);
            ToastAndroid.show("Erro ao criar conta.", ToastAndroid.SHORT);
        }
    }

    const setUser = async () => {
        const user = await getUser();
        setAuthState({ ...authState, user });
    }

    const getUser = async () => {
        try {
            const result = await axios.get(`${API_URL}/usuario`);
            return result.data;
        } catch (e) {
            console.log(e);
            ToastAndroid.show("Erro ao recuperar usuário.", ToastAndroid.SHORT);
        }
    }

    const login = async (input) => {
        try {
            const result = await axios.post(`${API_URL}/usuario/login`, input);

            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data);

            const user = await getUser();
            setAuthState({
                user: user,
                token: result.data,
                authenticated: true
            });

            return result;
        } catch (e) {
            console.log(e);
            ToastAndroid.show("Erro ao logar.", ToastAndroid.SHORT);
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = '';
        setAuthState({
            token: '',
            authenticated: false
        });
    }

    return (
        <AuthContext.Provider
            value={{
                authState,
                setAuthState,
                setUser,
                login,
                logout,
                register
            }}>
            {children}
        </AuthContext.Provider>
    );
}