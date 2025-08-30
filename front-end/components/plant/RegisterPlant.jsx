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
                    <Image className="w-[150px] h-[150px] mb-6 rounded-xl" source={{ uri: plant.imagem }} resizeMode='cover' />
            }
            <CustomInput
                labelStyles="text-gray font-semibold text-lg"
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