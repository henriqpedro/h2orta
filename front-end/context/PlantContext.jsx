import { createContext, useContext, useState } from "react";
import { data, prototype } from "../utils/default-plants";

const PlantContext = createContext();
export const usePlantContext = () => useContext(PlantContext);

export const PlantProvider = ({ children }) => {
    const [viewingPlant, setViewingPlant] = useState(undefined);
    const [macAddr, setMacAddr] = useState(null);

    return (
        <PlantContext.Provider
            value={{
                data,
                macAddr,
                prototype,
                setMacAddr,
                viewingPlant,
                setViewingPlant
            }}>
            {children}
        </PlantContext.Provider>
    );
}