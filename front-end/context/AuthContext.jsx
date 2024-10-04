import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import SecureStore from "expo-secure-store";

const API_URL = "http://localhost:8080";
const TOKEN_KEY = "my-jwt";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
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
            return await axios.post(`${API_URL}/usuario`, input);
        } catch (e) {
            //throw Error;
        }
    }

    const login = async (input) => {
        try {
            const result = await axios.post(`${API_URL}/usuario/login`, input);
            console.log(result)

            setAuthState({
                token: result,
                authenticated: true
            });

            axios.defaults.headers.common['Authorization'] = `Bearer ${result}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result);

            return result;
        } catch (e) {
           // throw Error;
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
                login,
                logout,
                register
            }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;