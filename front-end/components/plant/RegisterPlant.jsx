import { Image, Text, View } from 'react-native'
import CameraIcon from './CameraIcon'
import CustomInput from '../CustomInput'
import CustomSelectModal from './CustomSelectModal'
import { prototype } from '../../utils/default-plants'

const RegisterPlant = ({ data, plant, apelido, setApelido, setPlant }) => {
    return (
        <View className="w-[90%] mb-4 justify-center items-center">
            <Text className="text-center text-base mb-10">Selecione sua plantinha e defina um apelido para ela:</Text>
            {
                plant.imageSource == prototype.imageSource ?
                    <CameraIcon /> :
                    <Image className="w-[150px] h-[150px] mb-2 rounded-xl" source={plant.imageSource} resizeMode='contain' />
            }
            <CustomInput
                labelStyles="text-gray font-semibold text-lg"
                inputStyles="bg-secondary"
                value={apelido}
                handleChange={setApelido}
                title="Apelido:"
                placeholder="Digite o apelido da planta." />
            <CustomSelectModal plant={plant} data={data} onSelect={setPlant} />
        </View>
    )
}

export default RegisterPlant