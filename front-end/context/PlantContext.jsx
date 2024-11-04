import axios from 'axios'
import {createContext, useState, useEffect} from 'react'
import * as SecureStore from "expo-secure-store";
import { API_URL, TOKEN_KEY } from '../utils/api_config';

export const PlantContext = createContext();
export function PlantProvider({children}){

    const [plants, setPlants] = useState({
        id: null,
        name: "",
        description: "",
        imageSource: "",
    })

    const fetchPlantsData = async () => {
        
        const token = await SecureStore.getItemAsync(TOKEN_KEY)
        const response = await axios.get(`${API_URL}/planta`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setPlants(response.data)
        
    }

    useEffect(() => {

       fetchPlantsData();

    }, [])

    return (
        <PlantContext.Provider
            value={{
                plants
            }}
        >   
            {
                children
            }
        </PlantContext.Provider>
    )
}