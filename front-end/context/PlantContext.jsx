import { createContext, useContext, useState } from "react";
import { prototype } from "../utils/default-plants";
import { API_URL } from "../utils/config";
import { useAuthContext } from "./AuthContext";
import api from "../utils/api";
import Toast from "react-native-toast-message";

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
            const response = await api.get(`${API_URL}/planta`, {
                params: { page, size, search }
            });
            response.data.forEach(plant => addPlantToList(plant));
            return response.data;
        } catch (e) {
            console.log("Erro ao recuperar plantas", e);
        }
    }

    const get = async (id) => {
        try {
            const response = await api.get(`${API_URL}/planta/${id}`);
            addPlantToList(response.data);
            return response.data;
        } catch (e) {
            console.log("Erro ao recuperar planta selecionada", e);
        }
    }

    const save = async (plant, addr, apelido) => {
        try {
            const vaso = await api.post(`${API_URL}/vaso`, { plantaId: plant.id, apelido, arduino: addr });
            await setUser();
            setVase(vaso);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: "Vaso salvo com sucesso"
            });
        } catch (e) {
            console.log("Erro ao salvar vaso", e);
        }
    }

    const deletar = async () => {
        try {
            await api.delete(`${API_URL}/vaso/${vase.id}`);
            await setUser();
            setVase(undefined);
            Toast.show({
                type: 'success',
                text1: 'Sucesso',
                text2: "Vaso deletado com sucesso"
            });
        } catch (e) {
            console.log("Erro ao deletar vaso", e);
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