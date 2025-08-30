import { createContext, useContext, useState } from "react";
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

    const isDuplicatedPlant = (plants, newPlant) =>
        plants.findIndex((plant) => newPlant.id === plant.id) > -1;

    const addPlantToList = (plant) => {
        if (!plant) return;
        setData((prevState) => {
            if (!isDuplicatedPlant(prevState, plant))
                return [...prevState, plant];
            return prevState;
        });
    }

    const getAll = async (page, size, search) => {
        try {
            const response = await axios.get(`${API_URL}/planta`, {
                params: { page, size, search }
            });
            response.data.forEach(plant => addPlantToList(plant));
            console.log(response.data)
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
                macAddr,
                prototype,
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