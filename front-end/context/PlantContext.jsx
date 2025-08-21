import { createContext, useContext, useState } from "react";
import { data, prototype } from "../utils/default-plants";

const PlantContext = createContext();
export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
    const [viewingPlant, setViewingPlant] = useState(prototype);

    return (
        <PlantContext.Provider
            value={{
                data,
                prototype,
                viewingPlant,
                setViewingPlant
            }}>
            {children}
        </PlantContext.Provider>
    );
}