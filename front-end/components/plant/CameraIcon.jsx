import { Feather } from '@expo/vector-icons';
import { ToastAndroid, TouchableOpacity } from 'react-native';

const CameraIcon = () => {

    const onPress = () => {
        ToastAndroid.show("Selecione uma planta para continuar.", ToastAndroid.SHORT);
    }

    return (
        <TouchableOpacity
            accessible={false}
            onPress={onPress}
            className="p-12 mt-3 mb-6 bg-secondary rounded-3xl">
            <Feather name="camera" size={28} color="#555" />
        </TouchableOpacity>
    );
}

export default CameraIcon