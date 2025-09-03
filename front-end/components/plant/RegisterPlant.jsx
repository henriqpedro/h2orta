import { Image, Text, View } from 'react-native'
import CameraIcon from './CameraIcon'
import CustomInput from '../CustomInput'
import CustomSelectModal from './CustomSelectModal'
import { prototype } from '../../utils/default-plants'

const RegisterPlant = ({ plant, apelido, setApelido, setPlant }) => {

    return (
        <View className="w-[90%] mb-4 justify-center items-center">
            <Text className="text-center text-base mb-10">Selecione sua plantinha e defina um apelido para ela:</Text>
            {
                plant.imagem == prototype.imagem ?
                    <CameraIcon /> :
                    <View className="w-[150px] h-[150px] overflow-hidden rounded-xl mb-3">
                        <Image
                            source={{ uri: plant.imagem }}
                            className="w-full h-[160px] absolute top-0"
                            resizeMode="cover"
                        />
                    </View>
            }
            <CustomInput
                labelStyles="text-medium font-bold text-lg"
                inputStyles="bg-secondary"
                value={apelido}
                handleChange={setApelido}
                title="Apelido:"
                placeholder="Digite o apelido da planta." />
            <CustomSelectModal plant={plant} onSelect={setPlant} />
        </View>
    )
}

export default RegisterPlant