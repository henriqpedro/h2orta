import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import CustomCard from '../components/CustomCard';
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router';
import { PlantContext } from '../context/PlantContext';

const prototype = [
    {
        id: 0,
        name: 'Violeta',
        description: 'Texto descrevendo a planta, indicando a rega correta para espécie e outras informações relevantes.',
        imageSource: require("../assets/images/violet.png")
    },
    {
        id: 1,
        name: 'Anturio',
        description: 'Texto descrevendo a planta, indicando a rega correta para espécie e outras informações relevantes.',
        imageSource: require("../assets/images/anturio.png")
    },
    {
        id: 2,
        name: 'Espada de São Jorge',
        description: 'Texto descrevendo a planta, indicando a rega correta para espécie e outras informações relevantes.',
        imageSource: require("../assets/images/espada-de-sao-jorge.png")
    },
    {
        id: 3,
        name: 'Lírio',
        description: 'Texto descrevendo a planta, indicando a rega correta para espécie e outras informações relevantes.',
        imageSource: require("../assets/images/lirio.png")
    },
]


const Home = () => {
    
    const [plantIndex, setPlantIndex] = useState(0)
    const [viewingPlant, setViewingPlant] = useState(prototype[0]);

    function nextPlant (){
        if(plantIndex+1 < prototype.length){
            setPlantIndex((prevState) => prevState+1)
        }
    }

    function previousPlant(){
        if(plantIndex-1 >= 0){
            setPlantIndex((prevState) => prevState-1)
        }
    }

    useEffect(() => {
        setViewingPlant(prototype[plantIndex])
    }, [plantIndex])


    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full min-h-[100vh]">
                    <View className="w-[100vw] h-[15vh] rounded-b-[50px] bg-dark items-center justify-center">
                        <Image className="w-[13vh]" source={require("../assets/adaptive-icon.png")} resizeMode='contain' />
                    </View>
                    <View className="w-full flex flex-row items-center justify-center mt-10 px-6">
                        <View className="px-1 flex items-center justify-center">
                            <TouchableOpacity onPress={previousPlant} className="flex items-center justify-center w-8 h-8 rounded-full bg-light">
                                <AntDesign name='left' color={"#fff"} size={20} />
                            </TouchableOpacity>
                        </View>
                        <View className="justify-center items-center">
                            <CustomCard item={viewingPlant} index={0} />
                            <View className="flex flex-row gap-1 mt-2 items-center">
                                {
                                    prototype.map((item) => {
                                        return (
                                            <View 
                                                key={item.id} 
                                                className={`
                                                    rounded-full
                                                    transition-colors
                                                    duration-1000
                                                    ease-linear
                                                    w-3
                                                    h-3
                                                    ${item.id === viewingPlant.id ? "bg-dark" : "bg-secondary"}
                                                `}
                                            />
                                        )
                                    })
                                }
                            </View>
                            <CustomButton
                                handlePress={() => router.navigate('/plants/newPlant')}
                                title='Cadastrar planta'
                                constainerStyles='w-56 mt-10' />
                        </View>
                        <View className="px-1 flex items-center justify-center">
                            <TouchableOpacity onPress={nextPlant} className="flex items-center justify-center w-8 h-8 rounded-full bg-light">
                                <AntDesign name='right' color={"#fff"} size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#F9F9F9" />
        </SafeAreaView>
    );
}

export default Home;
