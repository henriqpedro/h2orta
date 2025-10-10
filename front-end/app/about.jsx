import { SafeAreaView, ScrollView, View } from 'react-native'
import CustomCardDetailed from '../components/home/CustomCardDetailed'
import { usePlantContext } from '../context/PlantContext'
import CustomButton from '../components/CustomButton';
import CustomPropertyList from '../components/home/CustomPropertyList';
import CustomToast from '../components/CustomToast';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

const about = () => {

    const { vase } = usePlantContext();

    return (
        <SafeAreaView className="bg-primary flex-1">
            <ScrollView>
                <View className="w-full px-7 pt-8 justify-center items-center">
                    <CustomCardDetailed item={vase.planta} />
                    <CustomPropertyList item={vase.planta} />
                </View>
            </ScrollView>
            <View className="justify-center items-center pt-4">
                <CustomButton
                    handlePress={() => router.navigate('home')}
                    title='Voltar'
                    constainerStyles='w-56 mb-8' />
            </View>
            <Toast config={{
                error: (props) => <CustomToast {...props} type="error" />,
                success: (props) => <CustomToast {...props} type="success" />,
                info: (props) => <CustomToast {...props} type="info" />,
            }} />
        </SafeAreaView>
    )
}

export default about