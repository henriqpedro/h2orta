import { createContext, useContext, useEffect, useState } from "react";
import { prototype } from "../utils/default-plants";
import { API_URL } from "../utils/config";
import axios from "axios";
import { ToastAndroid } from "react-native";

const PlantContext = createContext();
export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {

    const [viewingPlant, setViewingPlant] = useState(undefined);
    const [data, setData] = useState([]);
    const [macAddr, setMacAddr] = useState(null);
    const [apelido, setApelido] = useState(null);

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
        } catch(e) {
            ToastAndroid.show("Erro ao recuperar plantas", ToastAndroid.SHORT);
            console.log(e);
        }
    }

    const get = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/planta/${id}`);
            addPlantToList(response.data);
            return response.data;
        } catch(e) {
            ToastAndroid.show("Erro ao recuperar planta selecionada", ToastAndroid.SHORT);
            console.log(e);
        }
    }

    return (
        <PlantContext.Provider
            value={{
                data,
                setData,
                apelido,
                setApelido,
                prototype,
                macAddr,
                setMacAddr,
                viewingPlant,
                setViewingPlant,
                //API CALLS
                get,
                getAll
            }}>
            {children}
        </PlantContext.Provider>
    );
}