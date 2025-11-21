import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

const CameraIcon = () => {

    const onPress = () => {
        Toast.show({
            type: 'info',
            text1: 'Atenção',
            text2: "Selecione uma planta para continuar."
        });
    }

    return (
        <TouchableOpacity
            accessible={false}
            importantForAccessibility='no-hide-descendants'
            accessibilityElementsHidden={true}
            onPress={onPress}
            className="p-12 mt-3 mb-6 bg-secondary rounded-3xl">
            <Feather name="camera" size={28} color="#555" />
        </TouchableOpacity>
    );
}

export default CameraIcon