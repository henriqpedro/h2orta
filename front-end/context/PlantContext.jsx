import axios from 'axios'
import {createContext, useState, useEffect} from 'react'
import * as SecureStore from "expo-secure-store";
import { API_URL, TOKEN_KEY } from '../utils/api_config';
import { useAuthContext } from './AuthContext';

export const PlantContext = createContext();
export function PlantProvider({children}){

    const [plants, setPlants] = useState([])

    const {authState} = useAuthContext()

    const fetchPlantsData = async (page, items) => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            const response = await axios.get(`${API_URL}/planta?page=${page}&items=${items}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            if(response.data.length > 0){
                setPlants((prevPlants) => [...prevPlants, ...response.data])
            }

        
        
    }

    useEffect(() => {
        if(authState.authenticated){
            fetchPlantsData(0, 10);
        }

    }, [authState])

    return (
        <PlantContext.Provider
            value={{
                plants,
                fetchPlantsData,
            }}
        >   
            {
                children
            }
        </PlantContext.Provider>
    )
}