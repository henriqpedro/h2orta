import { createContext, useContext, useState } from "react";
import { prototype } from "../utils/default-plants";
import { API_URL } from "../utils/config";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { useAuthContext } from "./AuthContext";

const PlantContext = createContext();
export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {

    const { setUser } = useAuthContext();
    const [vase, setVase] = useState(undefined);
    const [data, setData] = useState([]);

    const isDuplicatedPlant = (plants, newPlant) =>
        plants.findIndex((plant) => newPlant.id === plant.id) > -1;

    const addPlantToList = (plant) => {
        if (!plant) return;
        setData((prevState) => {
            if (!isDuplicatedPlant(prevState, plant))
                return [...prevState, plant].sort(planta => planta.nome);
            return prevState.sort(planta => planta.nome);
        });
    }

    const getAll = async (page, size, search) => {
        try {
            const response = await axios.get(`${API_URL}/planta`, {
                params: { page, size, search }
            });
            response.data.forEach(plant => addPlantToList(plant));
            return response.data;
        } catch (e) {
            ToastAndroid.show("Erro ao recuperar plantas", ToastAndroid.SHORT);
            console.log(e);
        }
    }

    const get = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/planta/${id}`);
            addPlantToList(response.data);
            return response.data;
        } catch (e) {
            ToastAndroid.show("Erro ao recuperar planta selecionada", ToastAndroid.SHORT);
            console.log(e);
        }
    }

    const save = async (plant, addr, apelido) => {
        try {
            const vaso = await axios.post(`${API_URL}/vaso`, { plantaId: plant.id, apelido, arduino: addr });
            await setUser();
            setVase(vaso);
            ToastAndroid.show("Vaso salvo com sucesso", ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show("Erro ao salvar vaso", ToastAndroid.SHORT);
            console.log(e);
        }
    }

    const deletar = async () => {
        try {
            await axios.delete(`${API_URL}/vaso/${vase.id}`);
            await setUser();
            setVase(undefined);
            ToastAndroid.show("Vaso deletado com sucesso", ToastAndroid.SHORT);
        } catch (e) {
            ToastAndroid.show("Erro ao deletar vaso", ToastAndroid.SHORT);
            console.log(e);
        }
    }

    return (
        <PlantContext.Provider
            value={{
                vase,
                setVase,
                data,
                save,
                deletar,
                setData,
                prototype,
                get,
                getAll
            }}>
            {children}
        </PlantContext.Provider>
    );
}