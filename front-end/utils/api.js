import axios from 'axios';
import { API_URL } from './config';
import Toast from 'react-native-toast-message';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000 // 10s
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const { data } = error.response;
            let mensagem = 'Ocorreu um erro inesperado';
            if (data?.message)
                mensagem = data.message;

            Toast.show({
                type: 'error',
                text1: `Erro ${error.response?.status}`,
                text2: mensagem,
            });

        } else if (error.request) {
            Toast.show({
                type: 'error',
                text1: `Erro`,
                text2: 'Servidor não respondeu, verifique sua conexão.',
            });
        } else {
            Toast.show({
                type: 'error',
                text1: `Erro`,
                text2: error.message,
            });
        }
        return Promise.reject(error);
    }
);

export default api;
